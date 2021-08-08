import {filters} from '../const.js';
import {
  createElement,
  getStrFromArr
} from '../util.js';

const filterItem = (filter) => (
  `<div class="trip-filters__filter">
    <input id="filter-${filter.toLowerCase()}" class="trip-filters__filter-input
    visually-hidden" type="radio" name="trip-filter" value="everything">
    <label class="trip-filters__filter-label" for="filter-${filter.toLowerCase()}">${filter}</label>
  </div>
`
);

const getFiltersList = () => (
  `<div class="trip-controls__filters">
    <h2 class="visually-hidden">Filter events</h2>
    <form class="trip-filters" action="#" method="get">
      ${getStrFromArr(filters, filterItem)}
      <button class="visually-hidden" type="submit">Accept filter</button>
    </form>
  </div>`
);

export default class FiltersList {
  constructor() {
    this._element = null;
  }

  static getElement() {
    if (!this._element) {
      this._element = createElement(getFiltersList());
    }

    return this._element;
  }

  static getTemplate() {
    return getFiltersList();
  }

  static removeElement() {
    this._element = null;
  }
}
