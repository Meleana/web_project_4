const editButton = document.querySelector(".profile__edit-button");
const closeButton = document.querySelector(".popup__close-button");
const saveButton = document.querySelector(".popup__save-button");


editButton.addEventListener("click", () => popUpProfileOpen("popupProfileEditor"));
closeButton.addEventListener("click", () => popUp("popupProfileEditor"));
saveButton.addEventListener("click", (e) => {popUpProfileSave("popupProfileEditor"); e.preventDefault();});



function popUp(Id) {
    const element = document.getElementById(Id);
    element.classList.toggle("popup__open");
}

function popUpProfileOpen(Id) {
    document.getElementById("name").value = document.querySelector(".profile__name").textContent;
    document.getElementById("description").value = document.querySelector(".profile__description").textContent;
    popUp(Id);
}


function popUpProfileSave(Id) {
    document.querySelector(".profile__name").textContent = document.getElementById("name").value;
    document.querySelector(".profile__description").textContent = document.getElementById("description").value;
    popUp(Id);
}

