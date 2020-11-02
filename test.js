import ChartJSImage from "./";
import pkg from "./package.json";
import fs from "fs";

describe("ChartJSImage", () => {
  it("works in ES6", () => {
    expect(typeof ChartJSImage).toMatchInlineSnapshot(`"function"`);
  });

  it("works in CommonJS", () => {
    expect(typeof require("./")).toMatchInlineSnapshot(`"function"`);
  });

  describe("toURL", () => {
    it("works", () => {
      expect(
        ChartJSImage()
          .chart({
            type: "bar",
            data: {
              labels: ["Hello world", "Foo bar"],
              datasets: [{ label: "Foo", data: [1, 2] }],
            },
          })
          .toURL()
      ).toMatchInlineSnapshot(
        `"https://image-charts.com/chart.js/2.8.0?chart=%7Btype%3A%27bar%27%2Cdata%3A%7Blabels%3A%5B%27Hello+world%27%2C%27Foo+bar%27%5D%2Cdatasets%3A%5B%7Blabel%3A%27Foo%27%2Cdata%3A%5B1%2C2%5D%7D%5D%7D%7D"`
      );
    });

    it("works port override", () => {
      expect(
        ChartJSImage({ port: 8080 })
          .chart({
            type: "bar",
            data: {
              labels: ["Hello world", "Foo bar"],
              datasets: [{ label: "Foo", data: [1, 2] }],
            },
          })
          .toURL()
      ).toMatchInlineSnapshot(
        `"https://image-charts.com:8080/chart.js/2.8.0?chart=%7Btype%3A%27bar%27%2Cdata%3A%7Blabels%3A%5B%27Hello+world%27%2C%27Foo+bar%27%5D%2Cdatasets%3A%5B%7Blabel%3A%27Foo%27%2Cdata%3A%5B1%2C2%5D%7D%5D%7D%7D"`
      );
    });

    it("exposes parameters and use them", () => {
      const ic = ChartJSImage();
      const { chart, query } = Object.keys(ic.__proto__)
        .filter((method) =>
          [
            "c",
            "chart",
            "width",
            "height",
            "backgroundColor",
            "encoding",
            "bkg",
            "icretina",
            "ichm",
          ].includes(method)
        )
        .reduce(
          (m, method_name) => {
            m.chart = m.chart[method_name]("plop");
            m.query.push(`${method_name}=plop`);
            return m;
          },
          { chart: ic, query: [] }
        );

      expect(chart.toURL()).toMatchInlineSnapshot(
        `"https://image-charts.com/chart.js/2.8.0?c=%27plop%27&chart=%27plop%27&width=plop&height=plop&backgroundColor=plop&bkg=plop&encoding=plop&ichm=plop&icretina=plop"`
      );
    });

    it("adds a signature when icac and secrets are defined", () =>
      expect(
        ChartJSImage({ secret: "plop" })
          .chart({
            type: "bar",
            data: {
              labels: ["Hello world", "Foo bar"],
              datasets: [{ label: "Foo", data: [1, 2] }],
            },
          })
          .icac("test_fixture")
          .toURL()
      ).toMatchInlineSnapshot(
        `"https://image-charts.com/chart.js/2.8.0?chart=%7Btype%3A%27bar%27%2Cdata%3A%7Blabels%3A%5B%27Hello+world%27%2C%27Foo+bar%27%5D%2Cdatasets%3A%5B%7Blabel%3A%27Foo%27%2Cdata%3A%5B1%2C2%5D%7D%5D%7D%7D&icac=test_fixture&ichm=49b0554d30517ceee5bb1fd7d5077ee6488cdef49f9574822af4ea7b4ceb136d"`
      ));
  });

  describe("toBuffer", () => {
    it("rejects if a chs is not defined", () =>
      expect(ChartJSImage().toBuffer()).rejects.toMatchInlineSnapshot(
        `[Error: Bad Request]`
      ));

    it("rejects if a icac is defined without ichm", () =>
      expect(
        ChartJSImage()
          .chart({
            type: "bar",
            data: {
              labels: ["Hello world", "Foo bar"],
              datasets: [{ label: "Foo", data: [1, 2] }],
            },
          })
          .icac("test_fixture")
          .toBuffer()
      ).rejects.toMatchInlineSnapshot(`[Error: Bad Request]`));

    it("rejects if timeout is reached", () =>
      expect(
        ChartJSImage({ timeout: 1 }) // 1ms
          .chart({
            type: "bar",
            data: {
              labels: ["Hello world", "Foo bar"],
              datasets: [{ label: "Foo", data: [1, 2] }],
            },
          })
          .toBuffer()
      ).rejects.toMatchInlineSnapshot(
        `[FetchError: network timeout at: https://image-charts.com/chart.js/2.8.0?chart=%7Btype%3A%27bar%27%2Cdata%3A%7Blabels%3A%5B%27Hello+world%27%2C%27Foo+bar%27%5D%2Cdatasets%3A%5B%7Blabel%3A%27Foo%27%2Cdata%3A%5B1%2C2%5D%7D%5D%7D%7D]`
      ));

    it("works", () =>
      expect(
        ChartJSImage()
          .chart({
            type: "bar",
            data: {
              labels: ["Hello world", "Foo bar"],
              datasets: [{ label: "Foo", data: [1, 2] }],
            },
          })
          .width(1)
          .height(1)
          .toBuffer()
          .then((buff) => buff.slice(0, 10))
      ).resolves.toMatchInlineSnapshot(`
        Object {
          "data": Array [
            137,
            80,
            78,
            71,
            13,
            10,
            26,
            10,
            0,
            0,
          ],
          "type": "Buffer",
        }
      `));

    it("forwards package_name/version as user-agent", () =>
      ChartJSImage()
        .chart({
          type: "bar",
          data: {
            labels: ["Hello world", "Foo bar"],
            datasets: [{ label: "Foo", data: [1, 2] }],
          },
        })
        .toBuffer()
        .then((buff) =>
          expect(buff._request.headers["User-Agent"]).toStrictEqual(
            `javascript-${pkg.name}/${pkg.version}`
          )
        ));

    it("forwards package_name/version (icac) as user-agent", () =>
      ChartJSImage()
        .chart({
          type: "bar",
          data: {
            labels: ["Hello world", "Foo bar"],
            datasets: [{ label: "Foo", data: [1, 2] }],
          },
        })
        .icac("MY_ACCOUNT_ID")
        .toBuffer()
        .catch((err) =>
          expect(err._request.headers["User-Agent"]).toStrictEqual(
            `javascript-${pkg.name}/${pkg.version} (MY_ACCOUNT_ID)`
          )
        ));
  });

  describe("toDataURI", () => {
    it("rejects if there was an error", () =>
      expect(ChartJSImage().toDataURI()).rejects.toMatchInlineSnapshot(
        `[Error: Bad Request]`
      ));

    it("works", () =>
      expect(
        ChartJSImage()
          .chart({
            type: "bar",
            data: {
              labels: ["Hello world", "Foo bar"],
              datasets: [{ label: "Foo", data: [1, 2] }],
            },
          })
          .width(2)
          .height(2)
          .toDataURI()
          .then((data_uri) => data_uri.substring(0, 40))
      ).resolves.toMatchInlineSnapshot(
        `"data:image/png;base64,iVBORw0KGgoAAAANSU"`
      ));

    it("support gifs", () =>
      ChartJSImage()
        .chart({
          type: "bar",
          data: {
            labels: ["Hello world", "Foo bar"],
            datasets: [{ label: "Foo", data: [1, 2] }],
          },
        })
        .width(2)
        .height(2)
        .toDataURI()
        .then((data_uri) =>
          expect(data_uri.substring(0, 30)).toMatchInlineSnapshot(
            `"data:image/png;base64,iVBORw0K"`
          )
        ));
  });

  describe("toFile", () => {
    it("rejects if there was an error", () =>
      expect(
        ChartJSImage().toFile("/tmp/chart.png")
      ).rejects.toMatchInlineSnapshot(`[Error: Bad Request]`));

    it("rejects when the path is invalid", () => {
      const file_path = "/__invalid_path/chart.png";
      return expect(
        ChartJSImage()
          .chart({
            type: "bar",
            data: {
              labels: ["Hello world", "Foo bar"],
              datasets: [{ label: "Foo", data: [1, 2] }],
            },
          })
          .toFile(file_path)
      ).rejects.toBeDefined();
    });

    it("works", () => {
      const file_path = "/tmp/chart.png";
      return ChartJSImage()
        .chart({
          type: "bar",
          data: {
            labels: ["Hello world", "Foo bar"],
            datasets: [{ label: "Foo", data: [1, 2] }],
          },
        })
        .toFile(file_path)
        .then(() => expect(fs.existsSync(file_path)).toBe(true));
    });
  });

  describe("protocol", () => {
    it("expose the protocol", () => {
      expect(ChartJSImage()._protocol).toMatchInlineSnapshot(`"https"`);
    });

    it("let protocol to be user-defined", () => {
      expect(
        ChartJSImage({ protocol: "http" })._protocol
      ).toMatchInlineSnapshot(`"http"`);
    });
  });

  describe("host", () => {
    it("expose the host", () => {
      expect(ChartJSImage()._host).toMatchInlineSnapshot(`"image-charts.com"`);
    });

    it("let host to be user-defined", () => {
      expect(
        ChartJSImage({ host: "on-premise-image-charts.com" })._host
      ).toMatchInlineSnapshot(`"on-premise-image-charts.com"`);
    });
  });

  describe("pathname", () => {
    it("expose the pathname", () => {
      expect(ChartJSImage()._pathname).toMatchInlineSnapshot(
        `"/chart.js/2.8.0"`
      );
    });
  });

  describe("port", () => {
    it("expose the port", () => {
      expect(ChartJSImage()._port).toMatchInlineSnapshot(`443`);
    });

    it("let port to be user-defined", () => {
      expect(ChartJSImage({ port: 8080 })._port).toMatchInlineSnapshot(`8080`);
    });
  });

  describe("query", () => {
    it("expose the port", () => {
      expect(ChartJSImage()._query).toMatchInlineSnapshot(`Object {}`);
    });

    it("expose the query", () => {
      expect(
        ChartJSImage()
          .chart({
            type: "bar",
            data: {
              labels: ["Hello world", "Foo bar"],
              datasets: [{ label: "Foo", data: [1, 2] }],
            },
          })
          .icac("plop")._query
      ).toMatchInlineSnapshot(`
        Object {
          "chart": "{type:'bar',data:{labels:['Hello world','Foo bar'],datasets:[{label:'Foo',data:[1,2]}]}}",
          "icac": "plop",
        }
      `);
    });
  });
});
