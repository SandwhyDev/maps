document.addEventListener("DOMContentLoaded", function () {
  // Mengambil semua elemen dengan kelas "tenant"
  var tenants = document.querySelectorAll("#tenant");

  // Menambahkan event listener untuk setiap elemen tenant
  tenants.forEach(function (tenant) {
    tenant.addEventListener("click", function () {
      // Memunculkan alert saat elemen tenant diklik
      console.log("Tenant clicked!");
    });
  });
});

var canvas = document.getElementById("gCanvas");
var ctx = canvas.getContext("2d");
var btnZoomIn = document.getElementById("btnZoomIn");
var btnZoomOut = document.getElementById("btnZoomOut");
scale = 1;
canvas.style.transform = "scale(" + scale + ")";

btnZoomIn.addEventListener("click", zoomIn);

function zoomIn() {
  if (scale > 0.5) {
    scale -= 0.1;
    console.log(scale);

    gCanvas.style.transform = "scale(" + scale + ")";
  }
}

function zoomOut() {
  if (scale > 0.5) {
    scale -= 0.1;
    console.log(scale);

    gCanvas.style.transform = "scale(" + scale + ")";
  }
}

// Set grid properties
var gridSize = 20; // Size of each grid cell
var canvasWidth = canvas.width;
var canvasHeight = canvas.height;

// Draw grid
for (var x = 0; x <= canvasWidth; x += gridSize) {
  ctx.moveTo(x, 0);
  ctx.lineTo(x, canvasHeight);
}

for (var y = 0; y <= canvasHeight; y += gridSize) {
  ctx.moveTo(0, y);
  ctx.lineTo(canvasWidth, y);
}

// Set grid color and width
ctx.strokeStyle = "#000"; // Black color
ctx.lineWidth = 1;

// Draw grid lines
ctx.stroke();

canvas.addEventListener("click", function (event) {
  // Get mouse position relative to canvas
  var rect = canvas.getBoundingClientRect();
  var mouseX = event.clientX - rect.left;
  var mouseY = event.clientY - rect.top;

  // Convert mouse position to grid coordinates
  var gridX = Math.floor(mouseX / gridSize);
  var gridY = Math.floor(mouseY / gridSize);

  // Log grid coordinates
  console.log("Grid X:", gridX, "Grid Y:", gridY);
});
