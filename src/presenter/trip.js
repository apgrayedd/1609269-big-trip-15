import ListEventsView from '../view/list.js';
import NavigationList from '../view/navigation-list.js';
import EmptyListView from '../view/empty-list.js';
import PointView from '../view/point.js';
import EditPointView from '../view/edit-point.js';
// import FiltersListView from './view/filters-list.js';
import SortListView from '../view/sort-list.js';
import {render, RenderPosition, replace} from '../utils/render.js';

const MAX_NUMBER_POINTS = 3;
const KEY_TO_CLOSE_POINT = 27;

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

    render(this._container, this._listEvents, RenderPosition.AFTERBEGIN);
    this._init();
  }

  _renderPoint(point) {
    this._newPoint = new PointView(point);
    this._newEditPoint = new EditPointView(point);

    const replacePointToEditByEsc = (evt) => {
      if(evt.keyCode === KEY_TO_CLOSE_POINT) {
        ReplacePointToEdit();
      }
    };

    function ReplacePointToEdit () {
      replace(this._newEditPoint, this._newPoint);
      window.addEventListener('keydown', replacePointToEditByEsc);
    }

    function ReplaceEditToPoint () {
      replace(this._newPoint, this._newEditPoint);
      window.removeEventListener('keydown', replacePointToEditByEsc);
    }

    this._newPoint.setHandler('click', '.event__rollup-btn', ReplacePointToEdit);
    this._newEditPoint.setHandler('click', '.event__rollup-btn', ReplaceEditToPoint);
    render(this._listEvents, this._newPoint, RenderPosition.AFTERBEGIN);
  }

  _renderPoints() {
    this._points.slice().forEach((point) => this._renderPoint(point));
  }

  _renderNoPoints() {
    render(this._listEvents, this._emptyList, RenderPosition.AFTERBEGIN);
  }

  _renderButtonMorePoints() {
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

    this._renderPoints(MAX_NUMBER_POINTS);
    if (this._points > MAX_NUMBER_POINTS) {
      this._renderButtonMorePoints();
    }
  }
}
