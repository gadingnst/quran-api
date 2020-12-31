require('dotenv').config()

const { Router } = require('express')
const { caching } = require('./middlewares')
const SurahHandler = require('./handlers/surah')

const router = Router()

// surah router
router.get('/surah', caching, SurahHandler.getAllSurah)
router.get('/surah/:surah', caching, SurahHandler.getSurah)
router.get('/surah/:surah/:ayah', caching, SurahHandler.getAyahFromSurah)

// root router
router.get('/', (req, res) => res.status(200).send({
    surah: {
        listSurah: `${process.env.BASE_URL}/surah`,
        spesificSurah: {
            pattern: `${process.env.BASE_URL}/surah/{surah}`,
            example: `${process.env.BASE_URL}/surah/18`
        },
        spesificAyahInSurah: {
            pattern: `${process.env.BASE_URL}/surah/{surah}/{ayah}`,
            example: `${process.env.BASE_URL}/surah/18/60`
        }
    },
    maintaner: 'Sutan Gading Fadhillah Nasution <sutan.gnst@gmail.com>',
    source: 'https://github.com/sutanlab/quran-api'
}))

// fallback router
router.all('*', (req, res) => res.status(404).send({
    code: 404,
    status: 'Not Found.',
    message: `Resource "${req.url}" is not found.`
}))

module.exports = router
