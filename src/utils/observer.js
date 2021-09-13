export default class Observer {
  constructor() {
    this._observers = new Set();
  }

  addObserver(observer) {
    this._observers.add(observer);
  }

  removeObserver(observer) {
    this._observers.remove(observer);
  }

  _notify(event, payload) {
    this._observers.forEach((observer) => observer(event, payload));
  }

  updatePoint (updateType, update) {
    console.log(this._points);

    this._points = this._points.map((item) => {
      if (item.id === update.id) {
        console.log(update);
        return update;
      }
    });

    console.log(this._points);

    this._notify(updateType, update);
  }

  addPoints (updateType, update) {
    this._points = [
      update,
      ...this._points,
    ];

    this._notify(updateType, update);
  }

  deletePoint (updateType, update) {
    [this._points].map((item) => {
      if (item.id === update.id) {
        return false;
      }
    });

    this._notify(updateType);
  }
}
