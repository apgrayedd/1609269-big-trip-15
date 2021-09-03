import AbstractView from './abstract.js';
import {
  updateElement,
  updateData
} from '../utils/render.js';

export default class Smart extends AbstractView {
  constructor() {
    super();
  }

  restoreHandlers() {
    //восстанавливать обработчики событий после перерисовки;
  }
}
