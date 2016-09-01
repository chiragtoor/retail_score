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


export class TargetCustomerSearch extends React.Component {

  constructor(props) {
    super(props);

    this.typingEnd = this.typingEnd.bind(this);
    this.updateBusiness = this.updateBusiness.bind(this);
    this.updateCustomer = this.updateCustomer.bind(this);
    this.stopAnimating = this.stopAnimating.bind(this);
    this.searchClick = this.searchClick.bind(this);

    this.state = {
      text: "Clothing Store.",
      index: 0,
      typing: 1,
      business: "",
      customer: ""
    };
  }

  updateBusiness(business) {
    this.state.business = business.target.value;
    this.setState(this.state);
  }

  updateCustomer(customer) {
    this.state.customer = customer.target.value;
    this.setState(this.state);
  }

  searchClick(){
    if(this.state.business == "") {
      alert("Don't forget to let us know what type of business you're starting");
      return;
    } else if(this.state.customer == "") {
      alert("Don't forget to let us know who your target customer is");
    }

    this.context.mixpanel.track('Target Customer Search', {'business':this.state.business, 'customer':this.state.customer});
    this.props.history.push('/retail-space-for-lease/Los%20Angeles,%20CA');
  }

  stopAnimating(){
    this.refs.typer.reset();
    this.state.index = 2;
    this.state.text = "";
    this.setState(this.state);
  }

  typingEnd() {

    if(this.state.typing == 1 ) {
      this.state.typing = -1;
    } else {
      switch(this.state.index) {
        case 0:
          this.state.index = 1;
          this.state.text = "Skateboard Shop.";
          this.state.typing = 1;
          break;
        case 1:
          this.state.index = 2;
          this.state.text = "Mexican Restaurant.";
          this.state.typing = 1;
          break;
        default: 
          this.state.text = "";
          break;
      }
    }

    this.setState(this.state);
  }

  componentDidMount(){
    this.context.mixpanel.track('TargetCustomerSearch container did mount');
  }

  render() {

    var delays = [{
      at: '.',
      delay: 100
    }];

    return(
        <div className="container-fluid container-div" style={{width:"100%", height:"100%", margin:"0", padding:"0"}}>
          <Row style={{backgroundColor:"#49A3DC", height:"100%", width:"100%", margin:"0", padding:"0",fontSize:"30px", color:"#FFFFFF", fontWeight:"400px"}}>
            
            <div style={{textAlign:"center", width:"100%", marginTop:"5px"}}>
              <img className="homepageTopBarImage" src={"https://s3-us-west-2.amazonaws.com/homepage-image-assets/retail_score_logo_white.png"} />
            </div>
            
            <br/>

            <div style={{marginLeft:"5%", width:"90%", textAlign:"center"}}>
              What type of business are you starting?
            </div>

            <div style={{height:"50px", marginTop:"20px", width:"100%", position:"relative", textAlign:"center"}}>
              <TypeWriter ref="typer" delayMap={delays} typing={this.state.typing} fixed={true} onTypingEnd={this.typingEnd}>
                 <div style={{width:"70%", position:"absolute", zIndex:"0", fontSize:"30px", marginLeft:"15%"}}>
                  {this.state.text}
                 </div>
              </TypeWriter>

              <FormControl 
                type="text" 
                onClick={this.stopAnimating}
                onChange={(e) => this.updateBusiness(e)}
                value={this.state.business}
                style={{backgroundColor:"rgba(0,0,0,0.0)",  fontSize:"30px", height:"50px", fontWeight:"400px", position:"absolute", zIndex:"1", border:"solid thin #49A3DC", width:"90%", marginLeft:"5%", borderBottom:"solid thin #FFFFFF", color:"#FFFFFF"}}/>
            </div>

            <div style={{textAlign:"center", fontSize:"30px", fontWeight:"800px", marginTop:"30px",width:"100%", textAlign:"center"}}>
              <br/>
              {" Describe your target customer: "}
              <br/>

             <FormControl 
              componentClass="textarea"
              onChange={(e) => this.updateCustomer(e)}
              value={this.state.customer}
              style={{backgroundColor:"#FFFFFF",  fontSize:"20px", height:"80px", fontWeight:"400px", border:"solid thin #49A3DC", width:"90%", marginLeft:"5%", borderBottom:"solid thin #FFFFFF"}}/>
            </div>
            
            <div style={{position:"fixed", bottom:"15px", width:"100%", textAlign:"center"}}>
              <Button onClick={this.searchClick} style={{width:"80%",height:"60px", backgroundColor:"#FFFFFF", color:"#49A3DC", fontSize:"22px"}}>Search</Button>
            </div>

          </Row>
        </div>
    );
  }
}


TargetCustomerSearch.contextTypes = {
    mixpanel: React.PropTypes.object.isRequired
};

export default TargetCustomerSearch;
