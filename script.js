var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

// Define triangle coordinates (x1, y1, x2, y2, x3, y3)
var x1 = 150;
var y1 = 150;
var x2 = 250;
var y2 = 300;
var x3 = 150;
var y3 = 300;

// Set stroke style (color)
ctx.strokeStyle = "blue";

// Start drawing path
ctx.beginPath();

// Move to the first point
ctx.moveTo(x1, y1);

// Draw lines to other points
ctx.lineTo(x2, y2);
ctx.lineTo(x3, y3);

// Close the path (connect last point to first)
ctx.closePath();

// Stroke the path (draw the triangle)
ctx.stroke();
