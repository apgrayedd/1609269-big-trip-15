import {createElement} from '../utils/render.js';

export default class Abstract {
  constructor() {
    if (new.target === 'Abstract') {
      throw new Error ('Невозможно создать абстрактный класс от абстрактного класса.');
    }

    this._callbacks = [];
    this._element = null;
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
}
