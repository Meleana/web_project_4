//---------------------------------------------------------------
//        Variables
//---------------------------------------------------------------
const popupProfileEditor = document.getElementById("popupProfileEditor");

const profileEditButton = document.querySelector(".profile__edit-button");

const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");
const profileEditName = popupProfileEditor.querySelector("#profileName");
const profileEditDescription = popupProfileEditor.querySelector("#profileDescription");

//---------------------------------------------------------------
//        Functions
//---------------------------------------------------------------
function popUpToggler(popup) {
  popup.classList.toggle("popup_open");
  if (popup.classList.contains("popup_open")) {
    const closeButton = popup.querySelector(".popup__close-button");
    closeButton.addEventListener(
      "click",
      () => {
        popUpToggler(popup);
      },
      { once: true }
    );
    //"No need to use an anonymous arrow function just to call another function, you can use popUp as a second parameter in the listener"
    //This function is universal and can be used with other popups so we need to pass a parameter to the function. That's why I use an anonymous arrow function here
  }
}

function popUpProfileOpen() {
  profileEditName.value = profileName.textContent;
  profileEditDescription.value = profileDescription.textContent;
  popUpToggler(popupProfileEditor);
}

function popUpProfileSave(e) {
  e.preventDefault();
  profileName.textContent = profileEditName.value;
  profileDescription.textContent = profileEditDescription.value;
  popUpToggler(popupProfileEditor);
}

//---------------------------------------------------------------
//        Add event listeners
//---------------------------------------------------------------
profileEditButton.addEventListener("click", popUpProfileOpen);
popupProfileEditor.addEventListener("submit", popUpProfileSave);
