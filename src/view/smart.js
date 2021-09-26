import cloneDeep from 'lodash.clonedeep';
import AbstractView from './abstract.js';

export default class Smart extends AbstractView {
  constructor() {
    super();
  }

  restoreHandlers() {
    throw new Error('Необходимоть создать restoreHandlers');
  }

  updateElement() {
    const prevElement = this.getElement();
    const parent = prevElement.parentElement;
    this.removeElement();

    const newElement = this.getElement();

    if (parent) {
      parent.replaceChild(newElement, prevElement);
    }
    this.restoreHandlers();
  }

  updateData(update, notUpdateElement) {
    if (!update) {
      return;
    }
    this._data = cloneDeep({...this._data, ...update});

    if (notUpdateElement) {
      return;
    }

    this.updateElement();
  }
}
