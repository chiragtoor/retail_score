import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';

export default class CompetitionGoogleMap extends Component {

  constructor(props) {
    super(props);

    this.drawPropertyWithIcon = this.drawPropertyWithIcon.bind(this);
    this.drawPlaceWithIcon = this.drawPlaceWithIcon.bind(this);
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

    map.setOptions({draggable: false, scrollwheel: false});

    this.state.map = map;

    this.setState(this.state);

    if(this.props.property) {

      var icon = {
          url: "https://s3-us-west-2.amazonaws.com/zamatics-images/propertyicon50x50.png",
          scaledSize: new google.maps.Size(50, 50),
          zIndex: 0
      };
      this.drawPropertyWithIcon(this.props.property,icon);
    }
  }

  componentWillReceiveProps(nextProps) {

    if(nextProps.keyword != this.state.keyword) {
      console.log("got a new keyword " + nextProps.keyword);

      // if(this.state.keyword) {
      //   this.removePlaces();
      // }

      this.state.keyword = nextProps.keyword;
      this.setState(this.state);

      var service = new google.maps.places.PlacesService(document.createElement('div'));

      var lat = nextProps.property.lat;
      var lng = nextProps.property.lng;

      var me = this;

      var request = {
        location: new google.maps.LatLng(lat, lng),
        rankBy: google.maps.places.RankBy.DISTANCE,
        key: 'AIzaSyBU1D9GVuNbm9Hp3YDKr9UOSvnPQSBWPQ8',
        name: nextProps.keyword
      };

      service.nearbySearch(request, function(results, status, pagination) {
        if (status == google.maps.places.PlacesServiceStatus.OK){

          for(var index = 0; index < results.length; index++) {
            var place = results[index];

            if(!place.permanently_closed){
              var icon = {
                            url: "https://s3-us-west-2.amazonaws.com/homepage-image-assets/competition_pin.png",
                            scaledSize: new google.maps.Size(50, 50),
                            zIndex: 0
                        };

              me.drawPlaceWithIcon(place, icon)
            }
          }

          if(pagination.hasNextPage) {
              pagination.nextPage();
            }
        } else {
          console.log("GOOGLE PLACES QUERY ERROR");
        }
      });
    }

  }

  removePlaces() {


    for(var i = 0; i < this.state.places.length; i++) {
      if(this.state.places[i]){
        this.state.places[i].setMap(null);
      }
      this.state.places.splice(i, 1);
    }

     this.state.infowindow.setMap(null);
     this.state.infowindow = null;

    this.setState(this.state);

    console.log("done in remove places " + this.state.places);
  }

  drawPlaceWithIcon(place, icon) {
    var me = this;

    var lat = place.geometry.location.lat();
    var lng = place.geometry.location.lng()

    var marker = new google.maps.Marker({
        position: {lat: lat, lng: lng},
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
    });

    this.state.places.push(marker);
    this.setState(this.state);
  }

  drawPropertyWithIcon(property, icon) {

    var me = this;

    var marker = new google.maps.Marker({
        position: {lat: property.lat, lng: property.lng},
        zIndex:0,
        map: me.state.map,
        icon: icon});

    marker.addListener('click', function(){
      console.log("show the info window");
    });

    this.state.propertyMarker = marker;

    this.setState(this.state);
  }


  render () {
    return (
      <div id={this.props.id} style={{height:"100%", width:"100%"}} />
    );
  }
}
