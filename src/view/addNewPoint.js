import {destinations} from '../const.js';
import {
  getEventTypeWrapper,
  getEventFieldGroupDestination,
  getEventFieldGroupPrice,
  getEventAvailableOffers,
  getEventAvailableDestination,
  getEventFieldGroupTime,
  createElement
} from '../util.js';

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
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  getTemplate() {
    return addNewPoint(this._data);
  }

  removeElement() {
    this._element = null;
  }
}
