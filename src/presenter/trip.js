import ListEventsView from '../view/list.js';
import EmptyListView from '../view/empty-list.js';
import SortListView from '../view/sort-list.js';
import {filter} from '../utils/filter.js';
import PointPresent from './point.js';
import NewPointPresenter from './newPoint.js';
import {remove, render, RenderPosition} from '../utils/render.js';
import {SortType, UserAction, UpdateType, FilterType} from '../const.js';

export default class Trip {
  constructor(container, pointModels, filterModel){
    this._container = container;
    this._pointsMap = new Map();
    this._filterType = FilterType.EVERYTHING;
    this._pointModels = pointModels;
    this._listEvents = new ListEventsView();
    this._emptyList = null;
    this._sortList = null;
    this._currentSortType = SortType.DEFAULT.name;
    this._filterModel = filterModel;
    this._bindHandles();
    this._newPointPresenter = new NewPointPresenter(this._listEvents.getElement(), this._handleViewAction);
    this._filterModel.addObserver(this._handleModelEvent);
    this._pointModels.addObserver(this._handleModelEvent);
  }

  init() {
    const pointLength = this._getPoints().length;

    if (pointLength < 0) {
      this._renderNoPoints();
      return;
    }
    this._renderSort();
    this._renderPoints();
    render(this._container, this._listEvents, RenderPosition.AFTERBEGIN);
  }

  createPoint() {
    this._currentSortType = SortType.DEFAULT.name;
    this._filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
    this._newPointPresenter.init();
  }

  _getPoints() {
    this._filterType = this._filterModel.getFilter();
    const points = this._pointModels.getPoints();
    const filteredTasks = filter[this._filterType](points);
    switch(this._currentSortType){
      case SortType.PRICE_DOWN.name:
        return filteredTasks.sort(SortType.PRICE_DOWN.funct);
      case SortType.TIME_DOWN.name:
        return filteredTasks.sort(SortType.TIME_DOWN.funct);
    }

    return filteredTasks;
  }

  _renderPoints() {
    this._getPoints().forEach((point) => {
      const pointPresenter = new PointPresent(this._listEvents, this._handleViewAction, this._handleModChanger);
      pointPresenter.init(point);
      this._pointsMap.set(point.id, pointPresenter);
    });
  }

  _renderNoPoints() {
    this._emptyList = new EmptyListView(this._filterType);
    render(this._listEvents, this._emptyList, RenderPosition.AFTERBEGIN);
  }

  _renderSort() {
    if (this._sortList !== null) {
      this._sortList = null;
    }

    this._sortList = new SortListView(this._currentSortType);
    this._sortList.setHandlerSortChanger(this._handleSortTypeChanger);

    render(this._container, this._sortList, RenderPosition.AFTERBEGIN);
  }

  _clear(resetSortType = false) {
    this._newPointPresenter.destroy();
    this._pointsMap.forEach((point) => {
      point.destroy();
    });
    this._pointsMap.clear();

    remove(this._sortList);
    if(this._emptyList) {
      remove(this._emptyList);
    }

    if(resetSortType){
      this._currentSortType = SortType.DEFAULT.name;
    }
  }

  _handleModChanger() {
    this._newPointPresenter.destroy();
    this._pointsMap.forEach((point) => point.resetView());
  }

  _handleViewAction(actionType, updateType, update) {
    switch(actionType){
      case UserAction.UPDATE_POINT:
        this._pointModels.updatePoint(updateType, update);
        break;
      case UserAction.ADD_POINT:
        this._pointModels.addPoints(updateType, update);
        break;
      case UserAction.DELETE_POINT:
        this._pointModels.deletePoint(updateType, update);
        break;
    }
  }


  _handleModelEvent(updateType, data) {
    switch (updateType) {
      case UpdateType.PATCH:
        this._pointsMap.get(data.id).init(data);
        break;
      case UpdateType.MINOR:
        this._clear();
        this.init();
        break;
      case UpdateType.MAJOR:
        this._clear({resetSortType: true});
        this.init();
        break;
    }
  }

  _handleSortTypeChanger(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }
    this._currentSortType = sortType;
    remove(this._sortList);
    this._renderSort(this._currentSortType);

    this._clear();
    this.init();
  }

  _bindHandles() {
    this._handleModChanger = this._handleModChanger.bind(this);
    this._handleViewAction = this._handleViewAction.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._handleSortTypeChanger = this._handleSortTypeChanger.bind(this);
  }
}
