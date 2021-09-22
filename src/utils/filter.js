import {FilterTypes} from '../const';
import {isDateFuture, isDatePast} from './common';

export const filter = {
  [FilterTypes.EVERYTHING]: (points) => points,
  [FilterTypes.FUTURE]: (points) => points.filter((point) => isDateFuture(point.dateFrom)),
  [FilterTypes.PAST]: (points) => points.filter((point) => isDatePast(point.dateFrom)),
};
