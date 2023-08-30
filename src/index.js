import SlimSelect from 'slim-select';
import Notiflix from 'notiflix';
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
    <img src="${cat[0].url}" alt="Cat" max-width="50%"/>
    <div class="text-box">
    <h2>${cat[0].breeds[0].name}</h2>
    <p>${cat[0].breeds[0].description}</p>
    <p><b>Temperament:</b> ${cat[0].breeds[0].temperament}</p>
    </div>
  `;
    const textBox = document.querySelector(`.text-box`);
    catInfo.style.display = "flex";
    catInfo.style.flexDirection = "row";
    catInfo.style.marginTop = "48px";
    catInfo.style.gap = "24px";
    catInfo.style.width = "95vw";
    catInfo.style.height = "60vh";
    textBox.style.display = "flex";
    textBox.style.flexDirection = "column";
    textBox.style.justifyContent = "start";
    textBox.style.fontSize = "1.5em";
}

function hideLoader() {
  loader.style.display = "none";
}

function showError() {
    // error.style.display = "block";
    Notiflix.Notify.failure('Oops! Something went wrong! Try reloading the page!');
}

breedSelect.addEventListener("change", event => {
  const selectedBreedId = event.target.value;

  loader.style.display = "flex";
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
