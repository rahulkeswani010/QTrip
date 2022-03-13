import config from "../conf/index.js";

//Implementation to extract adventure ID from query params
function getAdventureIdFromURL(search) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Get the Adventure Id from the URL
  const params = new URLSearchParams(search);
  const id = params.get("adventure");
  // Place holder for functionality to work in the Stubs
  return id;
}
//Implementation of fetch call with a paramterized input based on adventure ID
async function fetchAdventureDetails(adventureId) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Fetch the details of the adventure by making an API call
  try{
    const result = await fetch(config.backendEndpoint + `/adventures/detail?adventure=${adventureId}`);
    const data = await result.json();
  return data;
  }
  catch(e){
    return null;
  }

  // Place holder for functionality to work in the Stubs
  
}

//Implementation of DOM manipulation to add adventure details to DOM
function addAdventureDetailsToDOM(adventure) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the details of the adventure to the HTML DOM
  document.getElementById('adventure-name').textContent = adventure.name;
  document.getElementById('adventure-subtitle').textContent = adventure.subtitle;
  adventure.images.map((img)=>{
    const imgElement = document.createElement('div');
    imgElement.className="col-lg-12"
    imgElement.innerHTML = `<img class="activity-card-image" src="${img}"/>`;
    document.getElementById('photo-gallery').append(imgElement);
  })
  document.getElementById('adventure-content').textContent = adventure.content;
}

//Implementation of bootstrap gallery component
function addBootstrapPhotoGallery(images) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the bootstrap carousel to show the Adventure images
  document.getElementById("photo-gallery").innerHTML=`
  <div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel">
  <div class="carousel-indicators">
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
  </div>
  <div class="carousel-inner" id="carousel-inner">
    
  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div>`
  images.forEach((img,index)=>{
    let item = document.createElement('div');
    item.className="carousel-item";
    if(index===0){
      item.className+=" active";
    }
    item.innerHTML = `<img src="${img}" class="activity-card-image" alt="..."/>`
    document.getElementById('carousel-inner').appendChild(item);
  })
}

//Implementation of conditional rendering of DOM based on availability
function conditionalRenderingOfReservationPanel(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If the adventure is already reserved, display the sold-out message.
  adventure.available ? document.getElementById('reservation-panel-available').style.display="block" :
  document.getElementById('reservation-panel-available').style.display="none";
  
  adventure.available ? document.getElementById('reservation-panel-sold-out').style.display="none" :
  document.getElementById('reservation-panel-sold-out').style.display="block";
  document.getElementById('reservation-person-cost').textContent = adventure.costPerHead;
  
}

//Implementation of reservation cost calculation based on persons
function calculateReservationCostAndUpdateDOM(adventure, persons) {
  // TODO: MODULE_RESERVATIONS
  // 1. Calculate the cost based on number of persons and update the reservation-cost field
  const total = adventure.costPerHead * persons;
  document.getElementById('reservation-cost').textContent = total;
}

//Implementation of reservation form submission
function captureFormSubmit(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. Capture the query details and make a POST API call using fetch() to make the reservation
  // 2. If the reservation is successful, show an alert with "Success!" and refresh the page. If the reservation fails, just show an alert with "Failed!".
  const form = document.getElementById('myForm');
  form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const update={
      name: form.elements['name'].value,
      date:form.elements['date'].value,
      person:form.elements['person'].value,
      adventure: adventure.id,
    }
    const options = {
      method: 'POST',
      headers: {
      'Content-Type': 'application/json',
      },
      body: JSON.stringify(update),
      };
      fetch(config.backendEndpoint + '/reservations/new', options)
  .then(data => {
      if (!data.ok) {
        throw Error(data.status);
       }
       return data.json();
      }).then(update => {
        alert('Success!');
      console.log(update);
      }).catch(e => {
      console.log(e);
      });
  })
}

//Implementation of success banner after reservation
function showBannerIfAlreadyReserved(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If user has already reserved this adventure, show the reserved-banner, else don't
  adventure.reserved ? document.getElementById('reserved-banner').style.display='block':
  document.getElementById('reserved-banner').style.display='none'
}


export {
  getAdventureIdFromURL,
  fetchAdventureDetails,
  addAdventureDetailsToDOM,
  addBootstrapPhotoGallery,
  conditionalRenderingOfReservationPanel,
  captureFormSubmit,
  calculateReservationCostAndUpdateDOM,
  showBannerIfAlreadyReserved,
};