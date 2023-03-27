const query = location.search;
const params = new URLSearchParams(query);
const idParams = params.get("id");
const evento = amazingEventsdata.events;

let detalles = evento.find(info => info._id == idParams);


const container = document.getElementById("container-details");
let detail = "";

detail += `
    <div class="justify-center">
        <div class="fondo-descr">
        <img class="img-det" src="${detalles.image}" alt="${detalles.name}">
        </div>
        <div>
            <h2 class="descrip-color">${detalles.name}</h2>
            <div class="flex-detail-r descrip-color">
            <p>Date: <span>${detalles.date}</span></p>
            <p>Category: <span>${detalles.category}</span></p>
            <p>Description: <span>${detalles.description}</span></p>
            <p>Category: <span>${detalles.place}</span></p>
            <p>Capacity: <span>${detalles.capacity}</span></p>
            <p>Price: $<span>${detalles.price}</span></p>
            </div>
        </div>
    </div>
    `
container.innerHTML = detail;