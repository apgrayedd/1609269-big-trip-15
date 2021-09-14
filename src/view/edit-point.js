import {
  destinations,
  dateStandartFormat
} from '../const.js';
import {
  getEventTypeWrapper,
  getEventFieldGroupDestination,
  getEventFieldGroupPrice,
  getEventAvailableOffers,
  getEventAvailableDestination,
  getEventFieldGroupTime
} from '../utils/render.js';
import SmartView from './smart.js';
import flatpickr from 'flatpickr';
import '../../node_modules/flatpickr/dist/flatpickr.min.css';
import dayjs from 'dayjs';

const dataForNewPoint = {
  type: 'Taxi',
  name: '',
  destinations: '',
  pictures: '',
  dateFrom: dayjs(),
  dateTo: dayjs(),
  basePrice: 0,
  offers: [],
  description: '',
};

const editPoint = ({type, basePrice, offers, name, description, pictures, dateFrom, dateTo}) => (
  `<form class="event event--edit" action="#" method="post">
    <header class="event__header">
      ${getEventTypeWrapper(type)}
      ${getEventFieldGroupDestination(type, name, destinations)}
      ${getEventFieldGroupTime(dateFrom, dateTo)}
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
  constructor(data = dataForNewPoint) {
    super();
    this._data = data;
    this._dateStartPicker = null;
    this._dateEndPicker = null;

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

  _callbackDelete(evt) {
    evt.preventDefault();
    this._callback.delete(this._data);
  }

  setHandlerDelete (callback) {
    this._callback.delte = callback;
    this.getElement().querySelector('.event__reset-btn').addEventListener('click', this._callbackDelete);
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

  _dateStartEventHandler([date]) {
    this.updateData({
      dateFrom: dayjs(date).format(dateStandartFormat),
    }, true);
  }

  _dateEndEventHandler([date]) {
    this.updateData({
      dateTo: dayjs(date).format(dateStandartFormat),
    }, true);
  }

  _submitHandler(evt) {
    evt.preventDefault();
    this._callback.submit(this._data);
    this._callbackClose(evt);
  }

  setSubmitClick(callback) {
    this._callback.submit = callback;
    this.getElement().querySelector('.event__save-btn').addEventListener('click', this._submitHandler);
  }

  _addDatePicker(datePicker, dateClicker, dateHandler) {
    if (datePicker) {
      datePicker.destroy();
      datePicker = null;
    }
    datePicker = flatpickr(
      this.getElement().querySelector(dateClicker),
      {
        dateFormat: 'd/m/Y H:i',
        onChange: dateHandler,
        enableTime: true,
      },
    );
  }

  removeElement() {
    super.removeElement();

    if(this._dateStartPicker) {
      this._dateStartPicker.destroy();
      this._dateStartPicker = null;
    }
    if (this._dateEndPicker) {
      this._dateEndPicker.destroy();
      this._dateEndPicker = null;
    }
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
    this.setSubmitClick(this._callback.submit);
    this._addDatePicker(this._dateStartPicker, '#event-start-time-1', this._dateStartEventHandler);
    this._addDatePicker(this._dateEndPicker, '#event-end-time-1', this._dateEndEventHandler);
  }

  _bindHandles() {
    this._callbackClose = this._callbackClose.bind(this);
    this._typeEventHandler = this._typeEventHandler.bind(this);
    this._submitHandler = this._submitHandler.bind(this);
    this._nameEventHandler = this._nameEventHandler.bind(this);
    this._priceEventHandler = this._priceEventHandler.bind(this);
    this._dateStartEventHandler = this._dateStartEventHandler.bind(this);
    this._dateEndEventHandler = this._dateEndEventHandler.bind(this);
  }
}
