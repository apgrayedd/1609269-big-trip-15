import AbstractView from './abstract.js';
import {FilterTypes} from '../const.js';

const EmptyListTextType = {
  [FilterTypes.EVERYTHING]: 'Click New Event to create your first point',
  [FilterTypes.PAST]: 'There are no points at "PAST"',
  [FilterTypes.FUTURE]: 'There are no points at "FUTURE"',
};
const getEmptyList = (filterType) => {
  const textForEmptyList = EmptyListTextType[filterType];

  return `<p class="trip-events__msg">${textForEmptyList}</p>`;
};

export default class EmptyList extends AbstractView {
  constructor(filterType) {
    super();
    this._filterType = filterType;
  }

  getTemplate() {
    return getEmptyList(this._filterType);
  }
}

