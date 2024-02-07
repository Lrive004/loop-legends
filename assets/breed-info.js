console.log('start')

let dogBreeds;

const fetchBreeds = async () => {
    const response = await fetch('https://api.thedogapi.com/v1/breeds');
    const dogBreeds = await response.json();
    populateBreeds(dogBreeds)
    console.log(dogBreeds)
}

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

const fillBreedImage = (imageUrl) => {
    document.querySelector('#dog-img').setAttribute('src', imageUrl);
}

const clearDescription = () => {
    const parentElement = document.querySelector('#dog-description');
    parentElement.textContent = " ";
};

const clearImage = () => {
    document.querySelector('#dog-img').setAttribute('src', "")
};

const createDescriptionEntry = ({ label, value }) => {
    const descriptionTerm = document.createElement('dt');
    descriptionTerm.textContent = label;
    const descriptionValue = document.createElement('dd');
    descriptionValue.textContent = value;
    const parentElement = document.querySelector('#dog-description');
        parentElement.appendChild(descriptionTerm);
        parentElement.appendChild(descriptionValue);
};

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


const getDogByBreed = async (breedId) => {
    clearImage()
    const [data] = await fetch('https://api.thedogapi.com/v1/images/search?include_breed=1&breed_id=' + breedId).then((data) => data.json());
    const { url: imageUrl, } = data;
    console.log(data)
    fillBreedImage(imageUrl);
}

const getBreedDescription = async (breedId) => {
    clearDescription()
    console.log(breedId);
    const response = await fetch('https://api.thedogapi.com/v1/breeds/' + breedId);
    const data = await response.json();
    console.log(data);
    fillBreedDescription(data);
}

const changeBreed = () => {

    getBreedDescription(event.target.value);
    getDogByBreed(event.target.value);
}

fetchBreeds();