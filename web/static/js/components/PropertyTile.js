import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Grid, Row, Col, Panel, Button, FormGroup, ControlLabel, FormControl, InputGroup, Carousel, CarouselItem, DropdownButton, MenuItem } from 'react-bootstrap';

const isBrowser = typeof window !== 'undefined';
const VisibilitySensor = isBrowser ? require('react-visibility-sensor') : undefined;

export default class PropertyTile extends Component {

  constructor(props) {
    super(props);

    this.tileClick = this.tileClick.bind(this);
    this.getImageUrl = this.getImageUrl.bind(this);
    this.visibilityChanged = this.visibilityChanged.bind(this);
  }

  getImageUrl(lat, lng, heading) {
   var width = isBrowser ? window.innerWidth : 400;
   width = (width * (0.85) * (0.4)).toFixed(0);

    return `https://maps.googleapis.com/maps/api/streetview?size=${width}x130&location=${lat},${lng}&heading=${heading}&key=AIzaSyASv9f24GcF78YIKRsX3uCRkj58JzZ8NaA`;
  }

  tileClick() {
    this.props.tileClick(this.props.property.id);
  }


  visibilityChanged(isVisible) {

    if(isVisible) {
      this.props.visibilityChanged(this.props.property);
    }
  }

  render () {

    var property = this.props.property;

    var priceString = '$' ;//+ property.price.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + ' /mo' ;
    var sqftString = ''; //property.squareFeet.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " sqft";

    return (
            <div className="panel b text-center horizontalPDPTiles" style={{display:"inline-block", position:"relative", height:"130px", width:"85%", padding:"0px", overflowY:"hidden"}} onClick={this.tileClick}>
              
              {isBrowser ? 
                <VisibilitySensor onChange={this.visibilityChanged} >
                  <div style={{width:"40%", height:"130px", position:"absolute", zIndex:"0", float:"left", backgroundColor:"#FFFFFF"}}>
                    <img style={{height:"100%", width:"100%"}} src={this.getImageUrl(property.image_lat, property.image_lng, property.image_heading)} />
                  </div>
                </VisibilitySensor>
              : 
                <div style={{width:"40%", height:"130px", position:"absolute", zIndex:"0", float:"left", backgroundColor:"#FFFFFF"}}>
                  <img style={{height:"100%", width:"100%"}} src={this.getImageUrl(property.image_lat, property.image_lng, property.image_heading)} />
                </div>
              }

              <div style={{width:"40%", height:"130px",position:"absolute",  zIndex:"1", float:"left", backgroundColor:"rgba(0,0,0,0.25)"}}>
                <div style={{marginTop:"10px" ,fontSize:"75px", textAlign:"center", fontWeight:"400", color:"#FFFFFF"}}>{property.retailScore}</div>
              </div>
              <div style={{width:"60%", height:"130px", float:"right"}}>
                <div style={{textAlign:"center", width:"100%", fontSize:"16px", marginTop:"10px", fontWeight:"200"}}>{property.streetAddress}</div>
                <div style={{textAlign:"center", width:"45%", float:"left", fontSize:"14px", fontWeight:"100"}}>{priceString}</div>
                <div style={{textAlign:"center", width:"45%", float:"right", fontSize:"14px", fontWeight:"100"}}>{sqftString}</div>
              </div>
            </div>
    );
  }
}
