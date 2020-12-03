import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchWeatherData } from "../actions/";
import "../styles/SearchBox.css";
class SearchBox extends Component {
  constructor(props) {
    super(props);
    this.state = { placeName: "" };
  }

  componentDidMount() {
    const placeNameAutoComplete = new window.google.maps.places.Autocomplete(
      this.refs.SearchBoxInput,
    );
    placeNameAutoComplete.setFields(["formatted_address"]);
    this.PlaceChangedListener(placeNameAutoComplete);
  }

  PlaceChangedListener = (autocomplete) => {
    autocomplete.addListener("place_changed", () => {
      let placeName = autocomplete.getPlace().formatted_address;
      if (!placeName) {
        this.setState(() => ({ placeName: "" }));
        this.props.fetchWeatherData("");
      } else {
        this.setState(() => ({ placeName }));
        let indexOfComma = placeName.indexOf(",");
        placeName = placeName.slice(0, indexOfComma);
        this.props.fetchWeatherData(placeName).then(() => {
          this.setState(() => ({ placeName: "" }));
        });
      }
    });
  };

  handleOnChange = (evt) => {
    this.setState(() => ({ [evt.target.name]: evt.target.value }));
  };

  handleOnSubmit = (evt) => {
    evt.preventDefault();
  };

  render() {
    const icon = <i className='fas fa-search'></i>;
    return (
      <form onSubmit={this.handleOnSubmit}>
        <div className='form-group row'>
          <label
            className='SearchBox-input-label col-sm-3 col-form-label font-weight-bold'
            htmlFor='SearchBox-input'>
            City Name: {icon}
          </label>
          <div className='col-sm-9'>
            <input
              type='text'
              name='placeName'
              id='SearchBox-input'
              ref='SearchBoxInput'
              placeholder='Enter Your City Name'
              className='form-control'
              value={this.state.placeName}
              onChange={this.handleOnChange}
            />
          </div>
        </div>
      </form>
    );
  }
}

export default connect(null, { fetchWeatherData })(SearchBox);
