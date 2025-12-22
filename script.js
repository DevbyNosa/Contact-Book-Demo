const contact = [];

const searchElement = document.querySelector('.contact-search');
const filterSelect = document.querySelector('.filter-search');
const deleteButton = document.querySelector('.delete-btn')

const nameElem = document.querySelector('.contact-name');
const emailElem = document.querySelector('.contact-email')
const categoryElem = document.querySelector('.contact-category');
const addToContactButton = document.querySelector('.add-btn');
const displayContact = document.querySelector('.display-contact');

function searchContact() { 
    searchElement.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase().trim();
        
        
        const filteredContacts = contact.filter(contactItem => {
            return contactItem.name.toLowerCase().includes(searchTerm) || 
                   contactItem.email.toLowerCase().includes(searchTerm);
        });
        
        
        displayContacts(filteredContacts);
    });
}


searchContact();

addToContactButton.addEventListener('click', ()=> {
  const popUp = document.querySelector('.popup-message')
  const inputContact = {
    name: nameElem.value,
    email: emailElem.value,
    category: categoryElem.value
  }

  if(!inputContact.name || !inputContact.email || !inputContact.category ) {
  popUp.innerHTML = "<p class='red-popup'>Contact field cannot be empty</p>"
  } else if(!inputContact.email.includes('@')) {
    popUp.innerHTML = "<p class='red-popup'>Enter a specific contact email</p>"
  } else if (inputContact.category !== "Family" && inputContact.category !== "Work" && inputContact.category !== "Friends") {
    popUp.innerHTML = "<p class='red-popup'>Please enter a valid contact category like Family, Work, or Friends</p>";
} else {
  popUp.innerHTML = "<p class='green-popup'>Contact has been added</p>"
  contact.push(inputContact)
console.log(contact)

 displayContact.innerHTML = "";
for(let i = 0; i < contact.length; i++) {
 
  const displaylist = document.createElement("div")
  displaylist.classList.add('contact-card')
   displaylist.innerHTML = `
        <p class="contact-p"><strong>Name:</strong> ${inputContact.name}</p>
        <p class="contact-p"><strong>Email:</strong> ${inputContact.email}</p>
        <p class="contact-p"><strong>Category:</strong> ${inputContact.category}</p>
       <button class="all-delete-btn delete-btn-js">Delete Contact</button>
    `;
    const deleteButton = displaylist.querySelector('.delete-btn-js');;


    
deleteButton.addEventListener('click', () => {
    contact.splice(i, 1); 
    displaylist.remove();
    popUp.innerHTML = "<p class='green-popup'>Contact Deleted</p>";

setTimeout(() => {
  popUp.innerHTML = "";
}, 3000)
});
    displayContact.appendChild(displaylist)
}

}



setTimeout(() => {
  popUp.innerHTML = "";
}, 3000)


})

