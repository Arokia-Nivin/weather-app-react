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
    placeNameAutoComplete.setFields(["place_id"]);
    this.PlaceChangedListener(placeNameAutoComplete);
  }

  PlaceChangedListener = (autocomplete) => {
    autocomplete.addListener("place_changed", () => {
      const place = autocomplete.getPlace();
      if (!place.place_id) {
        this.setState({ placeName: "" });
        window.alert("Please select an option from the dropdown list");
      } else {
        this.setState({
          placeName: autocomplete.gm_accessors_.place.se.formattedPrediction,
        });
      }
    });
  };

  handleOnChange = (evt) => {
    this.setState({ [evt.target.name]: evt.target.value });
  };

  handleOnSubmit = async (evt) => {
    evt.preventDefault();
    let { placeName } = this.state;
    if (!placeName) return;
    let indexOfComma = placeName.indexOf(",");
    placeName = placeName.slice(0, indexOfComma);
    await this.props.fetchWeatherData(placeName);
    this.setState({ placeName: "" });
  };

  render() {
    return (
      <form onSubmit={this.handleOnSubmit}>
        <div className='form-group row'>
          <label
            className='SearchBox-input-label col-sm-3 col-form-label font-weight-bold'
            htmlFor='SearchBox-input'>
            City Name:
          </label>
          <div className='col-sm-9'>
            <input
              type='text'
              name='placeName'
              id='SearchBox-input'
              ref='SearchBoxInput'
              placeholder='Enter your City Name'
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
