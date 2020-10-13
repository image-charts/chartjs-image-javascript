const qs = require('querystring');
const crypto = require('crypto');
const fs = require('fs');
const fetch = require('node-fetch');
const packageJson = require('./package.json');
const { stringify } = require('javascript-stringify');

/*
 * ChartJSImage URL builder
 * @typedef ChartJSImage
 */
function ChartJSImage({secret, protocol, host, port, timeout} = {}, previous = {}) {
  if (!(this instanceof ChartJSImage)) {
    return new ChartJSImage({secret, protocol, host, port, timeout}, previous);
  }
  this._protocol = protocol || 'https';
  this._host = host || 'image-charts.com';
  this._port = port || 443;
  this._pathname = '/chart.js/2.8.0';
  this._timeout = typeof timeout !== 'undefined' ? timeout : 5000;
  this._query = {};
  this._secret = secret;
  Object.assign(this, previous);
}

ChartJSImage.prototype._clone = function (param, value) {
  return new this.constructor({}, {
    ...this,
    _query:{
      ...this._query,
      [param]: value
    }
  });
};


/**
  * Javascript/JSON definition of the chart. Use a Chart.js configuration object.
  * [Reference documentation]{@link }
  * @example
  * const chart = ChartJSImage().c("{type:'bar',data:{labels:['Q1','Q2','Q3','Q4'],datasets:[{label:'Users',data:[50,60,70,180]},{label:'Revenue',data:[100,200,300,400]}]}}");
  * 
  * @param {string} value - Javascript/JSON definition of the chart. Use a Chart.js configuration object.
  * @return {ChartJSImage.constructor}
  */
ChartJSImage.prototype.c = function(value) {
  return this._clone('c', stringify(value));
};

/**
  * Javascript/JSON definition of the chart. Use a Chart.js configuration object.
  * [Reference documentation]{@link }
  * @example
  * const chart = ChartJSImage().chart("{type:'bar',data:{labels:['Q1','Q2','Q3','Q4'],datasets:[{label:'Users',data:[50,60,70,180]},{label:'Revenue',data:[100,200,300,400]}]}}");
  * 
  * @param {string} value - Javascript/JSON definition of the chart. Use a Chart.js configuration object.
  * @return {ChartJSImage.constructor}
  */
ChartJSImage.prototype.chart = function(value) {
  return this._clone('chart', stringify(value));
};

/**
  * Width of the chart
  * [Reference documentation]{@link }
  * @example
  * const chart = ChartJSImage().width("400");
  * @default "500"
  * @param {integer} value - Width of the chart
  * @return {ChartJSImage.constructor}
  */
ChartJSImage.prototype.width = function(value) {
  return this._clone('width', value);
};

/**
  * Height of the chart
  * [Reference documentation]{@link }
  * @example
  * const chart = ChartJSImage().height("300");
  * @default "300"
  * @param {integer} value - Height of the chart
  * @return {ChartJSImage.constructor}
  */
ChartJSImage.prototype.height = function(value) {
  return this._clone('height', value);
};

/**
  * Background of the chart canvas. Accepts rgb (rgb(255,255,120)), colors (red), and url-encoded hex values (%23ff00ff). Abbreviated as &#34;bkg&#34;
  * [Reference documentation]{@link }
  * @example
  * const chart = ChartJSImage().backgroundColor("black");
  * const chart = ChartJSImage().backgroundColor("rgb(255,255,120)");
  * const chart = ChartJSImage().backgroundColor("%23ff00ff");
  * 
  * @param {string} value - Background of the chart canvas. Accepts rgb (rgb(255,255,120)), colors (red), and url-encoded hex values (%23ff00ff). Abbreviated as &#34;bkg&#34;
  * @return {ChartJSImage.constructor}
  */
ChartJSImage.prototype.backgroundColor = function(value) {
  return this._clone('backgroundColor', value);
};

/**
  * Background of the chart canvas. Accepts rgb (rgb(255,255,120)), colors (red), and url-encoded hex values (%23ff00ff). Abbreviated as &#34;bkg&#34;
  * [Reference documentation]{@link }
  * @example
  * const chart = ChartJSImage().bkg("black");
  * const chart = ChartJSImage().bkg("rgb(255,255,120)");
  * const chart = ChartJSImage().bkg("%23ff00ff");
  * 
  * @param {string} value - Background of the chart canvas. Accepts rgb (rgb(255,255,120)), colors (red), and url-encoded hex values (%23ff00ff). Abbreviated as &#34;bkg&#34;
  * @return {ChartJSImage.constructor}
  */
ChartJSImage.prototype.bkg = function(value) {
  return this._clone('bkg', value);
};

/**
  * Encoding of your &#34;chart&#34; parameter. Accepted values are url and base64.
  * [Reference documentation]{@link }
  * @example
  * const chart = ChartJSImage().encoding("url");
  * const chart = ChartJSImage().encoding("base64");
  * @default "url"
  * @param {string} value - Encoding of your &#34;chart&#34; parameter. Accepted values are url and base64.
  * @return {ChartJSImage.constructor}
  */
ChartJSImage.prototype.encoding = function(value) {
  return this._clone('encoding', value);
};

/**
  * image-charts enterprise `account_id`
  * [Reference documentation]{@link https://documentation.image-charts.com/enterprise/}
  * @example
  * const chart = ChartJSImage().icac("accountId");
  * 
  * @param {string} value - image-charts enterprise `account_id`
  * @return {ChartJSImage.constructor}
  */
ChartJSImage.prototype.icac = function(value) {
  return this._clone('icac', value);
};

/**
  * HMAC-SHA256 signature required to activate paid features
  * [Reference documentation]{@link https://documentation.image-charts.com/enterprise/}
  * @example
  * const chart = ChartJSImage().ichm("0785cf22a0381c2e0239e27c126de4181f501d117c2c81745611e9db928b0376");
  * 
  * @param {string} value - HMAC-SHA256 signature required to activate paid features
  * @return {ChartJSImage.constructor}
  */
ChartJSImage.prototype.ichm = function(value) {
  return this._clone('ichm', value);
};

/**
  * Retina is a marketing term coined by Apple that refers to devices and monitors that have a resolution and pixel density so high — roughly 300 or more pixels per inch – that a person is unable to discern the individual pixels at a normal viewing distance.
	*           In order to generate beautiful charts for these Retina displays, Image-Charts supports a retina mode that can be activated through the icretina=1 parameter
  * [Reference documentation]{@link https://documentation.image-charts.com/reference/retina/}
  * @example
  * const chart = ChartJSImage().icretina("1");
  * 
  * @param {string} value - retina mode
  * @return {ChartJSImage.constructor}
  */
ChartJSImage.prototype.icretina = function(value) {
  return this._clone('icretina', value);
};


/**
  * Get the full ChartJSImage API url (signed and encoded if necessary)
  * @return {string} full generated url
  */
ChartJSImage.prototype.toURL = function () {
  const url = new URL(`${this._protocol}://${this._host}`);

  /* istanbul ignore else */
  if(this._port) {url.port = this._port}

  url.pathname = this._pathname;

  const searchParams = new URLSearchParams(this._query);

  if (this._query.icac && this._secret && this._secret.length) {
    searchParams.append('ichm', crypto.createHmac('sha256', this._secret).update(searchParams.toString()).digest('hex'));
  }

  url.search = searchParams.toString();

  return url.toString();
};

/**
 * Do a request to ChartJSImage API with current configuration and yield a promise of a NodeJS buffer
 * @return {Promise<Buffer>} binary image represented as a NodeJS Buffer wrapped inside a promise
 */
ChartJSImage.prototype.toBuffer = function () {
  const _options = {
    timeout: this._timeout,
    headers: { 'User-Agent': `javascript-chart.js-image/${packageJson.version}` + (this._query.icac ? ' ' + `(${this._query.icac})` : '') }
  };
  return fetch(this.toURL(), _options).then(res => {
    return res.buffer().then(buff => {
      if(res.status >= 200 && res.status < 300){
        buff._response = res;
        buff._request = _options;
        return buff;
      }

      const validation_message = res.headers.get('x-ic-error-validation');
      const validation_code = res.headers.get('x-ic-error-code');
      let message = validation_message ? JSON.parse(validation_message).map(x => x.message).join('\n').trim() : '';
      /* istanbul ignore next */
      message = message.length > 0 || !validation_code ? message : validation_code;
      /* istanbul ignore next */
      message = message.length > 0 ? message : res.statusText;
      const err = new Error(message);
      /* istanbul ignore next */
      err.code = validation_code || res.statusText;
      err.statusCode = res.statusCode;
      err._response = res;
      err._request = _options;
      return Promise.reject(err);
    });
  })
};

/**
 * Do a request to ChartJSImage API with current configuration and writes the content inside a file
 * @return {Promise}
 */
ChartJSImage.prototype.toFile = function (file) {
  return this.toBuffer().then(buffer =>
    new Promise((resolve, reject) =>
      fs.writeFile(file, buffer, (err) => err ? reject(err) : resolve())))
};

/**
 * Do a request to ChartJSImageAPI with current configuration and yield a promise of a base64 encoded data URI
 * @return {Promise<String>} base64 data URI wrapped inside a promise
 */
ChartJSImage.prototype.toDataURI = function () {
  const encoding = 'base64';
  const mimetype = this._query.chan ? 'image/gif' : 'image/png';
  return this.toBuffer().then(buffer => `data:${mimetype};${encoding},${buffer.toString(encoding)}`);
};

module.exports = ChartJSImage;
