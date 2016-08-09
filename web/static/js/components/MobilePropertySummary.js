import {default as React, Component} from "react";
import {Glyphicon,Modal, Button, FormGroup, ControlLabel, FormControl, InputGroup, Panel, Nav, NavItem} from "react-bootstrap";

const isBrowser = typeof window !== 'undefined';


export default class MobilePropertySummary extends Component {

  constructor(props) {
    super(props);

    this.getImageUrl = this.getImageUrl.bind(this);
  }

  getImageUrl(lat, lng, heading) {
   var width = isBrowser ? window.innerWidth : 640;
    return `https://maps.googleapis.com/maps/api/streetview?size=${width}x250&location=${lat},${lng}&heading=${heading}&key=AIzaSyASv9f24GcF78YIKRsX3uCRkj58JzZ8NaA`;
  }

  render () {

    var styledPrice;
    var styledSqft;

    if(this.props.property) {
      styledSqft = this.props.property.squareFeet.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      styledPrice = "$" + this.props.property.price.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    return (
      <div style={{height:"100%", width:"100%"}}>
        <center style={{fontSize:"24px", textAlign:"center", marginTop:"5px"}}>
          {this.props.property ? this.props.property.streetAddress : null}
          <span style={{fontSize:"18px"}} >{ this.props.property? ", " + this.props.property.city + ", " + this.props.property.state : null}</span> 
        </center>
        <img className="propertyImageSize" src={this.getImageUrl(this.props.property.image_lat, this.props.property.image_lng, this.props.property.image_heading)} />
        <div className="text-center p-lg mb-sm" style={{backgroundColor:"#ecf0f1"}}>
          <div className="row row-table">
              <div className="col-xs-6 br">
                  <h3 className="m0">{styledSqft}</h3>
                  <p className="m0">Square Feet</p>
              </div>
              <div className="col-xs-6">
                  <h3 className="m0">{styledPrice}</h3>
                  <p className="m0">Monthly Rate</p>
              </div>
          </div>
        </div>
      </div>
    );

  }
}