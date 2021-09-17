import {controls} from '../const.js';
import {
  getStrFromArr
} from '../utils/common.js';
import AbstractView from './abstract.js';

const getNavigationItem = (sortItem) => `<a class="trip-tabs__btn" href="#">${sortItem}</a>`;

const getNavigationItemActive = (sortItem) => `<a class="trip-tabs__btn trip-tabs__btn--active" href="#">${sortItem}</a>`;

const getNavigationList = (checkedNav) => (
  `<div class="trip-controls__navigation">
    <h2 class="visually-hidden">Switch trip view</h2>
    <nav class="trip-controls__trip-tabs  trip-tabs">
      ${getStrFromArr(controls, getNavigationItem, checkedNav, getNavigationItemActive)}
    </nav>
  </div>`);

export default class NavigationList extends AbstractView {
  constructor(checkedNav) {
    super();
    this._checkedNav = checkedNav;
    this._bindHandles();
    this._restoreHandles();
  }

  getTemplate() {
    return getNavigationList(this._checkedNav);
  }

  _handlerChangeNavigation(evt) {
    evt.preventDefault();
    this._callback.changeNav(evt.target.innerText);
  }

  setChangeNavigation(callback) {
    this._callback.changeNav = callback;
    this.getElement().querySelectorAll('.trip-tabs__btn').forEach((navItem) => {
      navItem.addEventListener('click', this._handlerChangeNavigation);
    });
  }

  _restoreHandles() {
    this.getElement().querySelectorAll('.trip-tabs__btn').forEach((navItem) => {
      navItem.addEventListener('click', this._handlerChangeNavigation);
    });
  }

  _bindHandles() {
    this._handlerChangeNavigation = this._handlerChangeNavigation.bind(this);
  }
}

