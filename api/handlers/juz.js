const juzData = require('../lib/juz.js');

class JuzHandler {
  static getJuz(req, res) {
    const { juz: juzParam } = req.params;
    const juz = parseInt(juzParam);

    if (juz < 1 || juz > 30 || isNaN(juz)) {
      return res.status(404).send({
        code: 404,
        status: 'Not Found.',
        message: `Juz "${juzParam}" is not found.`,
        data: {}
      });
    }

    const data = juzData(juz);
    return res.status(200).send({
      code: 200,
      status: 'OK.',
      message: 'Success fetching juz.',
      data
    });
  }
}

module.exports = JuzHandler;
