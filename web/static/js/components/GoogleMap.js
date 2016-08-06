import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';

export default class GoogleMap extends Component {

  constructor(props) {
    super(props);


    this.drawPropertyWithIcon = this.drawPropertyWithIcon.bind(this);
    this.drawPropertyMarkers = this.drawPropertyMarkers.bind(this);
    this.drawCurrentPropertyMarker = this.drawCurrentPropertyMarker.bind(this);

    this.state = {
      map: null,
      markers: {},
      currentProperty: null,
      city: null
    };
  }

  componentDidMount() {
    var map = new google.maps.Map(document.getElementById(this.props.id), {
      center: new google.maps.LatLng(34.0522, -118.2437),
      zoom: 13,
      streetViewControl: false,
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

    this.setState(this.state);

    if(this.props.properties) {
      this.drawPropertyMarkers(this.props.properties);
    }

    if(this.props.currentPropertyMarker){
      this.drawCurrentPropertyMarker(this.props.currentPropertyMarker);
    }
  }

  drawCurrentPropertyMarker(property) {

    var icon = {
          url: "https://s3-us-west-2.amazonaws.com/zamatics-images/propertyicon50x50.png",
          scaledSize: new google.maps.Size(60, 60)
      };

    this.drawPropertyWithIcon(property, icon);


    //remove the previously large one and replace it with a smaller size
    if(this.state.currentProperty) {

      var smallIcon = {
        url: "https://s3-us-west-2.amazonaws.com/zamatics-images/propertyicon50x50.png", // url
        scaledSize: new google.maps.Size(50, 50)
      };

      this.drawPropertyWithIcon(this.state.currentProperty, smallIcon);
    }

    if(this.state.markers[property.id] && this.state.map && this.state.map.getBounds()) {
      if(!this.state.map.getBounds().contains(this.state.markers[property.id].getPosition())) {
        this.state.map.panTo(this.state.markers[property.id].getPosition());
      }
    }
    
    this.state.currentProperty = property;
    this.setState(this.state);
  }

  drawPropertyWithIcon(property, icon) {

    if(this.state.markers[property.id]) {
      this.state.markers[property.id].setMap(null);
    }

    var me = this;

    var marker = new google.maps.Marker({
        position: {lat: property.lat, lng: property.lng},
        zIndex:1,
        map: me.state.map,
        icon: icon});

    marker.addListener('click', function(){
      
      if(me.props.pinClick) {
        me.props.pinClick(property.id);
      }
    });

    this.state.markers[property.id] = marker;

    this.setState(this.state);
  }

  drawPropertyMarkers(properties) {

    properties.map((property) => {

      var icon = {
          url: "https://s3-us-west-2.amazonaws.com/zamatics-images/propertyicon50x50.png",
          scaledSize: new google.maps.Size(50, 50)
      };

      this.drawPropertyWithIcon(property, icon);
    });
  }

  componentWillReceiveProps(nextProps) 
  {
    if(nextProps.properties) {
      this.drawPropertyMarkers(nextProps.properties);
    }

    if(nextProps.city && (this.state.city != nextProps.city)){

      this.state.city = nextProps.city;
      this.setState(this.state);

      var geocoder = new google.maps.Geocoder();
      var me = this;

      geocoder.geocode({
          'address': nextProps.city
      }, function(results, status) {
          if (status == google.maps.GeocoderStatus.OK) {
            me.state.map.setCenter(results[0].geometry.location);
            me.setState(me.state);
          }
      });
    }

    if(nextProps.currentPropertyMarker){
      this.drawCurrentPropertyMarker(nextProps.currentPropertyMarker);
    }
  }

  render () {
    return (
      <div id={this.props.id} style={{height:"100%", width:"100%"}} />
    );
  }
}
