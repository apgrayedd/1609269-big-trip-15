import { NavType } from '../const';
import { remove, render, RenderPosition } from '../utils/render';
import NavigationListView from '../view/navigation-list.js';

export default class Navigation {
  constructor(container, data,  tripPresenter, statsPresenter) {
    this._data = data;
    this._container = container;
    this._tripPresenter = tripPresenter;
    this._statsPresenter = statsPresenter;
    this._currentNavType = NavType.TABLE;
    this._navigationList = null;
    this._statsView = null;
    this._bindHandles();
  }

  init() {
    if (this._navigationList !== null) {
      this._navigationList = null;
    }

    switch(this._currentNavType) {
      case NavType.TABLE:
        this._statsPresenter._clear();
        this._tripPresenter.init();
        break;
      case NavType.STATS:
        this._tripPresenter._clear();
        this._statsPresenter.init();
        break;
    }

    this._navigationList = new NavigationListView(this._currentNavType);
    this._navigationList.setChangeNavigation(this._handleNavChanger);

    render(this._container, this._navigationList, RenderPosition.BEFOREEND);
  }

  _handleNavChanger(innerText) {
    remove(this._navigationList);
    this._currentNavType = innerText;
    this.init();
  }

  _bindHandles() {
    this._handleNavChanger = this._handleNavChanger.bind(this);
  }
}
