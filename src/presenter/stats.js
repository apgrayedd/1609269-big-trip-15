import { render, RenderPosition, remove } from '../utils/render.js';
import StatsView from '../view/stats.js';

export default class StatsPresenter {
  constructor(container, dataModel) {
    this._container = container;
    this._data = dataModel;
    this._statsView = null;
  }

  init() {
    if (this._statsView === null) {
      this._statsView = new StatsView(this._data.getPoints());
    }

    render(this._container, this._statsView, RenderPosition.AFTERBEGIN);
  }

  _clear() {
    remove(this._statsView);
    this._statsView = null;
  }
}
