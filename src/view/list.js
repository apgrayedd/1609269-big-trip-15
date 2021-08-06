const getListEvents = () => (
  '<ul class="trip-events__list"></ul>'
);

export default class ListEvents {
  constructor() {
    this._element = null;
  }

  static getElement() {
    if (!this._element) {
      this._element = getListEvents(this._data);
    }

    return this._element;
  }

  static clearElement() {
    this._element = null;
  }
}


