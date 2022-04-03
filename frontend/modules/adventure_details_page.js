import config from "../conf/index.js";

//Implementation to extract adventure ID from query params
function getAdventureIdFromURL(search) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Get the Adventure Id from the URL
  let adventureDetails=new URLSearchParams(search);
  let adventureId = adventureDetails.get('adventure');
  // Place holder for functionality to work in the Stubs
  return adventureId;
}
//Implementation of fetch call with a paramterized input based on adventure ID
async function fetchAdventureDetails(adventureId) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Fetch the details of the adventure by making an API call
  try{
    let res=await fetch(`${config.backendEndpoint}/adventures/detail?adventure=${adventureId}`)
    let data=await res.json();
    return data;
  }catch(err){
    return null;
  }

 
  // Place holder for functionality to work in the Stubs
  
}

//Implementation of DOM manipulation to add adventure details to DOM
function addAdventureDetailsToDOM(adventure) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the details of the adventure to the HTML DOM
  
  let adventureDetailCard=document.querySelector('.adventure-detail-card');
  adventureDetailCard.id=adventure.id;
  let adventuretitle=document.querySelector('#adventure-name');
  adventuretitle.textContent=adventure.name;
  let adventureSubtitle=document.querySelector('#adventure-subtitle');
  adventureSubtitle.textContent=adventure.subtitle;
  let photoGallery=document.querySelector('#photo-gallery');
  adventure.images.forEach(image =>{
    let imageDiv=document.createElement('div');
    imageDiv.classList='activity-card-image'
    imageDiv.innerHTML=`<img src='${image}' alt='adventure-image'/>`;
    photoGallery.append(imageDiv);
  })
  let adventureDetails=document.querySelector('#adventure-content');
  adventureDetails.textContent=adventure.content;

}

//Implementation of bootstrap gallery component
function addBootstrapPhotoGallery(images) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the bootstrap carousel to show the Adventure images
  let photoGallery=document.querySelector('#photo-gallery');
  photoGallery.innerHTML=`<div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel">
  <div class="carousel-indicators">
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
  </div>
  <div class="carousel-inner">
    
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
  images.forEach((image,index) =>{
    let imageDiv=document.createElement('div');
    if(index==0)
      imageDiv.classList='activity-card-image activity-card carousel-item active'
    else
      imageDiv.classList='activity-card-image activity-card carousel-item '
    imageDiv.innerHTML=`<img src='${image}' alt='adventure-image'/>`;
    let carouselDiv=document.querySelector('.carousel-inner');
    carouselDiv.append(imageDiv);
  })
}

//Implementation of conditional rendering of DOM based on availability
function conditionalRenderingOfReservationPanel(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If the adventure is already reserved, display the sold-out message.
  // console.table(adventure);
  // console.log(adventure.available);
  if(adventure.available){
    document.getElementById('reservation-panel-available').style.display="block"
    document.getElementById('reservation-panel-sold-out').style.display="none";
  }
  
  // console.log(adventure.available);
  if(adventure.available===false){
    document.getElementById('reservation-panel-available').style.display="none"
    document.getElementById('reservation-panel-sold-out').style.display="block";
  }

  document.getElementById('reservation-person-cost').textContent = adventure.costPerHead;
}

//Implementation of reservation cost calculation based on persons
function calculateReservationCostAndUpdateDOM(adventure, persons) {
  // TODO: MODULE_RESERVATIONS
  // 1. Calculate the cost based on number of persons and update the reservation-cost field
  // console.log(adventure,persons)
  let totalReservationCost=document.querySelector('#reservation-cost');
  totalReservationCost.textContent=adventure.costPerHead*persons;
}

//Implementation of reservation form submission
function captureFormSubmit(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. Capture the query details and make a POST API call using fetch() to make the reservation
  // 2. If the reservation is successful, show an alert with "Success!" and refresh the page. If the reservation fails, just show an alert with "Failed!".
  const form=document.getElementById('myForm');
  // console.log(form);
  form.addEventListener('submit',(e)=>{
    e.preventDefault();
     const data={
      name:form.elements['name'].value, 
      date: new Date(form.elements['date'].value), 
      person:form.elements['person'].value, 
      adventure:adventure.id
      }
      // console.log(data);
      fetch(`${config.backendEndpoint}/reservations/new`,{
        method:"POST",
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify(data),
      }).then(alert('Success!')).catch(err => alert('Failed!'));
    })
 
 
}

//Implementation of success banner after reservation
function showBannerIfAlreadyReserved(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If user has already reserved this adventure, show the reserved-banner, else don't
  document.getElementById('reserved-banner').style.display=adventure.reserved?'block':'none';
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
