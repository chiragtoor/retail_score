import React from 'react';
import { connect } from "react-redux";

import ContentWrapper from '../components/Base/ContentWrapper';
import { Grid, Row, Modal, Col, Panel, Button, Popover,Pagination,Dropdown, Clearfix, OverlayTrigger, Overlay, FormGroup, ControlLabel, FormControl, InputGroup, Carousel, CarouselItem, DropdownButton, MenuItem } from 'react-bootstrap';

const isBrowser = typeof window !== 'undefined';

export class CustomerProfile extends React.Component {

  constructor(props) {
    super(props);

    this.nextPage = this.nextPage.bind(this);
  }

  nextPage(){
    this.context.mixpanel.track('Find Customers Tapped');
    this.props.history.push('/targetcustomer/2');
  }

  componentDidMount(){
    this.context.mixpanel.track('Find perfect property container did mount');
  }

  render() {

    return(
        <div className="container-fluid container-div" style={{backgroundColor:"#49A3DC", height:"100%", width:"100%", margin:"0", padding:"0",fontSize:"30px", color:"#FFFFFF", fontWeight:"400px"}}>
          <div style={{height:"100%", display:"flex", flexDirection:"column", justifyContent:"space-between"}}>
            <div style={{textAlign:"center", width:"100%", marginTop:"5px"}}>
              <img className="homepageTopBarImage" src={"https://s3-us-west-2.amazonaws.com/homepage-image-assets/retail_score_logo_white.png"} />
            </div>
            <div style={{width:"90%", marginLeft:"5%", textAlign:"center", fontSize:"8vw"}}>
              Find a property in an area where your <b>customers</b> are already <b>shopping!</b>
            </div>
            <div style={{width:"100%", marginBottom:"5px"}}>
              <Button onClick={this.nextPage} style={{width:"90%", marginLeft:"5%", height:"60px", backgroundColor:"#FFFFFF", color:"#49A3DC", fontSize:"25px", fontWeight:"400px"}}><b>Find My Customers</b></Button>
            </div>
          </div>
        </div>
    );
  }
}


CustomerProfile.contextTypes = {
    mixpanel: React.PropTypes.object.isRequired
};

export default CustomerProfile;
