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
  image = false
) => {
  context.beginPath();

  if (image) {
    var img = new Image();

    img.src = "../images/toilet.png";

    img.onload = function () {
      context.drawImage(img, x, y, width, height);
    };
  }

  context.lineWidth = 1;

  context.strokeStyle = !border ? "black" : color;
  context.fillStyle = color;
  context.fillRect(x, y, width, height);
  context.font = fontSize ? `bold ${fontSize}px Arial` : "bold 12px Arial"; // Font dan ukuran teks awal
  context.strokeRect(x, y, width, height);

  const maxWidth = width - 10; // Lebar maksimum teks
  const lineHeight = 18; // Tinggi baris teks

  let words = text.toUpperCase().split(" ");
  let line = "";
  let lines = [];

  // Membagi teks menjadi beberapa baris
  for (let i = 0; i < words.length; i++) {
    let testLine = line + words[i] + " ";
    let testWidth = context.measureText(testLine).width;
    if (testWidth > maxWidth) {
      lines.push(line);
      line = words[i] + " ";
    } else {
      line = testLine;
    }
  }
  lines.push(line);

  // Mengatur posisi teks
  const textX = x + width / 2; // Koordinat X untuk teks
  let textY = y + height / 2 - (lines.length / 2) * lineHeight;

  // Menambahkan teks ke canvas
  context.fillStyle = "black"; // Warna teks
  context.textAlign = "center"; // Posisi teks
  context.textBaseline = "middle"; // Posisi teks
  for (let i = 0; i < lines.length; i++) {
    context.fillText(lines[i], textX, textY);
    textY += lineHeight;
  }

  context.closePath();
  context.stroke();
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

  console.log(address, telp);
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

  // CONTENT TEXT
  modalName.innerText = text;
  // DESKRIPSI
  modalCode.innerText = codeTenant;
  modalImage.src = image ? image : "../images/logo2.jpeg";
  modalAddress.innerText = address ? address : "";
  modalTelp.innerText = telp ? telp : "";
  modalEmail.innerText = email ? email : "";
  modalLink.innerText = link ? "website" : "";
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
