import '../pages/index.css';

import Api from '../components/Api.js';
import Section from '../components/Section.js';
import Card from '../components/Card.js';
import PopupWithConfirmation from '../components/PopupWithConfirmation.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import UserInfo from '../components/UserInfo.js';
import {
  settings,
  profileForm,
  photoForm,
  avatarForm,
  deleteForm,
  editPopupButton,
  addPopupButton,
  avatarPopupButton,
} from '../utils/constants.js';

import { FormValidator } from '../components/FormValidator.js';

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-65',
  headers: {
    authorization: '107572fd-a23a-435b-9724-668d3d26cd42',
    'Content-Type': 'application/json',
  },
});

const profileFormValidation = new FormValidator(settings, profileForm);
profileFormValidation.enableValidation();

const photoFormValidation = new FormValidator(settings, photoForm);
photoFormValidation.enableValidation();

const avatarFormValidation = new FormValidator(settings, avatarForm);
avatarFormValidation.enableValidation();

const deleteFormValidation = new FormValidator(settings, deleteForm);
deleteFormValidation.enableValidation();

const zoomPopup = new PopupWithImage('.popup_zoom');

let profile = {};

let cardList = {};

const promises = [ api.getMyProfile(), api.getInitialCards() ]

Promise.all(promises)
  .then(([profile, cardList]) => {
    profile;
    cardList;
  })
  .catch((err) => {
    console.log(err);
  });


api.getMyProfile()
.then((data) => {
  profile = new UserInfo({
    nameSelector: '.profile__title',
    jobSelector: '.profile__subtitle',
    avatarSelector: '.avatar__image',
    name: data.name,
    job: data.about,
    avatar: data.avatar,
    id: data._id,
  });
  profile.displayUserInfo();
})
.catch((err) => {
  console.log(err);
});

api.getInitialCards().then((data) => {
  cardList = new Section(
    {
      items: data,
      renderer: (item) => {
        const cardElement = createCard(item);
        cardList.startItem(cardElement);
      },
    },
    '.elements'
  );
  cardList.renderItems();
});

const avatarProfilePopup = new PopupWithForm(
  '.popup_edit-avatar',
  (inputValues) => {
    avatarProfilePopup.loading(true);
    api
      .editMyAvatar(inputValues['avatar'])
      .then((data) => {
        profile.setAvatarInfo({ newAvatar: data.avatar });
        avatarProfilePopup.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        profile.displayUserInfo();
        avatarProfilePopup.loading(false, 'Сохранить');
      });
  }
);

const editProfilePopup = new PopupWithForm(
  '.popup_edit-profile',
  (inputValues) => {
    editProfilePopup.loading(true);
    api
      .editMyProfile({ name: inputValues.login, about: inputValues.job })
      .then((data) => {
        profile.setUserInfo({
          newName: data.name,
          newJob: data.about,
        });
        editProfilePopup.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        profile.displayUserInfo();
        editProfilePopup.loading(false, 'Сохранить');
      });
  }
);

const deleteCardPopup = new PopupWithConfirmation('.popup_delete');


function createCard(item) {
  const card = new Card(
    {
      data: item,
      currentIdProfile: profile.getUserInfo().id,
      handleCardClick: () => {
        zoomPopup.open(card);
      },
      handleCardDelete: (cardId) => {
        deleteCardPopup.open(cardId);
        deleteCardPopup.submitCallback((evt) => {
          deleteCardPopup.loading(true);
          api.
          deleteCard(cardId)
            .then(() => {
              card.deleteCardClick(card._cardId);
              deleteCardPopup.close();
            })
            .catch((err) => console.log(err))
            .finally(() => {
              deleteCardPopup.loading(false, 'Да');
            });;
        });
      },
      handleLikeClick: () => {
        if (!card.isLiked()) {
          api
            .setLike(card._cardId)
            .then((data) => {
              card.countLike(data.likes.length, true);
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          api
            .deleteLike(card._cardId)
            .then((data) => {
              card.countLike(data.likes.length, true);
            })
            .catch((err) => {
              console.log(err);
            });
        }
      },
    },
    '.card-template'
  );
  const cardElement = card.generateCard();
  return cardElement;
}

const addPhotoPopup = new PopupWithForm('.popup_add-photo', (inputPhoto) => {
  addPhotoPopup.loading(true);
  api
    .addPhoto(inputPhoto)
    .then((data) => {
      const cardElement = createCard(data);
      cardList.addItem(cardElement);
      addPhotoPopup.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      addPhotoPopup.loading(false, 'Создать');
    });
});



editPopupButton.addEventListener('click', () => {
  const profileValues = profile.getUserInfo();

  editProfilePopup.setInputValues({
    login: profileValues.nameProfile,
    job: profileValues.jobProfile,
  });
  profileFormValidation.resetErrors();
  editProfilePopup.open();
  profileFormValidation.toggleButtonState();
});

addPopupButton.addEventListener('click', () => {
  addPhotoPopup.open();
  photoFormValidation.resetErrors();
  photoFormValidation.toggleButtonState();
});

deleteCardPopup.setEventListeners();

avatarPopupButton.addEventListener('click', () => {
  avatarProfilePopup.open();
  avatarFormValidation.resetErrors();
  avatarFormValidation.toggleButtonState();
});
