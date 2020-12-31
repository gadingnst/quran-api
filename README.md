# Quran - API

> Quran API with media audio ***Syekh. Mishary Rashid Al-Afasy murrotal***.

## Deployed in: https://api.quran.sutanlab.id 
#### Try your own!
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/git/external?repository-url=https%3A%2F%2Fgithub.com%2Fsutanlab%2Fquran-api)
[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/afrizaloky/quran-api/tree/heroku-deploy)

### Introduction
This API data source comes from the combination of several parameters from [api.alquran.cloud](https://api.alquran.cloud) and [quran.kemenag.go.id](https://quran.kemenag.go.id) by merging its data to one JSON file with new structure for the better use and performance. Futhermore, this api uses indexed querying techniques with `0(1)` access time which is greatly affects performance.

### Features
- [x] Arabic Transliteration
- [x] English and Indonesia translation
- [x] Verses meta (juz, sajda, manzil, etc)
- [x] Tafsir surahs and verses (for now, only Bahasa Indonesia)
- [x] Audio (***Syekh. Mishary Rashid Al-Afasy*** murrotal edition)
- [ ] Your requests ?

### Data Source
- [api.alquran.cloud](https://api.alquran.cloud) = Quran, Meta Verses, Audio.
- [quran.kemenag.go.id](https://quran.kemenag.go.id) = Indonesia translations and tafsir verses (short/long).
- [Al-Quran-ID-API](https://github.com/bachors/Al-Quran-ID-API) = Indonesia tafsir surah [*note: ambiguous revelation type on surah 13 and 55 in this source. So, I changed it to medinan (according to sahih international data)*]

### Endpoint usage
- [x] `/surah` = Returns the list of surahs in Al-Quran.
- [x] `/surah/{surah}` = Returns spesific surah. **Example: [/surah/110](https://api.quran.sutanlab.id/surah/110)**
- [x] `/surah/{surah}/{ayah}` = Returns spesific ayah with requested surah. **Example: [/surah/2/255](https://api.quran.sutanlab.id/surah/2/255)**

### Recommended fonts for Al-qur'an 
- [quran.musil.com](http://quran.mursil.com/Web-Print-Publishing-Quran-Text-Graphics-Fonts-and-Downloads/fonts-optimized-for-quran)
- [Uthmani](https://groups.google.com/forum/#!topic/colteachers/Y6iKganK0tQ)

### Available Commands
- `yarn start` = run server.
- `yarn dev` = run develop server.
- `yarn crawl` = collect new data from the data source, then unifying it in one JSON file.

### Performance Measurement & Comparison

#### [api.alquran.cloud](https://api.alquran.cloud)

> Fetching on [Surah 7](https://api.alquran.cloud/surah/7/editions/quran-simple-enhanced,ar.alafasy,en.transliteration,en.sahih,id.indonesian) with audio, en translation & transliteration, id translation . Result: ***1200++ ms***

[![api.alquran.cloud](https://raw.githubusercontent.com/sutanlab/quran-api/master/screenshots/api.alquran.cloud.jpeg)](https://raw.githubusercontent.com/sutanlab/quran-api/master/screenshots/api.alquran.cloud.jpeg)

#### [api.quran.sutanlab.id](https://api.quran.sutanlab.id) 

> Fetching on [Surah 7](https://api.quran.sutanlab.id/surah/7) with audio, en translation & transliteration, id translation & tafsir (a lot more data and hosted on free serverless). ***Result: 400++ ms***

[![api.quran.sutanlab.id](https://raw.githubusercontent.com/sutanlab/quran-api/master/screenshots/api.quran.sutanlab.id.jpeg)](https://raw.githubusercontent.com/sutanlab/quran-api/master/screenshots/api.quran.sutanlab.id.jpeg)


### LICENSE
MIT

## Support Me

### Global
[![ko-fi](https://www.ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/B0B71P7PB)

### Indonesia
- Bank Syariah Mandiri [REK: 7142365973 (SUTAN GADING F NASUTION)]
- [Trakteer](https://trakteer.id/sutanlab)
- [Karyakarsa](https://karyakarsa.com/sutanlab)

---
Copyright © 2020 by Sutan Gading Fadhillah Nasution
