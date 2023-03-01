const loadPhones = async (searchText) => {
    const URL = (`https://openapi.programming-hero.com/api/phones?search=${searchText}`)
    const res = await fetch(URL)
    const data = await res.json();
    showDisplayPhone(data.data);
}
loadPhones('apple')

const showDisplayPhone = phones => {
    console.log(phones);
    const phoneContainer = document.getElementById('phoneContainer')
    phoneContainer.textContent = ' ';
    

    // ---------------------- see all -----------

    const showContainer= document.getElementById('see-all');
   
        if(phones.length > 5){
            phones=phones.slice(0, 10)
            showContainer.classList.remove('d-none')
            
        }
        else{
            showContainer.classList.remove('d-none')
        }
     

    const noPhone = document.getElementById('no-found-message')
    if(phones.length === 0){
        noPhone.classList.remove('d-none') ;
    }
    else{
        noPhone.classList.add('d-none');
    }

    phones.forEach(phone => {
        console.log(phone);
        const div = document.createElement('div')
        div.classList.add('col')
        div.innerHTML = `
        
        <div class="card w-full  p-4">
        <img class="w-full h-50 " src="${phone.image}" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">${phone.phone_name}</h5>
          <button onclick="phoneDetails('${phone.slug}')" href="#" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#phoneDetailModal">Details</button>
          <p class="card-text"></p>
        </div>
      </div>
        `

        phoneContainer.appendChild(div)

    });
    loder(false);
}
document.getElementById('search-btn').addEventListener('click', function () {
    loder(true)
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value
    loadPhones(searchText)
})

document.getElementById('search-field').addEventListener('keypress', function (e) {
    // console.log(e.key);
    if (e.key === 'Enter') {
        const searchField = document.getElementById('search-field');
    const searchText = searchField.value
    loadPhones(searchText)
    }
});

const loder = isloding =>{
    const loderContainer = document.getElementById('loder')
    if(isloding){
        loderContainer.classList.remove('d-none')
    }
    else{
        loderContainer.classList.add('d-none')
    }

}
const phoneDetails = id =>{
    const url = ` https://openapi.programming-hero.com/api/phone/${id}`
    fetch(url)
    .then(res => res.json())
    .then(data => DisplayPhoneDetails(data.data))
}
// 
const DisplayPhoneDetails = phone =>{
    console.log(phone);
    const modalTile = document.getElementById('phoneDetailModalLabel')
    modalTile.innerText = phone.name;
    const modalDetails = document.getElementById('modal-details')
    modalDetails.innerHTML = `
    <p>Release Date :${phone.releaseDate}</p>
    <p>Storage: ${phone.mainFeatures.storage}</p>
    <p>DisplaySize: ${phone.mainFeatures.displaySize}</p>
    
    `
}