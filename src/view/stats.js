import AbstractView from './abstract';
import {Chart, registerables} from 'chart.js';
Chart.register(...registerables);
import chartPlugin from 'chartjs-plugin-datalabels';
import { createElement } from '../utils/render';
import {getTimeFromMins} from '../utils/common.js';
import {timeAdapterDiff} from '../utils/adapters';

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
    console.log(Math.max(...Object.values(data))/100*15)
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
          minBarLength: Math.max(...Object.values(data))/100*15,
          ticks: {
            fontColor: '#000000',
            padding: 5,
            fontSize: 13,
          },
        }],
        xAxes: [{
          minBarLength: Math.max(...Object.values(data))/100*15,
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
      const moneyStatsChart = {};
      this._data.forEach((dataItem) => {
        const type = dataItem.type.toUpperCase();

        if (type in moneyStatsChart) {
          moneyStatsChart[type] += dataItem.basePrice;
        } else {
          moneyStatsChart[type] = dataItem.basePrice;
        }
      });
      this._moneyStatsChart = new Chart(this._element.querySelector('#money'), this._getChartOptions(moneyStatsChart, 'MONEY', (val) => `€ ${val} `));
    }

    if (this._typeStatsChart === null) {
      const typeStatsChart = {};
      this._data.forEach((dataItem) => {
        const type = dataItem.type.toUpperCase();

        if (type in typeStatsChart) {
          typeStatsChart[type] += 1;
        } else {
          typeStatsChart[type] = 1;
        }
      });
      this._typeStatsChart = new Chart(this._element.querySelector('#type'), this._getChartOptions(typeStatsChart, 'TYPE', (val) => `${val}x `));
    }

    if (this._timeSpendStatsChart === null) {
      const spendTimeChart = {};
      this._data.forEach((dataItem) => {
        const type = dataItem.type.toUpperCase();
        if (type in spendTimeChart) {
          spendTimeChart[type] += timeAdapterDiff(dataItem.dateTo, dataItem.dateFrom);
        } else {
          spendTimeChart[type] = timeAdapterDiff(dataItem.dateTo, dataItem.dateFrom);
        }
      });
      this._timeSpendStatsChart = new Chart(
        this._element.querySelector('#time-spend'),
        this._getChartOptions(spendTimeChart, 'TIME', (val) => `${getTimeFromMins(val)} `),
      );
    }

    return this._element;
  }

  getTemplate() {
    return getStats();
  }

  render() {

  }
}
