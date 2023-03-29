const query = location.search;
const params = new URLSearchParams(query);
const idParams = params.get("id");
/* const evento = amazingEventsdata.events; */
const urlAPI = "https://mindhub-xj03.onrender.com/api/amazing";
let evento = [];

async function getEvent(){
    try{
      let response = await fetch(urlAPI);
      let eventAPI = await response.json();
  
      for (const event of eventAPI.events) {
        evento.push(event);
      }
    }catch(error){
        console.log(error.message);
    }
    printCard(evento,"container-details");
}
getEvent();

function printCard(array, id){
    let detalles = array.find(info => info._id == idParams);


    const container = document.getElementById(id);
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
}
