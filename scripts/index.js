import { Card } from './cards.js';

import { FormValidator } from './validate.js';

export const initialCards = [
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

export const settings = {
  inputSelector: '.form__input',
  submitButtonSelector: '.button-submit',
  inactiveButtonClass: 'button-submit_disabled',
  createProfile: 'button-submit_edit-profile',
  createCardButton: 'button-submit_add-photo',
  inputErrorClass: 'form__input-error',
  errorClass: 'error_active',
  errorSpanPostfix: '-error',
};
const popups = document.querySelectorAll('.popup');
const editProfilePopup = document.querySelector('.popup_edit-profile');
const addPhotoPopup = document.querySelector('.popup_add-photo');

const nameProfile = document.querySelector('.profile__title');
const jobProfile = document.querySelector('.profile__subtitle');
const editPopup = document.querySelector('.button-edit');
const addPopup = document.querySelector('.button-add');

const cardsContainer = document.querySelector('.elements');

const profileForm = document.forms.profile;
const profileName = profileForm.elements.login;
const profileJob = profileForm.elements.job;

const photoForm = document.forms.formAddPhoto;
const photoTitle = photoForm.elements.title;
const photoLink = photoForm.elements.link;

const profileFormValidation = new FormValidator(settings, profileForm);
profileFormValidation.enableValidation();

const photoFormValidation = new FormValidator(settings, photoForm);
photoFormValidation.enableValidation();

export function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', handleEscapeKey);
}

popups.forEach((popup) => {
  popup.addEventListener('mousedown', (evt) => {
    if (evt.target.classList.contains('popup_opened')) {
      closePopup(popup);
    }
    if (evt.target.classList.contains('button-close')) {
      closePopup(popup);
    }
  });
});

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', handleEscapeKey);
}

function handleEscapeKey(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    if (openedPopup) {
      closePopup(openedPopup);
    }
  }
}

function handleFormSubmit(evt) {
  evt.preventDefault();
  nameProfile.textContent = profileName.value;
  jobProfile.textContent = profileJob.value;
  closePopup(editProfilePopup);
}

function handleFormPhotoSubmit(evt) {
  evt.preventDefault();

  const captionAddPhoto = photoTitle.value;
  const coverAddPhoto = photoLink.value;

  const newCard = {
    name: captionAddPhoto,
    link: coverAddPhoto,
  };

  addCard(newCard);
  closePopup(addPhotoPopup);
}

function createCard(item) {
  const card = new Card(item, '.card-template');
  const cardElement = card.generateCard();
  return cardElement;
}

function addCard(item) {
  const cardElement = createCard(item);
  cardsContainer.prepend(cardElement);
}

editPopup.addEventListener('click', function () {
  profileName.value = nameProfile.textContent;
  profileJob.value = jobProfile.textContent;
  profileFormValidation.resetErrors();
  openPopup(editProfilePopup);
  profileFormValidation.toggleButtonState();
});

addPopup.addEventListener('click', function () {
  photoForm.reset();
  openPopup(addPhotoPopup);
  photoFormValidation.resetErrors();
  photoFormValidation.toggleButtonState();
});

profileForm.addEventListener('submit', handleFormSubmit);

photoForm.addEventListener('submit', handleFormPhotoSubmit);

initialCards.forEach((item) => {
  const card = new Card(item, '.card-template');
  const cardElement = card.generateCard();
  cardsContainer.prepend(cardElement);
});
