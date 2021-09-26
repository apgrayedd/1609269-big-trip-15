import {
  getStrFromValues
} from '../utils/common.js';
import AbstractView from './abstract.js';

const filterItemTemplate = (filter) => (
  `<div class="trip-filters__filter">
    <input id="filter-${filter.toLowerCase()}" class="trip-filters__filter-input
    visually-hidden" type="radio" name="trip-filter" value="${filter.toLowerCase()}">
    <label class="trip-filters__filter-label" for="filter-${filter.toLowerCase()}">${filter}</label>
  </div>
`
);

const currentFilterItemTemplate = (filter) => (
  `<div class="trip-filters__filter">
    <input id="filter-${filter.toLowerCase()}" class="trip-filters__filter-input
    visually-hidden" type="radio" name="trip-filter" value="${filter.toLowerCase()}" checked>
    <label class="trip-filters__filter-label" for="filter-${filter.toLowerCase()}">${filter}</label>
  </div>
`
);

const getFiltersListTemplate = (filters, currentFilter) => (
  `<div class="trip-controls__filters">
    <h2 class="visually-hidden">Filter events</h2>
    <form class="trip-filters" action="#" method="get">
      ${getStrFromValues(filters, filterItemTemplate, currentFilter, currentFilterItemTemplate)}
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
    return getFiltersListTemplate(this._filter, this._currentFilter);
  }

  _changeFilterHandler(evt) {
    evt.preventDefault();
    this._callbacks.changeFilter(evt.target.value);
  }

  setChangeFilter (callback) {
    this._callbacks.changeFilter = callback;
    this.getElement().querySelectorAll('.trip-filters__filter').forEach((filter) => {
      filter.querySelector('.trip-filters__filter-input').addEventListener('change', this._changeFilterHandler);
    });
  }

  _bindHandles() {
    this._changeFilterHandler = this._changeFilterHandler.bind(this);
  }
}
