// script.js

document.getElementById('getWeatherBtn').addEventListener('click', getWeather);

function getWeather() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            fetchWeatherData(lat, lon);
        }, showError);
    } else {
        alert('Geolocation is not supported by this browser.');
    }
}

function showError(error) {
    switch(error.code) {
        case error.PERMISSION_DENIED:
            alert('User denied the request for Geolocation.');
            break;
        case error.POSITION_UNAVAILABLE:
            alert('Location information is unavailable.');
            break;
        case error.TIMEOUT:
            alert('The request to get user location timed out.');
            break;
        case error.UNKNOWN_ERROR:
            alert('An unknown error occurred.');
            break;
    }
}

function fetchWeatherData(lat, lon) {
    const openWeatherMapApiKey = '';
    const tomorrowIoApiKey = '';

    // Fetch data from OpenWeatherMap API
    const openWeatherMapUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${openWeatherMapApiKey}`;
    fetch(openWeatherMapUrl)
        .then(response => response.json())
        .then(data => {
            displayWeather(data);

            // Fetch data from Tomorrow.io API
            const tomorrowIoUrl = `https://api.tomorrow.io/v4/weather/forecast?location=${lat},${lon}&apikey=${tomorrowIoApiKey}`;
            fetch(tomorrowIoUrl)
                .then(response => response.json())
                .then(data => displayTomorrowIoWeather(data))
                .catch(error => console.error('Error fetching Tomorrow.io data:', error));
        })
        .catch(error => console.error('Error fetching OpenWeatherMap data:', error));
}

function displayWeather(data) {
    const location = document.getElementById('location');
    const description = document.getElementById('description');
    const temperature = document.getElementById('temperature');
    const humidity = document.getElementById('humidity');
    const wind = document.getElementById('wind');

    location.textContent = `${data.name}, ${data.sys.country}`;
    description.textContent = `Weather: ${data.weather[0].description}`;
    temperature.textContent = `Temperature: ${data.main.temp} °C`;
    humidity.textContent = `Humidity: ${data.main.humidity} %`;
    wind.textContent = `Wind Speed: ${data.wind.speed} m/s`;
}

function displayTomorrowIoWeather(data) {
    // Example of displaying Tomorrow.io data
    console.log('Tomorrow.io Forecast Data:', data);
    // Implement display logic based on Tomorrow.io API response
}
