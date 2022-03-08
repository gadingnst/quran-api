const { data: juz } = require('../../data/juz.json');
const { data: quran } = require('../../data/quran.json');

const juzData = (_inputJuz) => {
    const inputJuz = juz[_inputJuz - 1]
    const startSurah = inputJuz.start.index - 1
    const startAyah = inputJuz.start.verse - 1
    const endSurah = inputJuz.end.index - 1
    const endAyah = inputJuz.end.verse - 1

    let juzAyah;

    if (startSurah === endSurah) {
        juzAyah = quran[startSurah].verses.slice(startAyah, endAyah)
    }
    else if ((endSurah - startSurah) > 1) {
        _firstSurah = quran[startSurah].verses.slice(startAyah)
        _middle = quran.slice(startSurah + 1, endSurah)
        _middleSurah = []
        _middle.map((items) => {
            items.verses.map((item) => {
                _middleSurah.push(item)
            })
        })
        _lastSurah = quran[endSurah].verses.slice(0, endAyah)
        juzAyah = [..._firstSurah, ..._middleSurah, ..._lastSurah]
    }
    else {
        _firstSurah = quran[startSurah].verses.slice(startAyah)
        _lastSurah = quran[endSurah].verses.slice(0, endAyah)
        juzAyah = [..._firstSurah, ..._lastSurah]
    }

    const startSurahName = quran[startSurah].name.transliteration.id;
    const endSurahName = quran[endSurah].name.transliteration.id;
    const data = {
        "juz": _inputJuz,
        "start": `${startSurahName} - ${inputJuz.start.verse}`,
        "end": `${endSurahName} - ${inputJuz.end.verse}`,
        "verses": juzAyah
    }
    return data
}

module.exports = juzData