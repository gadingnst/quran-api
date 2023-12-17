const getData = require("../lib/get-data");

class PageHandler {
  static getPage(req, res) {
    const { page } = req.params;
    const data = getData({ input: parseInt(page), mode: "page" });

    if (!data) {
      return res.status(404).send({
        code: 404,
        status: "Not Found.",
        message: `page "${page}" is not found.`,
        data: {},
      });
    }

    return res.status(200).send({
      code: 200,
      status: "OK.",
      message: "Success fetching page.",
      data,
    });
  }
}

module.exports = PageHandler;
