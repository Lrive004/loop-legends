var adoptNowButtonEl = document.querySelector('#adopt-now');
var aboutUsButtonEl = document.querySelector('#about-us');
var contactUsButtonEl = document.querySelector('#contact-us');

/** URLs */
var proxyUrl = "https://young-island-22825-8f69f8bdd4e2.herokuapp.com/";
var petFinderTokenUrl = "https://api.petfinder.com/v2/oauth2/token";
var petFinderDataUrl = "https://api.petfinder.com/v2/animals?type=dog&page=2"

// "https://api.petfinder.com/v2/animals?type=dog&location=18901&distance=100&sort=distance"

/** Globals */
var clientId = "jLQRCXjJDVmTMYkA9INhzNZx5w15S665A3JhSgdMeUJbudzvtK";
var clientSecret = "75Ca7w6t8awxnNFn025XENDa6dze3Ea7cH5xrz0V";
/**
 * This function is responsible for exchanging your client secret and
 * client id for a JWT (JSON Web Token) which will authenticate you
 * with the API. We need this token on every subsequent request we make
 * to the Pet Finder API.
 */
function getPetFinderToken() {
  return fetch(petFinderTokenUrl, {
    method: "POST",
    body: new URLSearchParams({
      grant_type: "client_credentials",
      client_id: clientId,
      client_secret: clientSecret
    })
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      /** This data has your JWT. They store it in a property called
       * access_token. This is what we need for the next API call.
       */
      return Promise.resolve(data.access_token);
    })
}

/** This function is mostly a placeholder. You will need to update
 * this to fit your actual requirements. It is here just for demo
 * purposes.
 */
function getPetFinderData() {
  getPetFinderToken()
  .then((function (token) {
    fetch(proxyUrl + petFinderDataUrl, {
      method: "GET",
      headers: {
        "Authorization": "Bearer " + token,
      }
    })
      .then(function (response) {
        return response.json()
      })
      .then(function (data) {
        /** This is the actual data being returned from the Pet Finder API.
         * This particular endpoint stores the data in a property called 
         * animals. Other endpoints may be different.
         */
        console.log(data.animals);
      })
  }))
}


// var getDogFact = function (event) {
//   var requestUrl = '/https://dog-facts-api.herokuapp.com/api/v1/resources/dogs/?number=1';

//   return fetch (requestUrl, {mode: 'no-cors'})
//   .then(function (response) {
//     return console.log(response);
//   })
// }
//   // .then(function (data) {
//   //     var dogFact = document.createElement('p');
//   //     dogFact.textContent = data.response;
//   //   })
//   // }


// dogFactButtonEl.addEventListener('click', getDogFact);


getPetFinderData();

// console.log("start");

// const fetchBreeds = () {
//   fetch('')
// }


// fetchBreeds()