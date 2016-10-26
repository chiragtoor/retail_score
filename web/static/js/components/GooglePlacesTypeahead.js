import React from 'react';
import TypeAhead from 'react-bootstrap-typeahead';

export default class GooglePlacesTypeahead extends React.Component {

  constructor(props) {
    super(props);

    this.handleInputChange = this.handleInputChange.bind(this);

    this.state = {
      cities: this.props.value ? [this.props.value] : [],
      neighborhoods: []
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
    this.setState({hideMenu: false});

    if(input === "") {
      return;
    }

    /*
     * Querying just cities makes it so something like Venice, CA does not show up, so we query for cities
     *  and neighborhoods from a general geocode query -> filter out what does not qualify and concatenate
     *  the two to make it so we have a full dropdown of possible places
     */

    var options = {
      input: input,
      componentRestrictions: {country: "us"},
      types: ['(cities)']
    };
    this.autocompleteService.getPlacePredictions(
      options,
      function(suggestsGoogle) {
        if(suggestsGoogle == null) {
          return null;
        }

        var cities = suggestsGoogle.map((place) => {
          return place.terms[0].value + ", " + place.terms[1].value;
        });

        this.setState({cities: cities});
      }.bind(this)
    );

    options = {
      input: input,
      componentRestrictions: {country: "us"},
      types: ['geocode']
    };
    this.autocompleteService.getPlacePredictions(
      options,
      function(suggestsGoogle) {

        if(suggestsGoogle == null) {
          return null;
        }

        var neighborhoods = suggestsGoogle.map((place, i) => {
          if(place.types.includes("neighborhood")) {
            return place.terms[0].value + ", " + place.terms[2].value;
          } else {
            return null;
          }
        }).filter((place) => place != null);

        this.setState({neighborhoods: neighborhoods});
      }.bind(this)
    );
  }

  render() {
    // concatenate the two sources so autocomplete displays full options
    const dataSource = this.state.neighborhoods.concat(this.state.cities).map((place, index) => {
      return {id: index, display: place};
    });
    return (
      <TypeAhead
        className="typeahead_css"
        labelKey="display"
        selected={this.props.value ? [{display: this.props.value}] : []}
        emptyLabel="Select one option"
        onInputChange={this.handleInputChange}
        onChange={this.props.onChange}
        options={dataSource}
        placeholder={"Enter a City"}/>
    );
  }
}