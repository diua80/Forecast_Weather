const refs = {
    searchForm: document.getElementById("searchForm"),
    list: document.getElementById("list"),
}
refs.searchForm.addEventListener("submit", searchWeather);

function searchWeather(ev) {
    ev.preventDefault();
    const { city, days } = refs.searchForm.elements;

    weatherService(city.value, days.value)// Повертає проміс, тому оброблювати результат треба методом then()
        .then((data) => {
            // вставимо до сторінки
            refs.list.innerHTML = createMarkup(data.forecast.forecastday);
        })
        // обробимо помилку
        .catch((err) => console.error(err));
}

function weatherService(city, days) {
    
const API_KEY = "8a54cd2d271744daaf9144117252203";
    const FORECAST_URL = "http://api.weatherapi.com/v1/forecast.json";
    const params = new URLSearchParams({
        key: API_KEY,
        q: city,
        days, // скорочений запис властивості
        lang: "uk",
    });
    return fetch(`${FORECAST_URL}?${params}`).then(res => {
        if (!res.ok) {
            throw new Error(res.statusText);
        }
        return res.json();
    });
}
function createMarkup(arr) {
    return arr.map(
      ({
        date, day: {avgtemp_c, condition: { text, icon }}
      }) => `<li class="weather-card">
      <img src="${icon}" alt="${text}" class="weather-icon">
      <h2 class="date">${date}</h2>
      <h3 class="weather-text">${text}</h3>
      <h3 class="temperature">${avgtemp_c} °C</h3>
  </li>`
    ).join("");
}
