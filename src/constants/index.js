var path = require('path')

const GOOGLE_API_URL = 'https://www.googleapis.com/customsearch/v1';
const SW_API_URL = 'https://swapi.co/api';
const PEOPLE_IMG_PATH = path.resolve(`${__dirname}/../images/`);
const SWAPI_DATA_JSON_PATH = path.resolve(`${__dirname}/../swapi-data.json`);
const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY || '';
const GOOGLE_CSE_ID = process.env.GOOGLE_CSE_ID || '';

module.exports = {
  GOOGLE_API_URL, 
  SW_API_URL, 
  PEOPLE_IMG_PATH,
  SWAPI_DATA_JSON_PATH,
  GOOGLE_API_KEY,
  GOOGLE_CSE_ID,
};