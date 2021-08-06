import {destinations} from '../const.js';
import {
  getEventTypeWrapper,
  getEventFieldGroupDestination,
  getEventFieldGroupPrice,
  getEventAvailableOffers,
  getEventAvailableDestination
} from '../util.js';

const editPoint = ({type, basePrice, offers, description}) => (
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
      ${getEventAvailableDestination(description)}
    </section>
  </form>`
);

export default class EditPoint {
  constructor(data) {
    this._element = null;
    this._data = data;
  }

  getElement() {
    if (!this._element) {
      this._element = editPoint(this._data);
    }

    return this._element;
  }

  clearElement() {
    this._element = null;
  }
}
