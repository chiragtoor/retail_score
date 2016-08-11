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

    var spacesDiv;

    if(this.props.property.min_sq_feet) {

      if(this.props.property.min_sq_feet == this.props.property.max_sq_feet) {
        styledSqft = this.props.property.min_sq_feet.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      } else {
        styledSqft = this.props.property.min_sq_feet.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " - " + this.props.property.max_sq_feet.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",") ;
      }

    }

    if(this.props.property.rental_rate_min) {

      if(this.props.property.rental_rate_min == this.props.property.rental_rate_max) {
        styledPrice = "$" + this.props.property.rental_rate_min.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      } else {
        styledPrice = "$" + this.props.property.rental_rate_min.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " - " + "$" + this.props.property.rental_rate_max.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      }

    }

    if(this.props.property.spaces && this.props.property.spaces.length > 1) {
      var spaces = this.props.property.spaces;

      spacesDiv = <div className="panel-body">
                    <div className="row">
                       <div className="col-lg-8">
                            <p>
                              {spaces.map((space, index) => {
                               return <div>
                                  <h5>{space.name}</h5>
                                  <p>Square Feet: {space.sq_feet}</p>
                                  <p>Monthly Rent: {space.monthly_rate}</p>
                                  <p>Lease Type: {space.lease_type}</p>
                               </div>;
                              })}
                            </p>
                       </div>
                    </div>
                 </div>;
    }

    return (
      <div style={{height:"100%", width:"100%"}}>
        <img className="propertyImageSize" src={this.getImageUrl(this.props.property.image_lat, this.props.property.image_lng, this.props.property.image_heading)} />
        <center style={{fontSize:"24px", textAlign:"center", marginTop:"5px", backgroundColor:"#ecf0f1"}}>
          {this.props.property ? this.props.property.street_address : null}
          <span style={{fontSize:"18px"}} >{ this.props.property? ", " + this.props.property.city + ", " + this.props.property.state : null}</span> 
        </center>
        <div className="text-center p-lg mb-sm" style={{backgroundColor:"#ecf0f1"}}>
          <div className="row row-table">
              <div className="col-xs-6 br">
                  <h3 className="m0">{styledSqft}</h3>
                  <p className="m0">Square Feet</p>
              </div>
              <div className="col-xs-6">
                  <h3 className="m0">{styledPrice}</h3>
                  <p className="m0">Monthly Rent</p>
              </div>
          </div>
        </div>
      </div>
    );

  }
}