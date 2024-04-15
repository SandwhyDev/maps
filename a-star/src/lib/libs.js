// const arrowUp = document.getElementById("arrow-up");
// const arrowDown = document.getElementById("arrow-down");
// const arrowRight = document.getElementById("arrow-right");
// const arrowLeft = document.getElementById("arrow-left");

// setInterval(getLocation, 1000);

// function getLocation() {
//   if (navigator.geolocation) {
//     navigator.geolocation.watchPosition(showPosition, function () {}, {
//       enableHighAccuracy: true,
//       timeout: 1000,
//     });
//   } else {
//     x.innerHTML = "Geolocation is not supported by this browser.";
//   }
// }

function showPosition(position) {
  let lat, lon;
  lat = position.coords.latitude;
  lon = position.coords.longitude;
  console.log({ lat: lat, lon: lon });
}

function cekPoint(startPoint, endPoint) {
  if (startPoint.x === 0 && startPoint.y === 0) {
    return alert("tentukan titik awal");
  } else if (endPoint.x === 0 && endPoint.y === 0) {
    return alert("tentukan titik akhir");
  }

  return true;
}

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
