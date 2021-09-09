import ObserverModel from '../utils/observer';

export default class PointModel extends ObserverModel {
  constructor() {
    super();
    this._points = [];
  }

  setPoints(points) {
    this._points = points.slice();
  }

  getPoints() {
    return this._points;
  }
}
