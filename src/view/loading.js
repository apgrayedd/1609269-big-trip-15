import {createElement} from '../util.js';

const getLoading = () => (
  '<p class="trip-events__msg">Loading...</p>'
);

export default class Loading {
  constructor() {
    this._element = null;
  }

  static getElement() {
    if (!this._element) {
      this._element = createElement(getLoading());
    }

    return this._element;
  }

  getTemplate() {
    return getLoading();
  }

  static removeElement() {
    this._element = null;
  }
}

