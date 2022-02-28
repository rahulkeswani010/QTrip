import config from "../conf/index.js";

//Implementation to extract city from query params
function getCityFromURL(search) {
  // TODO: MODULE_ADVENTURES
  // 1. Extract the city id from the URL's Query Param and return it
  // console.log(search);
  let paramString = search.split('?')[1];
  let queryString = new URLSearchParams(paramString);
  return queryString.get('city');
}

//Implementation of fetch call with a paramterized input based on city
async function fetchAdventures(city) {
  // TODO: MODULE_ADVENTURES
  // 1. Fetch adventures using the Backend API and return the data
  try{
    let res=await fetch(`${config.backendEndpoint}/adventures?city=${city}`);
    let data=await res.json();
    return data;
  }
  catch(err){
    return null;
  }
  
}

//Implementation of DOM manipulation to add adventures for the given city from list of adventures
function addAdventureToDOM(adventures) {
  // TODO: MODULE_ADVENTURES
  // 1. Populate the Adventure Cards and insert those details into the DOM
  // console.log(adventures);
  let dataDiv=document.getElementById('data');
  adventures.forEach(item =>{
  const{id, category, image,name,costPerHead,duration}=item;
  let childDiv=document.createElement('div');
  childDiv.classList='col-sm-6 col-lg-3 mb-4'
  childDiv.innerHTML=`
  <a href="detail/?adventure=${id}" id="${id}">
  <div class="activity-card">
  <div class="category-banner">${category}</div>
  <img src="${image}" />
</div>
<div class="card-body">
<div class="text-center d-flex justify-content-between flex-wrap">
  <h5 class="card-title">${name}</h5>
  <p class="card-text">₹${costPerHead}</p>
</div>
<div class="text-center d-flex justify-content-between flex-wrap">
<h5 class="card-title">Duration</h5>
<p class="card-text">${duration}&nbsp;
hours</p>
</div>
</div>
</a>

`;
dataDiv.append(childDiv);
  })
  
}

//Implementation of filtering by duration which takes in a list of adventures, the lower bound and upper bound of duration and returns a filtered list of adventures.
function filterByDuration(list, low, high) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on Duration and return filtered list
 
  // console.log(low,high);
  return list.filter(item =>{
    if(item.duration>=low&&item.duration<=high){
      return item;
    }
  })
}

//Implementation of filtering by category which takes in a list of adventures, list of categories to be filtered upon and returns a filtered list of adventures.
function filterByCategory(list, categoryList) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on their Category and return filtered list
  // let results=[];
  // console.log(categoryList);
  // categoryList.forEach(category =>{
  //   list.forEach(item =>{
  //     if(item.category==category)
  //     results.push(item);
      
  //     })
  // })
  return list.filter(item =>{
    if(categoryList.includes(item.category))
      return item;
  })
  // return results;
  }
// filters object looks like this filters = { duration: "", category: [] };

//Implementation of combined filter function that covers the following cases :
// 1. Filter by duration only
// 2. Filter by category only
// 3. Filter by duration and category together

function filterFunction(list, filters) {
  // TODO: MODULE_FILTERS
  // 1. Handle the 3 cases detailed in the comments above and return the filtered list of adventures
  // 2. Depending on which filters are needed, invoke the filterByDuration() and/or filterByCategory() methods
  // console.log(filters.duration);
  
  if(filters.duration.length>0){
    let low=filters.duration.split('-')[0];
    let high=filters.duration.split('-')[1];
    
    list=filterByDuration(list,low,high);
  } 
  if(filters.category.length>0)
   {
    list=filterByCategory(list,filters.category);
   }
   //list=
  //  console.log(list);
  // console.log(filters.category);
  // Place holder for functionality to work in the Stubs
 
  return list;
}

//Implementation of localStorage API to save filters to local storage. This should get called everytime an onChange() happens in either of filter dropdowns
function saveFiltersToLocalStorage(filters) {
  // TODO: MODULE_FILTERS
  // 1. Store the filters as a String to localStorage
  // console.log(filters);
  localStorage.setItem('filters',JSON.stringify(filters));
  return true;
}

//Implementation of localStorage API to get filters from local storage. This should get called whenever the DOM is loaded.
function getFiltersFromLocalStorage() {
  // TODO: MODULE_FILTERS
  // 1. Get the filters from localStorage and return String read as an object

  let res=JSON.parse(localStorage.getItem('filters'));
  // Place holder for functionality to work in the Stubs
  return res;
}

//Implementation of DOM manipulation to add the following filters to DOM :
// 1. Update duration filter with correct value
// 2. Update the category pills on the DOM

function generateFilterPillsAndUpdateDOM(filters) {
  // TODO: MODULE_FILTERS
  // 1. Use the filters given as input, update the Duration Filter value and Generate Category Pills
  // console.log(filters);
  
  const categoryArray = filters.category;
  const parent = document.getElementById('category-list');
  categoryArray.forEach(element => {
    const categoryElement = document.createElement('p');
    categoryElement.className = "category-filter"
    categoryElement.textContent = element;
    parent.append(categoryElement);
})
}
export {
  getCityFromURL,
  fetchAdventures,
  addAdventureToDOM,
  filterByDuration,
  filterByCategory,
  filterFunction,
  saveFiltersToLocalStorage,
  getFiltersFromLocalStorage,
  generateFilterPillsAndUpdateDOM,
};
