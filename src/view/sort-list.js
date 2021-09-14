import {
  getStrFromArr
} from '../utils/common.js';
import {sorts} from '../const.js';
import AbstractView from './abstract.js';

const getSortItem = (sortItem) => (
  `<div class="trip-sort__item  trip-sort__item--${sortItem.toLowerCase().replace('sort-','')}">
    <input id="${sortItem.toLowerCase()}" class="trip-sort__input
    visually-hidden" type="radio" name="trip-sort" value="${sortItem.toLowerCase()}">
    <label class="trip-sort__btn" for="${sortItem.toLowerCase()}">${sortItem.replace('sort-','')}</label>
  </div>`
);

const getSortItemChecked = (sortItem) => (
  `<div class="trip-sort__item  trip-sort__item--${sortItem.toLowerCase().replace('sort-','')}">
    <input id="${sortItem.toLowerCase()}" class="trip-sort__input
    visually-hidden" type="radio" name="trip-sort" value="${sortItem.toLowerCase()}" checked>
    <label class="trip-sort__btn" for="${sortItem.toLowerCase()}">${sortItem.replace('sort-','')}</label>
  </div>`
);

const getSortList = (checkedSortType) => (
  `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
    ${getStrFromArr(sorts, getSortItem, checkedSortType, getSortItemChecked)}
  </form>`
);

export default class SortList extends AbstractView {
  constructor(checkedSortType = 'everything') {
    super();
    this._checkedSortType = checkedSortType;
    this._bindHandles();
  }

  getTemplate() {
    return getSortList(this._checkedSortType);
  }

  _callbackSortChanger(evt) {
    evt.preventDefault();
    this._callback.sortChanger(evt.target.value);
  }

  setHandlerSortChanger(callback) {
    this._callback.sortChanger = callback;
    this.getElement().querySelectorAll('.trip-sort__item').forEach((sortItem) => {
      sortItem.querySelector('.trip-sort__input').addEventListener('change', this._callbackSortChanger);
    });
  }

  _bindHandles() {
    this._callbackSortChanger = this._callbackSortChanger.bind(this);
  }
}
