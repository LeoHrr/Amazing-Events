const urlApi = "https://mindhub-xj03.onrender.com/api/amazing";
let dataEvent = [];
let upcomingEvents =[];
let pastEvents = [];
let categories = [];

async function getEvents() {
    try{
        let response = await fetch(urlApi);
        let eventAPI = await response.json();

        for (const event of eventAPI.events) {
            dataEvent.push(event);
            let currentDate = eventAPI.currentDate;
            if (event.date >= currentDate){
                upcomingEvents.push(event);
            } else{
                pastEvents.push(event);
            }
            if (!categories.includes(event.category)){
                categories.push(event.category);
            }
        }

        let porcentaje = Percentage(pastEvents);
        eventStatistics(porcentaje, pastEvents);
        UpcomingByCategory();
        PastByCategory();

    }catch(e){
        console.log(e.message);
    }
    
}

getEvents();


function Percentage(array) {

    array = array.map(dato => 
        {
        let percentage = (dato.assistance) * 100 / dato.capacity;
        return percentage;
    });
    return array;
}

function eventStatistics(percentage, events) {

    let row = document.getElementById("eventStatistics");
    let HTML ="";
    let min = Math.min(...percentage);
    let max = Math.max(...percentage);


    let highestPer = percentage.indexOf(max);
    let lowestPer = percentage.indexOf(min);

    capacity = events.map(element => {
        return element.capacity;
    })

    let capacityMax = Math.max(...capacity)
    let largerCapacity = capacity.indexOf(capacityMax)

    HTML = `<td> ${events[highestPer].name} (${max}%)</td>
            <td>${events[lowestPer].name} (${min}%)</td>
            <td>${events[largerCapacity].name} (${capacityMax})</td>`

    row.innerHTML = HTML;
}


function PastByCategory(){
    
    let rowPast = document.getElementById("pastEvents");
    let pastHTML = `<tr class="cabecera">
                        <td class="txt-cabecera" >Categories</td>
                        <td class="txt-cabecera" >Revenues</td>
                        <td class="txt-cabecera" >Percentage of attendance</td>
                    </tr>`;
    for (let categoria of categories) {
    
        let revenues = 0;
        let percentAttend = 0;
        let accAttend = 0;
        let contAttend = 0;

        pastEvents.filter(event => event.category.includes(categoria))
        .forEach(event => {
             revenues += event.price * event.assistance;
             accAttend += ((event.assistance*100)/event.capacity);
             contAttend++;
        });
     
        isNaN(Math.round(accAttend/contAttend)) ? 0 : percentAttend=Math.round(accAttend/contAttend);
        pastHTML +=`<tr>
                        <td class="text-center" >${categoria}</td>
                        <td class="text-center" >$ ${revenues}</td>
                        <td class="text-center" >${percentAttend} %</td>
                    </tr>`;
        revenues = 0;
        accAttend = 0;
        contAttend = 0;
        }
    
                    
    rowPast.innerHTML = pastHTML;
}

function UpcomingByCategory(){
    let rowUpc = document.getElementById("upcomingEvents");
    let upcomingHTML = `<tr class="cabecera">
                            <td class="txt-cabecera" >Categories</td>
                            <td class="txt-cabecera" >Revenues</td>
                            <td class="txt-cabecera" >Percentage of attendance</td>
                        </tr>`;

    for (let categoria of categories) {
        let revenues = 0;
        let percentAttend = 0;
        let accAttend = 0;
        let contAttend = 0;

        upcomingEvents.filter(event => event.category.includes(categoria)).forEach(event =>{
        revenues += event.price * event.estimate;
        accAttend += ((event.estimate*100)/ event.capacity);
        contAttend++
        });

        isNaN(Math.round(accAttend/ contAttend)) ? 0: percentAttend= Math.round(accAttend/contAttend);
        if (revenues == 0 || percentAttend == 0){
            console.log(`No hay ingresos para ${categoria} en upcoming events`);
        }else{
            upcomingHTML +=`<tr>
                                <td class="text-center" >${categoria}</td>
                                <td class="text-center" >$ ${revenues}</td>
                                <td class="text-center" >${percentAttend} %</td>
                            </tr>`;
        }
        

    }
    

    rowUpc.innerHTML = upcomingHTML;
}