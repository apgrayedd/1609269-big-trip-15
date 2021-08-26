import {createElement} from '../utils/render.js';

export default class Abstract {
  constructor() {
    if (new.target === 'Abstract') {
      throw new Error ('Невозможно создать абстрактный класс от абстрактного класса.');
    }

    this._callback = [];
    this._element = null;
    this._callbackHandler = this._callbackHandler.bind(this);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  getTemplate() {
    throw new Error ('Классу необходимо добавить метод getTemplate().');
  }

  removeElement() {
    this._element = null;
  }

  _callbackHandler(evt) {
    evt.preventDefault();
    this._callback.Handler();
  }

  setHandler (typeEvent, htmlQuery, callback) {
    this._callback.Handler = callback;
    this.getElement().querySelector(htmlQuery).addEventListener(typeEvent, this._callbackHandler);
  }
}
