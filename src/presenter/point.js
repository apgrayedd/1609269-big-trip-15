import PointView from '../view/point.js';
import EditPointView from '../view/edit-point.js';
import {render, RenderPosition, replace, remove} from '../utils/render.js';
import Abstract from '../view/abstract.js';
import cloneDeep from 'lodash.clonedeep';

const KEY_TO_CLOSE_POINT = 27;
const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};

export default class Point {
  constructor(container, newPointChanger, changeModePoint) {
    this._container = container;
    if (container instanceof Abstract) {
      this._container = container.getElement();
    }
    this._newPointChanger = newPointChanger;
    this._changeModePoint = changeModePoint;
    this._point = null;
    this._editPoint = null;
    this._mode = Mode.DEFAULT;
    this._bindHandles();
  }

  init(data) {
    const oldPoint = this._point;
    const oldEditPoint = this._editPoint;

    this._point = new PointView(data);
    this._editPoint = new EditPointView(data, this._clickSubmit);

    this._point.setHandlerOpen(this._replacePointToEdit);
    this._editPoint.setHandlerClose(this._replaceEditToPoint);
    this._point.setHandlerFavorite(this._changeFavorite);

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

  resetView() {
    if (this._mode !== Mode.DEFAULT) {
      this._replaceEditToPoint();
    }
  }

  _replacePointToEdit() {
    replace(this._editPoint, this._point);
    window.addEventListener('keydown', this._replacePointToEditByEsc);
    this._changeModePoint();
    this._mode = Mode.EDITING;
  }

  _replaceEditToPoint() {
    replace(this._point, this._editPoint);
    window.removeEventListener('keydown', this._replacePointToEditByEsc);
    this._mode = Mode.DEFAULT;
  }

  _replacePointToEditByEsc(evt) {
    if(evt.keyCode === KEY_TO_CLOSE_POINT) {
      this._replaceEditToPoint();
    }
  }

  _changeFavorite() {
    this._newData = cloneDeep({...this._point._data, isFavorite: !this._point._data.isFavorite});
    this._newPointChanger(this._newData);
  }

  _clickSubmit() {
    this._point.updateData(this._editPoint._data, false);
  }

  _bindHandles() {
    this._replacePointToEdit = this._replacePointToEdit.bind(this);
    this._replaceEditToPoint = this._replaceEditToPoint.bind(this);
    this._replacePointToEditByEsc = this._replacePointToEditByEsc.bind(this);
    this._changeFavorite = this._changeFavorite.bind(this);
    this._clickSubmit = this._clickSubmit.bind(this);
  }
}
