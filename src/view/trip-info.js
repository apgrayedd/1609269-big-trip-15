import isEmpty from 'lodash.isempty';
import {SortTypes} from '../const';
import {timeAdapter} from '../utils/adapters';
import {
  getValuesFromListByKey,
  getValueByList,
  getSumm
} from '../utils/common';
import AbstractView from './abstract';

const NUMBER_SEPARATION_NAMES = 3;

const getTripInfoTemplate  = (data) => {
  data = data.sort(SortTypes.TIME_DOWN.funct);
  const getTripeInfo = data.length <= NUMBER_SEPARATION_NAMES
    ? getValueByList(data)
    : [data[0], data[data.length - 1]];
  const getTripeInfoTitle = data.length <= NUMBER_SEPARATION_NAMES
    ? getValuesFromListByKey(getTripeInfo, 'name').join('&nbsp;—&nbsp;')
    : getValuesFromListByKey(getTripeInfo, 'name').join('&nbsp;—&nbsp;...&nbsp;—&nbsp;');
  const getTripeInfoDays = [
    timeAdapter(getTripeInfo[0].dateFrom, 'MMM D'),
    timeAdapter(getTripeInfo[getTripeInfo.length - 1].dateFrom, 'MMM D'),
  ].join('&nbsp;—&nbsp;');
  const getCostValueByBasePrice = getValuesFromListByKey(data, 'basePrice')
    .reduce((value, summ) => summ += value);
  const getCostValueByOfferPrice = data.reduce((accumulator, point) => {
    if (!isEmpty(point.offers)) {
      const offerPriceSumm = getSumm(getValuesFromListByKey(point.offers, 'price'));
      return accumulator + offerPriceSumm;
    }
    return accumulator + 0;
  }, 0);
  return `<section class="trip-main__trip-info  trip-info">
  <div class="trip-info__main">
    <h1 class="trip-info__title"></h1>
    <h1 class="trip-info__title">${getTripeInfoTitle}</h1>
    <p class="trip-info__dates">${getTripeInfoDays}</p>
  </div>
    <p class="trip-info__cost">
    Total: €&nbsp;<span class="trip-info__cost-value">
    ${getCostValueByBasePrice + getCostValueByOfferPrice}</span>
  </p>
</section>`;
};

export default class TripInfo extends AbstractView {
  constructor(data) {
    super();
    this._data = data;
  }

  getTemplate() {
    return getTripInfoTemplate(this._data);
  }
}
