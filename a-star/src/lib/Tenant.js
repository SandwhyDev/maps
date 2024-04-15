const dataTenant = [
  {
    color: "#ff9",
    x: 0,
    y: 60,
    width: 60,
    height: 240,
    text: "A1A2-01",
  },

  {
    color: "#ff9",
    x: 0,
    y: 300,
    width: 60,
    height: 120,
    text: "A1A2-05",
  },
  {
    color: "#ff9",
    x: 0,
    y: 420,
    width: 60,
    height: 120,
    text: "A1A2-07",
  },

  {
    color: "#ff9",
    x: 0,
    y: 540,
    width: 60,
    height: 120,
    text: "A1A3-01",
  },

  {
    color: "#ff9",
    x: 0,
    y: 660,
    width: 60,
    height: 120,
    text: "A1A3-03",
  },

  {
    color: "#9bbb59",
    x: 0,
    y: 900,
    width: 60,
    height: 120,
    text: "",
    border: true,
  },
  {
    color: "#ff9",
    x: 0,
    y: 780,
    width: 60,
    height: 120,
    text: "A1A3-05",
  },
  {
    color: "#9bbb59",
    x: 0,
    y: 1020,
    width: 140,
    height: 60,
    border: true,
    text: "VIP LONGUE",
  },
  {
    color: "#9bbb59",
    x: 140,
    y: 1020,
    width: 180,
    height: 120,
    text: "Seminar Area",
  },

  // x
  {
    color: "#ff9",
    x: 60,
    y: 0,
    width: 120,
    height: 60,
    text: "JABABEKA",
  },
  {
    color: "#ff9",
    x: 180,
    y: 0,
    width: 240,
    height: 60,
    text: "ITA AUTOPARTS",
  },
  {
    color: "#ff9",
    x: 540,
    y: 0,
    width: 160,
    height: 60,
    text: "PT. ANEKA",
  },
  {
    color: "#ff9",
    x: 700,
    y: 0,
    width: 140,
    height: 60,
    text: "PANAMA",
  },
  {
    color: "#ff9",
    x: 840,
    y: 0,
    width: 140,
    height: 60,
    text: "Evosend",
  },

  {
    color: "#ff9",
    x: 980,
    y: 0,
    width: 160,
    height: 60,
    text: "Happy Steel",
  },

  {
    color: "#ff9",
    x: 1140,
    y: 0,
    width: 240,
    height: 60,
    text: "Weichai Torch Technology Co.,Ltd.",
  },
  {
    color: "#ff9",
    x: 1520,
    y: 0,
    width: 160,
    height: 60,
    text: "Arthaplast",
  },
  {
    color: "#ff9",
    x: 1680,
    y: 0,
    width: 240,
    height: 60,
    text: "A2K1-01",
  },
  {
    color: "#ff9",
    x: 1920,
    y: 0,
    width: 240,
    height: 60,
    text: "Guangzhou Toby's Optronics Technology",
  },
  {
    color: "#ff9",
    x: 2160,
    y: 0,
    width: 160,
    height: 60,
    text: "ACIPI",
  },

  {
    color: "#ff9",
    x: 2500,
    y: 0,
    width: 200,
    height: 60,
    text: "Aokly Group",
  },
  {
    color: "#ff9",
    x: 2700,
    y: 0,
    width: 120,
    height: 60,
    text: "Sing Spare Part",
  },

  // wes sz

  {
    color: "#ff9",
    x: 200 - 40,
    y: 180 - 40,
    width: 100,
    height: 160,
    text: "wes sz",
  },
  {
    color: "#ff9",
    x: 300 - 40,
    y: 180 - 40,
    width: 100,
    height: 160,
    text: "wes sz",
  },
  {
    color: "#ff9",
    x: 200 - 40,
    y: 340 - 40,
    width: 100,
    height: 100,
    text: "wes sz",
  },
  {
    color: "#ff9",
    x: 300 - 40,
    y: 340 - 40,
    width: 100,
    height: 100,
    text: "wes sz",
  },

  {
    color: "#ff9",
    x: 200 - 40,
    y: 440 - 40,
    width: 100,
    height: 100,
    text: "wes sz",
  },
  {
    color: "#ff9",
    x: 300 - 40,
    y: 440 - 40,
    width: 100,
    height: 100,
    text: "wes sz",
  },

  {
    color: "#ff9",
    x: 200 - 40,
    y: 540 - 40,
    width: 100,
    height: 100,
    text: "wes sz",
  },
  {
    color: "#ff9",
    x: 300 - 40,
    y: 540 - 40,
    width: 100,
    height: 100,
    text: "wes sz",
  },

  {
    color: "#ff9",
    x: 200 - 40,
    y: 640 - 40,
    width: 100,
    height: 100,
    text: "wes sz",
  },
  {
    color: "#ff9",
    x: 300 - 40,
    y: 640 - 40,
    width: 100,
    height: 100,
    text: "wes sz",
  },

  {
    color: "#ff9",
    x: 200 - 40,
    y: 740 - 40,
    width: 100,
    height: 100,
    text: "wes sz",
  },
  {
    color: "#ff9",
    x: 300 - 40,
    y: 740 - 40,
    width: 100,
    height: 100,
    text: "wes sz",
  },
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
  context.lineWidth = 0.5;

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

  // // Membagi teks menjadi beberapa baris
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
  // modalContent.className =
  //   "bg-white w-full h-full  flex items-center p-5 shadow-xl border uppercase font-extrabold text-xl relative";

  // CONTENT TEXT
  const modalText = document.createElement("p");
  modalText.classList.add("modal-content");
  modalText.innerText = text;

  // BTN CLOSED
  const btnClosed = document.createElement("span");
  btnClosed.id = "btn-closed";
  // btnClosed.className = "text-red-500 absolute top-3 right-5 text-3xl";
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
