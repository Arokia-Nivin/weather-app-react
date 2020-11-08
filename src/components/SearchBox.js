import React, { Component } from "react";
import "../styles/SearchBox.css";
import axios from "axios";
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
    try {
      const res = await axios.get(
        "http://api.openweathermap.org/data/2.5/weather",
        {
          params: {
            q: placeName,
            appid: "2f662e3cc2306047524dd030b5222fdf",
          },
        },
      );
      let { main, weather, coord } = res.data;
      console.log(main, coord);
      for (let i of weather) console.log(i);
    } catch (e) {
      console.error(e);
      window.alert("An error occured ... Please Enter a Valid City Name");
    }
  };

  render() {
    return (
      <form className='SearchBox' onSubmit={this.handleOnSubmit}>
        <label htmlFor='SearchBox-input'>City Name</label>
        <input
          type='text'
          name='placeName'
          id='SearchBox-input'
          ref='SearchBoxInput'
          placeholder='Enter the City'
          className='SearchBox-input'
          value={this.state.placeName}
          onInput={this.handleOnChange}
        />
      </form>
    );
  }
}

export default SearchBox;
