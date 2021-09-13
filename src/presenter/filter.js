import {FilterType, UpdateType} from '../const';
import {remove, render, RenderPosition, replace} from '../utils/render';
import FilterView from '../view/filters-list';

export default class Filter {
  constructor(filterContainer, filterModel, pointsModel) {
    this._filterContainer = filterContainer;
    this._filterModel = filterModel;
    this._pointsModel = pointsModel;

    this._filterList = null;

    this._bindHandles();
    this._pointsModel.addObserver(this._handleModelEvent);
    this._filterModel.addObserver(this._handleModelEvent);
  }

  init() {
    const filters = Object.values(FilterType);
    const prevFilterList = this._filterList;

    this._filterList = new FilterView(filters, this._filterModel.getFilter());

    if (prevFilterList === null) {
      render(this._filterContainer, this._filterList, RenderPosition.BEFOREEND);
      return;
    }

    replace(this._filterList, prevFilterList);
    remove(prevFilterList);
  }

  _handleModelEvent() {
    this.init();
  }

  _handleFilterChanger(filterType) {
    if (this._filterModel.getFilter() === filterType) {
      return;
    }

    this._filterModel.setFilter(UpdateType.MAJOR, filterType);
  }

  _bindHandles() {
    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._handleFilterChanger = this._handleFilterChanger.bind(this);
  }
}
