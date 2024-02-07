console.log('start')

// making initial api call and converting it into a named JSON

const fetchBreeds = async () => {
    const response = await fetch('https://api.thedogapi.com/v1/breeds');
    const dogBreeds = await response.json();
    populateBreeds(dogBreeds)
    console.log(dogBreeds)
}

// function to populate the breed dropdown option

const populateBreeds = (breeds) => {
    const select = document.querySelector('#breed-select');
    const breedOptions = breeds.map(breed => {
        const option = document.createElement('option');
        option.text = breed.name;
        option.value = breed.id;
        return option;
    })
    breedOptions.forEach(option => {
        select.appendChild(option);
    })
}

// appends the image of the selected breed

const fillBreedImage = (imageUrl) => {
    document.querySelector('#dog-img').setAttribute('src', imageUrl);
}

// clears the description before the click to replace the data on the screen

const clearDescription = () => {
    const parentElement = document.querySelector('#dog-description');
    parentElement.textContent = " ";
};

// clears the image before the click to replace the image on the screen 

const clearImage = () => {
    document.querySelector('#dog-img').setAttribute('src', "")
};

// dynamically creates the list of facts and appends them to the page 

const createDescriptionEntry = ({ label, value }) => {
    const descriptionTerm = document.createElement('dt');
    descriptionTerm.textContent = label;
    const descriptionValue = document.createElement('dd');
    descriptionValue.textContent = value;
    const parentElement = document.querySelector('#dog-description');
        parentElement.appendChild(descriptionTerm);
        parentElement.appendChild(descriptionValue);
};

// pulls the data from the JSON and makes it accessable 

const fillBreedDescription = ({ bred_for: bredFor, name, temperament, life_span: lifeSpan, height, weight }) => {
    createDescriptionEntry({
        label: 'Name:',
        value: name
    });
    createDescriptionEntry({
        label: 'Bred For:',
        value: bredFor
    });
    createDescriptionEntry({
        label: 'Temperament:',
        value: temperament
    });
    createDescriptionEntry({
        label: 'Life Span:',
        value: lifeSpan
    });

    createDescriptionEntry({
        label: 'Height [in]:',
        value: height.imperial
    })
    createDescriptionEntry({
        label: 'Weight [lb]:',
        value: weight.imperial
    })
}

// retrieves the image from the api server 

const getDogByBreed = async (breedId) => {
    clearImage()
    const [data] = await fetch('https://api.thedogapi.com/v1/images/search?include_breed=1&breed_id=' + breedId).then((data) => data.json());
    const { url: imageUrl, } = data;
    console.log(data)
    fillBreedImage(imageUrl);
}

// retrieves the data from the api server 

const getBreedDescription = async (breedId) => {
    clearDescription()
    console.log(breedId);
    const response = await fetch('https://api.thedogapi.com/v1/breeds/' + breedId);
    const data = await response.json();
    console.log(data);
    fillBreedDescription(data);
}

// puts an event listener to retrieve the number value assigned to each breed

const changeBreed = () => {

    getBreedDescription(event.target.value);
    getDogByBreed(event.target.value);
}

// initial function 

fetchBreeds();