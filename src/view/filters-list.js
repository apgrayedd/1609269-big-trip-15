import {
  getStrFromArr
} from '../utils/common.js';
import AbstractView from './abstract.js';

const filterItem = (filter) => (
  `<div class="trip-filters__filter">
    <input id="filter-${filter.toLowerCase()}" class="trip-filters__filter-input
    visually-hidden" type="radio" name="trip-filter" value="${filter.toLowerCase()}">
    <label class="trip-filters__filter-label" for="filter-${filter.toLowerCase()}">${filter}</label>
  </div>
`
);

const currentFilterItem = (filter) => (
  `<div class="trip-filters__filter">
    <input id="filter-${filter.toLowerCase()}" class="trip-filters__filter-input
    visually-hidden" type="radio" name="trip-filter" value="${filter.toLowerCase()}" checked>
    <label class="trip-filters__filter-label" for="filter-${filter.toLowerCase()}">${filter}</label>
  </div>
`
);

const getFiltersList = (filters, currentFilter) => (
  `<div class="trip-controls__filters">
    <h2 class="visually-hidden">Filter events</h2>
    <form class="trip-filters" action="#" method="get">
      ${getStrFromArr(filters, filterItem, currentFilter, currentFilterItem)}
      <button class="visually-hidden" type="submit">Accept filter</button>
    </form>
  </div>`
);

export default class FiltersList extends AbstractView{
  constructor(filters, currentFilter) {
    super();
    this._filter = filters;
    this._currentFilter = currentFilter;
    this._bindHandles();
  }

  getTemplate() {
    return getFiltersList(this._filter, this._currentFilter);
  }

  _handlerChangeFilter(evt) {
    evt.preventDefault();
    this._callback.changeFilter(evt.target.value);
  }

  setChangeFilter (callback) {
    this._callback.changeFilter = callback;
    this.getElement().querySelectorAll('.trip-filters__filter').forEach((filter) => {
      filter.querySelector('.trip-filters__filter-input').addEventListener('change', this._handlerChangeFilter);
    });
  }

  _bindHandles() {
    this._handlerChangeFilter = this._handlerChangeFilter.bind(this);
  }
}
