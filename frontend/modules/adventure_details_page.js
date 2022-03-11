import config from "../conf/index.js";

//Implementation to extract adventure ID from query params
function getAdventureIdFromURL(search) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Get the Adventure Id from the URL
  let searchParams=search.split('?')[1];
  // console.log(searchParams);
  let adventureDetails=new URLSearchParams(searchParams);
  // console.log(adventureDetails.get('adventure'));
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

  // console.log(data);
  // Place holder for functionality to work in the Stubs
  
}

//Implementation of DOM manipulation to add adventure details to DOM
function addAdventureDetailsToDOM(adventure) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the details of the adventure to the HTML DOM
  // console.log(adventure);
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
  addBootstrapPhotoGallery(adventure.images);
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

}

//Implementation of reservation cost calculation based on persons
function calculateReservationCostAndUpdateDOM(adventure, persons) {
  // TODO: MODULE_RESERVATIONS
  // 1. Calculate the cost based on number of persons and update the reservation-cost field

}

//Implementation of reservation form submission
function captureFormSubmit(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. Capture the query details and make a POST API call using fetch() to make the reservation
  // 2. If the reservation is successful, show an alert with "Success!" and refresh the page. If the reservation fails, just show an alert with "Failed!".
}

//Implementation of success banner after reservation
function showBannerIfAlreadyReserved(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If user has already reserved this adventure, show the reserved-banner, else don't

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
