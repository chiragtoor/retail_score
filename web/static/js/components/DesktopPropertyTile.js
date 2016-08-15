import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Grid, Row, Col, Panel, Button, FormGroup, ControlLabel, FormControl, InputGroup, Carousel, CarouselItem, DropdownButton, MenuItem } from 'react-bootstrap';

const isBrowser = typeof window !== 'undefined';
const VisibilitySensor = isBrowser ? require('react-visibility-sensor') : undefined;

export default class DesktopPropertyTile extends Component {

  constructor(props) {
    super(props);

    this.tileClick = this.tileClick.bind(this);
    this.getImageUrl = this.getImageUrl.bind(this);
  }

  getImageUrl(lat, lng, heading) {
   var width = isBrowser ? window.innerWidth : 400;
   width = (width * (0.85) * (0.4)).toFixed(0);

    return `https://maps.googleapis.com/maps/api/streetview?size=${width}x150&location=${lat},${lng}&heading=${heading}&key=AIzaSyASv9f24GcF78YIKRsX3uCRkj58JzZ8NaA`;
  }

  tileClick() {
    this.props.tileClick(this.props.property.id);
  }

  render () {

    var property = this.props.property;

    var priceString;
    var sqftString;
    var addressString;
    var spacesString;

    if(property.rental_rate_min) {
      priceString = '$' + property.rental_rate_min.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + ' /mo' ;
    }
    if(property.max_sq_feet) {
      sqftString = property.max_sq_feet.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " sqft";
    }

    if(property.street_address) {
      addressString = property.street_address; 
    }

    if(property.spaces) {
      var spacesString = (property.spaces.length <= 1) ?  property.spaces.length + " space available" : property.spaces.length + " spaces available" ;
    }

    return (
          <div className="hidden-sm panel b text-center SRPPropertyTile" style={{display:"inline-block", position:"relative", overflowY:"hidden"}} onClick={this.tileClick}>
            
            <div style={{width:"40%", height:"100%", float:"left" , position:"absolute", zIndex:"0", backgroundColor:"#FFFFFF"}}>
              <img style={{height:"100%", width:"100%"}} src={this.getImageUrl(property.image_lat, property.image_lng, property.image_heading)} />
            </div>

            <div style={{width:"40%", height:"100%", float:"left" ,position:"absolute",  zIndex:"1", backgroundColor:"rgba(0,0,0,0.25)"}}>
              <div style={{marginTop:"10px" ,fontSize:"75px", textAlign:"center", fontWeight:"400", color:"#FFFFFF"}}>{property.retail_score}</div>
            </div>

            <div style={{float:"right", width:"60%", height:"100%"}}>
              <div style={{textAlign:"center", width:"100%", fontSize:"20px", marginTop:"10px", fontWeight:"400"}}>{addressString}</div>
              <div style={{textAlign:"center", width:"45%", float:"left", fontSize:"18px", marginTop:"10px", fontWeight:"400"}}>{priceString}</div>
              <div style={{textAlign:"center", width:"45%", float:"right", fontSize:"18px", marginTop:"10px", fontWeight:"400"}}>{sqftString}</div>
              <div style={{textAlign:"center", width:"100%",float:"left", fontSize:"18px", marginTop:"10px", fontWeight:"100"}}>{spacesString}</div>
            </div>

          </div>

    );
  }
}
