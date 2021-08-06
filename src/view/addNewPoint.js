import {destinations} from '../const.js';
import {
  timeAdapter,
  getEventTypeWrapper,
  getEventFieldGroupDestination,
  getEventFieldGroupPrice,
  getEventAvailableOffers,
  getEventAvailableDestination
} from '../util.js';

const getEventFieldGroupTime = () => (
  `<div class="event__field-group  event__field-group--time">
    <label class="visually-hidden" for="event-start-time-1">From</label>
    <input class="event__input  event__input--time" id="event-start-time-1"
    type="text" name="event-start-time" value="${timeAdapter('now','DD/MM/YYYY HH:mm')}">
    &mdash;
    <label class="visually-hidden" for="event-end-time-1">To</label>
    <input class="event__input  event__input--time" id="event-end-time-1"
    type="text" name="event-end-time" value="${timeAdapter('now','DD/MM/YYYY HH:mm')}">
  </div>`
);

export const addNewPoint = ({type, basePrice, offers, description, pictures}) => (
  `<form class="event event--edit" action="#" method="post">
    <header class="event__header">
      ${getEventTypeWrapper(type)}
      ${getEventFieldGroupDestination(type, destinations)}
      ${getEventFieldGroupTime()}
      ${getEventFieldGroupPrice(basePrice)}
      <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
      <button class="event__reset-btn" type="reset">Cancel</button>
    </header>
    <section class="event__details">
      ${getEventAvailableOffers(offers)}
      ${getEventAvailableDestination(description, pictures)}
    </section>
  </form>`
);

export default class NewPoint {
  constructor(data) {
    this._element = null;
    this._data = data;
  }

  getElement() {
    if (!this._element) {
      this._element = addNewPoint(this._data);
    }

    return this._element;
  }

  clearElement() {
    this._element = null;
  }
}
