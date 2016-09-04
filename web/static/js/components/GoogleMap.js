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

    // var moonMapType = new google.maps.ImageMapType({
    //   getTileUrl: function(coord, zoom) {
    //     if(zoom < 8) {
    //       return null;
    //     }
    //     return 'https://s3-us-west-2.amazonaws.com/retailscoretiles/' + zoom + '/' + coord.x + '/' + coord.y + '/tile.png'
    //   },
    //   tileSize: new google.maps.Size(256, 256),
    //   maxZoom: 17,
    //   minZoom: 8,
    //   radius: 1738000,
    //   name: 'RetailScore'
    // });

    // map.overlayMapTypes.push(moonMapType);

    var me = this;

    google.maps.event.addListener(map, 'zoom_changed', function() {
      if (map.getZoom() > 16) map.setZoom(16);

      if(me.props.mixpanel) {
        me.props.mixpanel.track('Map Done Zooming');
      }
    });

    //only have pins that are in the bounds on the map at any given time
    google.maps.event.addListener(map, 'idle', function() {

      if(me.props.mixpanel) {
        me.props.mixpanel.track('Map Done Panning');
      }

      var bounds = map.getBounds();
      var visibleProps = [];
      var properties = me.props.properties;

      if (properties) {

        properties.map(function(property){
          if(property.lat >= bounds.getSouthWest().lat() && property.lat <= bounds.getNorthEast().lat()) {
            if(property.lng >= bounds.getSouthWest().lng() && property.lng <= bounds.getNorthEast().lng()) {
              visibleProps.push(property);
            }
          }
        });

        me.clearMap();
        if(visibleProps.length > 0) {
          me.drawPropertyMarkers(visibleProps, me);
        }
      } 
    });

    this.state.map = map;

    this.setState(this.state);

    if(this.props.properties) {
      // this.drawPropertyMarkers(this.props.properties);
    }

    if(this.props.currentPropertyMarker){
      this.highlightMarker(this.props.currentPropertyMarker);
    }
  }


  highlightMarker(property) {

    this.state.highlightedId = property.id;

    this.state.map.setZoom(15);

    this.state.map.panTo({lat: property.lat, lng: property.lng});

    this.setState(this.state);
  }

  clearMap() {
    this.state.markers.map(function(marker){
      marker.setMap(null);
    });

    this.state.markers = [];
    this.setState(this.state);
  }

  drawPropertyMarkers(properties, me) {

    //resetting the property ids
    me.state.propertyIds = {};

    properties.map((property) => {

      var icon;
      var zIndex;

      if(property.id == me.state.highlightedId) {
        icon = {
          url: "https://s3-us-west-2.amazonaws.com/homepage-image-assets/competition_pin.png",
          scaledSize: new google.maps.Size(70, 70),
          zIndex: 1
        };
        zIndex = 1;
      } else {
        icon = {
          url: "https://s3-us-west-2.amazonaws.com/zamatics-images/propertyicon50x50.png",
          scaledSize: new google.maps.Size(50, 50),
          zIndex: 0
        };
        zIndex = 0;
      }

      var marker = new google.maps.Marker({
        position: {lat: property.lat, lng: property.lng},
        zIndex:zIndex,
        map: me.state.map,
        icon: icon});

      marker.set("id", property.id);

      marker.addListener('click', function(){
        
        if(me.props.pinClick) {
          me.props.pinClick(property);
        }
      });

      me.state.markers.push(marker);
      me.state.propertyIds[property.id] = true;

    });

    this.setState(this.state);

  }

  componentWillReceiveProps(nextProps){

    // if(nextProps.city && (this.state.city != nextProps.city)){

    //   this.state.city = nextProps.city;
    //   this.setState(this.state);

    //   var geocoder = new google.maps.Geocoder();
    //   var me = this;

    //   geocoder.geocode({
    //       'address': nextProps.city
    //   }, function(results, status) {
    //       if (status == google.maps.GeocoderStatus.OK) {
    //         me.state.map.setCenter(results[0].geometry.location);
    //         me.setState(me.state);
    //       }
    //   });
    // }
    

    if(nextProps.currentPropertyMarker){
      if(this.state.highlightedId != nextProps.currentPropertyMarker.id) {
        this.state.map.setCenter({lat: nextProps.currentPropertyMarker.lat, lng: nextProps.currentPropertyMarker.lng});

        this.highlightMarker(nextProps.currentPropertyMarker);
      }
      
    }
  }

  render () {
    return (
      <div id={this.props.id} style={{height:"100%", width:"100%"}} />
    );
  }
}
