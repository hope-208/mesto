let editProfileButton = document.querySelector('.button__edit');
let editPopupProfile = document.querySelector('.popup_edit-profile');
let popupAddPhoto = document.querySelector('.popup_add-photo');
let formElementProfile = document.querySelector('.form_edit-profile');
let nameInput = document.querySelector('.form__input_type-name');
let jobInput = document.querySelector('.form__input_type-job');
let nameProfile = document.querySelector('.profile__title');
let jobProfile = document.querySelector('.profile__subtitle');
let popupButtonProfileClose = document.querySelector(
  '.button__close_edit-profile'
);
let closePhotoButton = document.querySelector('.button__close_add-photo');
let addPhotoButton = document.querySelector('.button__add');
let formElementPhoto = document.querySelector('.form_add-photo');
let titlePhotoInput = document.querySelector('.form__input_photo-title');
let linkPhotoInput = document.querySelector('.form__input_photo-link');

const container = document.querySelector('.container');
const cardsContainer = container.querySelector('.elements');
const cardItem = container.querySelector('.element');
const openPopupPhoto = container.querySelector('.button__add');
const createCardsButton = container.querySelector('.button__submit_add-photo');
const cardsTemplate = document.querySelector('.card-template').content;
const zoomPopup = document.querySelector('.popup_zoom');
const closeZoomButton = zoomPopup.querySelector('.button__close-zoom');

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg',
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg',
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg',
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg',
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg',
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg',
  },
];

function popupProfileOpen() {
  editPopupProfile.classList.add('popup_opened');
  nameInput.value = nameProfile.textContent;
  jobInput.value = jobProfile.textContent;
}


function popupProfileClose() {
  editPopupProfile.classList.remove('popup_opened');
}

function handleFormProfileSubmit(evt) {
  evt.preventDefault();
  nameProfile.textContent = nameInput.value;
  jobProfile.textContent = jobInput.value;
  popupProfileClose();
}

function createCard(element) {
  const cardsOnPage = cardsTemplate.cloneNode(true);
  const captionPhoto = cardsOnPage.querySelector('.element__title');
  const coverPhoto = cardsOnPage.querySelector('.element__cover');
  const popupZoomPhoto = zoomPopup.querySelector('.popup__photo');
  const popupZoomTitle = zoomPopup.querySelector('.popup__photo-title');
  const likeButton = cardsOnPage.querySelector('.button__like');
  const deleteButton = cardsOnPage.querySelector('.button__delete');

  captionPhoto.textContent = element.name;
  coverPhoto.setAttribute('src', element.link);
  coverPhoto.setAttribute('alt', element.name);

  popupZoomPhoto.setAttribute('src', element.link);
  popupZoomPhoto.setAttribute('alt', element.name);
  popupZoomTitle.textContent = element.name;

  likeButton.addEventListener('click', function (evt) {
    evt.target.classList.toggle('button__like_active');
  });

  deleteButton.addEventListener('click', function (evt) {
    evt.target.closest('.element').remove();
  });

  zoomPopup.classList.remove('popup_opened-zoom');

  coverPhoto.addEventListener('click', popupZoomOpen);

  return cardsOnPage;
}

function popupZoomOpen() {
  zoomPopup.classList.add('popup_opened-zoom');
}


function popupZoomClose() {
  zoomPopup.classList.remove('popup_opened-zoom');
}

initialCards.forEach(function (element) {
  const card = createCard(element);
  cardsContainer.prepend(card);
});

function popupAddPhotoOpen() {
  popupAddPhoto.classList.add('popup_opened');
}


function popupAddPhotoClose() {
  popupAddPhoto.classList.remove('popup_opened');
}


function handleFormPhotoSubmit(evt) {
  evt.preventDefault();

  const captionAddPhoto = titlePhotoInput.value;
  const coverAddPhoto = linkPhotoInput.value;

  const newCard = {
    name: captionAddPhoto,
    link: coverAddPhoto,
    alt: captionAddPhoto,
  };

  addCard(newCard, cardsContainer);
  popupAddPhotoClose();
}

function addCard(element, cardsContainer) {
  const card = createCard(element);
  cardsContainer.prepend(card);
}

editProfileButton.addEventListener('click', popupProfileOpen);

formElementProfile.addEventListener('submit', handleFormProfileSubmit);

popupButtonProfileClose.addEventListener('click', popupProfileClose);

addPhotoButton.addEventListener('click', popupAddPhotoOpen);

formElementPhoto.addEventListener('submit', handleFormPhotoSubmit);

closePhotoButton.addEventListener('click', popupAddPhotoClose);

closeZoomButton.addEventListener('click', function () {
  popupZoomClose(zoomPopup);
});
