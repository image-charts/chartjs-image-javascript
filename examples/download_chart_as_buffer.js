//import ChartJSImage from 'chart.js-image';
const ChartJSImage = require('..');

const buffer = ChartJSImage()
.chart({
  "type": "radar",
  "data": {
    "labels": [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August"
    ],
    "datasets": [
      {
        "backgroundColor": "rgba(255, 99, 132, 0.5)",
        "borderColor": "rgb(255, 99, 132)",
        "data": [
          15.09,
          15.67,
          12.5,
          12.77,
          13.62,
          13.68,
          13.93,
          15.95
        ],
        "label": "D0"
      },
      {
        "backgroundColor": "rgba(255, 159, 64, 0.5)",
        "borderColor": "rgb(255, 159, 64)",
        "data": [
          24.55,
          28.91,
          21.81,
          23.27,
          26.98,
          26.05,
          25.39,
          24.92
        ],
        "label": "D1",
        "fill": "-1"
      },
      {
        "backgroundColor": "rgba(255, 205, 86, 0.5)",
        "borderColor": "rgb(255, 205, 86)",
        "data": [
          36.35,
          43.93,
          32.54,
          33.54,
          42.82,
          39.34,
          35.84,
          33.5
        ],
        "label": "D2",
        "fill": 1
      },
      {
        "backgroundColor": "rgba(75, 192, 192, 0.5)",
        "borderColor": "rgb(75, 192, 192)",
        "data": [
          47.7,
          58.92,
          44.45,
          49.08,
          53.39,
          51.85,
          48.4,
          49.36
        ],
        "label": "D3",
        "fill": false
      },
      {
        "backgroundColor": "rgba(54, 162, 235, 0.5)",
        "borderColor": "rgb(54, 162, 235)",
        "data": [
          60.73,
          71.97,
          53.96,
          57.22,
          65.09,
          62.06,
          56.91,
          60.52
        ],
        "label": "D4",
        "fill": "-1"
      },
      {
        "backgroundColor": "rgba(153, 102, 255, 0.5)",
        "borderColor": "rgb(153, 102, 255)",
        "data": [
          73.33,
          80.78,
          68.05,
          68.59,
          76.79,
          77.24,
          66.08,
          72.37
        ],
        "label": "D5",
        "fill": "-1"
      }
    ]
  },
  "options": {
    "maintainAspectRatio": true,
    "spanGaps": false,
    "elements": {
      "line": {
        "tension": 0.000001
      }
    },
    "plugins": {
      "filler": {
        "propagate": false
      },
      "samples-filler-analyser": {
        "target": "chart-analyser"
      }
    }
  }
})
.bkg('white')
.width(700)
.height(390)
.toBuffer() // download chart image as a buffer
.then((buffer) => console.log(buffer)) // <Buffer 89 50 4e 47 0d 0a 1a 0a 00 00 00 0d 49 48 44 5

