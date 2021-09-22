import { remove, render, RenderPosition } from '../utils/render';
import TripInfoView from '../view/trip-info';

export default class TripInfo {
  constructor(container) {
    this._container = container;
    this._tripInfoView = null;
  }

  init(data) {
    if (this._tripInfoView !== null) {
      remove(this._tripInfoView);
      this._tripInfoView = null;
    }
    this._tripInfoView = new TripInfoView(data);
    render(this._container, this._tripInfoView, RenderPosition.AFTERBEGIN);
  }
}
