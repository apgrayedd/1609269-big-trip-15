import {
  getStrFromArr
} from '../utils/common.js';
import {sorts} from '../const.js';
import AbstractView from './abstract.js';

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

export default class SortList extends AbstractView {
  getTemplate() {
    return getSortList();
  }
}
