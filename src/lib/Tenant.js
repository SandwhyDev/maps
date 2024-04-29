var gCanvas = document.getElementById("gCanvas");
var btnClosed = document.getElementById("btn-closed");
var ruteStart = document.getElementById("ruteStart");
var startX = document.getElementById("startX");
var startY = document.getElementById("startY");
var modalName = document.getElementById("modal-name");
var modalImage = document.getElementById("modal-image");
var modalCode = document.getElementById("modal-code");
var modalAddress = document.getElementById("modal-address");
var modalTelp = document.getElementById("modal-telp");
var modalEmail = document.getElementById("modal-email");
var modalLink = document.getElementById("modal-link");
var modalProduct = document.getElementById("modal-product");

let handleX, handleY;

var currentModal;

const HandleTenant = (
  context,
  color,
  x,
  y,
  width,
  height,
  text,
  border,
  fontSize,
  image,
  code,
  scale
) => {
  context.beginPath();

  // if (image) {
  //   var img = new Image();

  //   img.src = "../images/toilet.png";

  //   img.onload = function () {
  //     context.drawImage(img, x, y, width, height);
  //   };
  // }

  gctx.fillStyle = color;
  context.strokeStyle = !border ? "black" : color;
  context.font = fontSize ? `bold 22px Arial` : "bold 12px Arial"; // Font dan ukuran teks awal
  gctx.fillRect(x, y, width, height);
  gctx.strokeRect(x, y, width, height);
  gctx.lineWidth = 1;

  const maxWidth = width - 10; // Lebar maksimum teks
  const lineHeight = 12; // Tinggi baris teks

  let words = code.replace(/\s+/g, " ").toUpperCase().split(" ");
  if (scale > 0.6) {
    words = text.replace(/\s+/g, " ").toUpperCase().split(" ");
    context.font = fontSize ? `bold 22px Arial` : "bold 10px Arial"; // Font dan ukuran teks awal
  }
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

  // context.closePath();
  // context.stroke();
};

const showModal = (
  text,
  codeTenant,
  x,
  y,
  image,
  address,
  telp,
  email,
  product,
  link
) => {
  if (text.split(" ")[0] == "hall") {
    return false;
  }
  var modal = document.getElementById("modal");
  var moreDetail = document.getElementById("modal-detail");
  var moreInfo = document.getElementById("more-info");
  let click = false;

  if (
    text.split(" ")[0] == "toilet" ||
    text.split(" ")[0] == "HALL" ||
    text.split(" ")[0] == "VISITOR" ||
    (!address && !telp && !email && !product && !link)
  ) {
    moreDetail.classList.add("hidden");
    moreInfo.classList.add("hidden");
  } else {
    moreDetail.classList.remove("hidden");
  }

  moreDetail.innerHTML = "more detail";

  moreDetail.addEventListener("click", () => {
    moreInfo.classList.remove("hidden");

    if (click) {
      moreInfo.classList.add("hidden");
      click = false;
      moreDetail.innerHTML = "more detail";
    } else {
      click = true;
      moreDetail.innerHTML = "close detail";
    }
  });

  modal.classList.remove("hidden");

  console.log(codeTenant === text);
  // CONTENT TEXT
  modalName.innerText = text.replace(/\s+/g, " ").toUpperCase();
  // DESKRIPSI
  modalCode.innerText = codeTenant !== text ? codeTenant : "";
  modalImage.src = image ? `../images/${image}` : "../images/logo2.jpeg";
  modalAddress.innerText = address ? address : "";
  modalTelp.innerText = telp ? telp : "";
  modalEmail.innerText = email ? email : "";
  modalLink.innerText = link ? link : "";
  modalLink.href = link ? link : "";
  modalProduct.innerText = product ? product : "";

  startX.innerText = x;
  startY.innerText = y;

  btnClosed.addEventListener("click", function () {
    var modal = document.getElementById("modal");

    modal.className = "hidden";
    currentModal = null;
    click = false;
    moreInfo.classList.add("hidden");
  });
};
