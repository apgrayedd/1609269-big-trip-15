const Method = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
};

export default class Api {
  constructor(link, authorization) {
    this._link = link;
    this._authorization = authorization;
  }

  getPoints() {
    return this._load({url: 'points'})
      .then(Api.toJson);
  }

  updatePoint(point) {
    return this._load({
      url: `points/${point.id}`,
      method: Method.PUT,
      body: JSON.stringify(point),
      headers: new Headers({'Context-Type': 'application/json'}),
    })
      .then(Api.toJson);
  }

  _load({
    url,
    method = Method.GET,
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

  static toJson(response) {
    return response.json();
  }
}
