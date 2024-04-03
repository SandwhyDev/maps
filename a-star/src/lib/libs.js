// setInterval(getLocation, 1000);

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
  let lat, lon;
  lat = position.coords.latitude;
  lon = position.coords.longitude;
  console.log({ lat: lat, lon: lon });
}
