var username = sessionStorage.getItem("username");
var randomUsername = generateRandomUser();

if (!username) {
  sessionStorage.setItem("username", randomUsername);
  username = sessionStorage.getItem("username");
}

function PushDatabase(params, kebutuhan = "view") {
  const data = {
    code_tenant: params.toUpperCase(),
    session: username,
  };
  // Konversi objek params ke dalam format JSON
  const requestBody = JSON.stringify(data);
  const url = "http://localhost:8000/api";
  const cek = kebutuhan === "view" ? "view-create" : "visit-create";

  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: requestBody,
  };

  console.log(requestBody);
  fetch(`${url}/${cek}`, requestOptions)
    .then((res) => {
      // Lakukan sesuatu dengan data respons yang diterima
      console.log("Data yang diterima:", res);
    })
    .catch((error) => {
      // Tangani kesalahan jika ada
      console.error("Ada kesalahan:", error);
    });
}

function generateRandomUser() {
  // Membuat nomor acak antara 1000 dan 9999
  var randomNumber = Math.floor(Math.random() * 9000) + 1000;

  // Menggabungkan "USER-" dengan nomor acak untuk membuat string akhir
  var randomUser = "USER-" + randomNumber;

  return randomUser;
}
