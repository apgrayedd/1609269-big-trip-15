import PointView from '../view/point.js';
import EditPointView from '../view/edit-point.js';
import {render, RenderPosition, replace, remove} from '../utils/render.js';
import Abstract from '../view/abstract.js';
import cloneDeep from 'lodash.clonedeep';
import {UserAction, UpdateType} from '../const.js';
import {isDatesEqual} from '../utils/common.js';

const KEY_TO_CLOSE_POINT = 27;
const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};

export default class Point {
  constructor(container, pointUpdateData, changeModePoint) {
    this._container = container;
    if (container instanceof Abstract) {
      this._container = container.getElement();
    }
    this._pointUpdateData = pointUpdateData;
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
    this._editPoint = new EditPointView(data);

    this._point.setHandlerOpen(this._replacePointToEdit);
    this._point.setHandlerFavorite(this._changeFavorite);
    this._editPoint.setHandlerClose(this._replaceEditToPoint);
    this._editPoint.setHandlerDelete(this._handlerDeleteClick);
    this._editPoint.setSubmitClick(this._handlerClickSubmit);

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
    this._pointUpdateData(
      UserAction.UPDATE_POINT,
      UpdateType.MINOR,
      cloneDeep({
        ...this._point._data,
        isFavorite: !this._point._data.isFavorite,
      }),
    );
  }

  _handlerClickSubmit(update) {
    const isMinorUpdate =
    !isDatesEqual(this._point._data.dateFrom, update.dateFrom) ||
    !isDatesEqual(this._point._data.dateTo, update.dateTo) ||
    this._point._data.basePrice === update.basePrice;

    this._pointUpdateData(
      UserAction.UPDATE_POINT,
      isMinorUpdate ? UpdateType.MINOR : UpdateType.PATCH,
      this._editPoint,
      this._replaceEditToPoint,
    );
  }

  _handlerDeleteClick() {
    this._pointUpdateData(
      UserAction.DELETE_POINT,
      UpdateType.MINOR,
      this._editPoint,
      this._replaceEditToPoint,
    );
  }

  destroy() {
    remove(this._point);
    remove(this._editPoint);
  }

  _bindHandles() {
    this._handlerDeleteClick = this._handlerDeleteClick.bind(this);
    this._replacePointToEdit = this._replacePointToEdit.bind(this);
    this._replaceEditToPoint = this._replaceEditToPoint.bind(this);
    this._replacePointToEditByEsc = this._replacePointToEditByEsc.bind(this);
    this._changeFavorite = this._changeFavorite.bind(this);
    this._handlerClickSubmit = this._handlerClickSubmit.bind(this);
  }
}
