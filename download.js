const axios = require('axios');
const fs = require('fs');
const unique = require('./src/utils/unique');
const sharp = require('sharp');
const {
  GOOGLE_API_URL, 
  PEOPLE_IMG_PATH, 
  SW_API_URL, 
  SWAPI_DATA_JSON_PATH,
  GOOGLE_API_KEY,
  GOOGLE_CSE_ID
} = require('./src/constants');


async function request (url){
  const response = await axios.get(url);
  return response.data;
}


async function searchGoogleImage(query){
  const response = await axios.get(`${GOOGLE_API_URL}?q=${query}&cx=${GOOGLE_CSE_ID}&key=${GOOGLE_API_KEY}&searchType=image`)
  return response.data;
}

async function downloadImage (url, filename) {
  const request = {
    url,
    method: 'GET',
    responseType: 'arraybuffer'
  }
  return axios(request)
    .then(response => {
      return sharp(response.data)
        .resize(280, 360)
        .crop(sharp.strategy.entropy)
        .toFile(`${PEOPLE_IMG_PATH}/${filename}`);
    })
};


/**
 * 
 * @param {Array} films All films to get from SW API.
 */
async function getAllFilms(films){
  const promises = [];
  films.forEach(movie => {
    promises.push(axios.get(movie));
  })

  return Promise.all(promises).then(responses => {
    const films = responses.map(response => response.data)
    return films;
  })
  .catch(console.log)
}

/**
 * 
 * @param {Array} vehicles All vehicles to get from SW API.
 */
async function getAllVehicles(vehicles){
  const promises = [];
  vehicles.forEach(vehicle => {
    promises.push(axios.get(vehicle));
  })

  return Promise.all(promises).then(responses => {
    const vehicles = responses.map(response => response.data)
    return vehicles;
  })
  .catch(console.log)
}

/**
 * 
 * @param {Array} planets All planets to get from SW API.
 */
async function getAllPlanets(planets){
  const promises = [];
  planets.forEach(planet => {
    promises.push(axios.get(planet));
  })

  return Promise.all(promises).then(responses => {
    const planets = responses.map(response => response.data)
    return planets;
  })
  .catch(console.log)
}

/**
 * 
 * @param {Array} species All planets to get from SW API.
 */
async function getAllSpecies(species){
  const promises = [];
  species.forEach(specie => {
    promises.push(axios.get(specie));
  })

  return Promise.all(promises).then(responses => {
    const species = responses.map(response => response.data)
    return species;
  })
  .catch(console.log)
}


async function getAllPeople (){
  let people = [];
  let response = {};
  do {
    const url = response.next || `${SW_API_URL}/people`;
    response = await request(url);
    people = people.concat(response.results)
  } while (response.next);

  return people;
}

function getVehiclesByPerson (vehicles, person) {
  return vehicles.concat(person.vehicles)
}

function getFilmsByPerson (films, person) {
  return films.concat(person.films)
}

function getPlanetsByPerson (planets, person) {
  planets.push(person.homeworld);
  return planets;
}

function getSpeciesByPerson (species, person) {
  return species.concat(person.species)
}


async function fetchAll() {
  const people = await getAllPeople();

  //Get Vehicles
  const vehiclesUrlPerson = people.reduce(getVehiclesByPerson, []);
  const vehiclesUrl = unique(vehiclesUrlPerson);
  const vehicles = await getAllVehicles(vehiclesUrl);;

  //Get Films
  const filmsUrlPerson = people.reduce(getFilmsByPerson, []);
  const filmsUrl = unique(filmsUrlPerson);
  const films = await getAllFilms(filmsUrl);

  //Get Planet
  const planetsUrlPerson = people.reduce(getPlanetsByPerson, []);
  const planetsUrl = unique(planetsUrlPerson);
  const planets = await getAllPlanets(planetsUrl);

  //Get Species
  const speciesUrlPerson = people.reduce(getSpeciesByPerson, []);
  const speciesUrl = unique(speciesUrlPerson);
  const species = await getAllSpecies(speciesUrl);

  const peopleComplete = people.map(person => {
    person.id = person.url.match(/\d+/g)[0];

    person.vehicles = person.vehicles.map(vehicle => {
      const vehicleObj = vehicles.find(vhc => vhc.url === vehicle);
      return vehicleObj.name;
    })
    
    person.films = person.films.map(film => {
      const filmObj = films.find(flm => flm.url === film);
      return filmObj.title;
    })

    person.species = person.species.map(specie => {
      const specieObj = species.find(spc => spc.url === specie)
      return specieObj.name;
    })

    const homeworld = planets.find(planet => planet.url == person.homeworld);

    if(homeworld){
      person.homeworld = homeworld.name;
    }
    return person;
  })

  // Save people in JSON file to recovere after
  fs.writeFileSync(SWAPI_DATA_JSON_PATH, JSON.stringify(peopleComplete));
  
  // Search image and save from Google API
  for(let i = 0; i < people.length; i++){
    const response = await searchGoogleImage(`Star Wars ${people[i].name}`);
    await downloadImage(response.items[0].link, `${people[i].id}.jpg`)
  }
} 
 
fetchAll();