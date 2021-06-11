// Foursquare API Info
const clientId = "TKQCASPCQG4XGI00JWQBB1DFECYMO3X2EJ1E4VTL4F0VTTLS";
const clientSecret = "N2WKWOSTE04VFRSZMWGGA00GLIH303XTH5HVFJCXEXPAKC0E";
const url = "https://api.foursquare.com/v2/venues/explore?near=";

// OpenWeather Info
const openWeatherKey = "25c994f16427ee7b79e0f3463379fa54";
const weatherUrl = "https://api.openweathermap.org/data/2.5/weather";

// Page Elements
const $input = $("#city");
const $submit = $("#button");
const $destination = $("#destination");
const $container = $(".container");
const $venueDivs = [$("#venue1"), $("#venue2"), $("#venue3"), $("#venue4")];
const $weatherDiv = $("#weather1");
const weekDays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

// Add AJAX functions here:
const getVenues = async() => {
    const city = $input.val();
    const urlToFetch = `${url}${city}&limit=10&client_id=${clientId}client_secret=${clientSecret}&v=20210610`;
    try{
        const response = await fetch(urlToFetch);
        if (response.ok) {
            const jsonResponse = await response.json();
            const venues = jsonResponse.response.groups[0].items.map(item=>item.venue);
            return venues;
            //console.log(venues);
        }
    } catch(error){
        console.log(error);
    }
};

const getForecast = async() => {
    const urlToFetch = `${weatherUrl}&appid${openWeatherKey}&q${$input.val()}`;
    //const urlToFetch = weatherUrl +'&q' +$input.val() + '&appid=' + openWeatherKey;
    try{
        const response = await fetch(urlToFetch);
        if(response.ok) {
            const jsonResponse = await response.json();
            return jsonResponse;
            //console.log(jsonResponse);
        }
    } catch(error) {
        console.log(error);
    }
};

// Render functions
const renderVenues = (venues) => {
  $venueDivs.forEach(($venue, index) => {
    // Add your code here:

    let venueContent = "";
    $venue.append(venueContent);
  });
  $destination.append(`<h2>${venues[0].location.city}</h2>`);
};

const renderForecast = (day) => {
  // Add your code here:

  let weatherContent = "";
  $weatherDiv.append(weatherContent);
};

const executeSearch = () => {
  $venueDivs.forEach((venue) => venue.empty());
  $weatherDiv.empty();
  $destination.empty();
  $container.css("visibility", "visible");
  getVenues();
  getForecast();
  return false;
};

$submit.click(executeSearch);