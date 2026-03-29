const baseURL = "https://api.open-meteo.com/v1/forecast?";
const geolocation = document.getElementById("dailyweather");

if (navigator.geolocation) {
  //frågar webbläsaren om position,
  // lyckas det skickas koordinaterna till fetchWeather
  navigator.geolocation.getCurrentPosition(
    (position) => {
      const lat = position.coords.latitude;
      const long = position.coords.longitude;
      fetchWeather(lat, long);
    },
    (error) => {
      geolocation.innerHTML = `<div class="error">Platsåtkomst nekad. Kunde inte visa väder.</div>`;
      console.error(error);
    },
  );
}

async function fetchWeather(lat, lon) {
  //hämtar väder från API och skickar vidare datan till weatherInfo.
  try {
    const response = await fetch(
      `${baseURL}latitude=${lat}&longitude=${lon}&daily=temperature_2m_max,temperature_2m_min,weather_code&timezone=Europe%2FBerlin&forecast_days=3&wind_speed_unit=ms`,
    );

    if (!response.ok) {
      console.log("Något gick fel.");
      return;
    }
    const data = await response.json();
    console.log(data);
    weatherInfo(data.daily);
  } catch (error) {
    console.log(error);
  }
}

//daily från JSON filen i API:et,
// .map loopar igenom den arrayen som finns i API:et,
// som i varje iteration skapas två värden jag kan använda,
// första värdet är VÄRDET på positionen i arrayen och
// den andra är positionen(0,1,2..)
// Därav namngivningen dag(första värdet är ju 3 datum i förväg)
// och andra namngivningen är index för positionen i arrayen.

function weatherInfo(daily) {
  //bygger HTML för tre dagar med .map och stoppar in det i dailyweather div.

  const daysHTML = daily.time
    .map(
      (dag, index) => `
    <div class="contentCard weatherDay">
    ${getWeatherIcon(daily.weather_code[index])}
    <div class="weatherInfo">
        <p class="dayName">${dayNames(dag, index)}</p>
        <div class="tempWrapper">
            <p class="temp">min ${daily.temperature_2m_min[index]}°C</p>
            <p class="temp">max ${daily.temperature_2m_max[index]}°C</p>
        </div>
    </div>
</div>
    `,
    )
    .join("");
  document.getElementById("dailyweather").innerHTML = daysHTML;
}

function dayNames(dag, index) {
  //översätter index till idag, imorgon eller veckodag.
  if (index === 0) return "Idag";
  if (index === 1) return "Imorgon";
  else {
    const dayName = new Date(dag).toLocaleDateString("sv-SE", { weekday: "long" });
    return dayName.charAt(0).toUpperCase() + dayName.slice(1);
  }
}

function getWeatherIcon(code) {
  //översätter väderkod till bild.
  if (code === 0)
    return "<img class='weatherIcon' src='./pictures/sunny-day.png'/>"; // Klart
  if (code <= 2)
    return "<img class='weatherIcon' src='./pictures/cloudy-day.png'/>"; // Lätt molnigt
  if (code === 3)
    return "<img class='weatherIcon' src='./pictures/cloudy.png'/>"; // Mulet
  if (code <= 48) return "<img class='weatherIcon' src='./pictures/mist.png'/>"; // Dimma
  if (code <= 55)
    return "<img class='weatherIcon' src='./pictures/drizzle.png'/>"; // Duggregn
  if (code <= 67) return "<img class='weatherIcon' src='./pictures/rain.png'/>"; // Regn
  if (code <= 77)
    return "<img class='weatherIcon' src='./pictures/snowflake.png'/>"; // Snö
  if (code <= 82)
    return "<img class='weatherIcon' src='./pictures/weather.png'/>"; // Regnskurar
  if (code <= 86)
    return "<img class='weatherIcon' src='./pictures/snowing.png'/>"; // Snöbyar
  if (code <= 99)
    return "<img class='weatherIcon' src='./pictures/thunder.png'/>"; // Åska
}
