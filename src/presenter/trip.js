import ListEventsView from '../view/list.js';
import NavigationList from '../view/navigation-list.js';
import EmptyListView from '../view/empty-list.js';
import SortListView from '../view/sort-list.js';

import PointPresent from './point.js';
import {render, RenderPosition} from '../utils/render.js';

export default class Trip {
  constructor(container){
    this._container = container;

    this._listEvents = new ListEventsView();
    this._navigationList = new NavigationList();
    this._emptyList = new EmptyListView();
    this._sortList = new SortListView();
  }

  init(points) {
    this._points = points.slice();
    this._init();
  }

  _renderPoint(point) {
    const newPoint = new PointPresent(this._listEvents);
    newPoint.init(point);
  }

  _renderPoints() {
    this._points.slice().forEach((point) => this._renderPoint(point));
  }

  _renderNoPoints() {
    render(this._listEvents, this._emptyList, RenderPosition.AFTERBEGIN);
  }

  _renderSort() {
    render(this._container, this._sortList, RenderPosition.AFTERBEGIN);
  }

  _init() {
    if (this._points.length < 0) {
      this._renderNoPoints();
      return;
    }

    this._renderSort();
    this._renderPoints();
    render(this._container, this._listEvents, RenderPosition.AFTERBEGIN);
  }
}
