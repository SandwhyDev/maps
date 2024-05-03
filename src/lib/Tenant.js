var gCanvas = document.getElementById("gCanvas");
var btnClosed = document.getElementById("btn-closed");
var ruteStart = document.getElementById("ruteStart");
var startX = document.getElementById("startX");
var startY = document.getElementById("startY");
var tenantWidth = document.getElementById("tenantWidth");
var tenantHeight = document.getElementById("tenantHeight");
var modalName = document.getElementById("modal-name");
var modalImage = document.getElementById("modal-image");
var modalCode = document.getElementById("modal-code");
var modalAddress = document.getElementById("modal-address");
var modalTelp = document.getElementById("modal-telp");
var modalEmail = document.getElementById("modal-email");
var modalLink = document.getElementById("modal-link");
var modalProduct = document.getElementById("modal-product");
var modal = document.getElementById("modal");
var moreDetail = document.getElementById("modal-detail");
var moreInfo = document.getElementById("more-info");

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

  var tenantName = text.replace(/\s+/g, " ").toUpperCase().split(" ");
  var codeTenant = code.replace(/\s+/g, " ").toUpperCase().split(" ");

  gctx.fillStyle = color;

  context.strokeStyle = !border ? "black" : color;
  context.font = fontSize ? `bold 22px Arial` : "bold 12px Arial"; // Font dan ukuran teks awal
  gctx.fillRect(x, y, width, height);
  gctx.strokeRect(x, y, width, height);
  gctx.lineWidth = 1;

  const maxWidth = width - 10; // Lebar maksimum teks
  const lineHeight = 12; // Tinggi baris teks

  let words = codeTenant;
  if (scale > 0.6) {
    words = tenantName;
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

function closeModal() {
  modal.className = "hidden";
  currentModal = null;
  click = false;
  clickTenant = false;
  moreInfo.classList.add("hidden");
}

const showModal = (tenant) => {
  if (tenant.text.split(" ")[0] == "hall") {
    return false;
  }

  let click = false;

  if (
    tenant.text.split(" ")[0] == "toilet" ||
    tenant.text.split(" ")[0] == "HALL" ||
    tenant.text.split(" ")[0] == "VISITOR" ||
    (!tenant.address &&
      !tenant.telp &&
      !tenant.email &&
      !tenant.product &&
      !tenant.link)
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

  // CONTENT TEXT
  modalName.innerText = tenant.text.replace(/\s+/g, " ").toUpperCase();
  // DESKRIPSI
  modalCode.innerText = tenant.code !== tenant.text ? tenant.code : "";
  modalImage.src = tenant.image
    ? `../images/${tenant.image}`
    : "../images/logo2.jpeg";
  modalAddress.innerText = tenant.address ? tenant.address : "";
  modalTelp.innerText = tenant.telp ? tenant.telp : "";
  modalEmail.innerText = tenant.email ? tenant.email : "";
  modalLink.innerText = tenant.link ? tenant.link : "";
  modalLink.href = tenant.link ? tenant.link : "";
  modalProduct.innerText = tenant.product ? tenant.product : "";

  startX.innerText = tenant.pointx;
  startY.innerText = tenant.pointy;

  btnClosed.addEventListener("click", function () {
    closeModal();
  });
};
