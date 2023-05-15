export default class Card {
  constructor(
    {
      data,
      currentIdProfile,
      handleCardClick,
      handleCardDelete,
      handleLikeClick,
    },
    templateSelector
  ) {
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this._currentIdProfile = currentIdProfile;
    this._ownerId = data.owner._id;
    this._cardId = data._id;
    this._handleCardClick = handleCardClick;
    this._handleCardDelete = handleCardDelete;
    this._handleLikeClick = handleLikeClick;
    this._templateSelector = templateSelector;
  }

  _getTemplate() {
    return document
      .querySelector(this._templateSelector)
      .content.querySelector('.element')
      .cloneNode(true);
  }

  deleteCardClick() {
    this._element.remove();
this._element = null;
    }

  showLike() {
    this._likes.forEach((element) => {
      if (element._id === this._currentIdProfile) {
        this._likeButton.classList.add('button-like_active');
      }
    });
  }

  isLiked() {
    return this._likeButton.classList.contains('button-like_active');
  }

  countLike(count, isNeedToggle) {
    const likeCount = this._element.querySelector('.element__like-count');
    likeCount.textContent = count;

    if (isNeedToggle) {
      this._likeButton.classList.toggle('button-like_active');
    }
  }

  _eventListeners = () => {
    this._likeButton.addEventListener('click', (evt) => {
      this._handleLikeClick(this._cardId);
    });

    this._deleteButton.addEventListener('click', () => {
      this._handleCardDelete(this._cardId)
    });

    const elementCover = this._element.querySelector('.element__cover');
    elementCover.addEventListener('click', () =>
      this._handleCardClick(this._name, this._link)
    );
  };

  generateCard() {
    this._element = this._getTemplate();

    const elementCover = this._element.querySelector('.element__cover');
    const elementTitle = this._element.querySelector('.element__title');
    elementCover.src = this._link;
    elementCover.alt = this._name;
    elementTitle.textContent = this._name;
    elementCover.addEventListener('click', () => this._handleCardClick());

    this.countLike(this._likes.length, false);

    this._likeButton = this._element.querySelector('.button-like');

    this._deleteButton = this._element.querySelector('.button-delete');
    if (this._currentIdProfile != this._ownerId) {
      this._deleteButton.style.display = 'none';
    } else {
      this._deleteButton.addEventListener('click', () =>

        this._handleCardDelete(this._cardId))

    };

    this.showLike();
    this._eventListeners();

    return this._element;
  }
}
