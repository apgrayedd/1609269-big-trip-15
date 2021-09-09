import ListEventsView from '../view/list.js';
import NavigationList from '../view/navigation-list.js';
import EmptyListView from '../view/empty-list.js';
import SortListView from '../view/sort-list.js';

import PointPresent from './point.js';
import {render, RenderPosition} from '../utils/render.js';
import {updateItem} from '../utils/common.js';

export default class Trip {
  constructor(container, pointModels){
    this._container = container;
    this._pointsMap = new Map();
    this._pointModels = pointModels;
    this._listEvents = new ListEventsView();
    this._navigationList = new NavigationList();
    this._emptyList = new EmptyListView();
    this._sortList = new SortListView();
    this._bindHandles();
  }

  init() {
    const pointLength = this._getPointModel.length;

    if (pointLength < 0) {
      this._renderNoPoints();
      return;
    }

    this._renderSort();
    this._renderPoints();
    render(this._container, this._listEvents, RenderPosition.AFTERBEGIN);
  }

  _getPointModel() {
    return this._pointModels.getPoints();
  }

  _renderPoints(points) {
    points.forEach((point) => {
      const pointPresenter = new PointPresent(this._listEvents, this._handleViewAction, this._handleModChanger);
      pointPresenter.init(point);
      this._pointsMap.set(point.id, pointPresenter);
    });
  }

  _renderNoPoints() {
    render(this._listEvents, this._emptyList, RenderPosition.AFTERBEGIN);
  }

  _renderSort() {
    render(this._container, this._sortList, RenderPosition.AFTERBEGIN);
  }

  _clearTaskList() {
    this._taskPresenter.forEach((presenter) => presenter.destroy());
    this._taskPresenter.clear();
  }

  _handleModChanger() {
    this._pointsMap.forEach((point) => point.resetView());
  }

  _handleViewAction(actionType, updateType, update) {
    console.log(actionType, updateType, update);
    // Здесь будем вызывать обновление модели.
    // actionType - действие пользователя, нужно чтобы понять, какой метод модели вызвать
    // updateType - тип изменений, нужно чтобы понять, что после нужно обновить
    // update - обновленные данные
  }


  _handleModelEvent(updateType, data) {
    console.log(updateType, data);
    // В зависимости от типа изменений решаем, что делать:
    // - обновить часть списка (например, когда поменялось описание)
    // - обновить список (например, когда задача ушла в архив)
    // - обновить всю доску (например, при переключении фильтра)
  }
  }

  // _handlePointChange(newPoint) {
  //   this._pointsMap.values = updateItem(this._pointsMap, newPoint);
  //   this._pointsMap.get(newPoint.id).init(newPoint);
  // }

  _bindHandles() {
    this._handleModChanger = this._handleModChanger.bind(this);
    this._handleViewAction = this._handleViewAction.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);
  }
}
