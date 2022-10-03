require('dotenv').config({ path: '.env' });

const {
  MONGODB_URI,
  SOURCE_API_BASEURL,
  SOURCE_API_BASEURL_2
} = process.env;

exports.MONGODB_URI = MONGODB_URI;
exports.SOURCE_API_BASEURL = SOURCE_API_BASEURL;
exports.SOURCE_API_BASEURL_2 = SOURCE_API_BASEURL_2;
