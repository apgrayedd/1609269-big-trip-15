import {FilterTypes, UpdateTypes} from '../const';
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
    if (this._filterList !== null){
      this._clear();
      this._filterList = null;
    }
    const filters = Object.values(FilterTypes);
    const prevFilterList = this._filterList;

    this._filterList = new FilterView(filters, this._filterModel.getFilter());
    this._filterList.setChangeFilter(this._handleFilterChanger);

    if (prevFilterList === null) {
      render(this._filterContainer, this._filterList, RenderPosition.AFTERBEGIN);
      return;
    }

    replace(this._filterList, prevFilterList);
    remove(prevFilterList);
  }

  _clear() {
    if (this._filterList) {
      remove(this._filterList);
      this._filterList = null;
    }
  }

  _handleModelEvent() {
    this.init();
  }

  _handleFilterChanger(filterType) {
    if (this._filterModel.getFilter() === filterType) {
      return;
    }
    this._filterModel.setFilter(UpdateTypes.MAJOR, filterType);
  }

  _bindHandles() {
    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._handleFilterChanger = this._handleFilterChanger.bind(this);
  }
}
