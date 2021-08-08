import {createElement} from '../util.js';

const getListEvents = () => (
  '<ul class="trip-events__list"></ul>'
);

export default class ListEvents {
  constructor() {
    this._element = null;
  }

  static getElement() {
    if (!this._element) {
      this._element = createElement(getListEvents(this._data));
    }

    return this._element;
  }

  static getTemplate() {
    return getListEvents(this._data);
  }

  static clearElement() {
    this._element = null;
  }
}


