import ListEventsView from '../view/list.js';
import NavigationList from '../view/navigation-list.js';
import EmptyListView from '../view/empty-list.js';
import SortListView from '../view/sort-list.js';

import PointPresent from './point.js';
import {render, RenderPosition} from '../utils/render.js';
import {updateItem} from '../utils/common.js';

export default class Trip {
  constructor(container){
    this._container = container;
    this._pointPresenter = new Map();

    this._listEvents = new ListEventsView();
    this._navigationList = new NavigationList();
    this._emptyList = new EmptyListView();
    this._sortList = new SortListView();
    this._handleTaskChange = this._handleTaskChange.bind(this);
  }

  init(points) {
    this._points = points.slice();
    this._init();
  }

  _renderPoints() {
    this._points.slice().forEach((point) => {
      const pointPresenter = new PointPresent(this._listEvents);
      pointPresenter.init(point);
      this._pointPresenter.set(point.id, pointPresenter);
    });
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

  _clearTaskList() {
    this._taskPresenter.forEach((presenter) => presenter.destroy());
    this._taskPresenter.clear();
  }

  _handleTaskChange(updatedTask) {
    this._boardTasks = updateItem(this._boardTasks, updatedTask);
    this._taskPresenter.get(updatedTask.id).init(updatedTask);
  }
}
