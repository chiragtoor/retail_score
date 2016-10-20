import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';

export default class RetailCompetitionGoogleMap extends Component {

  constructor(props) {
    super(props);

    this.drawPropertyWithIcon = this.drawPropertyWithIcon.bind(this);
    this.drawPlaces = this.drawPlaces.bind(this);
    this.removePlaces = this.removePlaces.bind(this);

    this.state = {
      map: null,
      propertyMarker: null,
      keyword: null,
      places: [],
      infowindow: null
    };
  }

  componentDidMount() {

    var property = this.props.property;

    if(property) {
      var map = new google.maps.Map(document.getElementById(this.props.id), {
        center: new google.maps.LatLng(property.lat, property.lng),
        zoom: 13,
        streetViewControl: false,
        mapTypeControl: false
      });
    }

    map.setOptions({ 
      styles:[{
        featureType: "poi",
        stylers: [
          { visibility: "off" }
        ]   
      }]
    });

    map.setOptions({ scrollwheel: false});

    google.maps.event.addListener(map, 'zoom_changed', function() {
      if (map.getZoom() > 18) map.setZoom(18);
    });

    this.state.map = map;

    this.setState(this.state);

    if(this.props.property) {

      var icon = {
          url: "https://s3-us-west-2.amazonaws.com/zamatics-images/propertyicon50x50.png",
          scaledSize: new google.maps.Size(50, 50),
          zIndex: 1
      };
      this.drawPropertyWithIcon(this.props.property,icon);
    }
  }

  componentWillReceiveProps(nextProps) {


    if(this.state.propertyMarker && nextProps.property) {
      this.state.propertyMarker.setMap(null);
      this.setState(this.state);

      var icon = {
          url: "https://s3-us-west-2.amazonaws.com/zamatics-images/propertyicon50x50.png",
          scaledSize: new google.maps.Size(50, 50),
          zIndex: 1
      };

      this.drawPropertyWithIcon(nextProps.property,icon);
    }

    if(nextProps.type != this.state.type) {
      this.state.keyword = nextProps.keyword;
      this.state.map.setZoom(16);
      this.setState(this.state);

      if(this.state.places){
        this.removePlaces();
      }

      var service = new google.maps.places.PlacesService(document.createElement('div'));

      var lat = nextProps.property.lat;
      var lng = nextProps.property.lng;

      var me = this;

      var request = {
        location: new google.maps.LatLng(lat, lng),
        rankBy: google.maps.places.RankBy.DISTANCE,
        key: 'AIzaSyBU1D9GVuNbm9Hp3YDKr9UOSvnPQSBWPQ8',
        type: nextProps.type,
        types: nextProps.type
      };

      console.log("This is the request");
      console.log(request);

      service.nearbySearch(request, function(results, status, pagination) {
        if (status == google.maps.places.PlacesServiceStatus.OK){

          var places = [];

          for(var index = 0; index < results.length; index++) {
            var place = results[index];

            if(!place.permanently_closed){
              places.push(place);
            }
          }

          if(pagination.hasNextPage) {
              me.drawPlaces(places);
              pagination.nextPage();
            }
          else{
            me.drawPlaces(places);
          }
        } else {
          console.log(request);
          console.log(status)
          // console.log("GOOGLE PLACES QUERY ERROR");
        }
      });
    }

  }

  removePlaces() {

    this.state.places.map(function(place){
      place.setMap(null);
    });

    this.state.places = [];
    this.setState(this.state);
  }

  drawPlaces(places) {

    var me = this;

    places.map((place) => {

      var icon = {
        url: "https://s3-us-west-2.amazonaws.com/homepage-image-assets/competition_pin.png",
        scaledSize: new google.maps.Size(50, 50),
        zIndex: 0
      };

      var marker = new google.maps.Marker({
        position: {lat: place.geometry.location.lat(), lng: place.geometry.location.lng()},
        zIndex:0,
        map: me.state.map,
        icon: icon});


      var contentString;

      if(place.rating) {
        contentString = '<div id="content">'+ place.name + '</div> <div> Rating: ' + place.rating +'</div>';
      } else {
        contentString = '<div id="content">'+ place.name + '</div>';
      }


      var infowindow = new google.maps.InfoWindow({
        content: contentString
      });

      marker.addListener('click', function() {
        infowindow.open(me.state.map, marker);
        me.state.infowindow = infowindow;
        me.setState(me.state);

        if(me.props.pinClick) {
          me.props.pinClick(place.name);
        }
      });

      me.state.places.push(marker)

    });

    this.setState(this.state);
  }

  drawPropertyWithIcon(property, icon) {

    var marker = new google.maps.Marker({
        position: {lat: property.lat, lng: property.lng},
        zIndex:1,
        map: this.state.map,
        icon: icon});

    this.state.propertyMarker = marker;

    this.state.map.setCenter({lat: property.lat, lng: property.lng});
    this.setState(this.state);

   }


  render () {
    return (
      <div id={this.props.id} style={{height:"100%", width:"100%"}} />
    );
  }
}
