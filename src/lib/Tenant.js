var gCanvas = document.getElementById("gCanvas");
var btnClosed = document.getElementById("btn-closed");
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
      context.drawImage(img, x, y, 80, 80);
    };
    return;
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

const showModal = (text, codeTenant) => {
  var modal = document.getElementById("modal");
  var moreDetail = document.getElementById("modal-detail");
  var moreInfo = document.getElementById("more-info");
  let click = false;

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

  var modalName = document.getElementById("modal-name");
  var modalCode = document.getElementById("modal-code");

  // CONTENT TEXT
  modalName.innerText = text;
  // DESKRIPSI
  modalCode.innerText = codeTenant;

  btnClosed.addEventListener("click", function () {
    var modal = document.getElementById("modal");

    modal.className = "hidden";
    currentModal = null;
    click = false;
    moreInfo.classList.add("hidden");
  });
};
