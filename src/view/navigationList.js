import {controls} from '../const.js';
import {
  createElement,
  getRandomInt,
  getStrFromArr
} from '../util.js';

const getNavigationItem = (sortItem) => (
  `<a class="trip-tabs__btn${getRandomInt(0,1)
    ? ' trip-tabs__btn--active'
    : '' }" href="#">${sortItem}</a>`
);

const getNavigationList = () => (
  `<div class="trip-controls__navigation">
    <h2 class="visually-hidden">Switch trip view</h2>
    <nav class="trip-controls__trip-tabs  trip-tabs">
      ${getStrFromArr(controls, getNavigationItem)}
    </nav>
  </div>`);

export default class NavigationList {
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
    return getNavigationList();
  }

  removeElement() {
    this._element = null;
  }
}

