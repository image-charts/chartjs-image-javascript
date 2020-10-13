//import ChartJSImage from 'chart.js-image';
const ChartJSImage = require('..');

const chart_url = ChartJSImage()
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
.toDataURI() // download chart image and generate a data URI string
.then(chart_url => console.log(chart_url)); // "data:image/png;base64,iVBORw0KGgoAAAANSUhE"UgAABXgAAAMMCAIAAABmCliNAAHJnElEQVR42uzdeXjc1X3v8e/sq8baF2uXvMkbBmxibMALmN0FGiCBJpT0Ccnl0qRNnockT3vbOuT2Xkpzcxty0yZtnoQCqdliCKaktpEBG2+xkRfJlmzZsiXLlrWPRpp9u38c+DEZybYsy/KM9H794Uf6+aefRufMdj5zzvfo4vG4AAAAAAAAjAc9TQAAAAAAAMYLQQMAAAAAABPhyJEjf/RHf+T1elPkF12h20PQAAAAAADARCgvL1+3bp3Vap3cf6aRngYAAAAAYAK0trauW7fub/7mb37wgx8kHs/KynruuecKCgreeOONF198UR187bXXduzY8eMf/1j79p133lH/u27duuuuuy7p4q+//vpLL70kIn/7t39rt9tF5JFHHjnflVtbW7/zne988YtfVKd9//vfr6ysfPzxx2OxmDpBpSGJ11y8eLF2ERWXfO973xvxryBoAAAAAABgon3ve9/r6ur65S9/+Vd/9Vfnzp174okn1q1b9+KLL2rHjxw58uMf//hrX/taJBJR37744ot/+Zd/2d3dvW7dutdeey3xai0tLS+99JL62WeeeWbdunXarxjxyuvWrfve975nMBjUaaFQ6LHHHvvLv/xLm81msVjMZrNaWJF0Te0i69atS/wViX/Fa6+9RtAAAAAAAMBEu+aaa1pbW0Vk0aJFLS0tw48rc+bMCYVC2rf/9E//VFpa+vOf/9xisdx3333a8WeffVb9rMFgmD9/fjAYHH6p8317zTXX6HS6u+6665/+6Z8qKyu1ORTaaaO5ZuJfQdAAAAAAAEB6WLduXWZmZlFRkRYuJLFYLCUlJYnJxWjY7fYnn3xy5cqVp06d2r1799KlSy/nmhSDBAAAAAAgVRw8ePDYsWPat01NTYnfBgIBt9tdV1cXi8XmJtB+9re//e3DDz8cCAQueuXE4x0dHXV1dX6/PxgM/q//9b96enrq6uqi0ejwa57vIomY0QAAAAAAwNU3d+7ct99++/7771cVGdW3Tz755JkzZ4b/r1avMelny8vL33777SNHjl
