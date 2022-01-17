const juzData = require('../lib/juzLib')

class JuzHandler {
    static getJuz(req, res) {
        const { juz } = req.params;
        const data = juzData(parseInt(juz));

        if (juz < 1 || juz > 30) {
            return res.status(404).send({
                code: 404,
                status: 'Not Found.',
                message: `Surah "${surah}" is not found.`,
                data: {}
            })
        }

        return res.status(200).send({
            code: 200,
            status: 'OK.',
            message: 'Success fetching juz.',
            data
        })
    }
}

module.exports = JuzHandler