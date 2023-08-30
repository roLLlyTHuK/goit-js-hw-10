import axios from "axios";

axios.defaults.headers.common["x-api-key"] = "live_EMsIMhvFarPouBXEQYYanhAocEyEepEvaIoWvCo1vSxU41uK0UQnqJ9v3CZXiWzn";

export function fetchBreeds() {
  return axios.get("https://api.thecatapi.com/v1/breeds")
    .then(response => response.data)
    .catch(error => {
      throw error;
    });
}

export function fetchCatByBreed(breedId) {
  return axios.get(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`)
    .then(response => response.data)
    .catch(error => {
      throw error;
    });
}
