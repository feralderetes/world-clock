function countryFlag(timeZone) {
  switch (timeZone) {
    case "Atlantic/Cape_Verde":
      return "🇨🇻";
    case "Atlantic/South_Georgia":
    case "Europe/London":
      return "🇬🇧";
    case "America/Sao_Paulo":
      return "🇧🇷";
    case "America/Havana":
      return "🇨🇺";
    case "America/Lima":
      return "🇵🇪";
    case "America/Mexico_City":
      return "🇲🇽";
    case "America/Vancouver":
      return "🇨🇦";
    case "America/Anchorage":
    case "America/Adak":
    case "Pacific/Honolulu":
      return "🇺🇸";
    case "Pacific/Apia":
      return "🇼🇸";
    case "Atlantic/Reykjavik":
      return "🇮🇸";
    case "Europe/Berlin":
      return "🇩🇪";
    case "Europe/Moscow":
      return "🇷🇺";
    case "Asia/Dubai":
      return "🇦🇪";
    case "Indian/Maldives":
      return "🇲🇻";
    case "Asia/Dhaka":
      return "🇧🇩";
    case "Asia/Bangkok":
      return "🇹🇭";
    case "Asia/Singapore":
      return "🇸🇬";
    case "Asia/Seoul":
      return "🇰🇷";
    case "Australia/Canberra":
      return "🇦🇺";
    case "Pacific/Pohnpei":
      return "🇫🇲";
    case "Pacific/Auckland":
      return "🇳🇿";
    default:
      return "📍";
  }
}

function updateCityElement(city, timeZone) {
  let cityElement = document.querySelector(`#${city}`);
  if (cityElement) {
    if (!timeZone) {
      let cityTimeZoneElement = cityElement.querySelector(
        "#selected-city-timezone"
      );
      timeZone = cityTimeZoneElement.value;
    }
    let cityDateElement = cityElement.querySelector(".date");
    let cityTimeElement = cityElement.querySelector(".time");
    let cityTime = moment().tz(timeZone);
    cityDateElement.innerHTML = cityTime.format("MMMM Do YYYY");
    cityTimeElement.innerHTML = `${cityTime.format(
      `hh:mm:[<span class="light">]ss[</span>] [<small>]A[</small>]`
    )}`;
  }
}

function updateTime() {
  updateCityElement("buenos-aires", "America/Argentina/Buenos_Aires");
  updateCityElement("amsterdam", "Europe/Amsterdam");
  updateCityElement("sydney", "Australia/Sydney");
  updateCityElement("tokyo", "Asia/Tokyo");
  updateCityElement("selected-city", "");
}

function updateCity(event) {
  if (event.target.value.length > 0) {
    let cityTimeZone = event.target.value;
    if (cityTimeZone === "local") {
      cityTimeZone = moment.tz.guess();
    }
    let cityName = cityTimeZone.replace("_", " ").split("/")[1];
    let cityTime = moment().tz(cityTimeZone);
    let citiesElement = document.querySelector("#cities-list");
    citiesElement.innerHTML = `
      <div class="city" id="selected-city">
      <input type="hidden" id="selected-city-timezone" value="${cityTimeZone}"> 
      <div>
        <h2>${cityName} <span id="flag">${countryFlag(cityTimeZone)}</span></h2>
        <div class="date">${cityTime.format("MMMM Do YYYY")}</div>
      </div>
      <div class="time">${cityTime.format(
        "h:mm:"
      )}<span class="light">${cityTime.format(
      "ss"
    )}</span> <small>${cityTime.format("A")}</small></div>
      </div>
    `;
  }
  event.target.value = "";
}

updateTime();
setInterval(updateTime, 1000);

let selectedCityElement = document.querySelector("#city");
selectedCityElement.addEventListener("change", updateCity);
