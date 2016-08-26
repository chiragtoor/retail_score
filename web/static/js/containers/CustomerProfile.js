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
    this.stopAnimating = this.stopAnimating.bind(this);
    this.searchClick = this.searchClick.bind(this);
    this.skipClick = this.skipClick.bind(this);
    this.nextPage = this.nextPage.bind(this);

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

  nextPage(){
    this.state.page = 2;
    this.setState(this.state);

    this.context.mixpanel.track('Next Page Clicked');
  }

  searchClick(){
    if(this.state.business == "") {
      alert("Don't forget to let us know what type of business you're starting");
      return;
    }
    this.context.mixpanel.track('Customer Profile Search Clicked', {'business':this.state.business, 'price':this.state.price, 'minAge': this.state.minAge, 'maxAge':this.state.maxAge});
    this.props.history.push('/retail-space-for-lease/Los%20Angeles%20,%20CA');
  }

  skipClick(){
    this.context.mixpanel.track('Skip Clicked', {'page': this.state.page});
    this.props.history.push('/retail-space-for-lease/Los%20Angeles%20,%20CA');
  }

  stopAnimating(){
    this.refs.typer.reset();
    this.state.index = 2;
    this.state.text = "";
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

    var page = this.state.page;

    return(
        <div className="container-fluid container-div" style={{width:"100%", height:"100%", margin:"0", padding:"0"}}>
          { page == 1 ? 
            <Row style={{backgroundColor:"#49A3DC", height:"100%", width:"100%", margin:"0", padding:"0",fontSize:"30px", color:"#FFFFFF", fontWeight:"400px"}}>
              <div style={{textAlign:"center", width:"100%", marginTop:"5px"}}>
                <img className="homepageTopBarImage" src={"https://s3-us-west-2.amazonaws.com/homepage-image-assets/retail_score_logo_white.png"} />
              </div>
              <TypeWriter typing={1} fixed={true} >
                <div style={{width:"90%", marginLeft:"5%", marginTop:"50px", textAlign:"center", fontSize:"35px"}}>
                  {"Tell us who your customer is and we'll find the perfect location for your business!"}
                </div>
              </TypeWriter>
              <div style={{position:"fixed", bottom:"15px", width:"100%"}}>
                <Button onClick={this.nextPage} style={{width:"90%", marginLeft:"5%", height:"60px", backgroundColor:"#FFFFFF", color:"#49A3DC", fontSize:"25px", fontWeight:"400px"}}>Find perfect location</Button>
                <Button onClick={this.skipClick} style={{width:"90%",  marginLeft:"5%", marginTop:"10px", height:"60px", backgroundColor:"#49A3DC", color:"#FFFFFF",fontSize:"25px"}}>{"Skip"}</Button>
              </div>
            </Row>
            : 
            <Row style={{backgroundColor:"#49A3DC", height:"100%", width:"100%", margin:"0", padding:"0",fontSize:"30px", color:"#FFFFFF", fontWeight:"400px"}}>
            <div style={{textAlign:"center", width:"100%", marginTop:"5px"}}>
              <img className="homepageTopBarImage" src={"https://s3-us-west-2.amazonaws.com/homepage-image-assets/retail_score_logo_white.png"} />
            </div>

            <div style={{textAlign:"center", marginTop:"40px"}}>
              {"I'm opening a "}
              <Dropdown id="updatePrice" onSelect={e => this.updatePrice(e)}>
                <Dropdown.Toggle style={{fontSize:"30px", paddingBottom:"10px", border:"solid thin #49A3DC", backgroundColor:"#49A3DC", color:"#FFFFFF"}}>
                  {this.state.price}
                </Dropdown.Toggle>
                <Dropdown.Menu style={{height:"auto", maxHeight:"100px", overflowX:"hidden"}}>
                  {prices.map(function(price, index){
                     return <MenuItem key={index} eventKey={index}>{price}</MenuItem>
                    })}
                </Dropdown.Menu>
              </Dropdown>
            </div>

            <div style={{height:"50px", marginTop:"20px", position:"relative"}}>
              <TypeWriter ref="typer" delayMap={delays} typing={this.state.typing} fixed={true} onTypingEnd={this.typingEnd}>
                 <div style={{width:"70%", position:"absolute", zIndex:"0", marginLeft:"15%"}}>
                  {this.state.text}
                 </div>
              </TypeWriter>

              <FormControl 
                type="text" 
                onClick={this.stopAnimating}
                onChange={(e) => this.updateBusiness(e)}
                value={this.state.business}
                style={{backgroundColor:"rgba(0,0,0,0.5)",  fontSize:"30px", height:"50px", fontWeight:"400px", position:"absolute", zIndex:"1", border:"solid thin #49A3DC", width:"70%", marginLeft:"15%", borderBottom:"solid thin #FFFFFF", color:"#FFFFFF"}}/>
            </div>

            <div style={{textAlign:"center", fontSize:"30px", fontWeight:"800px", marginTop:"30px", color:"#FFFFFF"}}>
              {" for "}
              <Dropdown id="updateGender" onSelect={e => this.updateGender(e)}>
                <Dropdown.Toggle style={{fontSize:"30px",paddingBottom:"10px", border:"solid thin #49A3DC", backgroundColor:"#49A3DC", color:"#FFFFFF"}}>
                  {this.state.gender}
                </Dropdown.Toggle>
                <Dropdown.Menu style={{height:"auto", maxHeight:"100px", overflowX:"hidden"}}>
                  {genders.map(function(price, index){
                     return <MenuItem key={index} eventKey={index}>{price}</MenuItem>
                    })}
                </Dropdown.Menu>
              </Dropdown>

              <br/>

              {" between the ages of "}

              <br/>

              <Dropdown id="updateMinAge"  onSelect={e => this.updateMinAge(e)}>
                <Dropdown.Toggle style={{fontSize:"30px",paddingBottom:"10px", border:"solid thin #49A3DC", backgroundColor:"#49A3DC", color:"#FFFFFF"}}>
                  {this.state.minAge}
                </Dropdown.Toggle>
                <Dropdown.Menu style={{height:"auto", maxHeight:"100px", overflowX:"hidden"}}>
                  {ages.map(function(age, index){
                    return <MenuItem key={index} eventKey={index}>{age}</MenuItem>;
                  })}
                </Dropdown.Menu>
              </Dropdown>

              {" and "}

              <Dropdown id="updateMaxAge" onSelect={e => this.updateMaxAge(e)}>
                <Dropdown.Toggle style={{fontSize:"30px",paddingBottom:"10px", border:"solid thin #49A3DC", backgroundColor:"#49A3DC", color:"#FFFFFF"}}>
                  {this.state.maxAge}
                </Dropdown.Toggle>
                <Dropdown.Menu style={{height:"auto", maxHeight:"100px", overflowX:"hidden"}}>
                  {ages.map(function(age, index){
                    return <MenuItem key={index} eventKey={index}>{age}</MenuItem>;
                  })}
                </Dropdown.Menu>
              </Dropdown>

              <br/>
            </div>
            
            <div style={{position:"fixed", bottom:"15px", width:"100%"}}>
              <Button onClick={this.searchClick} style={{width:"45%", float:"right", marginRight:"2.5%", height:"60px", backgroundColor:"#FFFFFF", color:"#49A3DC", fontSize:"22px"}}>Search</Button>
              <Button onClick={this.skipClick} style={{width:"45%", float:"left", marginLeft:"2.5%", height:"60px", backgroundColor:"#49A3DC", color:"#FFFFFF",fontSize:"22px"}}>{"Skip"}</Button>
            </div>
          </Row>}
        </div>
    );
  }
}


CustomerProfile.contextTypes = {
    mixpanel: React.PropTypes.object.isRequired
};

export default CustomerProfile;
