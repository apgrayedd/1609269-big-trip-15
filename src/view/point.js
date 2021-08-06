import {
  getTimeFromMins,
  getStrFromArr,
  timeAdapter,
  timeAdapterDiff
} from '../util.js';

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
  `<h4 class="visually-hidden">Offers:</h4>
  <ul class="event__selected-offers">
   ${getStrFromArr(offers, getEventOffer)}
  </ul>`
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

const getEventTitle = (type, destination) => `<h3 class="event__title">${type} ${destination}</h3>`;
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

export default class Point {
  constructor(data) {
    this._element = null;
    this._data = data;
  }

  getElement() {
    if (!this._element) {
      this._element = point(this._data);
    }

    return this._element;
  }

  clearElement() {
    this._element = null;
  }
}
