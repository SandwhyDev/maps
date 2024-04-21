var gCanvas = document.getElementById("gCanvas");
var btnClosed = document.getElementById("btn-closed");
let handleX, handleY;

const dataTenant = [
  ...Medical_TO_Agent,
  ...JABABEKA_SINGSPA,
  // A1A2 -A3P2
  ...A1A2,
  ...A1B2,
  ...A1C2,
  ...A1D2,
  ...A1E2,
  ...A1F2,
  ...A1G2,
  ...A1H2,
  ...A2I2,
  ...A2J2,
  ...A2K2,
  ...A3L2,
  ...A3M2,
  ...A3N2,
  ...A3O2,
  ...A3P2,
  // A2 - END
  // B3 - P3
  ...A1B3,
  ...A1C3,
  ...A1D3,
  ...A1E3,
  ...A1F3,
  ...A2G3,
  ...A2H3,
  ...A2I3,
  ...A2J3,
  ...A2K3,
  ...A3L3,
  ...A3M3,
  ...A3N3,
  ...A3O3,
  ...A3P3,
  // B3 - P3 END
  ...Shuangfei_Tube,
  ...TEC_ALIIANCE_TO_PPS_POLICE,
  ...blackSpot,
  ...D1A2_TO_D1A3,
];

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
  codeTenant
) => {
  context.beginPath();
  context.lineWidth = 1;

  let currentColor = color; // Simpan warna asli
  let clicked = false; // Menyimpan status elemen apakah sudah diklik atau belum

  context.strokeStyle = !border ? "black" : color;
  context.fillStyle = color;
  context.fillRect(x, y, width, height);
  context.font = fontSize ? "20px Arial" : "14px Arial"; // Font dan ukuran teks awal
  context.strokeRect(x, y, width, height);

  const maxWidth = width - 10; // Lebar maksimum teks
  const lineHeight = 18; // Tinggi baris teks
  let words = text.split(" ");
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

  // Menambahkan event listener untuk meng-handle klik
  // gCanvas.addEventListener("click", function (event) {
  // const rect = gCanvas.getBoundingClientRect();
  //   const clickX = event.clientX - rect.left;
  //   const clickY = event.clientY - rect.top;

  //   // Cek apakah klik terjadi di dalam kotak yang di-handle
  //   if (
  //     clickX >= x &&
  //     clickX <= x + width &&
  //     clickY >= y &&
  //     clickY <= y + height
  //   ) {
  //
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

    console.log(click);
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

let clickedOutsideTenant = false; // Flag to track outside clicks
