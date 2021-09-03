import {destinations} from '../const.js';
import {
  getEventTypeWrapper,
  getEventFieldGroupDestination,
  getEventFieldGroupPrice,
  getEventAvailableOffers,
  getEventAvailableDestination,
  replace
} from '../utils/render.js';
import SmartView from './smart.js';
import cloneDeep from 'lodash.clonedeep';

const editPoint = ({type, basePrice, offers, description, pictures}) => (
  `<form class="event event--edit" action="#" method="post">
    <header class="event__header">
      ${getEventTypeWrapper(type)}
      ${getEventFieldGroupDestination(type, destinations)}
      ${getEventFieldGroupPrice(basePrice)}
      <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
      <button class="event__reset-btn" type="reset">Delete</button>
      <button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>
    </header>
    <section class="event__details">
      ${getEventAvailableOffers(offers)}
      ${getEventAvailableDestination(description, pictures)}
    </section>
  </form>`
);

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};

export default class EditPoint extends SmartView {
  constructor(data) {
    super();
    this._data = data;
    this._callbackClose = this._callbackClose.bind(this);
    this._typeEventHandler = this._typeEventHandler.bind(this);
    this.restoreHandlers();
  }

  getTemplate() {
    return editPoint(this._data);
  }

  _callbackClose(evt) {
    evt.preventDefault();
    this._callback.close();
  }

  setHandlerClose (callback) {
    this._callback.close = callback;
    this.getElement().querySelector('.event__rollup-btn').addEventListener('click', this._callbackClose);
  }

  updateElement() {
    const prevElement = this.getElement();
    const parent = prevElement.parentElement;
    this.removeElement();

    const newElement = this.getElement();

    parent.replaceChild(newElement, prevElement);
    this.restoreHandlers();
  }

  updateData(update, notUpdateElement) {
    if (!update) {
      return;
    }
    this._data = Object.assign({},this._data,update);

    if (notUpdateElement) {
      return;
    }

    this.updateElement();
  }

  _typeEventHandler(evt) {
    this.updateData({
      type: evt.target.value,
    }, false);
  }

  restoreHandlers() {
    this.getElement().
      querySelectorAll('.event__type-input').forEach((input) => {
        input.addEventListener('click', this._typeEventHandler);
      });
    this.getElement().
      querySelector('.event__rollup-btn').
      addEventListener('click', this._callbackClose);
  }
}
