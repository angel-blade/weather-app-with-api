const apiKey = "d47f40f303591e03622ddb767e54ff97";

const apiUrl = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=`;

const weatherIcon = document.querySelector(".weather-image i");

const searchInput = document.querySelector(".search-bar input");
const searchButton = document.querySelector(".search-bar button");

const weatherResult = document.querySelector(".weather-result");

const error = document.querySelector(".error");

const loaderWrapper = document.querySelector(".loader-wrapper");
const loader = document.querySelector(".loader");

const fetchError = document.createElement("p");

async function checkWeather(city) {
  loader.style.display = "inline-block";
  const response = await fetch(apiUrl + city + `&appid=${apiKey}`).catch(
    (error) => fetchErr(error)
  );

  if (response.status == 404 || searchInput.value == "") {
    invalidCityError();
    weatherResult.className = "weather-result";
    loader.style.display = "none";
  }

  const data = await response.json();

  document.querySelector(".city").innerHTML = data.name;
  document.querySelector(".temp").innerHTML =
    Math.round(data.main.temp) + "&#8451";
  document.querySelector(".humidity-percentage").innerHTML =
    data.main.humidity + "%";
  document.querySelector(".wind-speed").innerHTML =
    Math.round(data.wind.speed) + " km/h";

  if (data.weather[0].main == "Rain") {
    weatherIcon.className = "fa-solid fa-cloud-rain";
  } else if (data.weather[0].main == "Clear") {
    weatherIcon.className = "fa-solid fa-sun";
  } else if (data.weather[0].main == "Mist") {
    weatherIcon.className = "fa-solid fa-smog";
  } else if (data.weather[0].main == "Drizzle") {
    weatherIcon.className = "fa-solid fa-cloud-drizzle";
  }

  error.style.display = "none";
  weatherResult.className = "weather-result-active";

  if (loaderWrapper.contains(fetchError)) {
    loaderWrapper.removeChild(fetchError);
  }
}

searchInput.addEventListener("keyup", function (event) {
  if (event.key === "Enter") {
    checkWeather(searchInput.value);
    searchInput.value = "";
  }
});

searchButton.addEventListener("click", () => {
  checkWeather(searchInput.value);
  searchInput.value = "";
});

function fetchErr() {
  fetchError.innerText = "there's been a network error, please try again!";
  loaderWrapper.appendChild(fetchError);
  loader.style.display = "none";
}

function invalidCityError() {
  fetchError.innerText = "invalid city";
  loaderWrapper.appendChild(fetchError);
  loader.style.display = "none";
}
