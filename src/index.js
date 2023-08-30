import SlimSelect from 'slim-select';
import { fetchBreeds, fetchCatByBreed } from "./js/cat-api";

const breedSelect = document.querySelector(".breed-select");
const loader = document.querySelector(".loader");
const error = document.querySelector(".error");
const catInfo = document.querySelector(".cat-info");

function populateBreedsSelect(breeds) {
  breedSelect.innerHTML = breeds.map(breed => `<option value="${breed.id}">${breed.name}</option>`).join("");
}

function displayCatInfo(cat) {
  catInfo.innerHTML = `
    <img src="${cat[0].url}" alt="Cat" />
    <h2>${cat[0].breeds[0].name}</h2>
    <p>Description: ${cat[0].breeds[0].description}</p>
    <p>Temperament: ${cat[0].breeds[0].temperament}</p>
  `;
}

function hideLoader() {
  loader.style.display = "none";
}

function showError() {
  error.style.display = "block";
}

breedSelect.addEventListener("change", event => {
  const selectedBreedId = event.target.value;

  loader.style.display = "block";
  catInfo.innerHTML = "";
  error.style.display = "none";

  fetchCatByBreed(selectedBreedId)
    .then(displayCatInfo)
    .catch(showError)
    .finally(hideLoader);
});

fetchBreeds()
  .then(populateBreedsSelect)
  .catch(showError)
  .finally(hideLoader);
