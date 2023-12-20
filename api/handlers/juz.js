const getData = require('../lib/get-data');

class JuzHandler {
  static getJuz(req, res) {
    const { juz } = req.params;
    const data = getData({ input: parseInt(juz), mode: 'juz' });

    if (!data) {
      return res.status(404).send({
        code: 404,
        status: 'Not Found.',
        message: `Juz "${juz}" is not found.`,
        data: {}
      });
    }

    return res.status(200).send({
      code: 200,
      status: 'OK.',
      message: 'Success fetching juz.',
      data
    });
  }
}

module.exports = JuzHandler;
