import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';
import Notiflix from 'notiflix';
import { fetchBreeds, fetchCatByBreed } from "./js/cat-api";


const breedSelect = document.querySelector(".breed-select");
const loader = document.querySelector(".loader");
const error = document.querySelector(".error");
const catInfo = document.querySelector(".cat-info");

hideError();

//! заповнюємо список без застосування slim-select
// function populateBreedsSelect(breeds) {
//   breedSelect.innerHTML = breeds.map(breed => `<option value="${breed.id}">${breed.name}</option>`).join("");
  
// }
//! картка кота
function displayCatInfo(cat) {
    catInfo.innerHTML = `
    <img src="${cat[0].url}" alt="Cat" loading="lazy"/>
    <div class="text-box">
    <h2>${cat[0].breeds[0].name}</h2>
    <p>${cat[0].breeds[0].description}</p>
    <p><b>Temperament:</b> ${cat[0].breeds[0].temperament}</p>
    </div>
  `;
    const textBox = document.querySelector(`.text-box`);
    catInfo.style.display = "flex";
    catInfo.style.flexDirection = "row";
catInfo.style.flexWrap ="wrap"
    catInfo.style.marginTop = "48px";
    catInfo.style.gap = "24px";
    catInfo.style.width = "95vw";
    catInfo.style.height = "80vh";
    textBox.style.display = "flex";
    textBox.style.flexDirection = "column";
    textBox.style.justifyContent = "start";
    textBox.style.fontSize = "1.5em";
}

function hideLoader() {
  loader.style.display = "none";
}

function showError() {
    Notiflix.Notify.failure('Oops! Something went wrong! Try reloading the page!');
}

function hideError() { 
  error.style.display = "none";
}
//! не потрібно для slim selecta
// breedSelect.addEventListener("change", event => {
//   const selectedBreedId = event.target.value;

//   loader.style.display = "flex";
//   catInfo.innerHTML = "";
//   error.style.display = "none";

// fetchCatByBreed(selectedBreedId)
//     .then(displayCatInfo)
//     .catch(showError)
//     .finally(hideLoader);
// });

// fetchBreeds()
//   .then(populateBreedsSelect)
//   .catch(showError)
//   .finally(hideLoader);

fetchBreeds()
  .then(breeds => {
  
    const slimSelect = new SlimSelect({
      select: breedSelect,
      data: breeds.map(breed => ({ value: breed.id, text: breed.name })),
      settings: {
        alwaysOpen: false,
        showSearch: true,
        placeholderText: "Breed",
        searchPlaceholder: "Find your favorite breed"
      },
      events: {
      error: showError()
    },
    });

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

    hideLoader();
  })
  .catch(showError);