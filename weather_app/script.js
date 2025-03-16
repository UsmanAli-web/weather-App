const apiKey = '6232bd36e24d49f4a36164534251603';  
async function fetchWeatherData(city) {
    try {
        const response = await fetch(
            `https://api.weatherapi.com/v1/current.json?q=${city}&key=${apiKey}&aqi=no`
        );

        if (!response.ok) {
            throw new Error("Unable to fetch weather data");
        }

        const data = await response.json();
        console.log(data);
        updateWeatherUI(data);
    } catch (error) {
        console.error(error);
    }
}

const cityElement = document.querySelector(".city");
const temperature = document.querySelector(".temp");
const windSpeed = document.querySelector(".wind-speed");
const humidity = document.querySelector(".humidity");
const visibility = document.querySelector(".visibility-distance");
const descriptionText = document.querySelector(".description");
const date = document.querySelector(".date");

function updateWeatherUI(data) {
    cityElement.textContent = data.location.name;
    temperature.textContent = `${Math.round(data.current.temp_c)}°`;  
    windSpeed.textContent = `${data.current.wind_kph} km/h`;  
    humidity.textContent = `${data.current.humidity}%`;
    visibility.textContent = `${data.current.vis_km} km`;  
    descriptionText.textContent = data.current.condition.text;

    const currentDate = new Date();
    date.textContent = currentDate.toDateString();
}

const formElement = document.querySelector(".search-form");
const inputElement = document.querySelector(".city-input");

formElement.addEventListener("submit", function (e) {
    e.preventDefault();

    const city = inputElement.value;
    if (city !== "") {
        fetchWeatherData(city);
        inputElement.value = "";
    }
});
