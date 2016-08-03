import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';

export default class GoogleMap extends Component {

  constructor(props) {
    super(props);

    this.routeCities = this.routeCities.bind(this);

    this.state = {
      map: null,
      directionsService: null,
      directionsRenderer: null,
      cities: []
    };
  }

  componentDidMount() {
    var map = new google.maps.Map(document.getElementById(this.props.id), {
      center: new google.maps.LatLng(37.733679, -121.431132),
      zoom: 6,
      mapTypeControl: false
    });

    map.setOptions({ 
      styles:[{
        featureType: "poi",
        stylers: [
          { visibility: "off" }
        ]   
      }]
    });

    this.state.map = map;
    this.state.directionsService = new google.maps.DirectionsService();
    this.state.directionsRenderer = new google.maps.DirectionsRenderer();
    this.state.directionsRenderer.setMap(this.state.map);

    this.setState(this.state);
  }

  clearRoute() {
    this.state.directionsRenderer.setMap(null);
  }

  routeCities() {
    var length = this.props.cities.length;
    if(length < 2) return;

    var origin = this.props.cities[0];
    var destination = this.props.cities[length - 1];

    var waypts = [];
    for(var i = 1; i < (length - 1); i++) {
      waypts.push({
        location: this.props.cities[i],
        stopover: true
      });
    }

    var directionsRenderer = this.state.directionsRenderer;
    var routeCallback = this.props.routeCallback;
    this.state.directionsService.route({
      origin: origin,
      destination: destination,
      waypoints: waypts,
      travelMode: google.maps.TravelMode.DRIVING,
    }, function(response, status) {
      if (status === google.maps.DirectionsStatus.OK) {
        directionsRenderer.setDirections(response);
        routeCallback(response.routes[0]);
      }
    });

  }

  componentWillReceiveProps(nextProps) {
    this.state.cities = nextProps.cities;
  }

  render () {
    return (
      <div id={this.props.id} style={{height:"100%", width:"100%"}} />
    );
  }
}
