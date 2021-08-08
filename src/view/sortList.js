import {
  createElement,
  getStrFromArr
} from '../util.js';
import {sorts} from '../const.js';

const getSortItem = (sortItem) => (
  `<div class="trip-sort__item  trip-sort__item--${sortItem.toLowerCase()}">
    <input id="sort-${sortItem.toLowerCase()}" class="trip-sort__input
    visually-hidden" type="radio" name="trip-sort" value="sort-${sortItem.toLowerCase()}">
    <label class="trip-sort__btn" for="sort-${sortItem.toLowerCase()}">${sortItem}</label>
  </div>`
);

const getSortList = () => (
  `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
    ${getStrFromArr(sorts, getSortItem)}
  </form>`
);

export default class SortList {
  constructor() {
    this._element = null;
  }

  static getElement() {
    if (!this._element) {
      this._element = getSortList();
    }

    return createElement(this._element);
  }

  static getTemplate() {
    return getSortList();
  }

  static removeElement() {
    this._element = null;
  }
}
