import {createElement} from '../util.js';

const getLoading = () => (
  '<p class="trip-events__msg">Loading...</p>'
);

export default class Loading {
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
    return getLoading();
  }

  removeElement() {
    this._element = null;
  }
}
