import PointView from '../view/point.js';
import EditPointView from '../view/edit-point.js';
import {render, RenderPosition, replace, remove} from '../utils/render.js';
import Abstract from '../view/abstract.js';
import cloneDeep from 'lodash.clonedeep';
import {UserActions, UpdateTypes} from '../const.js';
import {isDatesEqual} from '../utils/common.js';

const KEY_TO_CLOSE_POINT = 27;
const MODE = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};

export default class Point {
  constructor(container, pointUpdateData, changeModePoint, constModel) {
    this._container = container;
    if (container instanceof Abstract) {
      this._container = container.getElement();
    }
    this._constModel = constModel;
    this._pointUpdateData = pointUpdateData;
    this._changeModePoint = changeModePoint;
    this._point = null;
    this._editPoint = null;
    this._mode = MODE.DEFAULT;
    this._bindHandles();
  }

  init(data) {
    const oldPoint = this._point;
    const oldEditPoint = this._editPoint;
    this._point = new PointView(data);
    this._editPoint = new EditPointView(this._constModel, data);

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
    if (this._mode !== MODE.DEFAULT) {
      this._replaceEditToPoint();
    }
  }

  _replacePointToEdit() {
    replace(this._editPoint, this._point);
    window.addEventListener('keydown', this._replacePointToEditByEsc);
    this._changeModePoint();
    this._mode = MODE.EDITING;
  }

  _replaceEditToPoint() {
    replace(this._point, this._editPoint);
    window.removeEventListener('keydown', this._replacePointToEditByEsc);
    this._mode = MODE.DEFAULT;
  }

  _replacePointToEditByEsc(evt) {
    if(evt.keyCode === KEY_TO_CLOSE_POINT) {
      this._replaceEditToPoint();
    }
  }

  _changeFavorite() {
    this._editPoint._data = cloneDeep({
      ...this._point._data,
      isFavorite: !this._point._data.isFavorite,
    });
    this._pointUpdateData(
      UserActions.UPDATE_POINT,
      UpdateTypes.MINOR,
      this._editPoint,
    );
  }

  _handlerClickSubmit(update) {
    const isMinorUpdate =
    !isDatesEqual(this._point._data.dateFrom, update.dateFrom) ||
    !isDatesEqual(this._point._data.dateTo, update.dateTo) ||
    this._point._data.basePrice === update.basePrice;

    this._pointUpdateData(
      UserActions.UPDATE_POINT,
      isMinorUpdate ? UpdateTypes.MINOR : UpdateTypes.PATCH,
      this._editPoint,
      this._replaceEditToPoint,
    );
  }

  _handlerDeleteClick() {
    this._pointUpdateData(
      UserActions.DELETE_POINT,
      UpdateTypes.MINOR,
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
