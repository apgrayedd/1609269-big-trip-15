import {FilterType} from '../const';
import {isDateFuture, isDatePast} from './common';

export const filter = {
  [FilterType.EVERYTHING]: (points) => points,
  [FilterType.FUTURE]: (points) => points.filter((point) => isDateFuture(point)),
  [FilterType.PAST]: (points) => points.filter((point) => isDatePast(point)),
};
