import dayjs from 'dayjs';

export const types = ['Taxi', 'Bus', 'Train', 'Ship', 'Drive', 'Flight', 'Check-in', 'Sightseeing', 'Restaurant'];
export const destinations = ['Amsterdam', 'Geneva', 'Chamonix'];
export const filters = ['Everything', 'Future', 'Past'];
export const controls = ['Table', 'Stats'];
export const sorts = ['sort-day', 'sort-event', 'sort-time', 'sort-price', 'sort-offers'];
export const dateStandartFormat = 'YYYY-MM-DDTHH:mm:ss';
export const UserAction = {
  UPDATE_POINT: 'UPDATE_POINT',
  ADD_POINT: 'ADD_POINT',
  DELETE_POINT: 'DELETE_POINT',
};
export const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
};
export const SortType = {
  DEFAULT:{name: 'sort-event',funct: (point) => point} ,
  PRICE_DOWN:{name: 'sort-price',funct: (pointA, pointB) => (pointA.basePrice - pointB.basePrice)},
  TIME_DOWN:{name: 'sort-time',funct: (pointA, pointB) => dayjs(pointA.dateFrom).diff(dayjs(pointB.dateFrom))},
};
export const FilterType = {
  EVERYTHING: 'everything',
  FUTURE: 'future',
  PAST: 'past',
};
export const NavType = {
  TABLE: 'Table',
  STATS: 'Stats',
};
