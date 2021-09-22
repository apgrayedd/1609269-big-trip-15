import dayjs from 'dayjs';
import cloneDeep from 'lodash.clonedeep';
import ObserverModel from '../utils/observer';

export default class PointModel extends ObserverModel {
  constructor() {
    super();
    this._points = [];
  }

  setPoints(updateType, points) {
    this._points = points.slice();

    this._notify(updateType);
  }

  getPoints() {
    return this._points;
  }

  static adaptToClient(point) {
    const adaptedPoint = cloneDeep({
      ...point,
      name: point.destination.name,
      basePrice: point.base_price ? point.base_price : 0,
      dateFrom: point.date_from ? point.date_from : dayjs(),
      dateTo: point.date_to ? point.date_to : dayjs(),
      isFavorite: point.is_favorite ? point.is_favorite : false,
    });

    delete adaptedPoint.base_price;
    delete adaptedPoint.date_from;
    delete adaptedPoint.date_to;
    delete adaptedPoint.is_favorite;
    return adaptedPoint;
  }

  static adaptToServer(point) {
    const adaptedPoint = cloneDeep({
      ...point,
      type: point.type.toLowerCase(),
      'base_price': point.basePrice ? point.basePrice : 0,
      'date_from': point.dateFrom ? point.dateFrom : dayjs(),
      'date_to': point.dateTo ? point.dateTo : dayjs(),
      'is_favorite': point.isFavorite ? point.isFavorite : false,
    });
    delete adaptedPoint.basePrice;
    delete adaptedPoint.dateFrom;
    delete adaptedPoint.dateTo;
    delete adaptedPoint.isFavorite;

    return adaptedPoint;
  }
}
