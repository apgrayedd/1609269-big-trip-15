import { NavType } from '../const';
import { remove, render, RenderPosition } from '../utils/render';
import NavigationListView from '../view/navigation-list.js';

export default class Navigation {
  constructor(mainContainer, data,  tripPresenter, statsPresenter, filterPresenter) {
    this._data = data;
    this._mainContainer = mainContainer;
    this._container = mainContainer.querySelector('.trip-controls');
    this._tripPresenter = tripPresenter;
    this._statsPresenter = statsPresenter;
    this._filterPresenter = filterPresenter;
    this._newPointPresenter = null;
    this._currentNavType = NavType.TABLE;
    this._navigationList = null;
    this._statsView = null;
    this._bindHandles();
  }

  init() {
    if (this._navigationList !== null) {
      remove(this._navigationList);
      this._navigationList = null;
    }
    this._tripPresenter.setChangeNavToTable(this._handleNavChanger);
    this._navigationList = new NavigationListView(this._currentNavType);
    this._navigationList.setChangeNavigation(this._handleNavChanger);
    render(this._container, this._navigationList, RenderPosition.AFTERBEGIN);

    switch(this._currentNavType) {
      case NavType.TABLE:
        this._statsPresenter._clear();
        this._tripPresenter.init();
        this._filterPresenter.init();
        break;
      case NavType.STATS:
        this._tripPresenter._clear();
        this._filterPresenter._clear();
        this._statsPresenter.init();
        break;
    }

    document.querySelector('.trip-main__event-add-btn').addEventListener('click', (evt) => {
      evt.preventDefault();
      this._tripPresenter.createPoint();
    });
  }

  _handleNavChanger(innerText) {
    if (this._currentNavType === innerText) {
      return;
    }
    this._currentNavType = innerText;
    this.init();
  }

  _bindHandles() {
    this._handleNavChanger = this._handleNavChanger.bind(this);
  }
}
