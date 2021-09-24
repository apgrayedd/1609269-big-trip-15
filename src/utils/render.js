import Abstract from '../view/abstract.js';
import {timeAdapter} from './adapters.js';
import {compareLists, getStrFromValues, getValuesFromListByKey} from './common.js';
import he from 'he';

export const RenderPosition = {
  AFTERBEGIN: 'afterbegin',
  BEFOREEND: 'beforeend',
};

export const render = (container, element, place) => {
  if (element instanceof Abstract) {
    element = element.getElement();
  }

  switch(place){
    case RenderPosition.BEFOREEND:
      container.prepend(element);
      break;
    case RenderPosition.AFTERBEGIN:
      container.append(element);
      break;
  }
};

export const createElement = (template) => {
  const newElement = document.createElement('div'); // 1
  newElement.innerHTML = template; // 2

  return newElement.firstChild; // 3
};

export const replace = (newElement, oldElement) => {
  if (newElement instanceof Abstract) {
    newElement = newElement.getElement();
  }

  if (oldElement instanceof Abstract) {
    oldElement = oldElement.getElement();
  }

  const parent = oldElement.parentElement;

  if (!parent || !newElement || !oldElement) {
    throw new Error('Не все эдементы в replace() определены.');
  }

  parent.replaceChild(newElement, oldElement);
};

export const remove = (component) => {
  if (component === null) {
    return;
  }

  if (!(component instanceof Abstract)) {
    throw new Error('Can remove only components');
  }

  component.getElement().remove();
  component.removeElement();
};

// Creating Items

export const getEventTypeItemTemplate = (typeValue) => {
  const lowerTypeValue = typeValue.toLowerCase();
  return `<div class="event__type-item">
    <input id="event-type-${lowerTypeValue}-1" class="event__type-input
    visually-hidden" type="radio" name="event-type" value="${lowerTypeValue}">
    <label class="event__type-label  event__type-label--${lowerTypeValue}"
    for="event-type-${lowerTypeValue}-1">${typeValue}</label>
  </div>`;
};

export const getDestinationItemTemplate = (destination) => `<option value="${he.encode(destination)}"></option>`;

export const getOfferItemTemplate = ({title,price}, count) => (
  `<div class="event__offer-selector">
    <input class="event__offer-checkbox  visually-hidden"
    id="event-offer-luggage-${count}" type="checkbox" name="event-offer-luggage">
    <label class="event__offer-label" for="event-offer-luggage-${count}">
      <span class="event__offer-title">${title}</span>
      &plus;&euro;&nbsp;
      <span class="event__offer-price">${price}</span>
    </label>
  </div>`);

export const getOfferActiveItemTemplate = ({title,price}, count) => (
  `<div class="event__offer-selector">
    <input class="event__offer-checkbox  visually-hidden"
    id="event-offer-luggage-${count}" type="checkbox" name="event-offer-luggage" checked>
    <label class="event__offer-label" for="event-offer-luggage-${count}">
      <span class="event__offer-title">${title}</span>
      &plus;&euro;&nbsp;
      <span class="event__offer-price">${price}</span>
    </label>
  </div>`);

export const getPicturesItemTemplate = ({src,imgDescription}) => (
  `<img class="event__photo" src="${src}" alt="${imgDescription}">`
);

// Creating big blocks

export const getEventDateTemplate = (dateFrom) => {
  const dateForDateTime = timeAdapter(dateFrom, 'YYYY-MM-DD');
  const dateForTime = timeAdapter(dateFrom, 'MMM D');
  return `<time class="event__date" datetime="${dateForDateTime}">${dateForTime}</time>`;
};

export const getEventFieldGroupDestinationTemplate = (type, name, destinationArr) => (
  `<div class="event__field-group  event__field-group--destination">
    <label class="event__label  event__type-output" for="event-destination-1">
      ${type}
    </label>
    <input class="event__input  event__input--destination" id="event-destination-1"
    type="text" name="event-destination" value="${name}" list="destination-list-1">
    <datalist id="destination-list-1">
      ${getStrFromValues(destinationArr,getDestinationItemTemplate)}
    </datalist>
  </div>`);

export const getEventFieldGroupPriceTemplate = (basePrice) => `
<div class="event__field-group  event__field-group--price">
  <label class="event__label" for="event-price-1">
    <span class="visually-hidden">Price</span>
    &euro;
  </label>
  <input class="event__input  event__input--price" id="event-price-1"
  type="text" name="event-price" value="${basePrice}" autocomplete = "off">
</div>`;

export const getEventAvailableOffersTemplate = (offers, activeOffers) => {
  console.log(offers)
  console.log(activeOffers)
  console.log(compareLists(
    getValuesFromListByKey(offers, 'title'),
    getValuesFromListByKey(activeOffers, 'title')));

  return getStrFromValues(offers, getOfferItemTemplate)
    ? `<section class="event__section  event__section--offers">
        <h3 class="event__section-title  event__section-title--offers">Offers</h3>
        <div class="event__available-offers">
          ${getStrFromValues(offers, getOfferItemTemplate, activeOffers, getOfferActiveItemTemplate)}
        </div>
      </section>`
    : '';
};

export const getEventAvailableDestinationTemplate = ({description, pictures}) => {
  const picturesList = getStrFromValues(pictures, getPicturesItemTemplate)
    ? (
      `<div class="event__photos-container">
        <div class="event__photos-tape">
          ${getStrFromValues(pictures, getPicturesItemTemplate)}
        </div>
      </div>`)
    : '';
  const descriptionText = description
    ? `<p class="event__destination-description">${description}</p>`
    : '';

  return (
    picturesList || descriptionText
      ? (
        `<section class="event__section  event__section--destination">
          <h3 class="event__section-title  event__section-title--destination">Destination</h3>
          ${descriptionText}
          ${picturesList}
        </section>`)
      : '');
};

export const getEventTypeWrapperTemplate = (types, type) => (
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
        ${getStrFromValues(types, getEventTypeItemTemplate)}
      </fieldset>
    </div>
  </div>`
);

export const getEventFieldGroupTimeTemplate = (dateFrom, dateTo) => (
  `<div class="event__field-group  event__field-group--time">
    <label class="visually-hidden" for="event-start-time-1">From</label>
    <input class="event__input  event__input--time" id="event-start-time-1"
    type="text" name="event-start-time" value="${he.encode(timeAdapter(dateFrom,'DD/MM/YYYY HH:mm'))}">
    &mdash;
    <label class="visually-hidden" for="event-end-time-1">To</label>
    <input class="event__input  event__input--time" id="event-end-time-1"
    type="text" name="event-end-time" value="${he.encode(timeAdapter(dateTo,'DD/MM/YYYY HH:mm'))}">
  </div>`
);
