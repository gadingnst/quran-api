const { data: juz } = require("../../data/juz.json");
const { data: page } = require("../../data/page.json");
const { data: quran } = require("../../data/quran.json");

/**
 * Retrieves data based on the input and mode.
 *
 * @param {Object} options - The options object.
 * @param {number} options.input - The input value.
 * @param {string} options.mode - The mode value ('juz' or 'page').
 * @returns {Object|null} - The data object containing the retrieved data, or null if no data is found.
 */
const getData = ({ input, mode }) => {
  const inputData = mode === "juz" ? juz[input - 1] : page[input - 1];

  if (!inputData) return null;

  const startSurah = inputData.start.index - 1;
  const startAyah = inputData.start.verse - 1;
  const endSurah = inputData.end.index - 1;
  const endAyah = inputData.end.verse;
  let ayah, _firstSurah, _middle, _middleSurah, _lastSurah;

  if (startSurah === endSurah) {
    ayah = quran[startSurah].verses.slice(startAyah, endAyah);
  } else if (endSurah - startSurah > 1) {
    _firstSurah = quran[startSurah].verses.slice(startAyah);
    _middle = quran.slice(startSurah + 1, endSurah);
    _middleSurah = [];
    _middle.map((items) => {
      items.verses.map((item) => {
        _middleSurah.push(item);
      });
    });
    _lastSurah = quran[endSurah].verses.slice(0, endAyah);
    ayah = [..._firstSurah, ..._middleSurah, ..._lastSurah];
  } else {
    _firstSurah = quran[startSurah].verses.slice(startAyah);
    _lastSurah = quran[endSurah].verses.slice(0, endAyah);
    ayah = [..._firstSurah, ..._lastSurah];
  }

  const startSurahName = quran[startSurah].name.transliteration.id;
  const endSurahName = quran[endSurah].name.transliteration.id;
  const data = {
    [mode]: input,
    [`${mode}StartSurahNumber`]: inputData.start.index,
    [`${mode}EndSurahNumber`]: inputData.end.index,
    [`${mode}StartInfo`]: `${startSurahName} - ${inputData.start.verse}`,
    [`${mode}EndInfo`]: `${endSurahName} - ${inputData.end.verse}`,
    totalVerses: ayah.length,
    verses: ayah,
  };
  return data;
};

module.exports = getData;
