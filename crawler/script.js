const { writeFile } = require('fs').promises
const fetch = require('node-fetch')
const { sleep } = require('../helpers')
const { API_BASEURL, API_BASEURL_2 } = require('./config')

const temp = require('../data/quran-tafsir.json') // source: https://github.com/sutanlab/igbot-ayatdariallah/blob/master/quran-tafsir.json

const getSurah = surah => {
    const editions = [
        'quran-simple-enhanced', 'ar.alafasy',
        'en.transliteration', 'en.sahih'
    ]
    
    const apiUrl = `${API_BASEURL}/surah/${surah}/editions/${editions.join(',')}`
    console.log(`> Prepare surah: ${surah} (${apiUrl})`)

    const action = async () => {
        try {
            const data = await Promise.race([
                fetch(apiUrl),
                sleep({ delay: 6000, throwReject: true })
            ])
            return data
        } catch (err) {
            if (err.timeout) {
                console.log('> Request Timeout, Trying again...')
                return await action()
            }
            console.error(err)
        }
    }

    return action()
}

const operate = async (surah, tafsirSurah = {}, tryFlag = false) => {
    const { asma, keterangan, urut } = tafsirSurah
    try {
        const responseText = await (await getSurah(surah)).text()
        const response = responseText.replace(/\\u/g, '%u')
        const { code, status, data } = JSON.parse(response)
        const [simple, arab, transliteration, english] = data
        const activeSurah = temp[`${arab.number}.1`].surah

        if (code !== 200) throw { surah, code, status }
        if (tryFlag) console.log(`\n Retrying at surah: ${surah}`)

        process.stdout.write(`> (${code}:${status}). Operating on surah ${surah}:${arab.englishName}... `)

        const result = {
            number: arab.number,
            sequence: parseInt(urut, 10),
            numberOfVerses: arab.numberOfAyahs,
            name: {
                short: asma,
                long: arab.name,
                transliteration: {
                    en: arab.englishName,
                    id: activeSurah.latin
                },
                translation: {
                    en: arab.englishNameTranslation,
                    id: activeSurah.id
                }
            },
            revelation: {
                arab: arab.revelationType === 'Meccan'
                    ? '%u0645%u0643%u0629'
                    : '%u0645%u062F%u064A%u0646%u0629',
                en: arab.revelationType,
                id: arab.revelationType === 'Meccan'
                    ? 'Makkiyyah'
                    : 'Madaniyyah'
            },
            tafsir: {
                id: (() => {
                    let tafsir = keterangan.replace(/(<([^>]+)>)/gi, '')
                    if (surah === 13 || surah === 55) {
                        tafsir = tafsir.replace(/Makkiyyah/gi, 'Madaniyyah')
                    }
                    return tafsir
                })()
            },
            verses: arab.ayahs.map((ayah, idx) => {
                const activeAyah = temp[`${arab.number}.${ayah.numberInSurah}`]
                const { tafsir } = activeAyah
                return {
                    number: {
                        inQuran: ayah.number,
                        inSurah: ayah.numberInSurah
                    },
                    meta: {
                        juz: ayah.juz,
                        page: ayah.page,
                        sajda: ayah.sajda,
                        manzil: ayah.manzil,
                        ruku: ayah.ruku,
                        hizbQuarter: ayah.hizbQuarter
                    },
                    text: {
                        arab: simple.ayahs[idx].text,
                        transliteration: {
                            en: transliteration.ayahs[idx].text
                        },
                    },
                    audio: {
                        primary: ayah.audio,
                        secondary: ayah.audioSecondary
                    },
                    translation: {
                        en: english.ayahs[idx].text,
                        id: activeAyah.text.id
                    },
                    tafsir: {
                        id: {
                            short: tafsir.short,
                            long: tafsir.long
                        }
                    }
                }
            })
        }

        process.stdout.write('\n> Done!\n\n')
        return result
    } catch (err) {
        const { surah, code, status } = err

        if (surah) {
            process.stdout.write(`> (${code}:${status}). Error on surah ${surah}!`)
            console.log('\n> Will retrying at last queue...\n')
            return await operate(surah, tafsirSurah, true)
        }
        
        console.error(err)
    }
}

async function main() {
    console.log('Fetching all surah...\n')
    const responseTafsirSurahId = await fetch(API_BASEURL_2)
    const tafsirSurahs = await responseTafsirSurahId.json()
    const response = []

    for (let i = 1; i <= 114; i++) {
        const surah = await operate(i, tafsirSurahs[i - 1])
        response.push(surah)
    }

    console.log('\nFetching all surah (DONE).')
    process.stdout.write('\n> Writing Data..')

    const data = JSON.stringify({
        license: "(MIT) Sutan Nasution <sutan.gnst@gmail.com>",
        source: "https://github.com/sutanlab/quran-api",
        audioEdition: "Syekh. Mishary Rashid Al-Afasy",
        data: response
    }, null, 2)

    await writeFile('./data/quran.json', data.replace(/%u/g, '\\u'))
    console.log(`\n> Writed ${response.length} surah.\n`)
    console.log('Generate Done!')
}

main()
