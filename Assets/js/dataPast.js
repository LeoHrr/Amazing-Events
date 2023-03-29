const pastEventsHtml= document.getElementById("pastEvents");
const contenedorChecks = document.getElementById("checkContainer");
const input = document.querySelector("input");
const urlAPI = "https://mindhub-xj03.onrender.com/api/amazing";

let evento = [];
let fecha;

async function getEvents(){
  try{
    let response = await fetch(urlAPI);
    let eventAPI = await response.json();

    for (const event of eventAPI.events) {
      evento.push(event);
    }
    fecha= eventAPI.currentDate;

    input.addEventListener('input', filtrarArrays);
    contenedorChecks.addEventListener('change',filtrarArrays);

    printCard(evento, fecha);
    createCheckbox(evento);

  }catch(error){
    console.log(error.message);
  }
}
getEvents();


function filtrarArrays(){
  let arrayFiltrado1 = filtrarPorTexto(evento,input.value);
  let arrayFiltrado2 = filtrarPorCategoria(arrayFiltrado1);
  printCard(arrayFiltrado2,fecha);
}

function createCheckbox(arrayCateg){
    let checks = '';
    let categoriaRepetida = arrayCateg.map(elemento => elemento.category)
    let categoria = new Set(categoriaRepetida.sort((a,b)=>{
        if(a>b){
            return 1;
        }
        if(a<b){
            return -1;
        }
        return 0;
    }))
    categoria.forEach(elemento =>{
        checks += `<div class="checks-category">
        <input class="form-check-input check" type="checkbox" value="${elemento}" id="${elemento}"/>
        <label for= ${elemento}>
        ${elemento}
        </label>
      </div>`
    })
    contenedorChecks.innerHTML = checks;
}

function printCard(arrayDatos, fecha){
  if(arrayDatos.length == 0){
    pastEventsHtml.innerHTML = `<h1 class="">No results found</h1>`;
    return;
  }
  let i=0;
  let cards = "";
  arrayDatos.forEach(elemento => {
    
    if(arrayDatos[i].date < fecha){
      cards += `<div class="card m-2" style="width: 18rem;">
      <div class="img-card">
      <img src="${elemento.image}" class="card-img-top" alt="img">
      </div>
      <div class="card-body">
      <h5 class="card-title">${elemento.name}</h5>
      <p class="card-text">${elemento.description}</p>
      <p class="price">Price: $${elemento.price}</p>
      <a href="../Templates/cards.html?id=${elemento._id}" class="btn btn-mas">See more...</a>
      </div>
      </div>`
    }
    i++;
  })
  pastEventsHtml.innerHTML = cards;
}

function filtrarPorTexto(arrayDatos,texto){
  let arrayFiltrado = arrayDatos.filter(elemento => elemento.name.toLowerCase().includes(texto.toLowerCase()));
  return arrayFiltrado
}

function filtrarPorCategoria(arrayCateg){
  let checkboxs = document.querySelectorAll("input[type='checkbox']")
    console.log(checkboxs);
    let arrayChecks = Array.from(checkboxs)
    console.log(arrayChecks);
    let checksChecked = arrayChecks.filter(check => check.checked)
    console.log(checksChecked);
    if(checksChecked.length == 0){
        return arrayCateg;
    }
    let checkValues = checksChecked.map(check => check.value)
    console.log(checkValues);
    let arrayFiltrado = arrayCateg.filter(elemento => checkValues.includes(elemento.category))
    console.log(arrayFiltrado);
    return arrayFiltrado;
}








/* let pastEvents= "";
  const pastEventsHtml = document.getElementById("pastEvents");

  for(let event of amazingEventsdata.events){
    if(amazingEventsdata.currentDate > event.date){
      pastEvents += 
      `<div class="card m-2" style="width: 18rem;">
      <div class="img-card">
        <img src="${event.image}" class="card-img-top" alt="img">
      </div>
      <div class="card-body">
        <h5 class="card-title">${event.name}</h5>
        <p class="card-text">${event.description}</p>
        <p class="price">Price: $${event.price}</p>
        <a href="#" class="btn btn-mas">See more...</a>
      </div>
      </div>`
    }
}

pastEventsHtml.innerHTML = pastEvents; */



/* const evento = amazingEventsdata.events;
const fecha = amazingEventsdata.currentDate

function cargarCards(array, dato){
  let pastEvents= "";
  const pastEventsHtml = document.getElementById("pastEvents");

  if(array.length == 0){
    pastEvents =  `<h1 class="">No results found</h1>`
  }else{
    for(let i=0; i< array.length; i++){
      if(dato > array[i].date){
        pastEvents += 
        `<div class="card m-2" style="width: 18rem;">
        <div class="img-card">
          <img src="${array[i].image}" class="card-img-top" alt="img">
        </div>
        <div class="card-body">
          <h5 class="card-title">${array[i].name}</h5>
          <p class="card-text">${array[i].description}</p>
          <p class="price">Price: $${array[i].price}</p>
          <a href="#" class="btn btn-mas">See more...</a>
        </div>
        </div>`
      }
    }
  }
  pastEventsHtml.innerHTML = pastEvents;
}

cargarCards(evento, fecha);

 */