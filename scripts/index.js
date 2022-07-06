//---------------------------------------------------------------
//        Variables
//---------------------------------------------------------------
const popupProfileEditor = document.getElementById("popupProfileEditor");
const profileEditButton = document.querySelector(".profile__edit-button");

const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");
const profileEditName = popupProfileEditor.querySelector("#profileName");
const profileEditDescription = popupProfileEditor.querySelector(
  "#profileDescription"
);

const popupCardAdder = document.getElementById("popupCardAdder");
const profileAddButton = document.querySelector(".profile__add-button"); //Kseniya, could you please be so kind and advice me which class will be more correct for this button??? It's not a profile add button, because this button adding a picture. 
// const cardName = document.getElementById("placeName");
// const cardUrl = document.getElementById("placeUrl");
const newCardLink = document.getElementById("placeUrl");
const newCardTitle = document.getElementById("placeName");

// const cardForm = document.getElementById("addCardForm");

const popupZoom = document.getElementById("popupZoomInOut");

const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://code.s3.yandex.net/web-code/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://code.s3.yandex.net/web-code/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://code.s3.yandex.net/web-code/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://code.s3.yandex.net/web-code/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://code.s3.yandex.net/web-code/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://code.s3.yandex.net/web-code/lago.jpg",
  },
];

//---------------------------------------------------------------
//        Functions
//---------------------------------------------------------------

function togglePopup(popup) {
  popup.classList.toggle("popup_open");
  closeButton = popup.querySelector(".popup__close-button");
  if (popup.classList.contains("popup_open")) {
    closeButton.addEventListener("click", () => {togglePopup(popup)});
  } else {
    closeButton.removeEventListener("click", () => {togglePopup(popup)});
  }
}

function openPopupProfile() {
  profileEditName.value = profileName.textContent;
  profileEditDescription.value = profileDescription.textContent;
  // curentPopup = popupProfileEditor;
  // togglePopup(popupProfileEditor);
  togglePopup(popupProfileEditor);
}

//----------------------------------------------------------------
// You can open/close popups without using an additional variable, because you always know what exactly is needed open or close a popup. Create two functions: one that opens a popup openPopup and one that closes a popup closePopup. Note,  that function names should start with a verb. Use openPopup(popup) every time. you want to. open a popup and use closePopup(popup) every time you want to close a popup...
// =>
//I understand that this can be divided into several functions, but in the framework of the last project (the example of the function from the last project below) that in this project to reduce and simplify the code (and most importantly - to create a universal open/close function), I decided to use the switch and have long been looking for different variations of how to do it. If this function can be improved/changed, I would be glad to receive any comments, but I would not like to describe it in several parts.
//-------------------------------

function handleProfileFormSubmit(e) {
  e.preventDefault();
  profileName.textContent = profileEditName.value;
  profileDescription.textContent = profileEditDescription.value;
  togglePopup(popupProfileEditor);
}

function openPopupCards() {
  // curentPopup = popupCardAdder;
  togglePopup(popupCardAdder);
  // togglePopup();
}

//----------------------------------------------------------------
//function name should describe what the function does. This function creates a card, so the good name would be " createCard"...
// =>
//This function not only creates cards, but also has delete and like buttons and click listeners. Even if you take the functions that are performed by clicking into separate independent functions, this function is still responsible not only for creating the card.  Is it really worth changing the name of the function, or would "getInitialCard" be acceptable?
//-------------------------------
function createCard(cardObject) {
  const {name, link} = cardObject;
  const templateCard = document.getElementById("card").content.cloneNode(true); ///Kseniya, could you please explain what exactly should I declare as a const? This part => const templateCard = document.getElementById("card")? Because it's not working or I misunderstood something... 
  const cardImage = templateCard.querySelector(".photo__img");
  const cardTitle = templateCard.querySelector(".photo__description");
  // const photoCard = templateCard.content.cloneNode(true);
  // const cardImage = photoCard.querySelector(".photo__img");
  // const cardTitle = photoCard.querySelector(".photo__description");
  const cardDelete = templateCard.querySelector(".photo__delete-button");
  const likeButton = templateCard.querySelector(".photo__like-button");

  cardImage.setAttribute("src", link);
  cardImage.setAttribute("alt", `picture of ${name}`);
  cardImage.setAttribute("title", `picture of ${name}`);

  cardTitle.textContent = name;

  //--------------   Event listeners  ---------------------
  likeButton.addEventListener("click", () =>
    likeButton.classList.toggle("photo__like-button_active")
  ); // also here - the function from the second parameter of the listener should be taken out and declared separately - not working for me, because function can't find the variables or listener is not working... Probably you can explain it to me or give me a hint/direct me...
  
  // cardDelete.addEventListener("click", () => cardDelete.parentNode.remove());
  cardDelete.addEventListener("click", () => cardDelete.closest(".photo").remove());

  cardImage.addEventListener("click", function () {
    // const cardDescription = cardImage.parentNode.querySelector(
    //   ".photo__description"
    // );
    const cardDescription = cardImage.closest(".photo").querySelector(
      ".photo__description"
    );
  
    handleImgSize(cardImage.currentSrc, cardDescription.textContent);
  });

  // return photoCard;
  return templateCard;
}

function renderCard(cardObject) {
  const cardContainer = document.querySelector(".photos");
  const newCard = createCard(cardObject);
  cardContainer.prepend(newCard);
  // cardContainer.append(newCard); - right order without revers
}

function createNewCard(e) {
  e.preventDefault();
  const newCardObject = {
    link: newCardLink.value,
    name: newCardTitle.value,
  };
  renderCard(newCardObject);
  // renderCard(cardName.value, cardUrl.value); 
  togglePopup(popupCardAdder);
  document.getElementById("addCardForm").reset();
}

initialCards.reverse().forEach((cardObject) => {
  renderCard(cardObject);
});

function handleImgSize(source, description) {
  const popupImage = document.querySelector(".popup__img");
  const popupCardDescription = document.querySelector(
    ".popup__img-description"
  );
  popupImage.setAttribute("src", source);
  popupImage.setAttribute("alt", `picture of ${description}`);
  popupImage.setAttribute("title", `picture of ${description}`);
  popupCardDescription.textContent = description;

  // togglePopup(popupZoom);
  // curentPopup = popupZoom;
  togglePopup(popupZoom);
  // togglePopup();
}

//---------------------------------------------------------------
//        Event listeners
//---------------------------------------------------------------
profileEditButton.addEventListener("click", openPopupProfile);
popupProfileEditor.addEventListener("submit", handleProfileFormSubmit);

profileAddButton.addEventListener("click", openPopupCards);
popupCardAdder.addEventListener("submit", createNewCard);

