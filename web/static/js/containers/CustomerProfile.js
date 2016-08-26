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

const prices = ["Cheap", "Affordable", "Expensive", "High End"];
const genders = ["Men and Women", "Men Only", "Women Only"];
const ages = ["1","10", "20", "30", "40", "50", "60+"];

export class CustomerProfile extends React.Component {

  constructor(props) {
    super(props);

    this.typingEnd = this.typingEnd.bind(this);
    this.updatePrice = this.updatePrice.bind(this);
    this.updateGender = this.updateGender.bind(this);
    this.updateMinAge = this.updateMinAge.bind(this);
    this.updateMaxAge = this.updateMaxAge.bind(this);
    this.updateBusiness = this.updateBusiness.bind(this);

    this.state = {
      text: "Clothing Store.",
      index: 0,
      typing: 1,
      price: "Cheap",
      gender:"Men and Women",
      minAge:"1",
      maxAge:"60+",
      business: ""
    };
  }

  updateBusiness(business) {
    this.state.business = business.target.value;
    this.refs.typer.reset();
    this.state.index = 2;
    this.setState(this.state);
  }

  updatePrice(index){
    this.state.price = prices[index];
    this.setState(this.state);
  }

  updateGender(index){
    this.state.gender = genders[index];
    this.setState(this.state);
  }

  updateMinAge(index){
    this.state.minAge = ages[index];
    this.setState(this.state);
  }

  updateMaxAge(index){
    this.state.maxAge = ages[index];
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

  render() {

    var delays = [{
      at: '.',
      delay: 100
    }];

    return(
        <div className="container-fluid container-div" style={{width:"100%", height:"100%", margin:"0", padding:"0"}}>
          <Row style={{backgroundColor:"#49A3DC", height:"100%", width:"100%", margin:"0", padding:"0"}}>
            <div style={{textAlign:"center", width:"100%", marginTop:"5px"}}>
              <img className="homepageTopBarImage" src={"https://s3-us-west-2.amazonaws.com/homepage-image-assets/retail_score_logo_white.png"} />
            </div>

            <div style={{textAlign:"center", marginTop:"20px", color:"#FFFFFF", fontSize:"25px", fontWeight:"600px"}}>
              {"I'm opening a "}

              <Dropdown onSelect={e => this.updatePrice(e)}>
                <Dropdown.Toggle style={{fontSize:"25px", border:"solid thin #49A3DC", backgroundColor:"#49A3DC", padding:"10px", color:"#FFFFFF"}}>
                  {this.state.price}
                </Dropdown.Toggle>
                <Dropdown.Menu style={{height:"auto", maxHeight:"100px", overflowX:"hidden"}}>
                  {prices.map(function(price, index){
                     return <MenuItem eventKey={index}>{price}</MenuItem>
                    })}
                </Dropdown.Menu>
              </Dropdown>
            </div>

            <div style={{height:"50px", marginTop:"10px", position:"relative"}}>
              <TypeWriter ref="typer" delayMap={delays} typing={this.state.typing} fixed={true} onTypingEnd={this.typingEnd}>
                 <div style={{width:"70%", position:"absolute", zIndex:"0", marginLeft:"15%",fontSize:"25px", color:"#FFFFFF", fontWeight:"400px"}}>
                  {this.state.text}
                 </div>
              </TypeWriter>

              <FormControl 
                type="text" 
                onChange={(e) => this.updateBusiness(e)}
                value={this.state.business}
                style={{backgroundColor:"rgba(0,0,0,0)", fontSize:"25px", fontWeight:"400px", position:"absolute", zIndex:"1", border:"solid thin #49A3DC", width:"70%", marginLeft:"15%", borderBottom:"solid thin #FFFFFF", color:"#FFFFFF"}}/>
              
            </div>

            <div style={{textAlign:"center", fontSize:"25px", fontWeight:"800px", marginTop:"10px", color:"#FFFFFF"}}>
              {" for "}
              <Dropdown onSelect={e => this.updateGender(e)}>
                <Dropdown.Toggle style={{fontSize:"25px", border:"solid thin #49A3DC", backgroundColor:"#49A3DC", padding:"10px", color:"#FFFFFF"}}>
                  {this.state.gender}
                </Dropdown.Toggle>
                <Dropdown.Menu style={{height:"auto", maxHeight:"100px", overflowX:"hidden"}}>
                  {genders.map(function(price, index){
                     return <MenuItem eventKey={index}>{price}</MenuItem>
                    })}
                </Dropdown.Menu>
              </Dropdown>

              <br/>

              {" between the ages of "}

              <br/>

              <Dropdown  onSelect={e => this.updateMinAge(e)}>
                <Dropdown.Toggle style={{fontSize:"25px", border:"solid thin #49A3DC", backgroundColor:"#49A3DC", padding:"10px", color:"#FFFFFF"}}>
                  {this.state.minAge}
                </Dropdown.Toggle>
                <Dropdown.Menu style={{height:"auto", maxHeight:"100px", overflowX:"hidden"}}>
                  {ages.map(function(age, index){
                    return <MenuItem eventKey={index}>{age}</MenuItem>;
                  })}
                </Dropdown.Menu>
              </Dropdown>

              {" and "}

              <Dropdown onSelect={e => this.updateMaxAge(e)}>
                <Dropdown.Toggle style={{fontSize:"25px", border:"solid thin #49A3DC", backgroundColor:"#49A3DC", padding:"10px", color:"#FFFFFF"}}>
                  {this.state.maxAge}
                </Dropdown.Toggle>
                <Dropdown.Menu style={{height:"auto", maxHeight:"100px", overflowX:"hidden"}}>
                  {ages.map(function(age, index){
                    return <MenuItem eventKey={index}>{age}</MenuItem>;
                  })}
                </Dropdown.Menu>
              </Dropdown>

              <br/>
            </div>
            <br/>
            <Button style={{width:"90%", marginLeft:"5%", height:"40px", backgroundColor:"#FFFFFF", color:"#49A3DC", fontSize:"18px"}}>Find my perfect property</Button>
            <Button style={{width:"90%", marginLeft:"5%", height:"40px", backgroundColor:"#FFFFFF", color:"#49A3DC", marginTop:"10px", fontSize:"18px"}}>{"I don't know my customer"}</Button>
          </Row>
        </div>
    );
  }
}


CustomerProfile.contextTypes = {
    mixpanel: React.PropTypes.object.isRequired
};

export default CustomerProfile;
