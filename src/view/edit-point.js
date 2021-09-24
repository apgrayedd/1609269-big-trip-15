import {
  DATE_STANDARD_FORMAT
} from '../const.js';
import {
  getEventTypeWrapperTemplate,
  getEventFieldGroupDestinationTemplate,
  getEventFieldGroupPriceTemplate,
  getEventAvailableOffersTemplate,
  getEventAvailableDestinationTemplate,
  getEventFieldGroupTimeTemplate,
  createElement,
  replace,
  render,
  RenderPosition
} from '../utils/render.js';
import {
  getValuesFromListByKey,
  matchValidationInteger
} from '../utils/common.js';
import SmartView from './smart.js';
import flatpickr from 'flatpickr';
import '../../node_modules/flatpickr/dist/themes/dark.css';

import customParseFormat from 'dayjs/plugin/customParseFormat';
import dayjs from 'dayjs';
dayjs.extend(customParseFormat);

const INT_RADIX = 10;

const dataForNewPoint = {
  type: 'Taxi',
  destination: {
    description: 'Desition',
    pictures: [],
    name: 'New point',
  },
  name: 'New point',
  dateFrom: dayjs(),
  dateTo: dayjs(),
  basePrice: 0,
  offers: [],
};

const getEditPointTemplate = (types, destinations, offersData, {type, basePrice, offers, name, destination, dateFrom, dateTo}) => (
  `<form class="event event--edit" action="#" method="post">
    <header class="event__header">
      ${getEventTypeWrapperTemplate(types, type)}
      ${getEventFieldGroupDestinationTemplate(type, name, destinations)}
      ${getEventFieldGroupTimeTemplate(dateFrom, dateTo)}
      ${getEventFieldGroupPriceTemplate(basePrice)}
      <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
      <button class="event__reset-btn" type="reset">Delete</button>
      <button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>
    </header>
    <section class="event__details">
      ${getEventAvailableOffersTemplate(offersData, offers)}
      ${getEventAvailableDestinationTemplate(destination)}
    </section>
  </form>`
);

export default class EditPoint extends SmartView {
  constructor(constModel, data = dataForNewPoint) {
    super();
    this._data = data;
    this._constModel = constModel;
    this._dateStartPicker = null;
    this._dateEndPicker = null;

    this._bindHandles();
    this.restoreHandlers();
    this._disableSaveBtn();
  }

  getTemplate() {
    return getEditPointTemplate(
      this._constModel.getTypes(),
      getValuesFromListByKey(this._constModel.getDestinations(), 'name'),
      this._constModel.getOffers(this._data.type),
      this._data,
    );
  }

  _closeHandler(evt) {
    evt.preventDefault();
    this._callbacks.close();
  }

  setHandlerClose (callback) {
    this._callbacks.close = callback;
    this.getElement().querySelector('.event__rollup-btn').addEventListener('click', this._closeHandler);
  }

  _deleteHandler(evt) {
    evt.preventDefault();
    this._callbacks.delete(this._data);
  }

  setHandlerDelete (callback) {
    this._callbacks.delete = callback;
    this.getElement().querySelector('.event__reset-btn').addEventListener('click', this._deleteHandler);
  }

  _typeEventHandler(evt) {
    this.updateData({
      type: evt.target.value,
    }, false);

    this._changeOffers(evt.target.value);
    this._changeDestination();
  }

  _disableSaveBtn() {
    const saveBtnElement = this.getElement().querySelector('.event__save-btn');
    if (
      !this.checkInputDestination() &&
      !this.checkInputPrice() &&
      !this.checkInputDate()
    ) {
      saveBtnElement.disabled = false;
      return;
    }
    saveBtnElement.disabled = true;
  }

  checkInputDate() {
    const dateFrom = dayjs(
      this.getElement().querySelector('#event-start-time-1').value,
      'DD/MM/YYYY HH:mm',
    );
    const dateTo = dayjs(
      this.getElement().querySelector('#event-end-time-1').value,
      'DD/MM/YYYY HH:mm',
    );

    if (dateTo.diff(dateFrom) < 0) {
      return 'Дата начала должна меньше даты окончания';
    }

    return false;
  }

  checkInputDestination() {
    return this.getElement().querySelector('#event-destination-1').value.length <= 0
      ? 'Имя должно содержать хотя бы 1 символ'
      : '';
  }

  checkInputPrice() {
    return matchValidationInteger(this.getElement().querySelector('#event-price-1').value, 0);
  }

  _changeDestination() {
    const inputDestinationValue = this.getElement().querySelector('#event-destination-1').value;
    const destinationsData = this._constModel.getDestinations();

    if (getValuesFromListByKey(destinationsData, 'name').includes(inputDestinationValue)) {
      for (const destinationItem of destinationsData) {
        if (inputDestinationValue === destinationItem.name){
          const newDestinationElement = createElement(
            getEventAvailableDestinationTemplate(destinationItem));
          const prevDestinationElement = this.getElement()
            .querySelector('.event__section--destination');
          if(prevDestinationElement !== null) {
            replace(newDestinationElement, prevDestinationElement);
            return;
          }
          const eventDetailsElement = this.getElement()
            .querySelector('.event__details');
          render(eventDetailsElement, newDestinationElement, RenderPosition.AFTERBEGIN);
        }
      }
    }
  }

  _changeOffers(activeType) {
    const offers = this._constModel.getOffers();

    if (getValuesFromListByKey(offers, 'type').includes(activeType)) {
      for (const offersItem of offers) {
        if (activeType === offersItem.type) {
          const newOffersElement = createElement(
            getEventAvailableOffersTemplate(offersItem.offers, this._data.offers));
          const prefOffersElement = this.getElement()
            .querySelector('.event__section--offers');
          if (prefOffersElement !== null) {
            replace(newOffersElement, prefOffersElement);
            return;
          }
          const eventDetailsElement = this.getElement()
            .querySelector('.event__details');
          render(eventDetailsElement, newOffersElement, RenderPosition.BEFOREEND);
        }
      }
    }
  }

  _nameEventHandler(evt) {
    this._disableSaveBtn();
    if (this.checkInputDestination()) {
      evt.target.setCustomValidity(this.checkInputDestination());
      evt.target.reportValidity();
      return;
    }
    this.updateData({
      name: evt.target.value,
    }, true);
    evt.target.setCustomValidity('');
    evt.target.reportValidity();
    this._changeDestination();
  }

  _priceEventHandler(evt) {
    this._disableSaveBtn();
    if (!this.checkInputPrice()) {
      this.updateData({
        basePrice: parseInt(evt.target.value, INT_RADIX),
      }, true);
      evt.target.setCustomValidity('');
      evt.target.reportValidity();
      return;
    }
    evt.target.setCustomValidity(this.checkInputPrice());
    evt.target.reportValidity();
  }

  _dateStartEventHandler([date]) {
    this._disableSaveBtn();
    if (!this.checkInputDate()) {
      this.updateData({
        dateFrom: dayjs(date).format(DATE_STANDARD_FORMAT),
      }, true);
    }
  }

  _dateEndEventHandler([date]) {
    this._disableSaveBtn();
    if (!this.checkInputDate()) {
      this.updateData({
        dateTo: dayjs(date).format(DATE_STANDARD_FORMAT),
      }, true);
    }
  }

  _submitHandler(evt) {
    evt.preventDefault();
    this._data.destination.name = this._data.name;
    this._callbacks.submit(this._data);
  }

  setSubmitClick(callback) {
    this._callbacks.submit = callback;
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
      addEventListener('click', this._closeHandler);
    this.getElement().
      querySelector('#event-destination-1').
      addEventListener('input', this._nameEventHandler);
    this.getElement().
      querySelector('#event-price-1').
      addEventListener('input', this._priceEventHandler);
    this.setSubmitClick(this._callbacks.submit);
    this._addDatePicker(this._dateStartPicker, '#event-start-time-1', this._dateStartEventHandler);
    this._addDatePicker(this._dateEndPicker, '#event-end-time-1', this._dateEndEventHandler);
  }

  _bindHandles() {
    this._deleteHandler = this._deleteHandler.bind(this);
    this._closeHandler = this._closeHandler.bind(this);
    this._typeEventHandler = this._typeEventHandler.bind(this);
    this._submitHandler = this._submitHandler.bind(this);
    this._nameEventHandler = this._nameEventHandler.bind(this);
    this._priceEventHandler = this._priceEventHandler.bind(this);
    this._dateStartEventHandler = this._dateStartEventHandler.bind(this);
    this._dateEndEventHandler = this._dateEndEventHandler.bind(this);
  }
}
