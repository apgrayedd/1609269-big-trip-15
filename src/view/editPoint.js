import {types} from '../util.js';

const getEventType = (type) => {
  const eventTypeItem = (typeValue) => {
    const lowerTypeValue = typeValue.toLowerCase();
    return `<div class="event__type-item">
      <input id="event-type-${lowerTypeValue}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${lowerTypeValue}">
      <label class="event__type-label  event__type-label--${lowerTypeValue}" for="event-type-${lowerTypeValue}-1">${typeValue}</label>
    </div>`;};
  let eventTypeList = '';
  types.forEach((typeValue) => {
    eventTypeList += eventTypeItem(typeValue);
  });
  return `
  <div class="event__type-wrapper">
    <label class="event__type  event__type-btn" for="event-type-toggle-1">
      <span class="visually-hidden">Choose event type</span>
      <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
    </label>
    <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">
    <div class="event__type-list">
      <fieldset class="event__type-group">
        <legend class="visually-hidden">Event type</legend>
        ${eventTypeList}
      </fieldset>
    </div>
  </div>`;
};

const getEventFieldGroupDestination = (type) => {
  const destinationArr = ['Amsterdam', 'Geneva', 'Chamonix'];
  let destinationList = '';
  destinationArr.forEach((destination) => {
    destinationList += `<option value="${destination}"></option>`;
  });
  return `
  <div class="event__field-group  event__field-group--destination">
    <label class="event__label  event__type-output" for="event-destination-1">
      ${type}
    </label>
    <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="Chamonix" list="destination-list-1">
    <datalist id="destination-list-1">
      ${destinationList}
    </datalist>
  </div>`;
};

const getEventFieldGroupPrice = (basePrice) => `<div class="event__field-group  event__field-group--price">
  <label class="event__label" for="event-price-1">
    <span class="visually-hidden">Price</span>
    &euro;
  </label>
  <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${basePrice}">
</div>`;

const getEventAvailableOffers = (offers) => {
  const eventOffer = ({title,price}) => `<div class="event__offer-selector">
  <input class="event__offer-checkbox  visually-hidden" id="event-offer-luggage-1" type="checkbox" name="event-offer-luggage">
  <label class="event__offer-label" for="event-offer-luggage-1">
    <span class="event__offer-title">${title}</span>
    &plus;&euro;&nbsp;
    <span class="event__offer-price">${price}</span>
  </label>
</div>`;
  let offerList = '';
  offers.forEach((offer) => {
    offerList+=eventOffer(offer);
  });
  return `<section class="event__section  event__section--offers">
  <h3 class="event__section-title  event__section-title--offers">Offers</h3>
    <div class="event__available-offers">
    ${offerList}
  </div>
  </section>`;
};

const getEventAvailableDestination = (description) => (
  `<section class="event__section  event__section--destination">
  <h3 class="event__section-title  event__section-title--destination">Destination</h3>
  <p class="event__destination-description">${description}</p>
</section>`);

export const editPoint = ({type, basePrice, offers, description}) => `<form class="event event--edit" action="#" method="post">
    <header class="event__header">
      ${getEventType(type)}
      ${getEventFieldGroupDestination(type)}
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
  </form>`;
