import {default as React, Component} from "react";
import {Glyphicon,Modal, Button, FormGroup, ControlLabel, FormControl, InputGroup, Panel, Nav, NavItem, Row, Col} from "react-bootstrap";
import DesktopSpacesPanels from './DesktopSpacesPanels';
import DesktopRetailScorePanel from './DesktopRetailScorePanel';
import DesktopContactPanel from '../components/DesktopContactPanel';


const isBrowser = typeof window !== 'undefined';


export default class DesktopPropertySummary extends Component {

  constructor(props) {
    super(props);

    this.getImageUrl = this.getImageUrl.bind(this);
  }

  getImageUrl(lat, lng, heading) {
   var width = isBrowser ? window.innerWidth : 640;
  var height = 450;

    if(width > 770) {
      width = 640;
    } else if (width > 640) {
      height = 350;
    } else {
      height = 300;
    }

    return `https://maps.googleapis.com/maps/api/streetview?size=640x${height}&location=${lat},${lng}&heading=${heading}&key=AIzaSyASv9f24GcF78YIKRsX3uCRkj58JzZ8NaA`;
   
  }

  render () {

    var styledPrice;
    var styledSqft;


    if(this.props.property.min_sq_feet) {

      if(this.props.property.min_sq_feet == this.props.property.max_sq_feet) {
        styledSqft = this.props.property.min_sq_feet.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " Square Feet";
      } else {
        styledSqft = this.props.property.min_sq_feet.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " - " + this.props.property.max_sq_feet.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " Square Feet";
      }

    }

    if(this.props.property.rental_rate_min) {

      if(this.props.property.rental_rate_min == this.props.property.rental_rate_max) {
        styledPrice = "$" + this.props.property.rental_rate_min.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " Monthly Rent";
      } else {
        styledPrice = "$" + this.props.property.rental_rate_min.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " - " + "$" + this.props.property.rental_rate_max.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " Monthly Rent";
      }

    }

    var showSpaces = this.props.property.spaces && (this.props.property.spaces.length > 1);

    return (

      <div style={{height:"100%", width:"100%", border:"solid thin #DCE0E0", borderRadius:"2px"}}>
        <Row style={{ padding:"0", margin:"0"}}>
          <Col lg={3} md={3} style={{backgroundColor:"#FFFFFF", height:"500px"}}>
            {this.props.property.agents ? <DesktopContactPanel contactFailed={this.props.contactFailed} submitContact={this.props.submitContact} agent={this.props.property.agents[0]} propertyId={this.props.property.id} mixpanel={this.props.mixpanel} /> : null}
          </Col>
          <Col lg={9} md={9} style={{backgroundColor:"#FFFFFF",textAlign:"center", padding:"0", margin:"0"}}>
            <img style={{width:"100%", height:"400px"}} src={this.getImageUrl(this.props.property.image_lat, this.props.property.image_lng, this.props.property.image_heading)} />
            
            <Row style={{ padding:"0", margin:"0"}}>
              
              <Col xs={6} className="text-center" style={{backgroundColor:"#FFFFFF"}}>
                <div style={{fontSize:"24px", textAlign:"left", marginTop:"5px", marginLeft:"5px"}}>
                  {this.props.property ? this.props.property.street_address : null}
                  <span style={{fontSize:"18px"}} >{ this.props.property? ", " + this.props.property.city + ", " + this.props.property.state : null}</span> 
                  <h4 className="m0">{styledSqft}</h4>
                  <h4 className="m0">{styledPrice}</h4>
                </div>
                { showSpaces ? <DesktopSpacesPanels spaces={this.props.property.spaces} /> : null}
              </Col>

              <Col xs={6} className="text-center" style={{backgroundColor:"#FFFFFF", marginTop:"5px"}}>
               {this.props.property ? <DesktopRetailScorePanel showModal={this.showRetailScoreExpalanation} property={this.props.property} /> : null}
              </Col>

            </Row>

          </Col>

        </Row>
      </div>
    );

  }
}