import {destinations} from '../const.js';
import {
  getEventTypeWrapper,
  getEventFieldGroupDestination,
  getEventFieldGroupPrice,
  getEventAvailableOffers,
  getEventAvailableDestination
} from '../utils/render.js';
import SmartView from './smart.js';

const editPoint = ({type, basePrice, offers, name, description, pictures}) => (
  `<form class="event event--edit" action="#" method="post">
    <header class="event__header">
      ${getEventTypeWrapper(type)}
      ${getEventFieldGroupDestination(type, name, destinations)}
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

export default class EditPoint extends SmartView {
  constructor(data, functSubmit) {
    super();
    this._data = data;
    this._functSubmit = functSubmit;
    this._bindHandles();
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

  _typeEventHandler(evt) {
    this.updateData({
      type: evt.target.value,
    }, false);
  }

  _nameEventHandler(evt) {
    this.updateData({
      name: evt.target.value,
    }, true);
  }

  _priceEventHandler(evt) {
    this.updateData({
      basePrice: evt.target.value,
    }, true);
  }

  _submitHandler(evt) {
    evt.preventDefault();
    this._functSubmit();
    this._callbackClose(evt);
  }

  restoreHandlers() {
    this.getElement().
      querySelectorAll('.event__type-input').forEach((input) => {
        input.addEventListener('click', this._typeEventHandler);
      });
    this.getElement().
      querySelector('.event__rollup-btn').
      addEventListener('click', this._callbackClose);
    this.getElement().
      querySelector('#event-destination-1').
      addEventListener('input', this._nameEventHandler);
    this.getElement().
      querySelector('#event-price-1').
      addEventListener('input', this._priceEventHandler);
    this.getElement().
      querySelector('.event__save-btn').
      addEventListener('click', this._submitHandler);
  }

  _bindHandles() {
    this._callbackClose = this._callbackClose.bind(this);
    this._typeEventHandler = this._typeEventHandler.bind(this);
    this._submitHandler = this._submitHandler.bind(this);
    this._nameEventHandler = this._nameEventHandler.bind(this);
    this._priceEventHandler = this._priceEventHandler.bind(this);
  }
}
