var imageContainer = document.getElementById("img-container");
var favContainer = document.getElementById("fav-container");
var zipButton = document.getElementById("submit-zip");
var inputBox = document.getElementById("zip");

var proxyUrl = "https://young-island-22825-8f69f8bdd4e2.herokuapp.com/";
var petFinderTokenUrl = "https://api.petfinder.com/v2/oauth2/token";

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

function getPetFinderData(zipCode) {
    getPetFinderToken()
    .then((function (token) {
        var apiURL = `https://api.petfinder.com/v2/animals?type=dog&location=${zipCode}&distance=100&sort=distance`;
      fetch(proxyUrl +apiURL, {
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
         
          var animals = data.animals;
          console.log(animals);
          displayImages(animals);
        })
    }))
  }
  

function displayImages(animals) {
    var imageContainer = document.getElementById("img-container");
  
    // Clear existing images
    imageContainer.innerHTML = '';

    var favorites = JSON.parse(localStorage.getItem('favorites')) || [];
  
    animals.forEach(function(animal) {
      if (animal.photos && animal.photos.length > 0) {

        // Create container for image and info
        var div = document.createElement('div');

        // Div used for styling dog images
        div.classList.add('animal-container');
  
        // Populate dog images
        var img = document.createElement('img');
        img.src = animal.photos[0].small;

        // Allows user to redirect to a petfinder bio of that doggit after clicking a picture
        img.addEventListener('click', function() {
           if (animal.url) {
             window.open(animal.url, '_blank');
           }
          });
    
          div.appendChild(img);
  
        // Populate dog name
        var namePara = document.createElement('p');
        namePara.textContent = 'Name: ' + animal.name;
        div.appendChild(namePara);
  
        // Populate dog age
        var agePara = document.createElement('p');
        agePara.textContent = 'Age: ' + animal.age;
        div.appendChild(agePara);
        
        // Added favorites button/local storage 
        var favoriteButton = document.createElement('button');
      favoriteButton.textContent = 'Favorite';
      favoriteButton.classList.add('favorite-button');
      favoriteButton.dataset.animalId = animal.id;

      if (favorites.includes(animal.id)) {
        favoriteButton.textContent = 'Unfavorite';
      } else {
        favoriteButton.textContent = 'Favorite';
      }

      div.appendChild(favoriteButton);

      // Add click event listener to the favorite button
      favoriteButton.addEventListener('click', function() {
        toggleFavorite(animal.id, favoriteButton);
      });
  
        // Append container to imageContainer
        imageContainer.appendChild(div);
      }
    });
  }


  // toggles the favorite status of a dog when its favorite button is clicked

  function toggleFavorite(animalId, button) {

    // Grabs the list of favorite dogs from local storage
    var favorites = JSON.parse(localStorage.getItem('favorites')) || [];
  
    var index = favorites.indexOf(animalId);
    if (index !== -1) {
      // Animal is already favorited, so remove it from favorites
      favorites.splice(index, 1);
      localStorage.setItem('favorites', JSON.stringify(favorites));
      button.textContent = 'Favorite';
    } else {
      // Animal is not favorited, so add it to favorites
      favorites.push(animalId);
      localStorage.setItem('favorites', JSON.stringify(favorites));
      button.textContent = 'Unfavorite';
    }
  }







  // Populates favorite dogs on favorites page

function appendFavorites() {
  var favorites = JSON.parse(localStorage.getItem('favorites')) || [];
  favorites.forEach(function(animalId) {
    var div = document.createElement('div');
    div.classList.add('favorite-animal');
    
    getPetFinderToken()
    .then(function(token) {
      var apiURL = `https://api.petfinder.com/v2/animals/${animalId}`;
      return fetch(proxyUrl + apiURL, {
        method: "GET",
        headers: {
          "Authorization": "Bearer " + token,
        }
      });
    })
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      if (data && data.animal) {
        var animal = data.animal;
      
        var img = document.createElement('img');
        img.src = animal.photos[0].medium;
        div.appendChild(img);
        
        var namePara = document.createElement('p');
        namePara.textContent = 'Name: ' + animal.name;
        div.appendChild(namePara);
        
        var agePara = document.createElement('p');
        agePara.textContent = 'Age: ' + animal.age;
        div.appendChild(agePara);

        // Favorite button added to favortes webpage as well
        var favoriteButton = document.createElement('button');
      favoriteButton.textContent = 'Favorite';
      favoriteButton.classList.add('favorite-button');
      favoriteButton.dataset.animalId = animal.id;


        // Toggles text if favorited or not
      if (favorites.includes(animal.id)) {
        favoriteButton.textContent = 'Unfavorite';
      } else {
        favoriteButton.textContent = 'Favorite';
      }

      div.appendChild(favoriteButton);

      favoriteButton.addEventListener('click', function() {
        toggleFavorite(animal.id, favoriteButton);
      });
        
        // Append the favorite animal container to the favContainer
        favContainer.appendChild(div);
        img.addEventListener('click', function() {
          if (animal.url) {
            window.open(animal.url, '_blank');
          }
         });
      }
    })
    .catch(function(error) {
      console.error('Error fetching favorite animal:', error);
    });
  });
}

// Call displayFavorites initially to populate favContainer
appendFavorites();
  
  (displayFavorites)

  // Function to display favorite items
  function displayFavorites(animals) {
    var favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    var favoritesList = document.getElementById('favoritesList');
    
    // Display favorites on the page
    favorites.forEach(function(animalId) {
        var listItem = document.createElement('li');
        listItem.textContent = animalId;
        favoritesList.appendChild(listItem);
    });

    favorites.forEach(function(animalId) {
      var listItem = document.createElement('li');
      listItem.textContent = animalId;
      favoritesList.appendChild(listItem);
  });
}

  var submitZip = function (event) {
    event.preventDefault();
    getPetFinderData(inputBox.value);
  }
  
zipButton.addEventListener('click', submitZip);
