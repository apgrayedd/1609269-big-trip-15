import AbstractView from './abstract';
import {Chart, registerables} from 'chart.js';
Chart.register(...registerables);
import chartPlugin from 'chartjs-plugin-datalabels';
import { createElement } from '../utils/render';
import {getTimeFromMins} from '../utils/common.js';
import {timeAdapterDiff} from '../utils/adapters';

const createObjWithCount = (objdata, objKeys, functWithValues) => {
  const objWithCount = {};
  objdata.forEach((dataItem) => {
    const type = dataItem[objKeys].toUpperCase();
    let value = 1;

    if (functWithValues) {
      value = functWithValues(dataItem);
    }

    if (type in objWithCount) {
      objWithCount[type] += value;
    } else {
      objWithCount[type] = value;
    }
  });

  return objWithCount;
};

const getStats = () => (
  `<section class="statistics">
    <h2 class="visually-hidden">Trip statistics</h2>

    <div class="statistics__item">
      <canvas class="statistics__chart" id="money" width="900"></canvas>
    </div>

    <div class="statistics__item">
      <canvas class="statistics__chart" id="type" width="900"></canvas>
    </div>

    <div class="statistics__item">
      <canvas class="statistics__chart" id="time-spend" width="900"></canvas>
    </div>
  </section>`
);

export default class Stats extends AbstractView {
  constructor(data) {
    super();
    this._data = data;
    this._moneyStatsChart = null;
    this._typeStatsChart = null;
    this._timeSpendStatsChart = null;
  }

  _getChartOptions(data, name, funct = (info) => (info)) {
    return {
      plugins: [chartPlugin],
      type: 'bar',
      data: {
        labels: Object.keys(data),
        datasets: [{
          data: Object.values(data),
          backgroundColor: '#ffd054',
          hoverBackgroundColor: '#ffffff',
        }],
      },
      options: {
        title: {
          display: true,
          text: 'TEST',
        },
        indexAxis: 'y',
        plugins: {
          datalabels: {
            font: {
              size: 17,
            },
            color: '#000000',
            anchor: 'end',
            align: 'start',
            formatter: funct,
          },
          title: {
            display: true,
            text: name,
            color: '#000000',
            font: {
              size: 20,
              weight: 'bold',
              family: ['Montserrat', 'Arial', 'sans-serif'],
            },
            position: 'left',
          },
        },
      },
      scales: {
        yAxes: [{
          minBarLength: Math.round(Math.max(...Object.values(data))/100*15),
          ticks: {
            fontColor: '#000000',
            padding: 5,
            fontSize: 13,
          },
        }],
        xAxes: [{
          minBarLength: Math.round(Math.max(...Object.values(data))/100*15),
          ticks: {
            fontColor: '#000000',
            padding: 5,
            fontSize: 13,
            beginAtZero: true,
          },
        }],
      },
    };
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    if (this._moneyStatsChart === null) {
      this._moneyStatsChart = new Chart(
        this._element.querySelector('#money'),
        this._getChartOptions(
          createObjWithCount(this._data, 'type', (item) => item.basePrice),
          'MONEY',
          (val) => `€ ${val} `,
        ),
      );
    }

    if (this._typeStatsChart === null) {
      this._typeStatsChart = new Chart(
        this._element.querySelector('#type'),
        this._getChartOptions(
          createObjWithCount(this._data, 'type'),
          'TYPE',
          (val) => `${val}x `,
        ),
      );
    }

    if (this._timeSpendStatsChart === null) {
      this._timeSpendStatsChart = new Chart(
        this._element.querySelector('#time-spend'),
        this._getChartOptions(
          createObjWithCount(this._data, 'type', (item) => timeAdapterDiff(item.dateTo, item.dateFrom)),
          'TIME',
          (val) => `${getTimeFromMins(val)} `,
        ),
      );
    }

    return this._element;
  }

  getTemplate() {
    return getStats();
  }

  _callbackChangeNavigation(evt) {
    evt.preventDefault();
    console.log(evt)
    this._callback.change(evt.target);
  }

  setChangeNavigation(callback) {
    this._callback.change = callback;
    this.getElement().
      querySelectorAll('.trip-tabs__btn').
      addEventListener('click', )
  }
}
