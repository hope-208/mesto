import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._form = this._container.querySelector('.form');
    this._handleFormSubmit = handleFormSubmit;
    this.setEventListeners();
    this._buttonSubmit = this._form.querySelector('.button-submit');
  }

  _getInputValues() {
    const formData = new FormData(this._form);
    const values = {};
    for (const pair of formData.entries()) {
      values[pair[0]] = pair[1];
    }
    return values;
  }

  setInputValues(values) {
    Object.keys(values).forEach((key) => {
      this._form.elements[key].value = values[key];
    });
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
    });
  }

  close() {
    super.close();
    this._form.reset();
  }

  loading(isLoading, content) {
    if (isLoading) {
      this._buttonSubmit.textContent = 'Сохранение...';
    } else {
      this._buttonSubmit.textContent = content;
    }
  }
}
