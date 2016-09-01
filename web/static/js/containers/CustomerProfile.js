import React from 'react';
import { connect } from "react-redux";

import ContentWrapper from '../components/Base/ContentWrapper';
import { Grid, Row, Modal, Col, Panel, Button, Popover,Pagination,Dropdown, Clearfix, OverlayTrigger, Overlay, FormGroup, ControlLabel, FormControl, InputGroup, Carousel, CarouselItem, DropdownButton, MenuItem } from 'react-bootstrap';

const isBrowser = typeof window !== 'undefined';
// const C3Chart = isBrowser ? require('react-c3') : undefined;
import Chart from '../components/Chart';
import GoogleMap from '../components/GoogleMap';
import SearchBar from '../components/SearchBar';
import Filters from '../components/Filters';
import DesktopFilters from '../components/DesktopFilters';
import MobilePropertyList from '../components/MobilePropertyList';
import TabletPropertyList from '../components/TabletPropertyList';
import DesktopPropertyList from '../components/DesktopPropertyList';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import RetailScoreExplanation from '../components/RetailScoreExplanation';
import DesktopRetailScoreExplanation from '../components/DesktopRetailScoreExplanation';
import TypeWriter from 'react-typewriter';

export class CustomerProfile extends React.Component {

  constructor(props) {
    super(props);

    this.updateBusiness = this.updateBusiness.bind(this);
    this.nextPage = this.nextPage.bind(this);
    this.skip = this.skip.bind(this);

    this.state = {
      text: "Clothing Store.",
      index: 0,
      typing: 1,
      price: "Cheap",
      gender:"Men and Women",
      minAge:"1",
      maxAge:"60+",
      business: "",
      page: 1
    };
  }

  updateBusiness(business) {
    this.state.business = business.target.value;
    this.setState(this.state);
  }

  skip(){
    this.context.mixpanel.track('Skip Tapped');
    this.props.history.push('/targetcustomer/2');
  }

  nextPage(){
    this.context.mixpanel.track('Find Customers Tapped');
    this.props.history.push('/targetcustomer/1');
  }

  componentDidMount(){
    this.context.mixpanel.track('Customer container did mount');
  }

  render() {

    var delays = [{
      at: '.',
      delay: 100
    }];

    var page1Delays = [{
      at: '.',
      delay: 50
    }];

    var page = this.state.page;

    return(
        <div className="container-fluid container-div" style={{width:"100%", height:"100%", margin:"0", padding:"0"}}>
          <Row style={{backgroundColor:"#49A3DC", height:"100%", width:"100%", margin:"0", padding:"0",fontSize:"30px", color:"#FFFFFF", fontWeight:"400px"}}>
            <div style={{textAlign:"center", width:"100%", marginTop:"5px"}}>
              <img className="homepageTopBarImage" src={"https://s3-us-west-2.amazonaws.com/homepage-image-assets/retail_score_logo_white.png"} />
            </div>
            <div style={{height:"-webkit-calc(100% - 80px)", display:"flex", flexDirection:"column", justifyContent:"space-between"}}>
              <div style={{width:"100px", height:"1px"}}/>
              <div style={{width:"90%", marginLeft:"5%", textAlign:"center", fontSize:"8vw"}}>
                Find a property in an area where your <b>customers</b> are already <b>shopping!</b>
              </div>
              <div style={{width:"100%"}}>
                <Button onClick={this.nextPage} style={{width:"90%", marginLeft:"5%", height:"60px", backgroundColor:"#FFFFFF", color:"#49A3DC", fontSize:"25px", fontWeight:"400px"}}><b>Find My Customers</b></Button>
                <Button onClick={this.skip} style={{width:"90%", marginLeft:"5%", height:"60px", marginTop:"10px", backgroundColor:"rgba(0,0,0,0.0)", color:"#FFFFFF", fontSize:"25px", fontWeight:"400px"}}> <b> No Thanks </b></Button>
              </div>
            </div>
          </Row>
        </div>
    );
  }
}


CustomerProfile.contextTypes = {
    mixpanel: React.PropTypes.object.isRequired
};

export default CustomerProfile;
