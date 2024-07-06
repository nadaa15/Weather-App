let forecast = document.querySelector(".forcast-table .row");
let searchInput = document.querySelector(".form-input");

let result = [];

// Get weather based on user location

if (navigator.geolocation) {
  getYourLocation()
}
function getYourLocation() {
  navigator.geolocation.getCurrentPosition(
    function (e) {
      console.log(e);
      const latitude = e.coords.latitude;
      const longitude = e.coords.longitude;
      getLocation(latitude,longitude)
    }
  )
}

 async function getLocation(latitude, longitude) {
   let response = await fetch(
     `https://api.weatherapi.com/v1/forecast.json?key=a58468905bbb4a52ba365432241804&q=${latitude},${longitude}&days=3`
   );
   let data = await response.json();
   result = data;
   display();
}
 
// Get weather based on user search

searchInput.addEventListener("input", function () {
    let term = searchInput.value;
  getWeather(term);
});
 
getLocation()
  async function getWeather(term) {
    let response = await fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=a58468905bbb4a52ba365432241804&q=${term}&days=3`
    );
    let data = await response.json();
    result = data;
    display();
  }

// Display Weather

function display() {
  let date = new Date();
  let dateTwo = new Date(`${result.forecast.forecastday[1].date}`);
  let dateThree = new Date(`${result.forecast.forecastday[2].date}`);
  let days = [
    "Sunday",
    "Monday",
    "Tuseday",
    "Wednesday",
    "Thuresday",
    "Friday",
    "Saterday",
  ];
  let months = [
    "Junuary",
    "February",
    "Marsh",
    "April",
    "May",
    "June",
    "July",
    "August",
    "Septamber",
    "Octuber",
    "November",
    "Decumber",
  ];
  table = ``;
  table += `<div class="col-lg-4">
                    <div class="inner today text-light">
                        <div class="forcast-header w-100 d-flex justify-content-between align-items-center">
                            <p>${days[date.getDay()]}</p>
                            <p>${date.getDate()} ${months[date.getMonth()]}</p>
                        </div>
                        <div class="forcast-content p-4">
                            <p>${result.location.name}</p>
                            <div class="degree d-flex flex-md-wrap mb-3">
                                <div class="degree-num me-5">${
                                  result.current.temp_c
                                }<sup>o</sup>C</div>
                                <div class="forecast-icon">
                                    <img src="${
                                      result.current.condition.icon
                                    }" alt="" width="90">
                                </div>
                            </div>
                            <p class="blue mb-3">${
                              result.current.condition.text
                            }</p>
                            <span><img src="assets/images/icon-umberella.png" alt=""> ${
                              result.current.humidity
                            }%</span>
                            <span><img src="assets/images/icon-wind.png" alt=""> ${
                              result.current.wind_kph
                            }km/h</span>
                            <span><img src="assets/images/icon-compass.png" alt=""> ${
                              result.current.wind_dir
                            }</span>
                        </div>
                    </div>
                </div>
                <div class="col-lg-4">
                    <div class="inner forcast text-light text-center h-100">
                        <div class="forcast-header">
                            <p>${days[dateTwo.getDay()]}</p>
                        </div>
                        <div class="forecast-content pt-5 pb-4">
                            <div class="forecast-icon mb-4">
                                <img src="${
                                  result.forecast.forecastday[1].day.condition
                                    .icon
                                }" alt="" width="48">
                            </div>
                            <p class="max-temp h4">${
                              result.forecast.forecastday[1].day.maxtemp_c
                            }<sup>o</sup>C</p>
                            <p class="min-temp h6">${
                              result.forecast.forecastday[1].day.mintemp_c
                            }<sup>o</sup></p>
                            <p class="blue mt-4">${
                              result.forecast.forecastday[1].day.condition.text
                            }</p>
                        </div>
                    </div>
                </div>
                <div class="col-lg-4">
                    <div class="inner forcast2 text-light text-center h-100">
                        <div class="forcast-header">
                            <p>${days[dateThree.getDay()]}</p>
                        </div>
                        <div class="forecast-content pt-5 pb-4">
                            <div class="forecast-icon mb-4">
                                <img src="${
                                  result.forecast.forecastday[2].day.condition
                                    .icon
                                }" alt="" width="48">
                            </div>
                            <p class="max-temp h4">${
                              result.forecast.forecastday[2].day.maxtemp_c
                            }<sup>o</sup>C</p>
                            <p class="min-temp h6">${
                              result.forecast.forecastday[2].day.mintemp_c
                            }<sup>o</sup></p>
                            <p class="blue mt-4">${
                              result.forecast.forecastday[2].day.condition.text
                            }</p>
                        </div>
                    </div>
                </div>`;

  forecast.innerHTML = table;
}





