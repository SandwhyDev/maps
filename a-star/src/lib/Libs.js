// const arrowUp = document.getElementById("arrow-up");
// const arrowDown = document.getElementById("arrow-down");
// const arrowRight = document.getElementById("arrow-right");
// const arrowLeft = document.getElementById("arrow-left");
var kotaJakarta = [
  { nama: "Jakarta Utara", kodePos: "1xxx1", populasi: 1234567 },
  { nama: "Jakarta Barat", kodePos: "1xxx2", populasi: 2345678 },
  { nama: "Jakarta Timur", kodePos: "1xxx3", populasi: 3456789 },
  { nama: "Jakarta Selatan", kodePos: "1xxx4", populasi: 4567890 },
  { nama: "Jakarta Pusat", kodePos: "1xxx5", populasi: 5678901 },
];

const HandleSearch = (title) => {
  const search = document.createElement("div");
  search.id = "dataSearch";

  const title = document.createElement("p");
  title.className = "px-7 pt-4 text-center";

  title.innerText = title;

  var dataSearch = document.getElementById("dataSearch");

  if (!dataSearch) {
    const ul = document.createElement("ul");

    search.className = "w-screen h-screen fixed top-0 left-0 bg-white  pt-16 ";

    ul.className = "px-5 py-2 space-y-2";

    kotaJakarta.forEach((kota) => {
      const li = document.createElement("li");

      li.className = "border-b-2 p-2 cursor-pointer";
      li.textContent = `${kota.nama} - ${kota.kodePos}`;
      ul.appendChild(li);

      li.addEventListener("click", () => {
        console.log(kota.nama);
        startPoint = "";

        start.value = kota.nama;
        startPoint = new Vec2(80, 460);

        reset();
        myPath = new PathFindingAlg(grid, startPoint, endPoint);

        if (startPoint.x === 0 && startPoint.y === 0) {
          return false;
        }

        myPath.findPath();

        btnPushToWalk.style.display = "block";

        search.remove();
        ul.remove();
      });
    });

    search.appendChild(title);
    search.appendChild(ul);

    document.body.appendChild(search);
  }
};

// // ARROW UP
// arrowUp.addEventListener("click", () => {
//   handleArrow("y", "kurang");
// });

// // ARROW DOWN
// arrowDown.addEventListener("click", () => {
//   handleArrow("y", "tambah");
// });

// // ARROW RIGHT
// arrowRight.addEventListener("click", () => {
//   handleArrow("x", "tambah");
// });

// // ARROW LEFT
// arrowLeft.addEventListener("click", () => {
//   handleArrow("x", "kurang");
// });
