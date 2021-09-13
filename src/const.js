import dayjs from 'dayjs';

export const types = ['Taxi', 'Bus', 'Train', 'Ship', 'Drive', 'Flight', 'Check-in', 'Sightseeing', 'Restaurant'];
export const destinations = ['Amsterdam', 'Geneva', 'Chamonix'];
export const filters = ['Everything', 'Future', 'Past'];
export const controls = ['Table', 'Stats'];
export const sorts = ['Day', 'Event', 'Time', 'Price', 'Offers'];
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
  DEFAULT:{name: 'default',funct: (point) => point} ,
  PRICE_UP:{name: 'price-up',funct: (pointA, pointB) => (pointA > pointB)},
  PRICE_DOWN:{name: 'price-down',funct: (pointA, pointB) => (pointA < pointB)},
  TIME_UP:{name: 'time-up',funct: (pointA, pointB) => dayjs(pointA._data.dateFrom).diff(dayjs(pointB._data.dateFrom))},
  TIME_DOWN:{name: 'time-down',funct: (pointA, pointB) => dayjs(pointB._data.dateFrom).diff(dayjs(pointA._data.dateFrom))},
};
export const FilterType = {
  EVERYTHING: 'everything',
  FUTURE: 'future',
  PAST: 'past',
};

