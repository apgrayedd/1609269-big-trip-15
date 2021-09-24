import {remove, render, RenderPosition} from '../utils/render.js';
import EditPointView from '../view/edit-point.js';
import {UserActions, UpdateTypes} from '../const.js';
import cloneDeep from 'lodash.clonedeep';
import { nanoid } from 'nanoid';

const KEY_TO_CLOSE_POINT = 27;

export default class NewPoint {
  constructor(pointConrainer, changeDataFucnt, constModel) {
    this._pointConrainer = pointConrainer;
    this._changeDataFucnt = changeDataFucnt;
    this._constModel = constModel;

    this._editPoint = null;
    this._bindHandles();
  }

  init() {
    if (this._editPoint !== null) {
      return;
    }

    this._editPoint = new EditPointView(this._constModel);
    this._editPoint.setHandlerClose(this._handlerDeleteClick);
    this._editPoint.setHandlerDelete(this._handlerDeleteClick);
    this._editPoint.setSubmitClick(this._handlerClickSubmit);

    render(this._pointConrainer, this._editPoint, RenderPosition.BEFOREEND);

    document.addEventListener('keydown', this._closeNewPointByEsc);
  }

  destroy() {
    if (this._editPoint !== null) {
      remove(this._editPoint);
      this._editPoint = null;
    }

    document.removeEventListener('keydown', this._closeNewPointByEsc);
  }

  _handlerClickSubmit(point) {
    this._editPoint._data = cloneDeep({...point, id: nanoid()});
    return this._changeDataFucnt(
      UserActions.ADD_POINT,
      UpdateTypes.MINOR,
      this._editPoint,
      this.destroy,
    );
  }

  _handlerDeleteClick() {
    this.destroy();
  }

  _closeNewPointByEsc(evt) {
    if (evt.keyCode === KEY_TO_CLOSE_POINT) {
      evt.preventDefault();
      this.destroy();
    }
  }

  _bindHandles() {
    this.destroy = this.destroy.bind(this);
    this._handlerClickSubmit = this._handlerClickSubmit.bind(this);
    this._handlerDeleteClick = this._handlerDeleteClick.bind(this);
    this._closeNewPointByEsc = this._closeNewPointByEsc.bind(this);
  }
}
