export const weatherDataReducer = (state = {}, action) => {
  switch (action.type) {
    case "FETCH_WEATHER_DATA":
      return { ...action.payload };
    default:
      return state;
  }
};
