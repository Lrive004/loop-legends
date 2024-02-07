console.log('start')

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

const createDescriptionEntry = ({label, value}) => {
    const descriptionTerm = document.createElement('dt');
    descriptionTerm.textContent = label;
    const descriptionValue = document.createElement('dd');
    descriptionValue.textContent = value
    const parentElement = document.querySelector('#dog-description');
    parentElement.appendChild(descriptionTerm);
    parentElement.appendChild(descriptionValue);
}

const fillBreedDescription = ({bred_for: bredFor, bred_group: bredGroup, name, temperament, life_span: lifeSpan, origin, height, weight}) => {
    createDescriptionEntry ({
        label: 'Name:',
        value: name
    });
    createDescriptionEntry ({
        label: 'Bred For:',
        value: bredFor
    });
    createDescriptionEntry ({
        label: 'Bred Group:',
        value: bredGroup
    });
    createDescriptionEntry ({
        label: 'Temperament:',
        value: temperament
    });
    createDescriptionEntry ({
        label: 'Life Span:',
        value: lifeSpan
    });
    createDescriptionEntry ({
        label: 'Origin:',
        value: origin
    })
    createDescriptionEntry ({
        label: 'Height [cm]:',
        value: height
    })
    createDescriptionEntry ({
        label: 'Weight [kg]:',
        value: weight
    })
}


// const getDogByBreed = async (breedId) => {

//     const [data] = await fetch('https://api.thedogapi.com/v1/images/search?include_breed=1&breed_id=' + breedId).then((data) => data.json());
//     const { url: imageUrl, breeds } = data;
//     console.log(data)
//     fillBreedImage(imageUrl);
//     fillBreedDescription(breeds[0]);
// }


const changeBreed = () => {
    getDogByBreed(event.target.value)
}

fetchBreeds();
