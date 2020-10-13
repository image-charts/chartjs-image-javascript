// import ChartJSImage from 'chart.js-image';
const ChartJSImage = require('..');

const chart_url = ChartJSImage()
.chart({
type: 'bar',
data: { labels: ['Hello world', 'Foo bar'], datasets: [{ label: 'Foo', data: [1, 2] }] },
}) // vertical bar chart
.width(300) // 300px
.height(300) // 300px
.toURL(); // get the generated URL

console.log(chart_url); // https://image-charts.com/chart?cht=bvg&chs=300x300&chd=a%3A60%2C40
