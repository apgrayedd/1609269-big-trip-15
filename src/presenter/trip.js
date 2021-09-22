import ListEventsView from '../view/list.js';
import EmptyListView from '../view/empty-list.js';
import SortListView from '../view/sort-list.js';
import LoadingView from '../view/loading.js';
import {filter} from '../utils/filter.js';
import PointPresent from './point.js';
import NewPointPresenter from './newPoint.js';
import TripInfoView from '../view/trip-info.js';
import {remove, render, RenderPosition} from '../utils/render.js';
import {SortType, UserAction, UpdateType, FilterType, NavType} from '../const.js';

export default class Trip {
  constructor(container, pointModels, filterModel, api){
    this._mainContainer = document.querySelector('.trip-main');
    this._container = container;
    this._pointsMap = new Map();
    this._filterType = FilterType.EVERYTHING;
    this._pointModels = pointModels;
    this._listEvents = new ListEventsView();
    this._emptyList = null;
    this._sortList = null;
    this._tripInfoView = null;
    this._api = api;
    this._loadingView = new LoadingView();
    this._isLoading = true;
    this._currentSortType = SortType.EVENT_DOWN.name;
    this._filterModel = filterModel;
    this._bindHandles();
    this._newPointPresenter = null;
    this._filterModel.addObserver(this._handleModelEvent);
    this._pointModels.addObserver(this._handleModelEvent);
  }

  init() {
    if (this._isLoading) {
      this._renderLoading();
      return;
    }
    this._newPointPresenter = new NewPointPresenter(this._listEvents.getElement(), this._handleViewAction);
    const pointLength = this._getPoints().length;

    if (pointLength < 0) {
      this._renderNoPoints();
      return;
    }
    this._renderTripInfo();
    this._renderSort();
    this._renderPoints();
    render(this._container, this._listEvents, RenderPosition.AFTERBEGIN);
  }

  createPoint() {
    this._changeNavToTable(NavType.TABLE);
    this._currentSortType = SortType.EVENT_DOWN.name;
    this._filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
    this._newPointPresenter.init();
  }

  _getPoints() {
    this._filterType = this._filterModel.getFilter();
    const points = this._pointModels.getPoints();
    const filteredTasks = filter[this._filterType](points);
    switch(this._currentSortType){
      case SortType.PRICE_DOWN.name: {
        return filteredTasks.sort(SortType.PRICE_DOWN.funct);
      }
      case SortType.TIME_DOWN.name: {
        return filteredTasks.sort(SortType.TIME_DOWN.funct);
      }
      case SortType.EVENT_DOWN.name: {
        return filteredTasks.sort(SortType.EVENT_DOWN.funct);
      }
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
      remove(this._sortList);
      this._sortList = null;
    }

    this._sortList = new SortListView(this._currentSortType);
    this._sortList.setHandlerSortChanger(this._handleSortTypeChanger);

    render(this._container, this._sortList, RenderPosition.AFTERBEGIN);
  }

  _renderTripInfo() {
    if (this._tripInfoView !== null) {
      remove(this._tripInfoView);
      this._tripInfoView = null;
    }
    this._tripInfoView = new TripInfoView(this._pointModels.getPoints());
    render(this._mainContainer, this._tripInfoView, RenderPosition.BEFOREEND);
  }

  _clear(resetSortType = false) {
    if (this._newPointPresenter !== null) {
      this._newPointPresenter.destroy();
      this._newPointPresenter = null;
    }

    this._pointsMap.forEach((point) => {
      point.destroy();
    });
    this._pointsMap.clear();

    remove(this._sortList);
    remove(this._tripInfoView);
    if(this._emptyList) {
      remove(this._emptyList);
    }

    if(resetSortType){
      this._currentSortType = SortType.EVENT_DOWN.name;
    }
  }

  _handleModChanger() {
    if (this._newPointPresenter !== null) {
      this._newPointPresenter.destroy();
    }

    this._pointsMap.forEach((point) => point.resetView());
  }

  _changeTextSaveBtn(view, text, attributes) {
    const saveBtn = view.getElement().querySelector('.event__save-btn');
    if (saveBtn === null) {
      return;
    }

    saveBtn.textContent = text;

    if (attributes && !attributes.isEmpty()) {
      for (const attribute in attributes) {
        saveBtn[attribute] = attributes[attributes];
      }
    }
  }

  _handleViewAction(actionType, updateType, updateView, closeFunct) {
    const update = updateView._data;
    this._changeTextSaveBtn(updateView, 'Загрузка...');
    switch(actionType){
      case UserAction.UPDATE_POINT: {
        this._api.updatePoint(update)
          .then((answer) => {
            this._pointModels.updatePoint(updateType, answer);
          })
          .then(() => {
            if (closeFunct) {
              closeFunct();
            }
          })
          .catch(() => {
            this._changeTextSaveBtn(
              'Ошибка',
              {disabled: true},
            );
          });
        break;
      }
      case UserAction.ADD_POINT: {
        this._api.addPoint(update)
          .then((answer) => {
            this._pointModels.addPoints(updateType, answer);
          })
          .then(() => {
            if (closeFunct) {
              closeFunct();
            }
          })
          .catch(() => {
            this._changeTextSaveBtn(
              'Ошибка',
              {disabled: true},
            );
          });
        break;
      }
      case UserAction.DELETE_POINT: {
        this._api.deletePoint(update)
          .then(() => {
            this._pointModels.deletePoint(updateType, update);
          })
          .then(() => {
            if (closeFunct) {
              closeFunct();
            }
          })
          .catch(() => {
            this._changeTextSaveBtn(
              'Ошибка',
              {disabled: true},
            );
          });
        break;
      }
    }
  }

  setChangeNavToTable(funct) {
    this._changeNavToTable = funct;
  }

  _handleModelEvent(updateType, data) {
    this._renderTripInfo();
    switch (updateType) {
      case UpdateType.PATCH: {
        this._pointsMap.get(data.id).init(data);
        break;
      }
      case UpdateType.MINOR: {
        this._clear();
        this.init();
        break;
      }
      case UpdateType.MAJOR: {
        this._clear({resetSortType: true});
        this.init();
        break;
      }
      case UpdateType.INIT: {
        this._isLoading = false;
        remove(this._loadingView);
        this._clear();
        break;
      }
    }
  }

  _renderLoading() {
    render(this._container, this._loadingView, RenderPosition.AFTERBEGIN);
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
