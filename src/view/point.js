import dayjs from 'dayjs';
import {
  getTimeFromMins
} from '../util.js';

const getEventTime = (dateFrom, dayTo) => {
  const dateFromPatt = dayjs(dateFrom);
  const dateEndPatt = dayjs(dayTo);
  const dateStartDateTime = dateFromPatt.format('YYYY-MM-DDTHH:mm');
  const dateStartTime = dateFromPatt.format('HH-mm');
  const dateEndDateTime = dateEndPatt.format('YYYY-MM-DDTHH:mm');
  const dateEndTime = dateEndPatt.format('HH-mm');
  const duration = getTimeFromMins(dateEndPatt.diff(dateFromPatt, 'minute'));
  return `
  <div class="event__schedule">
    <p class="event__time">
      <time class="event__start-time" datetime="${dateStartDateTime}">${dateStartTime}</time>
      &mdash;
      <time class="event__end-time" datetime="${dateEndDateTime}">${dateEndTime}</time>
    </p>
    <p class="event__duration">${duration}</p>
  </div>`;
};

const getEventOffers = (offers) => {
  const getEventOffer = ({title, price}) => (`
  <li class="event__offer">
    <span class="event__offer-title">${title}</span>
    &plus;&euro;&nbsp;
    <span class="event__offer-price">${price}</span>
  </li>`
  );
  let offerList = '';
  offers.forEach((offer) => {
    offerList += getEventOffer(offer);
  });
  return `<h4 class="visually-hidden">Offers:</h4>
  <ul class="event__selected-offers">
   ${offerList}
  </ul>`;
};

export const point = ({basePrice, destination, type, dateFrom, dateTo, offers, isFavorite}) => {
  const dateForDateTime = dayjs(dateFrom).format('YYYY-MM-DD');
  const dateForTime = dayjs(dateFrom).format('MMM D');
  return `
  <li class="trip-events__item">
    <div class="event">
      <time class="event__date" datetime="${dateForDateTime}">${dateForTime}</time>
      <div class="event__type">
        <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon"/>
      </div>
      <h3 class="event__title">${type} ${destination}</h3>
      ${getEventTime(dateFrom, dateTo)}
      <p class="event__price">
        &euro;&nbsp;<span class="event__price-value">${basePrice}</span>
      </p>
      ${getEventOffers(offers)}
      <button class="event__favorite-btn${isFavorite ? ' event__favorite-btn--active' : ''}" type="button">
        <span class="visually-hidden">Add to favorite</span>
        <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
          <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
        </svg>
      </button>
      <button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>
    </div>
  </li>`;
};
