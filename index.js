var gCanvas = document.getElementById("gCanvas");
var btnPath = document.getElementById("btnBeginPathFind");
var containerSearch = document.getElementById("containerSearch");
var searchPoint = document.getElementById("searchPoint");
var btnZoomIn = document.getElementById("btnZoomIn");
var btnZoomOut = document.getElementById("btnZoomOut");
var gCanvasOffset;
var gctx = gCanvas.getContext("2d");
var CANVAS_WIDTH = gCanvas.width;
var CANVAS_HEIGHT = gCanvas.height;
var NODESIZE = 20;
var inputStart = document.getElementById("inputStart");
var inputEnd = document.getElementById("inputEnd");
var btnStart = document.getElementById("btnStart");
var btnEnd = document.getElementById("btnEnd");
var btnPushToWalk = document.getElementById("pushToWalk");
var startValue;
var endValue;
var scale = 1;
var dir;
// gCanvas.style.transform = "scale(" + scale + ")";
// Mendapatkan URL saat ini
var urlParams = new URLSearchParams(window.location.search);

// Mendapatkan nilai dari parameter "inputStart"
var paramStart = urlParams.get("inputStart");
var paramEnd = urlParams.get("inputEnd");

// btnZoomIn.addEventListener("click", zoomIn);
// btnZoomOut.addEventListener("click", zoomOut);

// function zoomIn() {
//   console.log(scale);

//   if (scale <= 0.9) {
//     scale += 0.1;
//     gCanvas.style.transform = "scale(" + scale + ")";
//   }
// }

// function zoomOut() {
//   if (scale > 0.5) {
//     scale -= 0.1;
//     console.log(scale);

//     gCanvas.style.transform = "scale(" + scale + ")";
//   }
// }

var path;

var openSet = new Set();
var closedSet = new Set();
var gridPointsByPos = [];
var gridPoints = [];

var wallSet = new Set();

//used to store the inputStart and endPoint during resets, etc.
var startPoint;
var endPoint;

var mode = null;

//any point in 2D space
class Vec2 {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

gCanvasOffset = new Vec2(gCanvas.offsetLeft, gCanvas.offsetTop);

startPoint = new Vec2(260, 240);

endPoint = new Vec2(1340, 460);

document.addEventListener("DOMContentLoaded", function (event) {
  if (window.DeviceOrientationEvent) {
    // document.getElementById("notice").innerHTML = "Working API detected";
    window.addEventListener(
      "deviceorientation",
      (eventData) => {
        // gamma: Tilting the device from left to right. Tilting the device to the right will result in a positive value.
        const tiltLR = eventData.gamma;
        // beta: Tilting the device from the front to the back. Tilting the device to the front will result in a positive value.
        const tiltFB = eventData.beta;
        // alpha: The direction the compass of the device aims to in degrees.
        dir = eventData.alpha;
        // Call the function to use the data on the page.
        deviceOrientationHandler(tiltLR, tiltFB, dir);
      },
      false
    );
  } else {
    // document.getElementById("notice").innerHTML = "No API detected";
  }

  function deviceOrientationHandler(tiltLR, tiltFB, dir) {
    // BETA
    document.getElementById("tiltLR").innerHTML = Math.ceil(tiltLR);
    // GAMMA
    document.getElementById("tiltFB").innerHTML = Math.ceil(tiltFB);
    // ALPHA
    document.getElementById("direction").innerHTML = Math.ceil(dir);

    // arrow.style.transform = `translate(-50%, -50%) rotateZ(${-dir}deg)`;

    // if (
    //   (startPoint.x === 0 && startPoint.y === 0) ||
    //   (endPoint.x === 0 && endPoint.y === 0)
    // ) {
    //   gCanvas.className = `origin-[250px_250px] rotate-[${Math.ceil(dir)}deg]`;
    // } else {
    //   gCanvas.className = `origin-[${Math.ceil(startPoint.x)}px_${Math.ceil(
    //     startPoint.y
    //   )}px] rotate-[${Math.ceil(dir)}deg]`;
    // }
  }
});

searchPoint.addEventListener("click", () => {
  searchPoint.classList.remove("py-5");
  searchPoint.className = "hidden";
  containerSearch.classList.remove("hidden");

  //tambahkan focus di input
  inputStart.focus();

  //search
  HandleSearch("start");
});

function iconUser(context, target, rotateDegrees = 190) {
  var img = new Image();
  img.onload = function () {
    context.save(); // Simpan status konteks gambar
    context.translate(
      target.posx + target.size / 2,
      target.posy + target.size / 2
    ); // Pusat rotasi
    context.rotate((rotateDegrees * Math.PI) / 180); // Putar gambar
    context.drawImage(
      img,
      -target.size / 2,
      -target.size / 2,
      target.size,
      target.size
    );
    context.restore(); // Pulihkan status konteks gambar
  };
  img.src = "./images/icon.gif";
}

class Node {
  constructor(id, size, posx, posy, walkable, path) {
    var F;
    var parent;
    this.inPath = false;
    this.getGCost = this.getValueG;
    this.getHCost = this.getValueH;

    // console.log("walk ", tenant);
    this.size = size;
    this.posx = posx;
    this.posy = posy;
    this.walkable = walkable;
    this.path = path;

    this.id = id;
  }

  createStartNode() {
    iconUser(gctx, this);
  }

  createEndNode() {
    iconEndNode(gctx, this, 6, "#E72929", "#E72929");
  }

  toggleWalkable() {
    this.walkable = !this.walkable;
  }
  getValueF() {
    //this is a problem
    var fValue = this.getValueH() + this.getValueG();

    return fValue;
  }
  getValueH() {
    var endNodePosition = {
      posx: endPoint.x,
      posy: endPoint.y,
    };

    return getDistance(this, endNodePosition);
  }
  getValueG() {
    var startPointPosition = {
      posx: endPoint.x,
      posy: endPoint.y,
    };
    return getDistance(this, startPointPosition);
  }
  createWall() {
    nodeDrawer(gctx, this, 2, "black", "black");
  }
  createTenant() {
    Tenant(gctx);
  }
  drawOpenNode() {
    nodeDrawer(gctx, this, 2, "black", "green");
  }
  drawClosedNode() {
    nodeDrawer(gctx, this, 2, "black", "pink");
  }

  drawPath() {
    drawerPath(gctx, this, 4, "green", "green");
  }

  drawNode() {
    gctx.beginPath();
    gctx.lineWidth = "2";
    gctx.strokeStyle = "black";
    gctx.fillStyle = "white";
    gctx.fillRect(this.posx, this.posy, this.size, this.size);
    gctx.rect(this.posx, this.posy, this.size, this.size);
    gctx.closePath();
    gctx.stroke();

    if (this.posx == startPoint.x && this.posy == startPoint.y) {
      console.log("hit the startNode");
      this.createStartNode();
      return;
    }
    if (this.inPath === true) {
      this.drawPath();
    }

    if (this.walkable === false) {
      this.createWall();

      return;
    }

    if (this.posx == endPoint.x && this.posy == endPoint.y) {
      this.createEndNode();
    }
  }
}

class PathFindingAlg {
  constructor(grid, startNode, endNode) {
    this.grid = grid;
    this.startNode = gridPointsByPos[startNode.x][startNode.y];
    this.endNode = gridPointsByPos[endNode.x][endNode.y];
    this.currentNode = null;

    this.openSet = new Set();
    this.closedSet = new Set();
  }

  findPath() {
    openSet.clear();
    closedSet.clear();

    var currentNode = this.startNode; // the currentNode, defaults to inputStart node for now

    var endNode = gridPoints[this.endNode]; //the target node
    var startNode = gridPoints[this.startNode];

    var tempArray;

    var newMovementCost; //the new movement cost to neighbor

    openSet.add(gridPoints[currentNode]);

    console.log("begin");

    while (openSet.size > 0) {
      tempArray = Array.from(openSet);

      currentNode = tempArray[0];

      // for (var i = 1; i < tempArray.length; i++) {
      //   //this if statement is solely to build the starting walls.
      //   if (
      //     tempArray[i].getValueF() < currentNode.getValueF() ||
      //     (tempArray[i].getValueF() == currentNode.getValueF() &&
      //       tempArray[i].getValueH() < currentNode.getValueH())
      //   ) {
      //     currentNode = tempArray[i]; //sets the currentNode to openSetI if it has a lower F value, or an = F value with a lower HCost.
      //   }
      // }

      //exits for loop with either lowest F value or combined H value and F value

      openSet.delete(currentNode);

      // currentNode.drawClosedNode();

      closedSet.add(currentNode);

      //might need to put this after getNighbors.... then replace closedSet.hasIn(neighborNode with currentNode
      if (currentNode.id == startNode.id) {
        currentNode.drawNode();
      }
      if (currentNode.id == endNode.id) {
        currentNode.drawNode();
      }

      if (currentNode.path == false) {
        currentNode.drawNode();
      }

      if (currentNode.id == endNode.id) {
        retracePath(startNode, endNode);
        //hit the last point, exit's the loop.

        return; //exits loop
      }

      getNeighbors(currentNode).forEach(function (neighbor, i) {
        var neighborNode = gridPoints[neighbor];
        var neighborH = neighborNode.getHCost();
        var neighborG = neighborNode.getGCost();

        var currentG = currentNode.getGCost();
        var currentH = currentNode.getHCost();

        if (!neighborNode.walkable || closedSet.has(neighborNode)) {
          // console.log(neighborNode.posx, neighborNode.posy);

          return; //acts as a continue, no need to continue if the wall was already checked.
        }

        newMovementCost = currentG + getDistance(currentNode, neighborNode);

        if (newMovementCost < neighborG || !openSet.has(neighborNode)) {
          neighborNode.gCost = newMovementCost;
          neighborNode.hCost = neighborH;
          neighborNode.parent = currentNode;

          if (!openSet.has(neighborNode)) {
            //push the neighborNode to the openSet, to check against other open values
            openSet.add(neighborNode);

            // neighborNode.drawOpenNode();
          }
        }
      });
    }
  }
}

class Grid {
  constructor(width, height, posx, posy, gridPoints) {
    this.width = width;
    this.height = height;
    this.posx = posx;
    this.posy = posy;
    this.gridPoints = gridPoints;
  }

  createGrid() {
    var tempNode; // Variabel sementara untuk menyimpan informasi node selama pembuatan
    var countNodes = 0; // Penghitung untuk melacak jumlah total node yang dibuat
    //HANDLE TENANT

    // Loop melalui lebar grid, membuat node-node sepanjang sumbu X
    for (var i = 0; i < this.width; i += NODESIZE) {
      // Inisialisasi sebuah array untuk menyimpan titik-titik grid berdasarkan posisi sepanjang sumbu X
      gridPointsByPos[i] = [];

      // Loop melalui tinggi grid, membuat node-node sepanjang sumbu Y
      for (var j = 0; j < this.height; j += NODESIZE) {
        // Berikan sebuah indeks unik pada setiap titik grid berdasarkan posisinya
        gridPointsByPos[i][j] = countNodes;

        // Buat sebuah node baru dengan indeks, posisi, dan kemampuan berjalan default yang ditetapkan menjadi true
        tempNode = new Node(countNodes, NODESIZE, i, j, true, true);

        // Tetapkan kemampuan berjalan untuk beberapa node berdasarkan kondisi yang telah ditentukan sebelumnya
        if (
          // JALAN ATAS
          ((countNodes - 292) % 70 === 0 &&
            countNodes >= 292 &&
            countNodes <= 292 + 70 * 135) ||
          // HANDLE JALAN LURUS
          ((countNodes - 293) % 630 <= 44 &&
            countNodes >= 293 &&
            countNodes <= 337 + 630 * 15) ||
          // JALANN TENGAH
          ((countNodes - 316) % 70 === 0 &&
            countNodes >= 316 &&
            countNodes <= 316 + 70 * 135) ||
          // JALAN BAWAH
          ((countNodes - 337) % 70 === 0 &&
            countNodes >= 337 &&
            countNodes <= 337 + 70 * 135)
        ) {
          tempNode.drawNode();
        } else {
          tempNode.walkable = false;
        }

        // tempNode.drawNode();

        // Periksa apakah node saat ini ditetapkan sebagai tembok (tidak dapat dilalui) berdasarkan set eksternal
        // if (wallSet.has(countNodes)) {
        //   console.log("wallSet memiliki countNodes!");
        //   tempNode.walkable = false;
        // }

        // Hitung dan tetapkan nilai heuristik untuk node
        tempNode.F = tempNode.getValueF();

        // Masukkan node yang dibuat ke dalam array gridPoints
        gridPoints.push(tempNode);

        // Inkrementasi penghitung node
        countNodes++;
      }
    }

    Tenant(gctx);
  }
}

//the grid will be the exact size of the canvas
//the top left corner of the grid will be located at point 0,0 to fill the canvas
var grid = new Grid(CANVAS_WIDTH, CANVAS_HEIGHT, 0, 0);
grid.createGrid();

// var myPath = new PathFindingAlg(grid, startPoint, endPoint);

// jarak dari satu node ke node lainnya
function getDistance(nodeA, nodeB) {
  var distX = Math.abs(nodeA.posx - nodeB.posx);
  var distY = Math.abs(nodeA.posy - nodeB.posy);

  if (distX > distY) {
    return 24 * distY + 10 * (distX - distY);
  }

  return 24 * distX + 10 * (distY - distX);
}

// BUAT JALUR ARAH (DIRECTION)
function retracePath(startNode, endNode) {
  path = new Set();
  var currentNode = endNode;
  var reverseArray;
  while (currentNode != startNode) {
    path.add(currentNode);
    currentNode = currentNode.parent;
    currentNode.inPath = true;

    if (currentNode != startNode) currentNode.drawPath();
  }

  reverseArray = Array.from(path);

  reverseArray.reverse();
  path = new Set(reverseArray);
}

//daftar tetangga
function getNeighbors(node) {
  var checkX;
  var checkY;
  var neighborList = [];
  var tempList = [];
  for (var x = -NODESIZE; x <= NODESIZE; x += NODESIZE) {
    for (var y = -NODESIZE; y <= NODESIZE; y += NODESIZE) {
      if (x == 0 && y == 0) {
        continue;
      }
      checkX = node.posx + x;
      checkY = node.posy + y;

      if (
        checkX >= 0 &&
        checkX <= CANVAS_WIDTH - NODESIZE &&
        checkY >= 0 &&
        checkY <= CANVAS_HEIGHT - NODESIZE
      ) {
        if (checkX === node.posx || checkY === node.posy) {
          tempList.push(gridPointsByPos[checkX][checkY]);
        }
      }
    }
  }
  neighborList = tempList;

  return neighborList;
}

// memberitahu kanvas cara menggambar simpul
function nodeDrawer(context, target, lineW, strokeS, fillS) {
  context.beginPath();
  context.lineWidth = lineW;
  context.strokeStyle = strokeS;
  context.fillStyle = fillS;

  context.fillRect(target.posx, target.posy, target.size, target.size);
  context.rect(target.posx, target.posy, target.size, target.size);
  context.closePath();
  context.stroke();
}

// function iconUser(context, target, lineW, strokeS, fillS) {
//   context.beginPath();
//   context.lineWidth = lineW;
//   context.strokeStyle = strokeS;
//   context.fillStyle = fillS;

//   // Menggunakan arc() untuk menggambar lingkaran
//   context.arc(
//     target.posx + target.size / 2,
//     target.posy + target.size / 2,
//     lineW,
//     0,
//     Math.PI * 2
//   );
//   context.closePath();
//   context.fill(); // Mengisi lingkaran dengan warna fillS
//   context.stroke(); // Menggambar lingkaran dengan warna strokeS
// }

function iconEndNode(context, target, lineW, strokeS, fillS) {
  context.beginPath();
  context.lineWidth = lineW;
  context.strokeStyle = strokeS;
  context.fillStyle = fillS;

  // Menggunakan arc() untuk menggambar lingkaran
  context.arc(
    target.posx + target.size / 2,
    target.posy + target.size / 2,
    lineW,
    0,
    Math.PI * 2
  );
  context.closePath();
  context.fill(); // Mengisi lingkaran dengan warna fillS
  context.stroke(); // Menggambar lingkaran dengan warna strokeS
}

function Tenant(context, lineW) {
  dataTenant.forEach((e) => {
    HandleTenant(
      context,
      e.color,
      e.x,
      e.y + 160,
      e.width,
      e.height,
      e.text,
      e?.border,
      e?.fontSize
    );
  });
}

function drawerPath(context, target, lineW, strokeS) {
  context.beginPath();
  context.lineWidth = lineW;
  context.strokeStyle = strokeS;

  context.moveTo(target.posx + 10, target.posy + 10);
  context.lineTo(target.parent.posx + 10, target.parent.posy + 10);

  context.stroke();
}

//clears the path WITHOUT clearing the walls
function reset() {
  gridPoints = []; // resets the gridPoints so that it clears the walls etc. on reset.
  gridPointsByPos = [];
  openSet.clear();
  closedSet.clear();
  gctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  grid.createGrid();
}

//resets everything INCLUDING walls
function resetWalls() {
  wallSet.clear();
  reset();
}

//creates the button functions
// document.getElementById("btnReset").addEventListener("click", function (event) {
//   reset();
// });

// document
//   .getElementById("btnStartPoint")
//   .addEventListener("click", function (event) {
//     mode = "startPoint";
//   });

// document
//   .getElementById("btnEndPoint")
//   .addEventListener("click", function (event) {
//     mode = "endPoint";
//   });

// btnReset.addEventListener("click", function (event) {
//   resetWalls();
// });

// document
//   .getElementById("btnBeginPathFind")
//   .addEventListener("click", function (event) {
//     reset();

//     if (startPoint.x === 0 && startPoint.y === 0) {
//       alert("Tentukan titik Awal");
//       return;
//     }

//     if (endPoint.x === 0 && endPoint.y === 0) {
//       alert("Tujuan belum dipilih");
//       return;
//     }

//     console.log("find PATH", startPoint, endPoint);

//     myPath = new PathFindingAlg(grid, startPoint, endPoint);
//     myPath.findPath();

//     printNextPosx(handlePath);

//     console.log("path ", handlePath);
//   });

// function printNextPosx(cekLine) {
//   let index = 0;

//   const intervalId = setInterval(() => {
//     console.log(index, handlePath.length);
//     if (index <= handlePath.length) {
//       reset();

//       myPath = new PathFindingAlg(grid, startPoint, endPoint);
//       myPath.findPath();

//       if (handlePath[index] !== undefined) {
//         startPoint.x = handlePath[index].posx;
//         startPoint.y = handlePath[index].posy;
//         var update = new Vec2(startPoint.x, startPoint.y);
//         startPoint = new Vec2(startPoint.x, startPoint.y);
//         index++;
//       } else {
//         clearInterval(intervalId);
//         // alert("KAMU SAMPAI TUJUAN");
//         reset();
//         handlePath = [];
//         inputStart.value = inputEnd.value;
//         endValue = "";
//         inputEnd.value = "";
//         // index = 0;
//       }
//     }
//   }, 1000);
// }

//tells the canvas what to do when clicked

// gCanvas.addEventListener(
//   "click",
//   function (event) {
//     var x = event.pageX - $(gCanvas).position().left;
//     var y = event.pageY - $(gCanvas).position().top;

//     gridPoints.forEach(function (element) {
//       if (
//         y > element.posy &&
//         y < element.posy + element.size &&
//         x > element.posx &&
//         x < element.posx + element.size
//       ) {
//         console.log({
//           posx: element.posx,
//           posy: element.posy,
//         });

//         // if (mode === "startPoint") {
//         //   startPoint = new Vec2(element.posx, element.posy);
//         //   reset();
//         // } else if (mode === "wall") {
//         //   //Starting to work out resets without clearning walls, so wallSet doesn't do much yet.
//         //   wallSet.add(element.id);
//         //   element.toggleWalkable();
//         //   element.drawNode();
//         // } else if (mode === "endPoint") {
//         //   console.log("halo", element.posx, element.posy);
//         //   endPoint = new Vec2(element.posx, element.posy);
//         //   reset();
//         // } else {
//         //   // alert("You must select a Mode from the list above!");
//         // }
//       }
//     });
//   },
//   false
// );

// btnStart.addEventListener("click", () => {
//   var startValue = inputStart.value.toLowerCase();

//   switch (startValue) {
//     case "blue":
//       startPoint = new Vec2(100, 120);
//       break;

//     case "brown":
//       startPoint = new Vec2(440, 420);
//       break;

//     case "green":
//       startPoint = new Vec2(80, 340);
//       break;

//     case "red":
//       startPoint = new Vec2(100, 220);
//       break;

//     default:
//       alert("Exhibitor tidak ditemukan");
//       break;
//   }

//   reset();
//   myPath = new PathFindingAlg(grid, startPoint, endPoint);

//   if (endPoint.x === 0 && endPoint.y === 0) {
//     return false;
//   }
//   myPath.findPath();

//   btnPushToWalk.style.display = "block";
// });

// btnEnd.addEventListener("click", () => {
//   var endValue = inputEnd.value.toLowerCase();

//   endPoint = "";
//   handlePath = [];

//   switch (endValue) {
//     case "blue":
//       endPoint = new Vec2(100, 120);
//       break;

//     case "brown":
//       endPoint = new Vec2(440, 540);
//       break;

//     case "green":
//       endPoint = new Vec2(320, 80);
//       break;

//     case "red":
//       endPoint = new Vec2(100, 220);
//       break;

//     default:
//       alert("Exhibitor tidak ditemukan");
//       break;
//   }

//   reset();
//   myPath = new PathFindingAlg(grid, startPoint, endPoint);

//   if (startPoint.x === 0 && startPoint.y === 0) {
//     return false;
//   }

//   myPath.findPath();

//   btnPushToWalk.style.display = "block";
// });

// HANDLE ARROW
// function handleArrow(tanda, operator) {
//   var update;

//   if (tanda === "y") {
//     var update = operator === "tambah" ? startPoint.y + 20 : startPoint.y - 20;

//     startPoint = new Vec2(startPoint.x, update);
//   } else if (tanda === "x") {
//     var update = operator === "tambah" ? startPoint.x + 20 : startPoint.x - 20;

//     startPoint = new Vec2(update, startPoint.y);
//   }

//   reset();

//   myPath = new PathFindingAlg(grid, startPoint, endPoint);
//   myPath.findPath();
// }

// btnPushToWalk.addEventListener("click", () => {
//   if (handlePath.length > 0) {
//     const removedElement = handlePath.shift();

//     startPoint = new Vec2(removedElement.posx, removedElement.posy);
//     reset();

//     myPath = new PathFindingAlg(grid, startPoint, endPoint);
//     myPath.findPath();
//   }

//   if (handlePath.length === 0) {
//     btnPushToWalk.style.display = "none";

//     handlePath = [];
//     inputStart.value = inputEnd.value;
//     endValue = "";
//     inputEnd.value = "";
//   }
// });

// Menambahkan event listener untuk meng-handle klik
// gCanvas.addEventListener("click", function (event) {
//   const rect = gCanvas.getBoundingClientRect();
//   const clickX = event.clientX - rect.left;
//   const clickY = event.clientY - rect.top;

//   // Cek apakah klik terjadi di dalam kotak yang di-handle
//   if (
//     clickX >= x &&
//     clickX <= x + width &&
//     clickY >= y &&
//     clickY <= y + height
//   ) {
//     showModal(text);
//     // Jika klik di dalam kotak
//     if (!clicked) {
//       currentColor = "red";
//       clicked = true;
//     } else {
//       // Jika sudah pernah diklik sebelumnya
//       currentColor = color; // Ganti warna menjadi warna asli
//       clicked = false; // Set status menjadi belum diklik
//     }

//     context.fillStyle = currentColor; // Ubah warna di canvas
//     context.fillRect(x, y, width, height);
//   }
// });

gCanvas.addEventListener(
  "click",
  function (event) {
    var x = event.pageX - $(gCanvas).position().left;
    var y = event.pageY - $(gCanvas).position().top;

    var clickedElement = gridPoints.find(function (element) {
      return (
        y > element.posy &&
        y < element.posy + element.size &&
        x > element.posx &&
        x < element.posx + element.size
      );
    });

    if (clickedElement) {
      console.log({
        posx: clickedElement.posx,
        posy: clickedElement.posy,
        endx: endPoint.x,
        endy: endPoint.y,
      });

      if (startPoint.x === endPoint.x && startPoint.y === endPoint.y) {
        endPoint = "";
        endPoint = new Vec2(0, 0);
        myPath = new PathFindingAlg(grid, startPoint, endPoint);
        reset();

        return;
      }

      startPoint = "";
      startPoint = new Vec2(clickedElement.posx, clickedElement.posy);
      // showModal("text");

      reset();

      myPath = new PathFindingAlg(grid, startPoint, endPoint);
      myPath.findPath();
    }
  },
  false
);

const HandleSearch = (point) => {
  var cekSearch = document.getElementById("dataSearch");
  if (cekSearch) {
    cekSearch.remove();
  }
  console.log(point);

  const filter =
    point === "start"
      ? inputStart.value.toUpperCase()
      : inputEnd.value.toUpperCase();

  const search = document.createElement("div");
  search.id = "dataSearch";

  const ul = document.createElement("ul");

  search.className = `w-screen h-screen fixed top-0 left-0 bg-white  pt-32 pb-10`;

  ul.className = "px-5 py-2 space-y-2  overflow-scroll h-full";

  for (let i = 0; i < dataTenant.length; i++) {
    const info = dataTenant[i];

    if (
      info.text.toUpperCase().indexOf(filter) > -1 ||
      info.code.toUpperCase().indexOf(filter) > -1
    ) {
      const li = document.createElement("li");
      li.textContent = `${info.text} | ${info.code}`;
      li.classList.add(
        "px-4",
        "py-2",
        "bg-white",
        "border",
        "border-gray-300",
        "rounded-md"
      );

      ul.appendChild(li);

      li.addEventListener("click", () => {
        if (point === "start") {
          startPoint = "";
          inputStart.value = `${info.text} | ${info.code}`;
          startPoint = new Vec2(80, 460);
        } else {
          endPoint = "";
          inputEnd.value = `${info.text} | ${info.code}`;
          endPoint = new Vec2(620, 880);
        }

        reset();
        myPath = new PathFindingAlg(grid, startPoint, endPoint);

        myPath.findPath();

        search.remove();
        ul.remove();
      });
    }
  }

  // dataTenant.forEach((info) => {
  //   const li = document.createElement("li");

  //   li.className = "border-b-2 p-2 cursor-pointer";
  //   li.textContent = `${info.text} - ${info.kodePos}`;
  //   ul.appendChild(li);

  //   li.addEventListener("click", () => {
  //     if (point === "inputStart") {
  //       startPoint = "";
  //       inputStart.value = info.text;
  //       startPoint = new Vec2(80, 460);
  //     } else {
  //       endPoint = "";
  //       inputEnd.value = info.text;
  //       endPoint = new Vec2(620, 880);
  //     }

  //     reset();
  //     myPath = new PathFindingAlg(grid, startPoint, endPoint);

  //     myPath.findPath();

  //     search.remove();
  //     ul.remove();
  //   });
  // });

  search.appendChild(ul);

  document.body.appendChild(search);
};

inputStart.addEventListener("click", () => {
  var search = document.getElementById("dataSearch");

  if (search) {
    search.remove();
  }
  HandleSearch("start");
});

inputEnd.addEventListener("click", () => {
  var search = document.getElementById("dataSearch");

  if (search) {
    search.remove();
  }
  HandleSearch("end");
});
