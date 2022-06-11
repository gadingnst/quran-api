const { Router } = require('express')

const limiter = require('./limiter')
const { caching } = require('./middlewares')
const SurahHandler = require('./handlers/surah')
const JuzHandler = require('./handlers/juzHandler')

const router = Router()

/* whitelist rate-limit */
router.get('/', (req, res) => res.status(200).send({
    surah: {
        listSurah: '/surah',
        spesificSurah: {
            pattern: '/surah/{surah}',
            example: '/surah/18'
        },
        spesificAyahInSurah: {
            pattern: '/surah/{surah}/{ayah}',
            example: '/surah/18/60'
        }
    },
    maintaner: 'Sutan Gading Fadhillah Nasution <contact@gading.dev>',
    source: 'https://github.com/gadingnst/quran-api'
}))

router.get('/surah', caching, SurahHandler.getAllSurah)
/* end whitelist rate-limit */

// rate limiter middleware
router.use(limiter)

// surah router
router.get('/surah/:surah', caching, SurahHandler.getSurah)
router.get('/surah/:surah/:ayah', caching, SurahHandler.getAyahFromSurah)

// juz router
router.get('/juz/:juz', caching, JuzHandler.getJuz)

// fallback router
router.all('*', (req, res) => res.status(404).send({
    code: 404,
    status: 'Not Found.',
    message: `Resource "${req.url}" is not found.`
}))

module.exports = router
