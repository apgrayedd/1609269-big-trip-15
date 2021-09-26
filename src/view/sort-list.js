import {
  getStrFromValues
} from '../utils/common.js';
import {SORTS} from '../const.js';
import AbstractView from './abstract.js';

const getSortItemTemplate = (sortItem) => (
  `<div class="trip-sort__item  trip-sort__item--${sortItem.toLowerCase().replace('sort-','')}">
    <input id="${sortItem.toLowerCase()}" class="trip-sort__input
    visually-hidden" type="radio" name="trip-sort" value="${sortItem.toLowerCase()}">
    <label class="trip-sort__btn" for="${sortItem.toLowerCase()}">${sortItem.replace('sort-','')}</label>
  </div>`
);

const getSortItemCheckedTemplate = (sortItem) => (
  `<div class="trip-sort__item  trip-sort__item--${sortItem.toLowerCase().replace('sort-','')}">
    <input id="${sortItem.toLowerCase()}" class="trip-sort__input
    visually-hidden" type="radio" name="trip-sort" value="${sortItem.toLowerCase()}" checked>
    <label class="trip-sort__btn" for="${sortItem.toLowerCase()}">${sortItem.replace('sort-','')}</label>
  </div>`
);

const getSortListTemplate = (checkedSortType) => (
  `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
    ${getStrFromValues(SORTS, getSortItemTemplate, checkedSortType, getSortItemCheckedTemplate)}
  </form>`
);

export default class SortList extends AbstractView {
  constructor(checkedSortType = 'everything') {
    super();
    this._checkedSortType = checkedSortType;
    this._bindHandles();
  }

  getTemplate() {
    return getSortListTemplate(this._checkedSortType);
  }

  _sortChangerHandler(evt) {
    evt.preventDefault();
    this._callbacks.sortChanger(evt.target.value);
  }

  setHandlerSortChanger(callback) {
    this._callbacks.sortChanger = callback;
    this.getElement().querySelectorAll('.trip-sort__item').forEach((sortItem) => {
      sortItem.querySelector('.trip-sort__input').addEventListener('change', this._sortChangerHandler);
    });
  }

  _bindHandles() {
    this._sortChangerHandler = this._sortChangerHandler.bind(this);
  }
}
