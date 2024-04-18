var gCanvas = document.getElementById("gCanvas");
let handleX, handleY;

const dataTenant = [
  ...Medical_TO_Agent,
  ...JABABEKA_SINGSPA,

  // A2 -
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
  fontSize
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

  context.closePath();
  context.stroke();
};

const showModal = (text) => {
  if (currentModal) {
    currentModal.remove();
  }

  // Buat elemen-elemen modal secara dinamis
  const modal = document.createElement("div");
  modal.id = "modal";
  // modal.className = "w-full h-[200px] fixed bottom-0 left-0 p-10 ";

  // CONTENT
  const modalContent = document.createElement("div");
  modalContent.className = "modal-content";

  // CONTENT TEXT
  const modalText = document.createElement("p");
  modalText.innerText = text;
  modalText.className = "text-sm font-normal";

  // DESKRIPSI
  const modalDeskripsi = document.createElement("p");
  modalDeskripsi.innerText = `Trumecs`;

  // GAMBAR
  const modalImage = document.createElement("img");
  modalImage.src = "./images/tenant.webp"; // Ganti dengan URL atau path ke gambar Anda
  modalImage.alt = "Deskripsi gambar"; // Ganti dengan deskripsi gambar yang sesuai
  modalImage.className = "modal-image";

  // BTN CLOSED
  const btnClosed = document.createElement("span");
  btnClosed.id = "btn-closed";
  // btnClosed.className = "text-red-500 absolute top-3 right-5 text-3xl";
  btnClosed.innerHTML = "&times;";

  modalContent.appendChild(modalDeskripsi);
  modalContent.appendChild(modalText);
  modalContent.appendChild(modalImage);
  modalContent.appendChild(btnClosed);

  modal.appendChild(modalContent);
  document.body.appendChild(modal);

  currentModal = document.getElementById("modal");

  btnClosed.addEventListener("click", function () {
    modal.remove();
    currentModal = null; // Set currentModal menjadi null setelah modal ditutup
  });
};
