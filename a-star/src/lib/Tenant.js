const dataTenant = [
  {
    color: "blue",
    x: 0,
    y: 0,
    width: 95,
    height: 150,
    text: "blue",
  },

  {
    color: "black",
    x: 10,
    y: 10,
    width: 30,
    height: 30,
    text: "C1",
  },

  {
    color: "black",
    x: 10,
    y: 100,
    width: 30,
    height: 30,
    text: "C2",
  },

  {
    color: "red",
    x: 0,
    y: 152,
    width: 95,
    height: 150,
    text: "Royalindo, Kupu dan UD TRUCK",
  },
  {
    color: "brown",
    x: 99,
    y: 0,
    width: 150,
    height: 79,
    text: "brown",
  },
  {
    color: "green",
    x: 254,
    y: 0,
    width: 165,
    height: 79,
    text: "Royalindo, Kupu dan UD TRUCK",
  },
];

var currentModal;

const HandleTenant = (context, color, x, y, width, height, text) => {
  context.beginPath();
  context.lineWidth = 2;
  context.strokeStyle = color;
  context.fillStyle = color;
  context.fillRect(x, y, width, height);
  context.font = "14px Arial"; // Font dan ukuran teks awal

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
  context.fillStyle = "white"; // Warna teks
  context.textAlign = "center"; // Posisi teks
  context.textBaseline = "middle"; // Posisi teks
  for (let i = 0; i < lines.length; i++) {
    context.fillText(lines[i], textX, textY);
    textY += lineHeight;
  }

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
  modal.className = "w-full h-[200px] fixed bottom-0 left-0 p-10 ";

  // CONTENT
  const modalContent = document.createElement("div");
  modalContent.className =
    "bg-white w-full h-full  flex items-center p-5 shadow-xl border uppercase font-extrabold text-xl relative";

  // CONTENT TEXT
  const modalText = document.createElement("p");
  modalText.classList.add("modal-content");
  modalText.innerText = text;

  // BTN CLOSED
  const btnClosed = document.createElement("span");
  btnClosed.id = "btn-closed";
  btnClosed.className = "text-red-500 absolute top-3 right-5 text-3xl";
  btnClosed.innerHTML = "&times;";

  modalContent.appendChild(modalText);
  modalContent.appendChild(btnClosed);

  modal.appendChild(modalContent);
  document.body.appendChild(modal);

  currentModal = document.getElementById("modal");

  btnClosed.addEventListener("click", function () {
    modal.remove();
    currentModal = null; // Set currentModal menjadi null setelah modal ditutup
  });
};
