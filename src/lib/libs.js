var menuBtn = document.getElementById("menu-btn");
var closeBtn = document.getElementById("close-menu");
var Popup = document.getElementById("popup");
var ContainerPopup = document.getElementById("container-popup");
var CancelPopup = document.getElementById("cancel-popup");
var btnAgenda = document.getElementById("btn-agenda");

const talkshowEvents = [
  {
    id: 1,
    eventName: `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laboriosam incidunt rem perferendis repellat. 
    `,
    location: "Seminar Area Hall A1",
    time: "Rabu 15 Mei 2024, 12.45 - 14.00",
    pointx: 200,
    pointy: 1300,
  },
  {
    id: 2,
    eventName: "Nama Acara Acara 2",
    location: "Seminar Area Hall D1",
    time: "Rabu 15 Mei 2024, 12.45 - 14.00",
    pointx: 4120,
    pointy: 1580,
  },
  {
    id: 3,
    eventName: "Nama Acara Acara 3",
    location: "Seminar Area Hall A1",
    time: "Kamis 16 Mei 2024, 12.45 - 14.00",
    pointx: 200,
    pointy: 1300,
  },
];

function hiddenElementId(id, hidden = true) {
  var element = document.getElementById(id);

  hidden ? element.classList.add("hidden") : element.classList.remove("hidden");
}

btnAgenda.addEventListener("click", () => {
  clickTenant = true;
  ContainerPopup.classList.remove("hidden");
  const locationElement = document.getElementById("locationEvent");
  if (locationElement === null) {
    console.log(locationElement);
    talkshowEvents.forEach((event) => {
      const eventElement = document.createElement("div");
      eventElement.classList.add(
        "flex",
        "w-full",
        "gap-2",
        "border-b-2",
        "py-2"
      );
      eventElement.innerHTML = `
      <span>${event.id}.</span>
      <div class="flex flex-col  gap-2 w-full">
      <h1 class="uppercase ">${event.eventName}</h1>
      <h1 id="locationEvent" class=" underline cursor-pointer">${event.location}</h1>
      <h1 class="font-bold">${event.time}</h1>

      </div>
      
    `;

      eventElement.addEventListener("click", () => {
        updatePoint("end", event.pointx, event.pointy);
        clickTenant = false;
        ContainerPopup.classList.add("hidden");
        inputEnd.value = event.location;
      });
      Popup.appendChild(eventElement);
    });
  }
});

menuBtn.addEventListener("click", () => {
  buttonCamera.classList.remove("hidden");
  menuBtn.classList.add("hidden");
  closeBtn.classList.remove("hidden");
  btnAgenda.classList.remove("hidden");
});

closeBtn.addEventListener("click", () => {
  hiddenElementId("btn-camera", true);
  hiddenElementId("btn-agenda", true);
  hiddenElementId("menu-btn", false);
  hiddenElementId("close-menu", true);
});

CancelPopup.addEventListener("click", () => {
  clickTenant = false;

  ContainerPopup.classList.add("hidden");
});
