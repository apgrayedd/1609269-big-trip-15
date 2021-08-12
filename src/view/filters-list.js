import {filters} from '../const.js';
import {
  getStrFromArr
} from '../utils/common.js';
import AbstractView from './abstract.js';

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

export default class FiltersList extends AbstractView{
  getTemplate() {
    return getFiltersList();
  }
}
