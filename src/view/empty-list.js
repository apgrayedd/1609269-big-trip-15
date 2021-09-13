import AbstractView from './abstract.js';
import {FilterType} from '../const.js';

const EmptyListTextType = {
  [FilterType.EVERYTHING]: 'Click New Event to create your first point',
  [FilterType.PAST]: 'There are no points at "PAST"',
  [FilterType.FUTURE]: 'There are no points at "FUTURE"',
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

