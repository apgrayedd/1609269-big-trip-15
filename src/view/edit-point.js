import {destinations} from '../const.js';
import {
  getEventTypeWrapper,
  getEventFieldGroupDestination,
  getEventFieldGroupPrice,
  getEventAvailableOffers,
  getEventAvailableDestination
} from '../utils/render.js';
import AbstractView from './abstract.js';

const editPoint = ({type, basePrice, offers, description, pictures}) => (
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
      ${getEventAvailableDestination(description, pictures)}
    </section>
  </form>`
);

export default class EditPoint extends AbstractView {
  constructor(data) {
    super();
    this._data = data;
    this._callbackClose = this._callbackClose.bind(this);
  }

  getTemplate() {
    return editPoint(this._data);
  }

  _callbackClose(evt) {
    evt.preventDefault();
    this._callback.close();
  }

  setHandlerClose (callback) {
    this._callback.close = callback;
    this.getElement().querySelector('.event__rollup-btn').addEventListener('click', this._callbackClose);
  }
}
