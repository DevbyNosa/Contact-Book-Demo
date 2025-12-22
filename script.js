let contact = JSON.parse(localStorage.getItem('contacts')) || [];

const searchElement = document.querySelector('.contact-search');
const deleteButton = document.querySelector('.delete-btn')

const nameElem = document.querySelector('.contact-name');
const emailElem = document.querySelector('.contact-email')
const categoryElem = document.querySelector('.contact-category');
const addToContactButton = document.querySelector('.add-btn');
const displayContact = document.querySelector('.display-contact');
const searchButton = document.querySelector('.search-btn');




window.addEventListener('DOMContentLoaded', function() {
    displayAllContacts();  
    updateContactCount()
});


function displayAllContacts() {
    displayContact.innerHTML = "";
    
    for(let i = 0; i < contact.length; i++) {
        const displaylist = document.createElement("div");
       let contactName = contact[i].name;
      let capitalized = contactName.charAt(0).toUpperCase() + contactName.slice(1);
        displaylist.classList.add('contact-card');
        displaylist.innerHTML = `
            <p class="contact-p"><strong>Name:</strong> ${capitalized}</p>
            <p class="contact-p"><strong>Email:</strong> ${contact[i].email}</p>
            <p class="contact-p"><strong>Category:</strong> ${contact[i].category}</p>
            <div class="ctact-div">
                <button class="all-delete-btn delete-btn-js">Delete Contact</button>
                <button class="ctact-btn edit-btn-js">Edit Contact</button>
            </div>
        `;
        
       
        const deleteButton = displaylist.querySelector('.delete-btn-js');
        const editButton = displaylist.querySelector('.edit-btn-js'); 
        const editPopup = document.querySelector('.edit-popup')

        deleteButton.addEventListener('click', () => {
            contact.splice(i, 1);
            storingItem();
            displaylist.remove();
            updateContactCount();
            
            const popUp = document.querySelector('.popup-message');
            popUp.innerHTML = "<p class='green-popup'>Contact Deleted</p>";
            
            setTimeout(() => {
                popUp.innerHTML = "";
            }, 3000);
        });
        
       
        editButton.addEventListener('click', () => {
           
            const originalHTML = displaylist.innerHTML;
            
         displaylist.innerHTML = `
    
          <div class="edit-div">
          <h3>Edit Contact Demo</h3>
                <input value="${contact[i].name}" class="edit-name">
                <input value="${contact[i].email}" class="edit-email">
                <select class="edit-category">
                    <option ${contact[i].category === 'Family' ? 'selected' : ''}>Family</option>
                    <option ${contact[i].category === 'Work' ? 'selected' : ''}>Work</option>
                    <option ${contact[i].category === 'Friends' ? 'selected' : ''}>Friends</option>
                </select>
                <div class="edit-actions">
                    <button class="save-btn">Save</button>
                    <button class="cancel-btn">Cancel</button>
                </div>
                </div>
            `;
            
           
            displaylist.querySelector('.save-btn').addEventListener('click', () => {
                const newName = displaylist.querySelector('.edit-name').value;
                const newEmail = displaylist.querySelector('.edit-email').value;
                const newCategory = displaylist.querySelector('.edit-category').value;
                
            
          if (!newName || !newEmail || !newCategory) {
              popUp.innerHTML = "<p class='red-popup'>All fields required</p>";
              setTimeout(() => { popUp.innerHTML = ""; }, 3000);
              return;
          }
                const emailExists = contact.some((c, index) => 
                    index !== i && c.email === newEmail
                );
                
                if (emailExists) {
                    const popUp = document.querySelector('.popup-message');
                    popUp.innerHTML = "<p class='red-popup'>Email already exists!</p>";
                    setTimeout(() => { popUp.innerHTML = ""; }, 3000);
                    return;
                }
                
                
                contact[i] = { name: newName, email: newEmail, category: newCategory };
                storingItem();
                displayAllContacts(); 
            });
            
          
            displaylist.querySelector('.cancel-btn').addEventListener('click', () => {
                displaylist.innerHTML = originalHTML;
                
                const restoredDeleteBtn = displaylist.querySelector('.delete-btn-js');
                const restoredEditBtn = displaylist.querySelector('.edit-btn-js');
                
              
                restoredDeleteBtn.addEventListener('click', () => {
                    contact.splice(i, 1);
                    storingItem();
                    displaylist.remove();
                    updateContactCount();
                    
                    const popUp = document.querySelector('.popup-message');
                    popUp.innerHTML = "<p class='green-popup'>Contact Deleted</p>";
                    setTimeout(() => { popUp.innerHTML = ""; }, 3000);
                });
                
            
            });
        });
        
        displayContact.appendChild(displaylist);
    }
}



addToContactButton.addEventListener('click', ()=> {
  const popUp = document.querySelector('.popup-message')
  const inputContact = {
    name: nameElem.value,
    email: emailElem.value,
     category: categoryElem.value.toLowerCase()
  }
  const emailExists = contact.some(c => c.email === inputContact.email);

  if(!inputContact.name || !inputContact.email || !inputContact.category ) {
  popUp.innerHTML = "<p class='red-popup'>Contact field cannot be empty</p>"
  } else if(!inputContact.email.includes('@')) {
    popUp.innerHTML = "<p class='red-popup'>Enter a specific contact email</p>"
  } else if (inputContact.category !== "family" && inputContact.category !== "work" && inputContact.category !== "friends") {
    popUp.innerHTML = "<p class='red-popup'>Please enter a valid contact category like Family, Work, or Friends</p>";
} else if (emailExists) {
    popUp.innerHTML = "<p class='red-popup'>Email already exists!</p>";
    return;
} else {
  popUp.innerHTML = "<p class='green-popup'>Contact has been added</p>"
  contact.push(inputContact)
   storingItem()
console.log(contact)

 displayAllContacts()
 updateContactCount()

 nameElem.value = "";
emailElem.value = "";
categoryElem.value = "";

}






setTimeout(() => {
  popUp.innerHTML = "";
}, 3000)



})



function storingItem() {
  localStorage.setItem('contacts', JSON.stringify(contact))
}


function updateContactCount() {
    const countElement = document.getElementById('contactCount');
    if (countElement) {
        countElement.textContent = contact.length;
    }
}


// Created by DevbyNosa



