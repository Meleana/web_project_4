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

const profileAddButton = document.querySelector(".profile__add-button"); //name of the variable and class????

const cardName = document.getElementById("placeName");
const cardUrl = document.getElementById("placeUrl");
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

function popupToggler() {
  curentPopup.classList.toggle("popup_open");
  closeButton = curentPopup.querySelector(".popup__close-button");
  if (curentPopup.classList.contains("popup_open")) {
    closeButton.addEventListener("click", popupToggler);
  } else {
    closeButton.removeEventListener("click", popupToggler);
  }
}

function openPopupProfile() {
  profileEditName.value = profileName.textContent;
  profileEditDescription.value = profileDescription.textContent;
  curentPopup = popupProfileEditor;
  popupToggler();
}

function handleSubmit(e) {
  e.preventDefault();
  profileName.textContent = profileEditName.value;
  profileDescription.textContent = profileEditDescription.value;
  popupToggler(popupProfileEditor);
}

function openPopupCards() {
  curentPopup = popupCardAdder;
  // popupToggler(popupCardAdder);
  popupToggler();
}

function getInitialCards(name, link) {
  const templateCard = document.getElementById("card").content.cloneNode(true);
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
  );

  cardDelete.addEventListener("click", () => cardDelete.parentNode.remove());

  cardImage.addEventListener("click", function () {
    const cardDescription = cardImage.parentNode.querySelector(
      ".photo__description"
    );
    handleImgSize(cardImage.currentSrc, cardDescription.textContent);
  });

  // return photoCard;
  return templateCard;
}

function renderCards(name, link) {
  const cardContainer = document.querySelector(".photos");
  const newCard = getInitialCards(name, link);
  cardContainer.prepend(newCard);
  // cardContainer.append(newCard); - right order without revers
}

function createNewCard(e) {
  e.preventDefault();
  renderCards(cardName.value, cardUrl.value); //- смотреть событие формы и смотреть event.target.value
  popupToggler(popupCardAdder);
  document.getElementById("addCardForm").reset();
}

initialCards.reverse().forEach((card) => {
  renderCards(card.name, card.link);
});

function handleImgSize(source, description) {
  const popupCardSrc = document.querySelector(".popup__img");
  const popupCardDescription = document.querySelector(
    ".popup__img-description"
  );
  popupCardSrc.setAttribute("src", source);
  popupCardSrc.setAttribute("alt", `picture of ${description}`);
  popupCardSrc.setAttribute("title", `picture of ${description}`);
  popupCardDescription.textContent = description;

  // popupToggler(popupZoom);
  curentPopup = popupZoom;
  // popupToggler(popupCardAdder);
  popupToggler();
}

//---------------------------------------------------------------
//        Event listeners
//---------------------------------------------------------------
profileEditButton.addEventListener("click", openPopupProfile);
popupProfileEditor.addEventListener("submit", handleSubmit);

profileAddButton.addEventListener("click", openPopupCards);
popupCardAdder.addEventListener("submit", createNewCard);
