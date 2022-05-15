//---------------------------------------------------------------
//        Variables
//---------------------------------------------------------------
const popupProfileEditor = document.getElementById("popupProfileEditor");

const profileEditButton = document.querySelector(".profile__edit-button");
// const profileCloseButton = popupProfileEditor.querySelector(".popup__close-button");


const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");
const profileEditName = popupProfileEditor.querySelector("#profileName");
const profileEditDescription = popupProfileEditor.querySelector("#profileDescription");


//---------------------------------------------------------------
//        Functions
//---------------------------------------------------------------

// I wrote an alternative (commented lines: 7, 42-45, 65, 73, 81), 
//but I'm not quite sure why? :)

// 1. The design already assumes other popups (their number is not known).
// 2. Not having the anonymous arrow function will add to the necessity of writing 
// a function for each popup.
// 3. Defining constants and lookups outside the code will strain the architecture, 
// since constants and event listeners can never be used by the user. 
// 4. Pros of using this function:
// 5. The function allows you to open and close any popup
// 6. The definition of the closing button constant (DOM search) does not occur 
// within the whole document, but only within a particular popup.
// 7. The closeButton constant is defined only if the popup 
// is opened (which might not be opened).
// 8. The event listener is only used while the popup is open, 
// thus avoiding unnecessary remove that is not needed.

// Conclusion: we get definition of only necessary constants, the code is concise 
// and the function is universal. The event listener works within the function 
// and strictly until the currently active popup is closed. 


// function popUpProfileToggler() {
//   popupProfileEditor.classList.toggle("popup_open");
//   profileCloseButton.removeEventListener("click", popUpProfileToggler);
// }

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
  }
}

function popUpProfileOpen() {
  profileEditName.value = profileName.textContent;
  profileEditDescription.value = profileDescription.textContent;
  popUpToggler(popupProfileEditor);
  // popUpProfileToggler();
}

function popUpProfileSave(e) {
  e.preventDefault();
  profileName.textContent = profileEditName.value;
  profileDescription.textContent = profileEditDescription.value;
  popUpToggler(popupProfileEditor);
  // popUpProfileToggler();
}

//---------------------------------------------------------------
//        Add event listeners
//---------------------------------------------------------------
profileEditButton.addEventListener("click", popUpProfileOpen);
popupProfileEditor.addEventListener("submit", popUpProfileSave);
// profileCloseButton.addEventListener("click", popUpProfileToggler);
