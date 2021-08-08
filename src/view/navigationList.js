import {createElement} from '../util.js';

const getNavigationList = () => (
  `<div class="trip-controls__navigation">
    <h2 class="visually-hidden">Switch trip view</h2>
    <nav class="trip-controls__trip-tabs  trip-tabs">
      <a class="trip-tabs__btn  trip-tabs__btn--active" href="#">Table</a>
      <a class="trip-tabs__btn" href="#">Stats</a>
    </nav>
  </div>`);

export default class NavigationList {
  constructor(data) {
    this._element = null;
    this._data = data;
  }

  getElement() {
    if (!this._element) {
      this._element = getNavigationList(this._data)
    }

    return createElement(this._element)
  }

  getTemplate() {
    return getNavigationList(this._data);
  }

  removeElement() {
    this._element = null;
  }
}
