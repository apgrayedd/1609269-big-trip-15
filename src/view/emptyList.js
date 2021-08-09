import {createElement} from '../util.js';

const getEmptyList = () => (
  '<p class="trip-events__msg">Click New Event to create your first point</p>'
);

export default class EmptyList {
  constructor() {
    this._element = null;
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  getTemplate() {
    return getEmptyList();
  }

  removeElement() {
    this._element = null;
  }
}

