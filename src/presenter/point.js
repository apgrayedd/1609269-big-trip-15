import PointView from '../view/point.js';
import EditPointView from '../view/edit-point.js';
import {render, RenderPosition, replace, remove} from '../utils/render.js';
import Abstract from '../view/abstract.js';

const KEY_TO_CLOSE_POINT = 27;

export default class Point {
  constructor(container, newData) {
    this._container = container;
    if (container instanceof Abstract) {
      this._container = container.getElement();
    }
    this._newData = newData;
    this._point = null;
    this._editPoint = null;

    this._replacePointToEdit = this._replacePointToEdit.bind(this);
    this._replaceEditToPoint = this._replaceEditToPoint.bind(this);
    this._replacePointToEditByEsc = this._replacePointToEditByEsc.bind(this);
    this._changeFavorite = this._changeFavorite.bind(this);
  }

  init(data) {
    const oldPoint = this._point;
    const oldEditPoint = this._editPoint;

    this._point = new PointView(data);
    this._editPoint = new EditPointView(data);

    this._point.setHandler('click', '.event__rollup-btn', this._replacePointToEdit);
    this._editPoint.setHandler('click', '.event__rollup-btn', this._replaceEditToPoint);

    this._point.setHandler('click', '.event__favorite-btn', this._changeFavorite);

    if (oldPoint === null || oldEditPoint === null) {
      render(this._container, this._point, RenderPosition.AFTERBEGIN);
      return;
    }
    if (this._container.contains(oldPoint.getElement())) {
      replace(this._point, oldPoint);
    }

    if (this._container.contains(oldEditPoint.getElement())) {
      replace(this._editPoint, oldEditPoint);
    }

    remove(oldPoint);
    remove(oldEditPoint);
  }

  _replacePointToEdit() {
    replace(this._editPoint, this._point);
    window.addEventListener('keydown', this._replaceEditToPoint);
  }

  _replaceEditToPoint() {
    replace(this._point, this._editPoint);
    window.removeEventListener('keydown', this._replacePointToEdit);
  }

  _replacePointToEditByEsc(evt) {
    if(evt.keyCode === KEY_TO_CLOSE_POINT) {
      this._replaceEditToPoint();
    }
  }

  _changeFavorite() {
    this._newData = Object.assign(
      this._point,
      {
        isFavorite: !this._point.isFavorite,
      },
    );
    console.log(this._newData)
  }
}
