// Function to toggle the menu
const toggleMenu = ()=> {
    const menuContainer = document.getElementById("menu-container");
    menuContainer.classList.toggle("hidden");
}

let searchbutton = document.getElementById("weatherclick");
searchbutton.addEventListener("click", getWeatherData);

let searchbutton2 = document.getElementById("weatherclick2");
searchbutton2.addEventListener("click", getWeatherData);


async function getWeatherData(event) {
    const cityInput = event.target.previousElementSibling.value;
    if (!cityInput) {
        alert("Please enter a city name!");
        return;
    }

    fetch(
        `https://api.weatherapi.com/v1/current.json?key=38e743a9e993452e8ac130951242012&q=${cityInput}&aqi=no`
    )
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            updateWeatherUI(data);
        })
        .catch((error) => console.error(`Error: `, error));
}

function updateWeatherUI(data) {
    const weatherSection = document.getElementById("weather-info-section");

    const cityName = data.location.name;
    const date = new Date().toLocaleDateString();
    const description = data.current.condition.text;
    const iconCode = "https:" + data.current.condition.icon;

    const humidity = data.current.humidity;
    const windSpeed = data.current.wind_kph;

    document.getElementById("weather-city").innerText = cityName;
    document.getElementById("weather-date").innerText = `Date: ${date}`;
    document.getElementById("weather-description").innerText = description;
    document.getElementById("weather-icon").src = `${iconCode}`;
    document.getElementById("humidity-value").innerText = humidity;
    document.getElementById("wind-speed-value").innerText = windSpeed;

    weatherSection.classList.remove("hidden");
    weatherSection.style.display = "block";
}

