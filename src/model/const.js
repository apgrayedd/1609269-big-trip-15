import isEmpty from 'lodash.isempty';
import { getValuesFromListByKey } from '../utils/common';

export default class Const {
  constructor(api) {
    this._api = api;
    this._TYPES = null;
    this._OFFERS = null;
    this._DESTINATIONS = null;
  }

  setOffers(offers) {
    this._OFFERS = offers;
  }

  setDestinations(destinations) {
    this._DESTINATIONS = destinations;
  }

  setData(data) {
    this.setDestinations(data.destinations);
    this.setOffers(data.offers);
    this.setTypes(getValuesFromListByKey(data.offers, 'type'));
  }

  setTypes(types) {
    this._TYPES = types;
  }

  getOffers(type) {
    if (type && !isEmpty(this._OFFERS)) {
      for(const typeKey in this._OFFERS) {
        if(type === this._OFFERS[typeKey].type) {
          return this._OFFERS[typeKey].offers;
        }
      }
    }
    return this._OFFERS;
  }

  getDestinations() {
    return this._DESTINATIONS;
  }

  getTypes() {
    return this._TYPES;
  }
}
