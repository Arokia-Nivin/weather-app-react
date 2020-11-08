import axios from "axios";
export const fetchWeatherData = (placeName) => async (dispatch) => {
  try {
    const res = await axios.get(
      "http://api.openweathermap.org/data/2.5/weather",
      {
        params: {
          q: placeName,
          appid: "2f662e3cc2306047524dd030b5222fdf",
          units: "metric",
        },
      },
    );
    console.log(res.data);
    const { main, weather, name, wind } = res.data;
    const action = {
      main,
      weather,
      name,
      wind,
    };
    dispatch({ type: "FETCH_WEATHER_DATA", payload: action });
  } catch (e) {
    window.alert("Please Enter a Valid City Name");
    dispatch({ type: "FETCH_WEATHER_DATA", payload: {} });
  }
};
