import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';

export default class GoogleMap extends Component {

  constructor(props) {
    super(props);


    this.drawPropertyMarkers = this.drawPropertyMarkers.bind(this);
    this.clearMap = this.clearMap.bind(this);
    this.highlightMarker = this.highlightMarker.bind(this);

    this.state = {
      map: null,
      highlightedId: null,
      city: null,
      markers: [],
      propertyIds: {}
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

    var moonMapType = new google.maps.ImageMapType({
      getTileUrl: function(coord, zoom) {
        if(zoom < 8) {
          return null;
        }
        return 'https://s3-us-west-2.amazonaws.com/retailscoretiles/' + zoom + '/' + coord.x + '/' + coord.y + '/tile.png'
      },
      tileSize: new google.maps.Size(256, 256),
      maxZoom: 17,
      minZoom: 8,
      radius: 1738000,
      name: 'RetailScore'
    });

    map.overlayMapTypes.push(moonMapType);

    google.maps.event.addListener(map, 'zoom_changed', function() {
      if (map.getZoom() > 16) map.setZoom(16);
    });

    this.state.map = map;

    this.setState(this.state);

    if(this.props.properties) {
      this.drawPropertyMarkers(this.props.properties);
    }

    if(this.props.currentPropertyMarker){
      this.highlightMarker(this.props.currentPropertyMarker);
    }
  }


  highlightMarker(property) {

    console.log("in highlight marker");


    var me = this;
    this.state.markers.map(function(marker, index){
      if(marker.get("id") == property.id) {
        var icon = {
          url: "https://s3-us-west-2.amazonaws.com/homepage-image-assets/competition_pin.png",
          scaledSize: new google.maps.Size(70, 70),
          zIndex: 1
        };
        marker.setIcon(icon);

      } else if(marker.get("id") == me.state.highlightedId) {
        var smallIcon = {
          url: "https://s3-us-west-2.amazonaws.com/zamatics-images/propertyicon50x50.png", // url
          scaledSize: new google.maps.Size(50, 50),
          zIndex: 0
        };
        marker.setIcon(smallIcon);
      }
    });


    this.state.highlightedId = property.id;

    this.state.map.setZoom(15);

    this.state.map.panTo({lat: property.lat, lng: property.lng});

    this.setState(this.state);
  }

  clearMap() {
    console.log("in clear map");

    this.state.markers.map(function(marker){
      marker.setMap(null);
    });

    this.state.markers = [];
    this.setState(this.state);
  }

  drawPropertyMarkers(properties) {

    console.log("in drawPropertyMarkers, this is how many properties i have to draw " + properties.length);

    var me = this;

    //resetting the property ids
    me.state.propertyIds = {};

    properties.map((property) => {

      var icon = {
        url: "https://s3-us-west-2.amazonaws.com/zamatics-images/propertyicon50x50.png",
        scaledSize: new google.maps.Size(50, 50),
        zIndex: 0
      };

      var marker = new google.maps.Marker({
        position: {lat: property.lat, lng: property.lng},
        zIndex:0,
        map: me.state.map,
        icon: icon});

      marker.set("id", property.id);

      marker.addListener('click', function(){
        
        if(me.props.pinClick) {
          me.props.pinClick(property.id);
        }
      });

      me.state.markers.push(marker);
      me.state.propertyIds[property.id] = true;

    });

    this.setState(this.state);

  }

  componentWillReceiveProps(nextProps){

    if(nextProps.properties) {
      var redraw = false;

      var ids = this.state.propertyIds;

      var keys = Object.keys(ids);

      if (nextProps.properties.length != keys.length) {
        redraw = true;
      } else {
        nextProps.properties.map(function(property){
          if(!ids[property.id]) {
            redraw = true;
          }
        });
      }

      if(redraw) {
        console.log("going to redraw");
        this.clearMap();
        this.drawPropertyMarkers(nextProps.properties);
      }

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
      if(this.state.highlightedId != nextProps.currentPropertyMarker.id)
      this.highlightMarker(nextProps.currentPropertyMarker);
    }
  }

  render () {
    return (
      <div id={this.props.id} style={{height:"100%", width:"100%"}} />
    );
  }
}
