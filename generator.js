require('dotenv').config()
const { writeFile } = require('fs').promises
const fetch =  require('node-fetch')

const range = (start, end) =>
    start === end ? [start] : [start, ...range(start + 1, end)]

const getSurah = (surah, edition = ['ar.alafasy', 'en.transliteration', 'id.indonesian']) =>
    fetch(`${process.env.API_BASEURL}/surah/${surah}/editions/${edition.join(',')}`)

const mappingAyah = ({ number, text }) => ({ number, text })

const findAyah = ayah => ({ number }) => ayah === number

async function main() {
    console.log('Fetching all surah...\n')
    const response = await Promise.all(range(1, 114)
        .map(async surah => {
            const { data: [arab, latin, id] } = await (await getSurah(surah)).json()
            process.stdout.write(`> Operating on surah (${arab.number}) ${arab.englishName}... `)

            try {
                const latinAyahs = latin.ayahs.map(mappingAyah)
                const idAyahs = id.ayahs.map(mappingAyah)
                delete arab.edition
                const data = {
                    ...arab,
                    ayahs: arab.ayahs.map(ayah => ({
                        ...ayah,
                        text: {
                            arab: ayah.text,
                            latin: latinAyahs.find(findAyah(ayah.number)).text,
                            id: idAyahs.find(findAyah(ayah.number)).text
                        }
                    }))
                }

                process.stdout.write('Done!\n')
                return data
            } catch (err) {
                process.stdout.write('Error!\n')
                console.error(err)
                console.log()
            }
        })
    );

    console.log('\nFetching all surah (DONE).')

    const result = {
        license: `(MIT) Sutan Nasution <sutan.gnst@gmail.com>`,
        audioEdition: 'Syekh. Mishary Rashid Alafasy',
        data: response
    }

    process.stdout.write('\n> Writing Data..')
    await writeFile('al-quran.json', JSON.stringify(result))
    console.log('\n> Generate Done!')
}

main()