const getEmptyList = () => (
  '<p class="trip-events__msg">Click New Event to create your first point</p>'
);

export default class EmptyList {
  constructor(data) {
    this._element = null;
    this._data = data;
  }

  getElement() {
    if (!this._element) {
      this._element = getEmptyList(this._data);
    }

    return this._element;
  }

  clearElement() {
    this._element = null;
  }
}

