import React, { Component } from "react";
import { connect } from "react-redux";
import "../styles/weather.css";

class Weather extends Component {
  displayData = () => {
    const { weatherData } = this.props;
    if (
      Object.keys(weatherData).length === 0 &&
      weatherData.constructor === Object
    ) {
      return (
        <h1 className='Weather-notification badge badge-dark py-3'>
          ENTER YOUR CITY NAME
        </h1>
      );
    }
    const iconurl = `http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`;
    return (
      <div className='Weather'>
        <div>
          <p className='display-4'>{weatherData.name}</p>
        </div>
        <div>
          <img
            src={iconurl}
            className='Weather-icon'
            alt={weatherData.weather[0].main}
          />
        </div>
        <div>
          <p className='display-2'>{weatherData.main.temp}&#x2103; </p>
        </div>
        <div>
          <p className='display-3'>{weatherData.weather[0].description}</p>
        </div>
        <div className='Weather-data'>
          <div>
            <p> Humidity: {weatherData.main.humidity}%</p>
            <p>Speed: {weatherData.wind.speed}m/s</p>
          </div>
          <div>
            <p> Pressure: {weatherData.main.pressure}hPa</p>
            <p>Deg: {weatherData.wind.deg}&#176;</p>
          </div>
        </div>
      </div>
    );
  };

  render() {
    return <div>{this.displayData()}</div>;
  }
}

const mapStateToprops = (state, props) => {
  return {
    weatherData: state.weatherData,
  };
};
export default connect(mapStateToprops)(Weather);
