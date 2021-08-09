import {createElement} from '../util.js';

const getListEvents = () => (
  '<ul class="trip-events__list"></ul>'
);

export default class ListEvents {
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
    return getListEvents();
  }

  removeElement() {
    this._element = null;
  }
}


