const juzData = require('../lib/juz.js');

class JuzHandler {
  static getJuz(req, res) {
    const { juz } = req.params;
    const data = juzData(parseInt(juz));

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
