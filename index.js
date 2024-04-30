var gCanvas = document.getElementById("gCanvas");
var btnPath = document.getElementById("btnBeginPathFind");
var containerSearch = document.getElementById("containerSearch");
var searchPoint = document.getElementById("searchPoint");
var btnZoomIn = document.getElementById("btnZoomIn");
var btnZoomOut = document.getElementById("btnZoomOut");
var inputStart = document.getElementById("inputStart");
var inputEnd = document.getElementById("inputEnd");
var btnStart = document.getElementById("btnStart");
var btnEnd = document.getElementById("btnEnd");
var iconEnd = document.getElementById("iconEnd");
var btnPushToWalk = document.getElementById("pushToWalk");
var cekSearch = document.getElementById("dataSearch");
var removeStartPoint = document.getElementById("removeStartPoint");
var removeEndPoint = document.getElementById("removeEndPoint");
var removeStartPoint = document.getElementById("removeStartPoint");
var removeEndPoint = document.getElementById("removeEndPoint");
var ruteEnd = document.getElementById("ruteEnd");
var buttonCamera = document.getElementById("btn-camera");
var CloseCamera = document.getElementById("close-camera");
var buttonCloseCamera = document.getElementById("button-close-camera");
const containerCamera = document.getElementById("camera");
const qrVideo = document.getElementById("qr-video");

var gCanvasOffset;
var gctx = gCanvas.getContext("2d");
var CANVAS_WIDTH = gCanvas.width;
var CANVAS_HEIGHT = gCanvas.height;
var NODESIZE = 20;
var startValue;
var endValue;
var scale = 0.6;
var dir;
var path;
var openSet = new Set();
var closedSet = new Set();
var gridPointsByPos = [];
var gridPoints = [];
var wallSet = new Set();
var startPoint;
var endPoint;
var mode = null;

gCanvas.style.transform = "scale(" + scale + ")";

buttonCamera.addEventListener("click", function () {
  enableCamera();
});
// handle klik
btnZoomIn.addEventListener("click", zoomIn);
btnZoomOut.addEventListener("click", zoomOut);

inputStart.addEventListener("click", () => {
  var search = document.getElementById("dataSearch");
  document.getElementById("modal").classList.add("hidden");

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
  document.getElementById("modal").classList.add("hidden");
});
removeStartPoint.addEventListener("click", () => {
  inputStart.value = "";
  removeStartPoint.classList.add("hidden");
});
removeEndPoint.addEventListener("click", () => {
  inputEnd.value = "";
  removeEndPoint.classList.add("hidden");
});
ruteEnd.addEventListener("click", () => {
  updatePoint("end", startX.innerText, startY.innerText);
  inputEnd.value = modalName.innerText;

  document.getElementById("modal").classList.add("hidden");
  removeEndPoint.classList.remove("hidden");
});
ruteStart.addEventListener("click", (event) => {
  updatePoint("start", startX.innerText, startY.innerText);

  inputStart.value = modalName.innerText;

  document.getElementById("modal").classList.add("hidden");
  removeStartPoint.classList.remove("hidden");
});
inputStart.addEventListener("input", function (event) {
  const value = event.target.value;

  console.log(value);
  if (value.length > 0) {
    removeStartPoint.classList.remove("hidden");
    HandleSearch("start");
  } else {
    removeStartPoint.classList.add("hidden");
  }
});
inputEnd.addEventListener("input", function (event) {
  const value = event.target.value;
  if (value.length > 0) {
    removeEndPoint.classList.remove("hidden");
  } else {
    removeEndPoint.classList.add("hidden");
  }
});
buttonCamera.addEventListener("click", () => {
  containerCamera.style.display = "block";
});

buttonCloseCamera.addEventListener("click", () => {
  qrVideo.pause(); // Menghentikan pemutaran video
  qrVideo.srcObject.getTracks().forEach((track) => track.stop()); // Menghentikan pengambilan gambar dari kamera
  // alert("QR Code detected: " + code.data);

  containerSearch.style.display = "flex";
  containerCamera.style.display = "none";
  document.getElementById("container-button-bottom").style.display = "flex";
});

// handle klik end

// FUNCTION
function enableCamera() {
  const loadingText = document.getElementById("loading-text");
  let scanInterval;
  const constraints = {
    video: {
      facingMode: "environment", // Mengatur kamera belakang secara langsung
    },
  };

  // Tampilkan teks "Loading"
  loadingText.innerText = "Loading...";

  // Use the navigator.mediaDevices.getUserMedia API to access the webcam
  navigator.mediaDevices
    .getUserMedia(constraints)
    .then(function (stream) {
      containerSearch.style.display = "none";

      qrVideo.srcObject = stream;
      qrVideo.play();
      // Setelah video mulai diputar, sembunyikan teks "Loading"
      loadingText.style.display = "none";
      CloseCamera.style.display = "flex";
      document.getElementById("container-button-bottom").style.display = "none";
      document.getElementById("back-qr").style.display = "flex";
    })
    .catch(function (err) {
      console.error("grant camera access permission:", err);
      loadingText.innerText = "grant camera access permission";

      setInterval(() => {
        containerCamera.style.display = "none";
      }, 3000);
    });

  // Use setInterval to periodically scan the video for QR codes
  scanInterval = setInterval(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 150; // Lebar kotak
    canvas.height = 150; // Tinggi kotak

    const context = canvas.getContext("2d");
    context.drawImage(qrVideo, 0, 0, canvas.width, canvas.height);

    const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
    const code = jsQR(imageData.data, imageData.width, imageData.height, {
      inversionAttempts: "dontInvert",
    });
    if (code) {
      const hasil = getFromQr(code.data.replace(/\s+/g, " ").toUpperCase());

      if (hasil) {
        clearInterval(scanInterval); // Mematikan interval saat QR code terdeteksi
        qrVideo.pause(); // Menghentikan pemutaran video
        qrVideo.srcObject.getTracks().forEach((track) => track.stop()); // Menghentikan pengambilan gambar dari kamera
        // alert("QR Code detected: " + code.data);

        containerSearch.style.display = "flex";
        containerCamera.style.display = "none";
        document.getElementById("container-button-bottom").style.display =
          "flex";
      }
    }
  }, 1000);
}
// function zoom

function zoomIn() {
  // console.log(scale);

  if (scale <= 0.9) {
    scale += 0.1;
    gCanvas.style.transform = "scale(" + scale + ")";
  }

  reset();

  myPath = new PathFindingAlg(grid, startPoint, endPoint);
  myPath.findPath();
}

function zoomOut() {
  if (scale > 0.4) {
    scale -= 0.1;
    // console.log(scale);

    gCanvas.style.transform = "scale(" + scale + ")";
    reset();

    myPath = new PathFindingAlg(grid, startPoint, endPoint);
    myPath.findPath();
  }
}

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
    // alert("eror");
  }

  function deviceOrientationHandler(tiltLR, tiltFB, dir) {
    // // BETA
    // document.getElementById("tiltLR").innerHTML = Math.ceil(tiltLR);
    // // GAMMA
    // document.getElementById("tiltFB").innerHTML = Math.ceil(tiltFB);
    // // ALPHA
    // document.getElementById("direction").innerHTML = Math.ceil(-dir);

    arrow.style.transform = ` rotateZ(${Math.ceil(-dir)}deg)`;
  }
});

// ICON USER
function iconUser(context, target, rotateDegrees = 0, scaleFactor = 1.6) {
  var img = new Image();
  img.onload = function () {
    gctx.save(); // Simpan status konteks gambar
    gctx.translate(
      target?.posx + target?.size / 2,
      target?.posy + target?.size / 2
    );

    console.log("halo");

    // gctx.rotate((rotateDegrees * Math.PI) / 180);
    gctx.rotate((-dir * Math.PI) / 180);

    //   // Mengubah ukuran gambar sesuai faktor perbesaran
    var scaledSize = target?.size * scaleFactor;
    gctx.drawImage(
      img,
      -scaledSize / 2,
      -scaledSize / 2,
      scaledSize,
      scaledSize
    );

    // Pusat rotasi
    gctx.restore(); // Pulihkan status konteks gambar
    gctx.closePath(); // Menutup jalur gambar
  };

  img.src = "./images/arrow.svg";
}

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
          // untuk satu arah y
          if (
            (checkY >= node.posy && node.direction == "down") ||
            node.direction === "all"
          ) {
            tempList.push(gridPointsByPos[checkX][checkY]);
          } else if (
            (checkY <= node.posy && node.direction == "up") ||
            node.direction === "all"
          ) {
            tempList.push(gridPointsByPos[checkX][checkY]);
          }
          // untuk satu arah x
          else if (
            (checkX >= node.posx && node.direction == "right") ||
            node.direction === "all"
          ) {
            tempList.push(gridPointsByPos[checkX][checkY]);
          } else if (
            (checkX <= node.posx && node.direction == "left") ||
            node.direction === "all"
          ) {
            tempList.push(gridPointsByPos[checkX][checkY]);
          } else if (node.direction === "all") {
            tempList.push(gridPointsByPos[checkX][checkY]);
          }
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

// icon bulat
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
function segitiga(context, target, lineW, strokeS, fillS) {
  context.beginPath();
  context.lineWidth = lineW;
  context.strokeStyle = strokeS;
  context.fillStyle = fillS;

  // Memutar segitiga sebesar 90 derajat
  var rotatedX = target.posx + target.size / 2; // X baru setelah rotasi
  var rotatedY = target.posy + target.size; // Y baru setelah rotasi

  // Menggunakan moveTo() untuk memulai gambaran segitiga yang sudah diputar
  context.moveTo(rotatedX, rotatedY); // Titik atas segitiga setelah rotasi
  context.lineTo(target.posx + target.size, target.posy); // Titik kanan bawah segitiga setelah rotasi
  context.lineTo(target.posx, target.posy); // Titik kiri bawah segitiga setelah rotasi
  context.closePath();

  context.fill(); // Mengisi segitiga dengan warna fillS
  context.stroke(); // Menggambar tepi segitiga dengan warna strokeS
}

// HANDLE TENANT
function Tenant(context) {
  dataTenant.forEach((e) => {
    HandleTenant(
      context,
      e.color,
      e.x,
      e.y + 320,
      e.width,
      e.height,
      e.text,
      e?.border,
      e?.fontSize,
      e?.image,
      e?.code,
      scale
    );
  });
}

// BUAT GARIS JALAN WARNA HIJAU
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

// search bar
function HandleSearch(point) {
  var cekSearch = document.getElementById("dataSearch");

  if (cekSearch) {
    cekSearch.remove();
  }

  const filter =
    point === "start"
      ? inputStart.value.replace(/\s+/g, " ").toUpperCase()
      : inputEnd.value.replace(/\s+/g, " ").toUpperCase();
  const trimmedFilter = filter.trim();

  console.log(trimmedFilter);

  const search = document.createElement("div");
  search.id = "dataSearch";

  const ul = document.createElement("ul");

  search.className = `w-screen h-screen fixed top-0 left-0 bg-white  pt-32 pb-10`;

  ul.className = "px-5 py-2 space-y-2  overflow-scroll h-full";

  for (let i = 0; i < dataTenant.length; i++) {
    const info = dataTenant[i];

    if (
      info.text.replace(/\s+/g, " ").toUpperCase().indexOf(trimmedFilter) >
        -1 ||
      info.code.toUpperCase().indexOf(trimmedFilter) > -1
    ) {
      const li = document.createElement("li");
      console.log(info.text.toUpperCase(), info.code.toUpperCase());
      li.textContent =
        info.text.toUpperCase() == info.code.toUpperCase()
          ? `${info.text.toUpperCase()} `
          : `${info.text.toUpperCase()} | ${info.code} `;

      li.classList.add(
        "px-4",
        "py-2",
        "bg-white",
        "border",
        "border-gray-300",
        "rounded-md",
        "cursor-pointer"
      );

      if (info.text.length > 0) {
        ul.appendChild(li);
      }

      li.addEventListener("click", (event) => {
        var name = info.text.replace(/\s+/g, " ");
        if (point === "start") {
          inputStart.value =
            info.text.toUpperCase() == info.code.toUpperCase()
              ? `${info.text.toUpperCase()} `
              : `${info.text.toUpperCase()} | ${info.code} `;
          removeStartPoint.classList.remove("hidden");
          startPoint = "";
          startPoint = new Vec2(info.pointx, info.pointy);
        } else {
          inputEnd.value =
            info.text.toUpperCase() == info.code.toUpperCase()
              ? `${info.text.toUpperCase()} `
              : `${info.text.toUpperCase()} | ${info.code} `;
          removeEndPoint.classList.remove("hidden");

          endPoint = "";
          endPoint = new Vec2(info.pointx, info.pointy);
        }

        var containerCanvas = document.getElementById("containerCanvas");
        scale = 0.6;
        gCanvas.style.transform = "scale(" + scale + ")";
        containerCanvas.scrollLeft = (info.x - 200) * scale;
        window.scroll(0, (info.y + 400) * scale);

        point === "start"
          ? updatePoint("start", info.pointx, info.pointy)
          : updatePoint("end", info.pointx, info.pointy);

        search.remove();
        ul.remove();

        changeColorOnClick(
          info.text,
          info.x,
          info.y + 320,
          info.width,
          info.height
        );
      });
    }
  }

  search.appendChild(ul);

  document.body.appendChild(search);
}

// handle ketika tenant di klik
function changeColorOnClick(name, x, y, width, height) {
  Tenant(gctx);
  console.log(name.replace(/\s+/g, " "));

  if (name.split(" ")[0] === "HALL") {
    return false;
  }

  // Menggambar kotak putih untuk menutupi teks sebelumnya

  gctx.fillStyle = "#7CFC00";
  gctx.fillRect(x, y, width, height);
  gctx.strokeRect(x, y, width, height);
  gctx.lineWidth = 1;

  const maxWidth = width - 10; // Lebar maksimum teks
  const lineHeight = 12; // Tinggi baris teks

  let words = name.replace(/\s+/g, " ").toUpperCase().split(" ");
  let line = "";
  let lines = [];

  // Membagi teks menjadi beberapa baris
  for (let i = 0; i < words.length; i++) {
    let testLine = line + words[i] + " ";
    let testWidth = gctx.measureText(testLine).width;
    if (testWidth > maxWidth) {
      lines.push(line);
      line = words[i] + " ";
    } else {
      line = testLine;
    }
  }
  lines.push(line);

  // Mengatur posisi teks
  let textX = x + width / 2; // Koordinat X untuk teks
  let textY = y + height / 2 - (lines.length / 2) * lineHeight;

  // Menambahkan teks ke canvas
  gctx.fillStyle = "black"; // Warna teks
  gctx.textAlign = "center"; // Posisi teks
  gctx.textBaseline = "middle"; // Posisi teks
  for (let i = 0; i < lines.length; i++) {
    gctx.fillText(lines[i], textX, textY);
    textY += lineHeight;
  }
}

// update titik
function updatePoint(point, x, y) {
  if (point === "start") {
    startPoint = "";
    startPoint = new Vec2(x, y);
  } else {
    endPoint = "";
    endPoint = new Vec2(x, y);
  }

  reset();

  myPath = new PathFindingAlg(grid, startPoint, endPoint);
  myPath.findPath();
}

function getFromQr(from) {
  var containerCanvas = document.getElementById("containerCanvas");

  var tenant = dataTenant.find(function (element) {
    return (
      element.text.replace(/\s+/g, " ").toUpperCase() == from.toUpperCase()
    );
  });

  if (tenant) {
    console.log(tenant.text);
    inputStart.value = tenant.text.replace(/\s+/g, " ").toUpperCase();

    updatePoint("start", tenant.pointx, tenant.pointy);
    containerCanvas.scrollLeft = (tenant.x - 200) * scale;
    window.scroll(0, (tenant.y + 300) * scale);
    showModal(
      tenant.text,
      tenant.code,
      tenant.pointx,
      tenant.pointy,
      false,
      tenant.address,
      tenant.telp,
      tenant.email,
      tenant.product,
      tenant.link
    );

    setTimeout(
      () => {
        console.log("halo");
        changeColorOnClick(
          tenant.text,
          tenant.x,
          tenant.y + 320,
          tenant.width,
          tenant.height
        );
      },

      100
    );

    return true;
  } else {
    alert(`data : ${from} tidak ditemukan`);
    return false;
  }
}
// function end

//any point in 2D space
class Vec2 {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

gCanvasOffset = new Vec2(gCanvas.offsetLeft, gCanvas.offsetTop);

endPoint = new Vec2(0, 0);
startPoint = new Vec2(480, 400);

class Node {
  constructor(id, size, posx, posy, walkable, path, direction = "all", color) {
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
    this.direction = direction;
    this.color = "white";
    this.id = id;
  }

  createStartNode() {
    // iconUser(gctx, this);
    segitiga(gctx, this, 6, "green", "green");
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
    gctx.strokeStyle = this.color === "white" ? "white" : "transparent";
    gctx.fillStyle = this.color === "white" ? "white" : this.color;
    gctx.fillRect(this.posx, this.posy, this.size, this.size);
    gctx.rect(this.posx, this.posy, this.size, this.size);
    gctx.closePath();
    gctx.stroke();

    if (this.posx == startPoint.x && this.posy == startPoint.y) {
      // console.log("hit the startNode");

      this.createStartNode();

      return;
    }
    if (this.inPath === true) {
      this.drawPath();
    }

    if (this.walkable === false) {
      // this.createWall();

      return;
    }

    if (this.posx == endPoint.x && this.posy == endPoint.y) {
      this.createEndNode();
    }
  }
}

setInterval(() => {
  reset();

  if (endPoint.x !== 0 && endPoint.y !== 0)
    myPath = new PathFindingAlg(grid, startPoint, endPoint);
  myPath?.findPath();
}, 1000);

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

    // console.log("begin");

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

        // HANDLE JALAN SATUU ARAH MASUK DARI HALL A1 SAMPAI D2
        if (
          // JALAN MASUK Y HALL A1
          (countNodes >= 2331 && countNodes <= 2348) ||
          // JALAN MASUK Y ACIPI HALL A3
          (countNodes >= 11643 && countNodes <= 11659) ||
          // JALAN MASUK Y INTOP HALL D1
          (countNodes >= 16202 && countNodes <= 16220) ||
          // JALAN MASUK Y D1G1-01 HALL D1
          (countNodes >= 18627 && countNodes <= 18645) ||
          // JALAN MASUK Y ARVENTO HALL D2
          (countNodes >= 22216 && countNodes <= 22235) ||
          // JALAN MASUK Y MULTICO HALL D2
          (countNodes >= 25417 && countNodes <= 25435)
        ) {
          tempNode.direction = "down";
          tempNode.drawNode();
        }

        // Tetapkan kemampuan berjalan untuk beberapa node berdasarkan kondisi yang telah ditentukan sebelumnya
        else if (
          // JALAN MASUK Y ARTHAPLAST HALL A2
          (countNodes >= 6987 && countNodes <= 7003) ||
          // JALAN ATAS X HALL A1
          ((countNodes - 408) % 97 === 0 &&
            countNodes >= 408 &&
            countNodes <= 408 + 97 * 135) ||
          // // // // JALANN TENGAH X HALL A
          ((countNodes - 432) % 97 === 0 &&
            countNodes >= 432 &&
            countNodes <= 432 + 97 * 135) ||
          // // // // JALAN BAWAH X
          ((countNodes - 453) % 97 === 0 &&
            countNodes >= 453 &&
            countNodes <= 453 + 97 * 135) ||
          // // // HANDLE JALAN LURUS Y HALL A
          ((countNodes - 409) % 873 <= 44 &&
            countNodes >= 409 &&
            countNodes <= 453 + 873 * 15) ||
          // HALL A END
          // // MASUK HALL A1 ke D1 X
          ((countNodes - 13618) % 97 === 0 &&
            countNodes >= 13618 &&
            countNodes <= 13618 + 97 * 12) ||
          // // JALAN ATAS HALL D1 X
          ((countNodes - 14765) % 97 === 0 &&
            countNodes >= 14765 &&
            countNodes <= 14765 + 97 * 54) ||
          // // JALAN TENGAH HALL D1 SAMPAI D2 X
          ((countNodes - 14795) % 97 === 0 &&
            countNodes >= 14795 &&
            countNodes <= 14795 + 97 * 126) ||
          // // JALAN BAWAH HALL D1 X
          ((countNodes - 15699) % 97 === 0 &&
            countNodes >= 15699 &&
            countNodes <= 15699 + 97 * 36) ||
          //  JALAN LURUS Y HALL D1 PERTAMA
          (countNodes >= 14766 && countNodes <= 14794) ||
          // JALAN LURUS Y HALL D1 KEDUA SAMPAI SEMINAR HALL D1
          ((countNodes - 15639) % 873 <= 60 &&
            countNodes >= 15639 &&
            countNodes <= 15696 + 873 * 5) ||
          //  JALAN LURUS X ZIWEI HALL D1
          ((countNodes - 15787) % 97 === 0 &&
            countNodes >= 15787 &&
            countNodes <= 15787 + 97 * 16) ||
          // // JALAN LURUS SEMINAR AREA HALL D1
          ((countNodes - 19285) % 97 === 0 &&
            countNodes >= 19285 &&
            countNodes <= 19285 + 97 * 8) ||
          // // JALAN LURUS X PINHANG HALL D1
          ((countNodes - 19275) % 97 === 0 &&
            countNodes >= 19275 &&
            countNodes <= 19275 + 97 * 8) ||
          // // JALAN X AKHIR HALL D2
          ((countNodes - 21124) % 97 === 0 &&
            countNodes >= 21124 &&
            countNodes <= 21124 + 97 * 61) ||
          // JALAN LURUS X JS AUTOMOTIVE D1
          ((countNodes - 18406) % 97 === 0 &&
            countNodes >= 18406 &&
            countNodes <= 18406 + 97 * 8) ||
          // // JALAN ATAS X HALL D2
          ((countNodes - 20974) % 97 === 0 &&
            countNodes >= 20974 &&
            countNodes <= 20974 + 97 * 62) ||
          // // JALAN Y LUGONG HALL D2
          ((countNodes - 20974) % 873 <= 53 &&
            countNodes >= 20974 &&
            countNodes <= 21027 + 873 * 1) ||
          // // JALAN Y TENGAH HALL D2
          ((countNodes - 23497) % 873 <= 52 &&
            countNodes >= 23497 &&
            countNodes <= 23549 + 873 * 1) ||
          // // JALAN Y AKHIR HALL D2
          ((countNodes - 26116) % 873 <= 52 &&
            countNodes >= 26116 &&
            countNodes <= 26167 + 873 * 1) ||
          // // JALAN Y MIMA HALL D2
          ((countNodes - 25369) % 873 <= 22 &&
            countNodes >= 25369 &&
            countNodes <= 25391 + 873 * 0) ||
          // // JALAN X DIBAWAH MIMA HALL D2
          ((countNodes - 24510) % 97 === 0 &&
            countNodes >= 24510 &&
            countNodes <= 24510 + 97 * 9) ||
          // JALAN X VIP LONGUE HALL D2
          ((countNodes - 21117) % 97 === 0 &&
            countNodes >= 21117 &&
            countNodes <= 21117 + 97 * 17) ||
          // JALAN Y FTY UNION HALL D2
          (countNodes >= 22750 && countNodes <= 22772) ||
          // JALAN X DARI HALL A1
          ((countNodes - 779) % 97 === 0 &&
            countNodes >= 779 &&
            countNodes <= 779 + 97 * 253)
          // TEST
          // countNodes === 2349 + 97 * 191
        ) {
          tempNode.drawNode();
        }

        // else if (
        //   (countNodes >= 20876 && countNodes <= 20931) ||
        //   (countNodes >= 20876 + 97 && countNodes <= 20931 + 97) ||
        //   (countNodes >= 20876 + 97 * 2 && countNodes <= 20931 + 97 * 2) ||
        //   (countNodes >= 20876 + 97 * 3 && countNodes <= 20931 + 97 * 3) ||
        //   (countNodes >= 20876 + 97 * 4 && countNodes <= 20931 + 97 * 4) ||
        //   (countNodes >= 20876 + 97 * 5 && countNodes <= 20931 + 97 * 5) ||
        //   (countNodes >= 20876 + 97 * 6 && countNodes <= 20931 + 97 * 6) ||
        //   (countNodes >= 20876 + 97 * 7 && countNodes <= 20931 + 97 * 7) ||
        //   (countNodes >= 20876 + 97 * 8 && countNodes <= 20931 + 97 * 8) ||
        //   (countNodes >= 20876 + 97 * 9 && countNodes <= 20931 + 97 * 9) ||
        //   (countNodes >= 20876 + 97 * 10 && countNodes <= 20931 + 97 * 10) ||
        //   (countNodes >= 20876 + 97 * 11 && countNodes <= 20931 + 97 * 11) ||
        //   (countNodes >= 20876 + 97 * 12 && countNodes <= 20931 + 97 * 12) ||
        //   (countNodes >= 20876 + 97 * 13 && countNodes <= 20931 + 97 * 13) ||
        //   (countNodes >= 20876 + 97 * 14 && countNodes <= 20931 + 97 * 14) ||
        //   (countNodes >= 20876 + 97 * 15 && countNodes <= 20931 + 97 * 15) ||
        //   (countNodes >= 20876 + 97 * 16 && countNodes <= 20931 + 97 * 16) ||
        //   (countNodes >= 20876 + 97 * 17 && countNodes <= 20931 + 97 * 17) ||
        //   (countNodes >= 20876 + 97 * 18 && countNodes <= 20931 + 97 * 18) ||
        //   (countNodes >= 20876 + 97 * 19 && countNodes <= 20931 + 97 * 19) ||
        //   (countNodes >= 20876 + 97 * 20 && countNodes <= 20931 + 97 * 20)
        // ) {
        //   tempNode.walkable = false;

        //   tempNode.color = "#5BBCFF";

        //   tempNode.drawNode();
        // }

        // else if (countNodes >= 1540 && countNodes <= 1551) {
        // //   tempNode.direction = "up";
        // //   tempNode.drawNode();
        // // }

        // // else if (
        // //   (countNodes - 292) % 70 === 0 &&
        // //   countNodes >= 292 &&
        // //   countNodes <= 292 + 70 * 135
        // // ) {
        // //   tempNode.direction = "RIGHT";
        // //   tempNode.drawNode();
        // // }
        // // else if (
        // //   (countNodes - 316) % 70 === 0 &&
        // //   countNodes >= 316 &&
        // //   countNodes <= 316 + 70 * 135
        // // ) {
        // //   tempNode.direction = "left";
        // //   tempNode.drawNode();
        // // }
        else {
          tempNode.walkable = false;
        }

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

gCanvas.addEventListener("click", canvasClickHandler);

function canvasClickHandler(event) {
  var x = event.pageX - $(gCanvas).position().left;
  var y = event.pageY - $(gCanvas).position().top;

  var clickedElement = gridPoints.find(function (element) {
    return (
      y > element.posy * scale &&
      y < (element.posy + element.size) * scale &&
      x > element.posx * scale &&
      x < (element.posx + element.size) * scale
    );
  });

  if (clickedElement) {
    var posx = clickedElement.posx;
    var posy = clickedElement.posy;

    console.log({
      posx: posx,
      posy: posy,
      x: parseInt(endPoint.x),
      y: parseInt(endPoint.y),
    });
    if (clickedElement.walkable === true) {
      if (
        parseInt(startPoint.x) === parseInt(endPoint.x) &&
        parseInt(startPoint.y) === parseInt(endPoint.y)
      ) {
        inputEnd.value = "";
        removeEndPoint.classList.add("hidden");
        endPoint = "";
        endPoint = new Vec2(0, 0);
        myPath = new PathFindingAlg(grid, startPoint, endPoint);
        reset();
        return;
      }

      updatePoint("start", posx, posy);
    } else {
      var tenant = dataTenant.find(function (element) {
        return (
          y > (element.y + 320) * scale &&
          y < (element.y + element.height + 320) * scale &&
          x > element.x * scale &&
          x < (element.x + element.width) * scale
        );
      });

      if (tenant?.text.length > 0) {
        showModal(
          tenant.text,
          tenant.code,
          tenant.pointx,
          tenant.pointy,
          false,
          tenant.address,
          tenant.telp,
          tenant.email,
          tenant.product,
          tenant.link
        );
        changeColorOnClick(
          tenant.text,
          tenant.x,
          tenant.y + 320,
          tenant.width,
          tenant.height
        );
      }
    }
  }
}
