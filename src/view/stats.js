const getStats = () => (
  `<section class="statistics">
    <h2 class="visually-hidden">Trip statistics</h2>

    <div class="statistics__item">
      <canvas class="statistics__chart" id="money" width="900"></canvas>
    </div>

    <div class="statistics__item">
      <canvas class="statistics__chart" id="type" width="900"></canvas>
    </div>

    <div class="statistics__item">
      <canvas class="statistics__chart" id="time-spend" width="900"></canvas>
    </div>
  </section>`
);

export default class Stats {
  constructor() {
    this._element = null;
  }

  static getElement() {
    if (!this._element) {
      this._element = getStats(this._data);
    }

    return this._element;
  }

  static clearElement() {
    this._element = null;
  }
}
