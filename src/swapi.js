const axios = require('axios');
const {SW_API_URL} = require('./constants');

async function request (url){
  const response = await axios.get(url);
  return response.data;
}

/**
 * Fetch 
 * @param {*} page = Number of page
 * 
 */
async function getPeople (){
  let people = [];
  let response = {};
  do {
    const url = response.next || `${SW_API_URL}/people`;
    response = await request(url);
    people = people.concat(response.results)
  } while (response.next);

  console.log(people.length);
}

export default {getPeople};

// module.exports = {getPeople};