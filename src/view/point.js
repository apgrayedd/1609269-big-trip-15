import {
  getTimeFromMins,
  getStrFromArr
} from '../utils/common.js';
import {
  timeAdapter,
  timeAdapterDiff
} from '../utils/adapters.js';
import SmartView from './smart.js';

const getEventDate = (dateFrom) => {
  const dateForDateTime = timeAdapter(dateFrom, 'YYYY-MM-DD');
  const dateForTime = timeAdapter(dateFrom, 'MMM D');
  return `<time class="event__date" datetime="${dateForDateTime}">${dateForTime}</time>`;
};

const getEventSchedule = (dateFrom, dayTo) => {
  const dateStartDateTime = timeAdapter(dateFrom,'YYYY-MM-DDTHH:mm');
  const dateStartTime = timeAdapter(dateFrom, 'HH-mm');
  const dateEndDateTime = timeAdapter(dayTo, 'YYYY-MM-DDTHH:mm');
  const dateEndTime = timeAdapter(dayTo, 'HH-mm');
  const duration = getTimeFromMins(timeAdapterDiff(dateEndDateTime, dateStartDateTime));
  return (
    `<div class="event__schedule">
      <p class="event__time">
        <time class="event__start-time" datetime="${dateStartDateTime}">${dateStartTime}</time>
        &mdash;
        <time class="event__end-time" datetime="${dateEndDateTime}">${dateEndTime}</time>
      </p>
      <p class="event__duration">${duration}</p>
    </div>`
  );
};

const getEventOffer = ({title, price}) => (
  `<li class="event__offer">
    <span class="event__offer-title">${title}</span>
    &plus;&euro;&nbsp;
    <span class="event__offer-price">${price}</span>
  </li>`
);

const getEventOffers = (offers) => (
  getStrFromArr(offers, getEventOffer)
    ? `<h4 class="visually-hidden">Offers:</h4>
        <ul class="event__selected-offers">
          ${getStrFromArr(offers, getEventOffer)}
        </ul>`
    : ''
);

const getEventType = (type) => (
  `<div class="event__type">
    <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon"/>
  </div>`
);

const getEventPrice = (price) => (
  `<p class="event__price">
    &euro;&nbsp;<span class="event__price-value">${price}</span>
  </p>`
);

const getEventTitle = (type, {name}) => `<h3 class="event__title">${type} ${name}</h3>`;
const getEventFavoriteBtn = (isFavorite) => (
  `<button class="event__favorite-btn${isFavorite ? ' event__favorite-btn--active' : ''}" type="button">
    <span class="visually-hidden">Add to favorite</span>
    <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
      <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688
      14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
    </svg>
  </button>`
);
const point = ({basePrice, destination, type, dateFrom, dateTo, offers, isFavorite}) => (
  `<li class="trip-events__item">
    <div class="event">
      ${getEventDate(dateFrom)}
      ${getEventType(type)}
      ${getEventTitle(type, destination)}
      ${getEventSchedule(dateFrom, dateTo)}
      ${getEventPrice(basePrice)}
      ${getEventOffers(offers)}
      ${getEventFavoriteBtn(isFavorite)}
      <button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>
    </div>
  </li>`
);

export default class Point extends SmartView {
  constructor(data) {
    super();
    this._data = data;

    this._callback = {};
    this._bindHandles();
    this.restoreHandlers();
  }

  getDate() {
    return {
      dateFrom: this._data.dateFrom,
      dateTo: this._data.dateTo,
    };
  }

  getTemplate() {
    return point(this._data);
  }

  _callbackOpen(evt) {
    evt.preventDefault();
    this._callback.open();
  }

  setHandlerOpen (callback) {
    this._callback.open = callback;
    this.getElement().querySelector('.event__rollup-btn').addEventListener('click', this._callbackOpen);
  }

  _callbackFavorite(evt) {
    evt.preventDefault();
    this._callback.addFavorite();
  }

  setHandlerFavorite (callback) {
    this._callback.addFavorite = callback;
    this.getElement().querySelector('.event__favorite-btn').addEventListener('click', this._callbackFavorite);
  }

  restoreHandlers() {
    this.getElement().
      querySelector('.event__favorite-btn').
      addEventListener('click', this._callbackFavorite);
    this.getElement().
      querySelector('.event__rollup-btn').
      addEventListener('click', this._callbackOpen);
  }

  _bindHandles() {
    this._callbackFavorite = this._callbackFavorite.bind(this);
    this._callbackOpen = this._callbackOpen.bind(this);
  }
}
