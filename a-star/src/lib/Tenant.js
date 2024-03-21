const dataTenant = [
  {
    color: "blue",
    x: 0,
    y: 0,
    width: 100,
    height: 150,
    text: "blue",
  },
  {
    color: "red",
    x: 0,
    y: 152,
    width: 100,
    height: 150,
    text: "Royalindo & \nKupu",
  },
  {
    color: "brown",
    x: 102,
    y: 0,
    width: 150,
    height: 80,
    text: "brown",
  },
  {
    color: "green",
    x: 254,
    y: 0,
    width: 150,
    height: 80,
    text: "green",
  },
];

var currentModal;

const HandleTenant = (context, color, x, y, width, height, text) => {
  context.beginPath();
  context.lineWidth = 2;
  context.strokeStyle = color;
  context.fillStyle = color;
  context.fillRect(x, y, width, height);
  context.font = "14px Arial"; // Font dan ukuran teks
  context.fillStyle = "white"; // Warna teks
  context.textAlign = "center"; // Posisi teks
  context.textBaseline = "middle"; // Posisi teks
  const textX = x + width / 2; // Koordinat X untuk teks
  const textY = y + height / 2; // Koordinat Y untuk teks
  context.fillText(text, textX, textY); // Menambahkan teks ke canvas
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
