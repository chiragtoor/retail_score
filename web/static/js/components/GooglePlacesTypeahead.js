import {default as React, Component} from "react";
import {FormControl} from "react-bootstrap";

import TypeAhead from 'react-bootstrap-typeahead';

export default class GooglePlacesTypeahead extends Component {

  constructor(props) {
    super(props);

    this.handleInputChange = this.handleInputChange.bind(this);

    this.state = {
      places: []
    };
  }

  componentDidMount() {
    var googleMaps = this.props.googleMaps
      || (google && google.maps) || this.googleMaps;

    if (!googleMaps) {
      console.error('Google map api was not found in the page.');
    } else {
      this.googleMaps = googleMaps;
    }

    this.autocompleteService = new googleMaps.places.AutocompleteService();
  }

  handleInputChange(input) {
    var options = {
      input: input,
      country: "U.S.A."
    };

    if(this.props.cityOnly) {
      options = {
        input: input,
        componentRestrictions: {country: "us"},
        types: ['(cities)']
      };
    }

    this.autocompleteService.getPlacePredictions(
      options,
      function(suggestsGoogle) {
        this.setState({places: suggestsGoogle});
      }.bind(this)
    );
  }

  render() {
    var dataSource = this.state.places.map((place, i) => {
      return {id: i, display: place.description, place_id: place.place_id};
    });

    return (
      <TypeAhead
        labelKey="display"
        onInputChange={this.handleInputChange}
        onChange={this.props.onChange}
        onOptionSelected={this.props.onChange}
        options={dataSource}
        placeholder={this.props.placeHolder}/>
    );
  }
}
