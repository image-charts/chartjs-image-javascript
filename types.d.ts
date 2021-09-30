export default class ChartJSImage {
    constructor(options?: {
        timeout?: number;
        secret?: string;
        host?: string;
        protocol?: string;
        port?: number;
        pathname?: string;
    })

    
    /**
     * Javascript/JSON definition of the chart. Use a Chart.js configuration object.
     * [Reference documentation]{@link }
     * @example
         * const chart = ImageCharts().c("{type:'bar',data:{labels:['Q1','Q2','Q3','Q4'],datasets:[{label:'Users',data:[50,60,70,180]},{label:'Revenue',data:[100,200,300,400]}]}}");
     * 
     * @param {string} value - Javascript/JSON definition of the chart. Use a Chart.js configuration object.
     * @return {ImageCharts.constructor}
     */
    c(value: string): this;
    
    /**
     * Javascript/JSON definition of the chart. Use a Chart.js configuration object.
     * [Reference documentation]{@link }
     * @example
         * const chart = ImageCharts().chart("{type:'bar',data:{labels:['Q1','Q2','Q3','Q4'],datasets:[{label:'Users',data:[50,60,70,180]},{label:'Revenue',data:[100,200,300,400]}]}}");
     * 
     * @param {string} value - Javascript/JSON definition of the chart. Use a Chart.js configuration object.
     * @return {ImageCharts.constructor}
     */
    chart(value: string): this;
    
    /**
     * Width of the chart
     * [Reference documentation]{@link }
     * @example
         * const chart = ImageCharts().width("400");
     * @default "500"
     * @param {integer} value - Width of the chart
     * @return {ImageCharts.constructor}
     */
    width(value: string): this;
    
    /**
     * Height of the chart
     * [Reference documentation]{@link }
     * @example
         * const chart = ImageCharts().height("300");
     * @default "300"
     * @param {integer} value - Height of the chart
     * @return {ImageCharts.constructor}
     */
    height(value: string): this;
    
    /**
     * Background of the chart canvas. Accepts rgb (rgb(255,255,120)), colors (red), and url-encoded hex values (%23ff00ff). Abbreviated as &#34;bkg&#34;
     * [Reference documentation]{@link }
     * @example
         * const chart = ImageCharts().backgroundColor("black");
         * const chart = ImageCharts().backgroundColor("rgb(255,255,120)");
         * const chart = ImageCharts().backgroundColor("%23ff00ff");
     * 
     * @param {string} value - Background of the chart canvas. Accepts rgb (rgb(255,255,120)), colors (red), and url-encoded hex values (%23ff00ff). Abbreviated as &#34;bkg&#34;
     * @return {ImageCharts.constructor}
     */
    backgroundColor(value: string): this;
    
    /**
     * Background of the chart canvas. Accepts rgb (rgb(255,255,120)), colors (red), and url-encoded hex values (%23ff00ff). Abbreviated as &#34;bkg&#34;
     * [Reference documentation]{@link }
     * @example
         * const chart = ImageCharts().bkg("black");
         * const chart = ImageCharts().bkg("rgb(255,255,120)");
         * const chart = ImageCharts().bkg("%23ff00ff");
     * 
     * @param {string} value - Background of the chart canvas. Accepts rgb (rgb(255,255,120)), colors (red), and url-encoded hex values (%23ff00ff). Abbreviated as &#34;bkg&#34;
     * @return {ImageCharts.constructor}
     */
    bkg(value: string): this;
    
    /**
     * Encoding of your &#34;chart&#34; parameter. Accepted values are url and base64.
     * [Reference documentation]{@link }
     * @example
         * const chart = ImageCharts().encoding("url");
         * const chart = ImageCharts().encoding("base64");
     * @default "url"
     * @param {string} value - Encoding of your &#34;chart&#34; parameter. Accepted values are url and base64.
     * @return {ImageCharts.constructor}
     */
    encoding(value: string): this;
    
    /**
     * image-charts enterprise `account_id`
     * [Reference documentation]{@link https://documentation.image-charts.com/enterprise/}
     * @example
         * const chart = ImageCharts().icac("accountId");
     * 
     * @param {string} value - image-charts enterprise `account_id`
     * @return {ImageCharts.constructor}
     */
    icac(value: string): this;
    
    /**
     * HMAC-SHA256 signature required to activate paid features
     * [Reference documentation]{@link https://documentation.image-charts.com/enterprise/}
     * @example
         * const chart = ImageCharts().ichm("0785cf22a0381c2e0239e27c126de4181f501d117c2c81745611e9db928b0376");
     * 
     * @param {string} value - HMAC-SHA256 signature required to activate paid features
     * @return {ImageCharts.constructor}
     */
    ichm(value: string): this;
    
    /**
     * Retina is a marketing term coined by Apple that refers to devices and monitors that have a resolution and pixel density so high — roughly 300 or more pixels per inch – that a person is unable to discern the individual pixels at a normal viewing distance.
	*           In order to generate beautiful charts for these Retina displays, Image-Charts supports a retina mode that can be activated through the icretina=1 parameter
     * [Reference documentation]{@link https://documentation.image-charts.com/reference/retina/}
     * @example
         * const chart = ImageCharts().icretina("1");
     * 
     * @param {string} value - retina mode
     * @return {ImageCharts.constructor}
     */
    icretina(value: string): this;
    

    /**
     * Get the full Image-Charts API url (signed and encoded if necessary)
     * @return full generated url
     */
    toURL(): string;

    /**
     * Do a request to Image-Charts API with current configuration and yield a promise of a NodeJS buffer
     * @return binary image represented as a NodeJS Buffer wrapped inside a promise
     */
    toBuffer(): Promise<Buffer>;

    /**
     * Do a request to Image-Charts API with current configuration and yield a promise of a base64 encoded data URI
     * @return base64 data URI wrapped inside a promise
     */
    toDataURI(): Promise<string>;
}
