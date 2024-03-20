/* $(document).ready(function(){
    var outdoor = [
        1,2
    ];

    $(outdoor).each(function(index, item){
        alert(index);
        $("#map").append('<rect class="stand big" rx="5" x="'+(index*50)+'" y="0"></rect>');
    });
}); */

var outdoor = [
  ["A 12", 545, 220, "umkm", "HUNI"],
  ["A 14", 555, 220, "umkm", "Trumecs.com & Umahku.com"],
  ["P 01", 565, 220, "umkm", "Citra Warna Abadi"],
  ["A 16", 597.5, 220, "umkm", "Widya Robotics"],
  ["A 17", 607.5, 220, "umkm", "Camada Jaya Teknindo"],
  ["A 19", 617.5, 220, "umkm", "Jendela Kami Solusi"],
  ["A 27", 650, 220, "umkm", "Archilantis"],
  ["A 28", 660, 220, "umkm", "Pandi (S.id)"],
  ["A 29", 670, 220, "umkm", "Pameran Buku"],
  ["P 17", 585, 430, "small-rect", "PT Behrindotama Buana"],
  ["P 18", 555, 430, "small-rect", "World Water Forum"],
  ["P 19", 525, 430, "small-rect", "PT Mitra Atlas Nusantara"],
  ["P 20", 495, 430, "small-rect", "PT Bank Tabungan Negara, Tbk"],
  ["P 21", 465, 430, "small-rect", "PT Dahana"],
  ["P 22", 435, 430, "small-rect", "Panairsan Pratama"],
  ["P 23", 360, 430, "small-rect", "PT Andalan Dinamika Konstruksindo"],
  ["P 24", 330, 430, "small-rect", "Indocement"],
  [
    "P 25",
    300,
    430,
    "small-rect",
    "Pusat Pembinaan Pelatihan & Sertifikasi Mandiri ",
  ],
  ["P 26", 270, 430, "small-rect", "Brinno Indonesia"],
  ["P 27", 240, 430, "small-rect", "SKA"],
  ["P 28", 225, 430, "small", "Barchip Indonesia"],
  ["P 29", 195, 430, "small-rect", "PT Adhi Karya"],
  [
    "D 11",
    545,
    370,
    "medium-rect",
    "PEMBANGUNAN RUMAH SUSUN ASN-HANKAM KIPP-IKN",
  ],
  ["E 11", 487.5, 370, "medium-rect", "Brantas Abipraya"],
  ["F 11", 442.5, 370, "medium-rect", "Direktorat Jenderal Cipta Karya"],
  ["G 11", 397.5, 370, "medium-rect", "PUPR"],
  ["H 11", 352.5, 370, "medium-rect", "PT Nindya Karya"],
  ["I 11", 307.5, 370, "medium-rect", "Samsung Electronic Indonesia"],
  ["B 11", 665, 400, "small", "PT Cahaya Mas Cemerlang"],
  ["B 12", 650, 400, "small", "PT Universal Eco Pasific (URBANA)"],
  ["B 13", 665, 385, "small", "PT Niaga Pura Indonesia"],
  ["B 14", 650, 385, "small", "PT. TRIAS INDRA SAPUTRA(LEGRAND INDONESIA)"],
  ["B 15", 665, 370, "small", "SEALENT VITECH - NIPPON"],
  ["B 16", 650, 370, "small", "PT. FUJITEC INDONESIA"],
  ["B 21", 665, 340, "small", "PERKINDO"],
  ["B 22", 650, 340, "small", "PT Hutama Karya Infrastruktur"],
  ["B 23", 665, 325, "small", "Institut Pertanian Bogor"],
  ["B 24", 650, 325, "small", "Isntitut Teknologi Bandung"],
  ["B 25", 665, 310, "small", "SQS Indonesia"],
  ["B 26", 650, 310, "small", "Green Building Council Indonesia"],
  ["B 27", 665, 295, "small", "PT Bank Rakyat Indonesia"],
  ["B 28", 650, 295, "small", "Ansarada"],
  ["B 31", 650, 250, "medium-square", "GALERI FOTO"],
  ["C 11", 620, 400, "small", "AE Lift"],
  ["C 13", 620, 385, "small", "PT. BIGI MULTI INTERNATIONAL (HIKVISION)"],
  ["C 15", 620, 370, "small", "Jagad Sanitasi Indonesia"],
  ["C 12", 590, 400, "small-rect", "LG Indonesia"],
  ["C 14", 590, 385, "small-rect", "Simed Prakarsa Idnonesia"],
  [
    "C 16",
    590,
    370,
    "small-rect",
    "PT. LELCO TRINDO GRAHA NUSANTARA & PT AUSTRALINDO GRAHA NUSA",
  ],
  ["C 21", 612.5, 340, "small", "FSII"],
  ["C 22", 597.5, 340, "small", "PT Asia Mega Pasifik"],
  ["C 24", 597.5, 325, "small", "Konstruksi Media"],
  ["C 23 & 25", 612.5, 310, "small-rect-portrait", "GAPENSI & GATENSI"],
  ["C 26", 597.5, 310, "small", "Asosiasi Kontraktor Indonesia (AKI)"],
  ["C 27-28", 597.5, 295, "small-rect", "GAPENRI"],
  ["C 31", 597.5, 250, "medium-square", "MEDIA CORNER"],
  ["D 21", 545, 325, "medium-square", "Prestige Aviation"],
  ["D 25", 545, 295, "medium-square", "Caiyida Technology Indonesia"],
  ["A 18 & 20", 555, 270, "umkm-landscape", "PT Ultratrex Indonesia"],
  ["A 22", 545, 270, "umkm", "Surya Marga Pratama"],
  ["A 24", 545, 260, "umkm", "PT Multi Sarana Maritim"],
  ["A 21 & 23", 565, 250, "umkm-portrait", "Anta Graha Makmur"],
  ["A 25-26", 545, 250, "umkm-landscape", "Batik Vanya Collection"],
  ["E 21", 487.5, 325, "medium-square", "Tirtakencana Tatawarna"],
  [
    "E 25",
    487.5,
    295,
    "medium-square",
    "PT. WASKITA KARYA PT.WIJAYAKARYA PT. HUTAMA KARYA PT. PEMBANGUNAN PERUMAHAN",
  ],
  ["E 31A", 502.5, 265, "small", "PT Panasonic Gobel"],
  ["E 31B", 487.5, 265, "small", "Media Partner Singapore"],
  ["E 33", 487.5, 250, "small-rect", "Tranjakarta"],
  ["F 21", 442.5, 295, "big-rect", "Yodya Karya"],
  ["F 31", 442.5, 250, "medium-square", "Semen Indonesia"],
  ["G 21", 397.5, 295, "big-rect", "PUPR"],
  ["G 31", 397.5, 250, "medium-square", "PUPR CLINIC"],
  ["H 21", 352.5, 295, "big-rect", "Tata Logam Lestari"],
  ["H 31", 352.5, 250, "medium-square", "Bojong Westplas"],
  ["I 21", 307.5, 295, "big-rect", "Krakatau Baja Konstruksi"],
  ["I 31", 307.5, 250, "medium-square", "ATOORIN"],
  [
    "J 11",
    190,
    370,
    "big-rect-landscape",
    "Rumah Contoh Direktorat Jendral Perumahan Rakyat",
  ],
  [
    "J 21",
    250,
    325,
    "medium-square",
    "PT Karya Kreasi Dharma (TAM/Rangga Concept)",
  ],
  [
    "J 25",
    250,
    295,
    "medium-square",
    "PT Karya Kreasi Dharma (TAM/Rangga Concept)",
  ],
  ["J 31-32", 250, 250, "small-rect", "Bevananda Mustika"],
  ["J 33", 265, 265, "small", "AP3I"],
  ["J 34", 250, 265, "small", "Vokasi Yogya"],
  ["K 21", 212.5, 340, "small", "Waskita Beton Precast"],
  ["K 22", 197.5, 340, "small", "Altrad RMD Kwikform Ltd"],
  ["K 23", 212.5, 325, "small", "GABPEKNAS"],
  ["K 24", 197.5, 325, "small", "Joglo Matos Nusantara"],
  ["K 25", 212.5, 310, "small", "PT Indotruck Utama"],
  ["K 26", 197.5, 310, "small", "PT Jatim Logam"],
  ["K 27", 212.5, 295, "small", "Indo Trans Konstruksi"],
  ["K 28", 197.5, 295, "small", "IATPI"],
  ["K 31", 212.5, 265, "small", "GAPEKNAS"],
  ["K 32", 197.5, 265, "small", "ATAKI"],
  ["K 33-34", 197.5, 250, "small-rect", "DPP GAPEKSINDO"],
  ["L 11", 145, 370, "medium-rect", "DISPLAY PRODUK ARSITEKTURAL & INTERIOR"],
  ["L 21", 160, 340, "small", "PT Meta Engineering Indonesia"],
  ["L 23", 160, 325, "small", "APPAKSI"],
  ["L 25", 160, 310, "small", "ASPEKINDO"],
  ["L 27", 160, 295, "small", "ASPABI"],
  ["L 22", 145, 295, "small-rect-portrait-long", "IBIMI"],
  ["L 31-32", 145, 265, "small-rect", "INKINDO"],
  ["L 33", 160, 250, "small", "PERTAABI"],
  ["L 34", 145, 250, "small", "IAMPI"],
  ["Workshop A1", 60, 335, "workshop-portrait", ""],
  ["Luncheon", 60, 170, "luncheon", ""],
  ["Workshop A2", 120, 170, "workshop-landscape", ""],
  ["Foyer A1", 60, 295, "foyer-big-landscape", ""],
  ["Foyer A2", 230, 170, "foyer-big-portrait", ""],
  ["Foyer A3", 695, 255, "foyer-small-landscape", ""],
  ["Foyer A4", 695, 290, "foyer-small-landscape-bottom", ""],
  ["Busines Lounge", 270, 170, "matching-lounge", ""],
  ["ACPE", 300, 170, "acpe", ""],
  ["JIEpo Cafe", 545, 170, "jiexpo-cafe", ""],
  ["Workshop A3", 695, 170, "workshop-portrait-small", ""],
  ["Sponsor Business Lounge", 508, 170, "sponsor-lounge", ""],
  ["Workshop A4", 695, 327.5, "workshop-portrait-right", ""],
  ["Lomba TKK", 200, 535, "tkk", ""],
  ["Technical Stage", 80, 610, "technical-stage", ""],
  ["O 104", 155, 535, "tkk-booth", "Coaching Clinic PERTAABI"],
  [
    "O 94",
    110,
    535,
    "medium-rect",
    "PT. WIDYA INOVASI INDONESIA (WIDYA ROBOTICS)",
  ],
  ["Food Truck", 10, 535, "food-truck", ""],
  ["Area Pengawas", 200, 600, "tkk-booth", ""],
  ["Area Juri", 200, 625, "tkk-booth", ""],
  ["Lomba Rumah", 705, 640, "lomba-rumah", ""],
  ["Lomba Rumah", 645, 640, "lomba-rumah", ""],
  ["Lomba Rumah", 585, 640, "lomba-rumah", ""],
  ["Lomba Rumah", 525, 640, "lomba-rumah", ""],
  ["Lomba Rumah", 465, 640, "lomba-rumah", ""],
  ["Lomba Rumah", 405, 640, "lomba-rumah", ""],
  ["Lomba Rumah", 345, 640, "lomba-rumah", ""],
  ["Lomba Rumah", 705, 580, "lomba-rumah", ""],
  ["Lomba Rumah", 585, 580, "lomba-rumah", ""],
  ["Lomba Rumah", 465, 580, "lomba-rumah", ""],
  ["Lomba Rumah", 345, 580, "lomba-rumah", ""],
  ["O 01", 345, 535, "small", "PT Tata Logam Lestari"],
  ["O 02", 390, 535, "small", "PT Bojong Westplas"],
  ["O 03", 435, 535, "small", "Semen Tiga Roda"],
  ["O 04", 480, 535, "small", "PT Propan Raya"],
  ["O 05", 525, 535, "small", "Tukang.com"],
  ["O 06", 570, 535, "small", "MPOIN"],
  ["O 07", 615, 535, "small", "PT Rusli Vinilon Sakti"],
  ["O 08", 660, 535, "small", "PT Lixil Trading Indonesia"],
  ["O 09", 705, 535, "small", "SIAM-Indo Gypsum Industry (Elephant Gypsum)"],
  ["O 10", 750, 535, "small", "PT Incomindo Murni Jaya (Ikad Ceramic)"],
  ["Toilet A3", 75, 450, "toilet", "Toilet arah Hall D"],
  ["OIC", 105, 450, "eo", "OIC"],
  ["Royalindo & Kupu", 195, 450, "royalindo", "Royalindo & Kupu"],
  ["Toilet A2", 315, 450, "toilet", "Toilet dekat pintu masuk"],
  ["Media Center", 345, 450, "eo", "Media Center"],
  ["", 435, 450, "empty", ""],
  ["PUPR", 465, 450, "eo", "PUPR"],
  ["Toilet A1", 555, 450, "toilet", "Toilet dekat registrasi"],
  ["Kosong", 585, 450, "eo", ""],
  ["", 675, 450, "empty", ""],
  ["MEDICAL ROOM", 705, 450, "eo", "MEDICAL ROOM"],
];

var path = [
  [[10, 520], [790, 520], "Jalur Utama"],
  [[130, 423], [690, 423], "Depan PUPR"],
  [[412, 420], [412, 525], "Pintu Masuk"],
  [[653, 420], [653, 525], "Pintu Keluar 2"],
  [[170, 420], [170, 525], "Pintu Keluar 1"],
  [[435, 235], [435, 423], "F 11 - E 11"],
  [[390, 235], [390, 423], "I 11 - H 11"],
  [[293, 235], [293, 423], "J 11 - I 11"],
  [[345, 235], [345, 423], "H 11 - G 11"],
  [[531, 235], [531, 423], "E 11 - D 11"],
  [[480, 235], [480, 423], "F 11 - E 11"],
  [[133, 235], [133, 423], "Workshop A1"],
  [[183, 235], [183, 423], "Rumah Contoh DJ Perumahan"],
  [[238, 235], [238, 363], "Workshop A2"],
  [[583, 235], [583, 423], "Media Corner"],
  [[643, 235], [643, 423], "Galeri Foto"],
  [[688, 235], [688, 423], "Workshop A4"],
  [[133, 238], [688, 238], "Luncheon - Workshop A3"],
  [[133, 363], [688, 363], "Baris ke 2"],
  [[133, 287], [688, 287], "Baris ke 3"],
];

const svg = d3.select("#map");

var booth = svg
  .selectAll("rect2")
  .data(outdoor)
  .enter()
  .append("a")
  .attr("onclick", function (d, i) {
    return "return showDetail( " + i + ")";
  })
  .attr("class", "link")
  .attr("id", function (d, i) {
    return "tenant-" + i;
  })
  .append("g")
  .attr("class", "object");

booth
  .append("rect")
  .attr("class", function (d, i) {
    return "stand " + d[3];
  })
  .attr("x", function (d, i) {
    return d[1];
  })
  .attr("y", function (d, i) {
    return d[2];
  });
booth
  .insert("text")
  .attr("fill", "#fff")
  .attr("x", function (d, i) {
    return d[1] + 1;
  })
  .attr("y", function (d, i) {
    return d[2] + 5;
  })
  .attr("class", "booth-name")
  .text(function (d, i) {
    return d[0];
  });

var pathdraw = svg
  .selectAll("path")
  .data(path)
  .enter()
  .append("path")
  .attr("stroke", "#fff")
  .attr("stroke-width", function (d, i) {
    return d[2] == "Jalur Utama" ? "20" : "6";
  })
  .attr("fill", "#fff")
  .attr("class", "path")
  .attr("d", function (d, i) {
    return "m " + d[0][0] + " " + d[0][1] + " L " + d[1][0] + " " + d[1][1];
  });

var start = [995, 520];
var end = [590, 390];
var direction = [];

function closest(x, y, x2, y2) {
  maxX = 0;
  minX = 1800;
  maxY = 0;
  minY = 800;

  path.forEach(function (d, i) {
    flag = false;

    if (d[0][1] >= y2 && d[0][1] <= y && d[0][1] == d[1][1]) {
      flag = true;
      direction.push(d);
      maxY = d[1][1] > maxY ? d[1][1] : maxY;
      minY = d[0][1] < minY ? d[0][1] : minY;
    } else if (x <= d[0][0] && d[0][0] <= x2 && d[0][0] == d[1][0]) {
      flag = true;
      direction.push(d);
      maxX = d[1][0] > maxX ? d[1][0] : maxX;
      minX = d[0][0] < minX ? d[0][0] : minX;
    }

    xDist = x - d[0][0];
    yDist = y - d[0][1];
  });
}

function limit(direction) {
  direction.forEach(function (d, i) {
    flag = false;

    if (d[0][0] <= minX) {
      direction[i][0] = [minX, d[0][1]];
    }
    if (d[1][0] >= maxX) {
      direction[i][1] = [maxX, d[1][1]];
    }
    if (d[0][1] <= minY) {
      direction[i][0] = [d[0][0], minY];
    }
    if (d[1][1] >= maxY) {
      direction[i][1] = [d[1][0], maxY];
    }
  });
}

function hook(start, end) {
  direction.forEach(function (d, i) {
    if (
      start[0] == d[0][0] ||
      start[0] == d[1][0] ||
      start[1] == d[0][1] ||
      start[1] == d[1][1]
    ) {
      if (d[0][0] == d[1][0]) {
        if (d[0][1] <= start[1] <= d[1][1]) {
          flag = true;
          direction.push([start, d[0]]);
        }
      }
    }
    if (
      end[0] == d[0][0] ||
      end[0] == d[1][0] ||
      end[1] == d[0][1] ||
      end[1] == d[1][1]
    ) {
      if (d[0][0] == d[1][0]) {
        if (d[0][1] <= end[1] <= d[1][1]) {
          flag = true;
          direction.push([end, d[0]]);
        }
      }
    }
  });
}

//closest(start[0], start[1], end[0], end[1]);

//limit(direction);

//hook(start, end);

var directdraw = svg
  .selectAll("paths")
  .data(direction)
  .enter()
  .append("path")
  .attr("stroke", "#ffd600")
  .attr("stroke-width", "3")
  .attr("fill", "none")
  .attr("class", "path")
  .attr("d", function (d, i) {
    return "m " + d[0][0] + " " + d[0][1] + " L " + d[1][0] + " " + d[1][1];
  });
/*   
var point2 = svg.append("circle")
  .attr("stroke", "#ffd600")
  .attr("stroke-width", "3")
  .attr("fill", "#ffa500")
  .attr("cx", start[0])
  .attr("cy", start[1])
  .attr("class", "circle")
  .attr("r", 7)

*/

var point1 = svg
  .append("circle")
  .attr("stroke", "#ffd600")
  .attr("stroke-width", "3")
  .attr("fill", "#ffa500")
  .attr("cx", end[0])
  .attr("cy", end[1])
  .attr("class", "circle")
  .attr("r", 7);

var x = document.getElementById("demo");

var startMap = 0;
var lat = 0;
var lon = 0;

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.watchPosition(showPosition, function () {}, {
      enableHighAccuracy: true,
      timeout: 1000,
    });
  } else {
    x.innerHTML = "Geolocation is not supported by this browser.";
  }
}

function showPosition(position) {
  if (startMap === 0) {
    startMap = position.coords.latitude;
  } else {
    move = Math.abs(position.coords.latitude - startMap);
    move = Math.ceil(move / 0.1111111);
    console.log("move ", move);
    startMap = position.coords.latitude;
  }
  x.innerHTML =
    "Latitude: " +
    position.coords.latitude +
    "<br>Longitude: " +
    position.coords.longitude;
  lat = position.coords.latitude;
  lon = position.coords.longitude;
  console.log(latLonToOffsets(lat, lon, 1800, 800));
  const { xMap, yMap } = latLonToOffsets(lat, lon, 1800, 800);
  //console.log(xMap);
  point1.attr("cx", xMap).attr("cy", yMap);
}

function latLonToOffsets(latitude, longitude, mapWidth, mapHeight) {
  const zoom = 21;
  const offsetX = 106.83201037013929;
  const offsetY = -6.164833201902436;
  const FE = 180; // false easting
  const radius = (mapWidth * zoom) / (2 * Math.PI);

  const latRad = degreesToRadians(latitude + offsetY);
  const lonRad = degreesToRadians(longitude + offsetX);

  const xMap = (lonRad * radius) / 21; // - 356;

  const yFromEquator = radius * Math.log(Math.tan(Math.PI / 4 + latRad / 2));
  const yMap = ((mapHeight * zoom) / 2 - yFromEquator) / 21; // - 20;

  return { xMap, yMap };
}

function degreesToRadians(degrees) {
  return (degrees * Math.PI) / 180;
}

var scale = 0;

function zoom(e) {
  console.log("e: " + e.scale);

  //if(e.type == 'gesturestart'){
  var map = document.getElementById("map");
  zoom = map.getAttribute("data-zoom");

  //}

  //size = e.scale - scale;

  var map = document.getElementById("map");
  scale = zoom == null ? 0 : parseFloat(zoom.replace(/scale\(|\)/gi, ""));
  var running = map.getAttribute("data-running");
  running = running == null ? 0 : parseFloat(running);
  scale = 0;

  size = e.scale - running;
  console.log("r: " + running);
  console.log("s: " + size);
  console.log("sc: " + scale);
  console.log("sn: " + (e.scale + scale));

  var stand = document.getElementsByClassName("object");
  Array.prototype.forEach.call(stand, (a) => {
    //attribute = i.getAttribute("tranform");
    //console.log(a);
    a.setAttribute("transform", "scale(" + (scale + e.scale) + ")");
  });

  var path = document.getElementsByClassName("path");
  Array.prototype.forEach.call(path, (i) => {
    //attribute = i.getAttribute("tranform");
    i.setAttribute("transform", "scale(" + (scale + e.scale) + ")");
  });

  var circle = document.getElementsByClassName("circle");
  Array.prototype.forEach.call(circle, (i) => {
    //attribute = i.getAttribute("transform");

    i.setAttribute("transform", "scale(" + (scale + e.scale) + ")");
  });

  map.setAttribute("data-running", e.scale);

  e.preventDefault();
  if (e.type == "gestureend") {
    var map = document.getElementById("map");
    //width = map.getAttribute("width");
    width = map.style.width;
    width = width.substring(0, width.length - 2);
    //map.setAttribute("width", (width*(scale+e.scale))+"px");
    map.style.width = 1200 * e.scale + "px";
    //height = map.getAttribute("height");
    height = map.style.height;
    //height = height.substring(0, height.length - 2);
    map.style.height = 1200 * e.scale + "px";
    //map.setAttribute("height", (height*(scale+e.scale))+"px");
    map.setAttribute("data-zoom", scale + e.scale);
  }
}

document.getElementById("map").addEventListener("gesturestart", zoom, false);
document.getElementById("map").addEventListener("gesturechange", zoom, false);
document.getElementById("map").addEventListener("gestureend", zoom, false);

setInterval(getLocation, 1000);

//window.onload = function(){

//Array.prototype.forEach.call([document.getElementsByClassName('link')], i => {
//    i.onclick = showDetail;
//});

//var backButton = document.getElementsByClassName("back-button");
//    Array.prototype.forEach.call([backButton], i => {
//var parent = i.parentElement;
//    i.onclick = alert('asdasd');
//i.onclick = i.parentElement.remove;
//    });

function showDetail(index) {
  document.getElementById("marker").style.display = "none";
  //console.log(evt.children[0].children[0].style);
  removeClicked();
  removeSearch();
  evt = document.getElementById("tenant-" + index);
  var classs = evt.children[0].children[0].getAttribute("class");
  evt.children[0].children[0].setAttribute("class", classs + " clicked");
  document.getElementById("booth-detail").style.display = "block";

  objWidth = evt.getBoundingClientRect().width;
  objHeight = evt.getBoundingClientRect().height;

  var booth = outdoor[index];
  x = evt.getBoundingClientRect().x + window.scrollX - 200;
  y = evt.getBoundingClientRect().y + window.scrollY - 250;
  console.log(x + " " + y);
  document.getElementById("marker").style.display = "inline-block";
  document.getElementById("marker").style.top = y + 250 + objHeight / 2 - 17;
  document.getElementById("marker").style.left = x + 200 + objWidth / 2 + 3;
  //window.scrollBy(booth[1] + 200, booth[2] - 200);
  window.scrollTo({ left: x, top: y, behavior: "smooth" });
  //document.body.scrollTop = 100;
  //document.documentElement.scrollTop = 100;

  //document.getElementById('tenant-'+index).scrollIntoView();
  if (booth[4] == "") {
    document.getElementById("booth-name").textContent = booth[0];
  } else {
    document.getElementById("booth-name").textContent = booth[4];
  }
  document.getElementById("booth-number").textContent = booth[0];

  return false;
}

function removeClicked() {
  Array.prototype.forEach.call(
    document.getElementsByClassName("stand"),
    (i) => {
      var classs = i.getAttribute("class");
      classs = classs.replace(/clicked/, "");
      i.setAttribute("class", classs);
    }
  );
}

function removeParent(evt) {
  removeClicked();
  evt.parentNode.parentNode.style.display = "none";
}

function searchAuto(i) {
  Array.prototype.forEach.call(
    document.getElementsByClassName("back-button"),
    (i) => {
      i.click();
    }
  );

  document
    .getElementById("search-close")
    .setAttribute("style", "display:block");
  //console.log(i.value);
  document.getElementById("search-result").innerHTML = "";
  const substr = i.value;

  var key = substr.split(" ");

  var subArr = outdoor.filter(function (item) {
    if (
      item[0].toLowerCase().includes(substr.toLowerCase()) ||
      item[4].toLowerCase().includes(substr.toLowerCase())
    )
      return true;
    return false;
  });

  if (subArr.length == 0) {
    subArr = outdoor.filter(function (item) {
      title = item[0].replace(" ", "");
      name = item[4].replace(" ", "");
      if (
        title.toLowerCase().includes(substr.toLowerCase()) ||
        name.toLowerCase().includes(substr.toLowerCase())
      )
        return true;
      return false;
    });
  }

  if (subArr.length == 0) {
    document.getElementById("search-result").innerHTML +=
      '<a class="list-item"><div class="item"> Pencarian tidak ditemukan </div></a>';
  } else {
    c = 0;
    Array.prototype.every.call(subArr, (i) => {
      document.getElementById("search-result").innerHTML +=
        '<a onclick="showDetail(' +
        outdoor.findIndex((x) => x[0] === i[0]) +
        ')"class="list-item"><div  class="item">' +
        i[0] +
        " - " +
        i[4] +
        "</div></a>";
      c++;
      if (c == 4) {
        return false;
      }
      return true;
    });
  }

  console.log(subArr);
}

function removeSearch() {
  document.getElementById("search-result").innerHTML = "";
  document.getElementById("search-input").value = "";
  document.getElementById("search-close").setAttribute("style", "display:none");
}

document.getElementById("search-close").onclick = removeSearch;
//};
