import {destinations} from '../const.js';
import {
  getEventTypeWrapper,
  getEventFieldGroupDestination,
  getEventFieldGroupTime,
  getEventFieldGroupPrice,
  getEventAvailableDestination
} from '../util.js';
import AbstractView from './abstract.js';

const addNewPointWithoutOffers = ({type, basePrice, description, pictures}) => (
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
      ${getEventAvailableDestination(description, pictures)}
    </section>
  </form>`
);

export default class NewPointWithoutOffers extends AbstractView {
  constructor(data) {
    super();
    this._data = data;
  }

  getTemplate() {
    return addNewPointWithoutOffers(this._data);
  }
}
