import {destinations} from '../const.js';
import {
  getEventTypeWrapper,
  getEventFieldGroupDestination,
  getEventFieldGroupTime,
  getEventFieldGroupPrice,
  getEventAvailableOffers
} from '../utils/render.js';
import AbstractView from './abstract.js';

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

export default class NewPointWithoutDestination extends AbstractView{
  constructor(data) {
    super();
    this._data = data;
  }

  getTemplate() {
    return addNewPointWithoutDestination(this._data);
  }
}
