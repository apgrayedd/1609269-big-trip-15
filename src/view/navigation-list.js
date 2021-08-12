import {controls} from '../const.js';
import {
  getRandomInt,
  getStrFromArr
} from '../utils/common.js';
import AbstractView from './abstract.js';

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

export default class NavigationList extends AbstractView {
  getTemplate() {
    return getNavigationList();
  }
}

