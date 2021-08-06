import dayjs from 'dayjs';
import {
  types
} from './const.js';

const MAX_MINUTES_DAY = 1440;
const MAX_MINUTES_HOUR = 60;

function getRandomInt (min, max) {
  return Math.round(min - 0.5 + Math.random() * (max - min + 1));
}

function getTimeFromMins(mins) {
  const days = mins/MAX_MINUTES_DAY >= 1 ? Math.trunc(mins/MAX_MINUTES_DAY) : 0;

  const hours = (mins - days*MAX_MINUTES_DAY)/MAX_MINUTES_HOUR >= 1
    ? Math.trunc((mins - days*MAX_MINUTES_DAY)/MAX_MINUTES_HOUR) : 0;

  const minutes = (mins - days*MAX_MINUTES_DAY - hours*MAX_MINUTES_HOUR) >= 1
    ? Math.ceil(mins - days*MAX_MINUTES_DAY - hours*MAX_MINUTES_HOUR) : 0;

  let str = days ? `${days}D ` : '';
  str += hours || days ? `${hours}H ` : '';
  str += `${minutes}M`;
  return str;
}

function getStrFromArr (arr, functOnArrItems, firstItem = '') {
  return arr.reduce((str,arrItem) => {
    arrItem = functOnArrItems ? functOnArrItems(arrItem) : arrItem;
    return str + arrItem;
  },firstItem);
}

// Adapters

const timeAdapter = (date, format) => dayjs(date === 'now' ? undefined : date).format(format);
const timeAdapterDiff = (date1, date2, unit = 'minute') => dayjs(date1).diff(dayjs(date2), unit);

const dataAdapter = (...data) => {
  const  dataFormat = data.reduce((obj, current) => Object.assign(obj,current), {});
  return dataFormat;
};

// Сreating Items

const eventTypeItem = (typeValue) => {
  const lowerTypeValue = typeValue.toLowerCase();
  return `<div class="event__type-item">
    <input id="event-type-${lowerTypeValue}-1" class="event__type-input
    visually-hidden" type="radio" name="event-type" value="${lowerTypeValue}">
    <label class="event__type-label  event__type-label--${lowerTypeValue}"
    for="event-type-${lowerTypeValue}-1">${typeValue}</label>
  </div>`;
};

const destinationItem = (destination) => `<option value="${destination}"></option>`;

const offerItem = ({title,price}) => (
  `<div class="event__offer-selector">
    <input class="event__offer-checkbox  visually-hidden"
    id="event-offer-luggage-1" type="checkbox" name="event-offer-luggage">
    <label class="event__offer-label" for="event-offer-luggage-1">
      <span class="event__offer-title">${title}</span>
      &plus;&euro;&nbsp;
      <span class="event__offer-price">${price}</span>
    </label>
  </div>`);

const getPicturesItem = ({src,imgDescription}) => (
  `<img class="event__photo" src="${src}" alt="${imgDescription}">`
);

// Creating big blocks

const getEventFieldGroupDestination = (type, destinationArr) => (
  `<div class="event__field-group  event__field-group--destination">
    <label class="event__label  event__type-output" for="event-destination-1">
      ${type}
    </label>
    <input class="event__input  event__input--destination" id="event-destination-1"
    type="text" name="event-destination" value="Chamonix" list="destination-list-1">
    <datalist id="destination-list-1">
      ${getStrFromArr(destinationArr,destinationItem)}
    </datalist>
  </div>`);

const getEventFieldGroupPrice = (basePrice) => `
<div class="event__field-group  event__field-group--price">
  <label class="event__label" for="event-price-1">
    <span class="visually-hidden">Price</span>
    &euro;
  </label>
  <input class="event__input  event__input--price" id="event-price-1"
  type="text" name="event-price" value="${basePrice}">
</div>`;

const getEventAvailableOffers = (offers) => (
  `<section class="event__section  event__section--offers">
    <h3 class="event__section-title  event__section-title--offers">Offers</h3>
    <div class="event__available-offers">
      ${getStrFromArr(offers, offerItem)}
    </div>
  </section>`);

const getEventAvailableDestination = (eventDescription, pictures) => {
  const picturesList = pictures
    ? (
      `<div class="event__photos-tape">
        <div class="event__photos-container">
          ${getStrFromArr(pictures, getPicturesItem)}
        </div>
      </div>`)
    : '';

  return (
    `<section class="event__section  event__section--destination">
      <h3 class="event__section-title  event__section-title--destination">Destination</h3>
      <p class="event__destination-description">${eventDescription}</p>
        ${picturesList}
    </section>`);
};

const getEventTypeWrapper = (type) => (
  `<div class="event__type-wrapper">
    <label class="event__type  event__type-btn" for="event-type-toggle-1">
      <span class="visually-hidden">Choose event type</span>
      <img class="event__type-icon" width="17" height="17"
      src="img/icons/${type}.png" alt="Event type icon">
    </label>
    <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">
    <div class="event__type-list">
      <fieldset class="event__type-group">
        <legend class="visually-hidden">Event type</legend>
        ${getStrFromArr(types,eventTypeItem)}
      </fieldset>
    </div>
  </div>`
);

export {
  dataAdapter,
  timeAdapter,
  timeAdapterDiff,
  getRandomInt,
  getStrFromArr,
  getTimeFromMins,
  getEventTypeWrapper,
  getEventFieldGroupDestination,
  getEventFieldGroupPrice,
  getEventAvailableOffers,
  getEventAvailableDestination
};
