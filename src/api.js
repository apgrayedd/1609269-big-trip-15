import PointModel from './model/point.js';

const Methods = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE',
};

export default class Api {
  constructor(link, authorization) {
    this._link = link;
    this._authorization = authorization;
  }

  getAllData() {
    const fetchPoints = this.getPoints();
    const fetchOffers = this.getOffers();
    const fetchDestinations= this.getDestinations();
    return Promise.all([fetchPoints, fetchOffers, fetchDestinations])
      .then(([points, offers, destinations]) =>
        Object.assign({},{'points' : points, 'offers': offers, 'destinations': destinations}));
  }

  getPoints() {
    return this._load({url: 'points'})
      .then((answer) => answer.json())
      .then((points) => points.map(PointModel.adaptToClient));
  }

  getOffers() {
    return this._load({url: 'offers'})
      .then((answer) => answer.json());
  }

  getDestinations() {
    return this._load({url: 'destinations'})
      .then((answer) => answer.json());
  }

  updatePoint(point) {
    return this._load({
      url: `points/${point.id}`,
      method: Methods.PUT,
      body: JSON.stringify(PointModel.adaptToServer(point)),
      headers: new Headers({'Content-Type': 'application/json'}),
    })
      .then((answer) => answer.json())
      .then(PointModel.adaptToClient);
  }

  addPoint(point) {
    return this._load({
      url: 'points',
      method: Methods.POST,
      body: JSON.stringify(PointModel.adaptToServer(point)),
      headers: new Headers({'Content-Type': 'application/json'}),
    })
      .then((answer) => answer.json())
      .then(PointModel.adaptToClient);
  }

  deletePoint(point) {
    return this._load({
      url: `points/${point.id}`,
      method: Methods.DELETE,
    });
  }

  _load({
    url,
    method = Methods.GET,
    body = null,
    headers = new Headers(),
  }) {
    headers.append('Authorization', this._authorization);

    return fetch(
      `${this._link}/${url}`,
      {method, body, headers},
    )
      .then(Api.checkStatus)
      .catch(Api.catchError);
  }

  static checkStatus(response) {
    if (response.ok) {
      return response;
    }
    throw new Error(`${response.status}: ${response.statusText}`);
  }

  static catchError(err) {
    throw err;
  }
}
