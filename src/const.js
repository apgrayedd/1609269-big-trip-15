import dayjs from 'dayjs';

export const CONTROLS = ['Table', 'Stats'];
export const SORTS = ['sort-day', 'sort-event', 'sort-time', 'sort-price', 'sort-offers'];
export const DATE_STANDARD_FORMAT = 'YYYY-MM-DDTHH:mm:ss';
export const UserActions = {
  UPDATE_POINT: 'UPDATE_POINT',
  ADD_POINT: 'ADD_POINT',
  DELETE_POINT: 'DELETE_POINT',
};
export const UpdateTypes = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
  INIT: 'INIT',
};
export const SortTypes = {
  EVENT_DOWN:{name: 'sort-event',funct: (pointA, pointB) => pointA.destination.name.localeCompare(pointB.destination.name)},
  PRICE_DOWN:{name: 'sort-price',funct: (pointA, pointB) => (pointA.basePrice - pointB.basePrice)},
  TIME_DOWN:{name: 'sort-time',funct: (pointA, pointB) => dayjs(pointA.dateFrom).diff(dayjs(pointB.dateFrom))},
};
export const FilterTypes = {
  EVERYTHING: 'everything',
  FUTURE: 'future',
  PAST: 'past',
};
export const NavTypes = {
  TABLE: 'Table',
  STATS: 'Stats',
};
