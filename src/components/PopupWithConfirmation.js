import Popup from './Popup.js';

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector, apiCallBack) {
    super(popupSelector);
    this._form = this._container.querySelector('.form');
    this._apiCallBack = apiCallBack;
    this._buttonSubmit = this._form.querySelector('.button-submit');
    this.setEventListeners();
  }

  open(cardId) {
    super.open();
    this._cardId = cardId;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._apiCallBack(this._cardId);
      this.close();
    });
  }

  loading(isLoading, content) {
    if (isLoading) {
      this._buttonSubmit.textContent = 'Сохранение...';
    } else {
      this._buttonSubmit.textContent = content;
    }
  }
}
