import {CONTROLS} from '../const.js';
import {
  getStrFromValues
} from '../utils/common.js';
import AbstractView from './abstract.js';

const getNavigationItemTemplate = (sortItem) => `<a class="trip-tabs__btn" href="#">${sortItem}</a>`;

const getNavigationItemActiveTemplate = (sortItem) => `<a class="trip-tabs__btn trip-tabs__btn--active" href="#">${sortItem}</a>`;

const getNavigationListTemplate = (checkedNav) => (
  `<div class="trip-controls__navigation">
    <h2 class="visually-hidden">Switch trip view</h2>
    <nav class="trip-controls__trip-tabs  trip-tabs">
      ${getStrFromValues(CONTROLS, getNavigationItemTemplate, checkedNav, getNavigationItemActiveTemplate)}
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
    return getNavigationListTemplate(this._checkedNav);
  }

  _changeNavigationHandler(evt) {
    evt.preventDefault();
    this._callbacks.changeNav(evt.target.innerText);
  }

  setChangeNavigation(callback) {
    this._callbacks.changeNav = callback;
    this.getElement().querySelectorAll('.trip-tabs__btn').forEach((navItem) => {
      navItem.addEventListener('click', this._changeNavigationHandler);
    });
  }

  _restoreHandles() {
    this.getElement().querySelectorAll('.trip-tabs__btn').forEach((navItem) => {
      navItem.addEventListener('click', this._changeNavigationHandler);
    });
  }

  _bindHandles() {
    this._changeNavigationHandler = this._changeNavigationHandler.bind(this);
  }
}

