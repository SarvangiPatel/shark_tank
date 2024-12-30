
let mainSection = document.getElementById("data-list-wrapper");

// pitch
let pitchTitleInput = document.getElementById("pitch-title");
let pitchImageInput = document.getElementById("pitch-image");
let pitchCategoryInput = document.getElementById("pitch-category");
let pitchfounderInput = document.getElementById("pitch-founder");
let pitchPriceInput = document.getElementById("pitch-price");
let pitchCreateBtn = document.getElementById("add-pitch");

// Update pitch
let updatePitchIdInput = document.getElementById("update-pitch-id");
let updatePitchTitleInput = document.getElementById("update-pitch-title");
let updatePitchImageInput = document.getElementById("update-pitch-image");
let updatePitchfounderInput = document.getElementById("update-pitch-founder");
let updatePitchCategoryInput = document.getElementById("update-pitch-category");
let updatePitchPriceInput = document.getElementById("update-pitch-price");
let updatePitchBtn = document.getElementById("update-pitch");

//Update price
let updatePricePitchId = document.getElementById("update-price-pitch-id");
let updatePricePitchPrice = document.getElementById("update-price-pitch-price");
let updatePricePitchPriceButton = document.getElementById("update-price-pitch");

//sort and filter
let sortAtoZBtn = document.getElementById("sort-low-to-high");
let sortZtoABtn = document.getElementById("sort-high-to-low");
let filterFood = document.getElementById("filter-Food");
let filterElectronics = document.getElementById("filter-Electronics");
let filterPersonalCare = document.getElementById("filter-Personal-Care");

//Search by title/founder

let searchBySelect = document.getElementById("search-by-select");
let searchByInput = document.getElementById("search-by-input");
let searchByButton = document.getElementById("search-by-button");

// Problem 1. List of pitches on page load [3}


let productArr = [];

// fetch url
function fetchdata() {
  fetch('http://localhost:3000/pitches')

      .then((res) => res.json())
      .then((data) => {
      
        show(data),
        productArr=data
    
})
      .catch((err) => console.log("Error fetching data:", err));
}
fetchdata();


// display data call
function show(data){

    const store = data.map((ele) =>
        showData(ele.id, ele.image, ele.title, ele.founder, ele.category, ele.price)
    );
    mainSection.innerHTML = store.join('');
}

// display data
function showData(id, image, title, founder, category, price) {

  return `
  <div class="card" data-id="${id}">
    <a href="description.html?title=${encodeURIComponent(title)}&image=${encodeURIComponent(image)}&founder=${encodeURIComponent(founder)}&category=${encodeURIComponent(category)}&price=${encodeURIComponent(price)}&id=${encodeURIComponent(id)}">
      <div class="card-img">
          <img src="${image}" alt="${title}" height="200px" width="200px">
      </div>
    </a>

      <div class="card-body">
          <h4 class="card-title">${title}</h4>
          <p class="card-founder">Founded by: ${founder}</p>
          <p class="card-category">Category: ${category}</p>
          <p class="card-price">Price: ${price}</p>
         <a href="#" data-id="${id}" class="card-edit" >Edit</a>

         <a href="#" data-id="${id}" class="card-edit-price" >Edit</a>

          <button data-id="${id}" class="card-button">Delete</button>
      </div>
  </div>
  `;
}


// adddata(post)
function addData() {
  pitchCreateBtn.addEventListener('click', () => {
      let adddata = {
          title: pitchTitleInput.value,
          image: pitchImageInput.value,
          category: pitchCategoryInput.value,
          founder: pitchfounderInput.value,
          price: pitchPriceInput.value
      }
      fetch('http://localhost:3000/pitches', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(adddata)
      })
          .then((res) => res.json())
          .then((data) => {
              alert("data inserted successfully")
          })
          .catch((err) => console.log(err));
  })
}
addData();


// deletedata call
document.addEventListener("click", (el) => {

  if(el.target.classList.contains('card-button'))
  {
    
    deleteData(el.target.dataset.id);

  }

});

// deletedata
function deleteData(id) {
  fetch(`http://localhost:3000/pitches/${id}`, {
      method: 'DELETE',
  })
      .then((rso) => rso.json())
      .then((value) => {
          console.log(value)
      })
      .catch((err) => console.log("Error during delete:", err));
}

// filter for food
filterFood.addEventListener('click',()=>{
    let stored = productArr.filter((el)=>
        el.category == 'Food'
)
    show(stored) 
})

// filter for electronics
filterElectronics.addEventListener('click',()=>{
    let stored = productArr.filter((el)=>
        el.category == 'Electronics'
)
    show(stored) 
})

// filter for personal-care
filterPersonalCare.addEventListener('click',()=>{
    let stored = productArr.filter((el)=>
        el.category == 'Personal Care'
)
    show(stored) 
})


// sort low to high

sortAtoZBtn.addEventListener('click',()=>{
    let stored = productArr.sort((a,b)=>
        a.price - b.price
)
    show(stored) 
})

// sort high to low

sortZtoABtn.addEventListener('click',()=>{
    let stored = productArr.sort((a,b)=>
        b.price - a.price
)
    show(stored) 
})


// update data

document.addEventListener("click", (el) => {

    if(el.target.classList.contains('card-edit'))
    {
      EditData(el.target.dataset.id);
  
    }
  
  });

function  EditData(id){
    
    fetch(`http://localhost:3000/pitches/${id}`)
        .then((rso) => rso.json())
        .then((data) => {
            updatePitchIdInput.value = data.id
            updatePitchTitleInput.value = data.title
            updatePitchImageInput.value = data.image
            updatePitchCategoryInput.value =data.category
            updatePitchfounderInput.value = data.founder
            updatePitchPriceInput.value = data.price

            console.log('Fetched data:', data);
            

        })
        .catch((err) => console.log("Error during delete:", err));
}

updatePitchBtn.addEventListener('click',()=>{
    function saveUpdatedData() {
        const id = updatePitchIdInput.value; 
        const updatedData = {
            title: updatePitchTitleInput.value,
            image: updatePitchImageInput.value,
            founder: updatePitchfounderInput.value,
            category: updatePitchCategoryInput.value,
            price: updatePitchPriceInput.value,
        };
        fetch(`http://localhost:3000/pitches/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedData),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log('PATCH request successful:', data);
            })
            .catch((error) => console.log('Error updating data:', error));
    }
    saveUpdatedData();
})
    

// update price and id
document.addEventListener("click", (e) => {
    if (e.target.classList.contains('card-edit-price')) {
        changedata(e.target.dataset.id);
    }
});
