import {destinations} from '../const.js';
import {
  getEventTypeWrapper,
  getEventFieldGroupDestination,
  getEventFieldGroupTime,
  getEventFieldGroupPrice,
  getEventAvailableOffers,
  createElement
} from '../util.js';

const addNewPointWithoutDestination = ({type, basePrice, offers}) => (
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
    </section>
  </form>`
);

export default class NewPointWithoutDestination {
  constructor(data) {
    this._element = null;
    this._data = data;
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(addNewPointWithoutDestination(this._data));
    }

    return this._element;
  }

  getTemplate() {
    return addNewPointWithoutDestination(this._data);
  }

  removeElement() {
    this._element = null;
  }
}
