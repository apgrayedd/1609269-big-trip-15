import {remove, render, RenderPosition} from '../utils/render';
import EditPointView from '../view/edit-point';
import {UserAction, UpdateType} from '../const.js';
import { cloneDeep } from 'lodash';
import { nanoid } from 'nanoid';

const KEY_TO_CLOSE_POINT = 27;

export default class NewPoint {
  constructor(pointConrainer, changeDataFucnt) {
    this._pointConrainer = pointConrainer;
    this._changeDataFucnt = changeDataFucnt;

    this._editPoint = null;
    this._bindHandles();
  }

  init() {
    if (this._editPoint === null) {
      return;
    }

    this._editPoint = new EditPointView();
    this._editPoint.setHandlerDelete(this._handlerDeleteClick);
    this._editPoint.setSubmitClick(this._handlerClickSubmit);

    render(this._pointConrainer, this._editPoint, RenderPosition.AFTERBEGIN);

    document.addEventListener('keydown', this._closeNewPointByEsc);
  }

  destroy() {
    if (this._editPoint === null) {
      return;
    }

    remove(this._editPoint);
    this._editPoint = null;

    document.removeEventListener('keydown', this._closeNewPointByEsc);
  }

  _handlerClickSubmit(point) {
    this._changeDataFucnt(
      UserAction.ADD_POINT,
      UpdateType.MINOR,

      cloneDeep({...point, id: nanoid()}),
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
    this._handlerClickSubmit = this._handlerClickSubmit.bind(this);
    this._handlerDeleteClick = this._handlerDeleteClick.bind(this);
    this._closeNewPointByEsc = this._closeNewPointByEsc.bind(this);
  }
}
