import {createElement} from '../util.js';

const getEmptyList = () => (
  '<p class="trip-events__msg">Click New Event to create your first point</p>'
);

export default class EmptyList {
  constructor() {
    this._element = null;
  }

  static getElement() {
    if (!this._element) {
      this._element = createElement(getEmptyList());
    }

    return this._element;
  }

  static getTemplate() {
    return getEmptyList();
  }

  removeElement() {
    this._element = null;
  }
}

