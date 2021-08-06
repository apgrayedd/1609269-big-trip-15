const getLoading = () => (
  '<p class="trip-events__msg">Loading...</p>'
);

export default class Loading {
  constructor() {
    this._element = null;
  }

  static getElement() {
    if (!this._element) {
      this._element = getLoading(this._data);
    }

    return this._element;
  }

  static clearElement() {
    this._element = null;
  }
}

