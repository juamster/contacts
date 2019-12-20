let contacts = []

/**
 * Called when submitting the new Contact Form
 * This method will pull data from the form
 * use the provided function to give the data an id
 * then add that data to the contacts list.
 * Then reset the form
 * *** hints:
 * *** push: resources/push.jpg
 */
function addContact(event) {
  event.preventDefault()  // stops loading of the page upon submit
  let form = event.target
  let theCard = {
    id: generateId(),
    name: form.name.value,
    phone: form.phone.value,
    emergency: form.emergency.checked
  }
  console.log(theCard)
  contacts.push(theCard)
  saveContacts()
  form.reset()
}

/**
 * Converts the contacts array to a JSON string then
 * Saves the string to localstorage at the key contacts 
 */
function saveContacts() {
  window.localStorage.setItem("contacts", JSON.stringify(contacts))
  drawContacts();
}

/**
 * Attempts to retrieve the contacts string from localstorage
 * then parses the JSON string into an array. Finally sets
 * the contacts array to the retrieved array
 */
function loadContacts() {
  let savedContacts = JSON.parse(window.localStorage.getItem("contacts"))
  if (savedContacts) {
    contacts = savedContacts
  }

}

/**
 * This function targets the contacts-list on the 
 * DOM and adds a new div element for each of the
 * contacts in the contacts array
 * another way to do the if
 * <div class="card mt-1 ${contact.emergency ? `emergency-contact`: ''} ">
 */
function drawContacts() {
  let template = ""
  contacts.forEach(contact => {
    let firstDiv = ""

    if (contact.emergency) {
      firstDiv = `<div class="card mt-1 emergency-contact">`
    } else {
      firstDiv = `<div class="card mt-1 ">`
    }

    template += `
      ${firstDiv}
      <h3 class="mt-1 mb-1">${contact.name}</h3>
      <div class="d-flex space-between">
        <p>
          <i class="fa fa-fw fa-phone"></i>
          <span>${contact.phone}</span>
        </p>
         <i class="action fa fa-trash text-danger" onclick="removeContact('${contact.id}')"></i>
      </div>
    </div>`

    document.getElementById("contact-list").innerHTML = template

  })
}



/**
 * This function is called with a contact id
 * and will use the id to find and remove the 
 * contact by their id from the list of contacts
 * *** hints: 
 * *** findIndex: resources/findIndex.jpg
 * *** splice: resources/splice.jpg
 * @param {string} contactId 
 */
function removeContact(contactId) {
  let index = contacts.findIndex(contact => contact.id == contactId)
  if (index == -1) {
    throw new Error("Invalid Contact id")
  }
  contacts.splice(index, 1)
  saveContacts()  // will force a draw

}

/**
 * Toggles the visibility of the AddContact Form
 */
function toggleAddContactForm() {
  /* a better way to do this: */
  document.getElementById("new-contact-form").classList.toggle("hidden")

  /*
  if (document.getElementById("new-contact-form").classList.contains("hidden")) {
    document.getElementById("new-contact-form").classList.remove("hidden")
  } else {
    document.getElementById("new-contact-form").classList.add("hidden")
  }
  */
}


/**
 * Used to generate a random string id for mocked
 * database generated Id
 * @returns {string}
 */
function generateId() {
  return Math.floor(Math.random() * 10000000) + "-" + Math.floor(Math.random() * 10000000)
}
/* this is outside of any code, it will happen when the page loads */

loadContacts()
drawContacts()