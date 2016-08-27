import React from 'react';
import { connect } from "react-redux";

import * as Actions from '../actions';

import ContentWrapper from '../components/Base/ContentWrapper';
import { Grid, Row, Modal, Col, Panel, Button, Popover,Pagination, OverlayTrigger, Overlay, FormGroup, ControlLabel, FormControl, InputGroup, Carousel, CarouselItem, DropdownButton, MenuItem } from 'react-bootstrap';

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

const PRICE_MIN = 0;
const PRICE_MAX = 100000;

const SQ_MIN = 0;
const SQ_MAX = 30000;

class SRP extends React.Component {

    constructor(props) {

      super(props);
      this.tileClick = this.tileClick.bind(this);
      this.pinClick = this.pinClick.bind(this);
      this.searchClick = this.searchClick.bind(this);
      this.setCurrentProperty = this.setCurrentProperty.bind(this);
      this.showFilters = this.showFilters.bind(this);
      this.hideFilters = this.hideFilters.bind(this);
      this.hideModals = this.hideModals.bind(this);
      this.saveFilters = this.saveFilters.bind(this);
      this.saveTempFilters = this.saveTempFilters.bind(this);
      this.upgradeTempFilters = this.upgradeTempFilters.bind(this);
      this.showRetailScoreExplanation = this.showRetailScoreExplanation.bind(this);
      this.showDesktopRetailScoreExpalantion = this.showDesktopRetailScoreExpalantion.bind(this);
      this.scrollToFilters = this.scrollToFilters.bind(this);
      this.listDoneResetting = this.listDoneResetting.bind(this);

      var thisCity = this.props.params.city;
      thisCity = thisCity.replace("-", " ");

      //if the city doesnt contain the state it wont match against the cities in the array
      if(!thisCity.includes(',')) {
        thisCity = thisCity + ", CA";
      }

      this.state = {
        currentProperty: null,
        city: thisCity,
        modal: null,
        dimDiv: null,
        priceMin: null,
        priceMax: null,
        sqftMin: null,
        sqftMax: null,
        tempPriceMin: null,
        tempPriceMax: null,
        tempSqftMin: null,
        tempSqftMax: null,
        tempSortIndex: 1,
        tempNeedsUpgrade: false,
        sortIndex: 1,
        resetList: false,
        desktopRetailScoreExplanation: false
      };

    }

    tileClick(property) {
      this.context.mixpanel.track('Property Click', {'type':'tile', 'retailscore':property.retail_score, 'id': property.id});

      this.props.history.push('/properties/' + property.id);
    }

    pinClick(property) {

      if(this.state.currentProperty) {
        if(this.state.currentProperty.id == property.id){
          this.context.mixpanel.track('Property Click', {'type':'selected pin', 'retailscore':property.retail_score, 'id': property.id});
        } else {
          this.context.mixpanel.track('Property Click', {'type':'pin', 'retailscore':property.retail_score, 'id': property.id});
        }
      } else {
        this.context.mixpanel.track('Property Click', {'type':'pin', 'retailscore':property.retail_score, 'id': property.id});
      }

      this.props.history.push('/properties/' + property.id);
    }

    showFilters(){
      this.state.modal= <div style={{height:"350px", width:"100%", backgroundColor:"#FFFFFF", position:"absolute", zIndex:"3", bottom:"0", right:"0"}}>
                            <Filters 
                              saveFilters={this.saveFilters} 
                              priceMin={this.state.priceMin} 
                              priceMax={this.state.priceMax}
                              sqftMax={this.state.sqftMax}
                              sqftMin={this.state.sqftMin}
                              sortIndex={this.state.sortIndex}
                              mixpanel={this.context.mixpanel} />
                           </div>;
      this.state.dimDiv = <div className="dimDiv" onClick={this.hideModals}></div>;
      this.setState(this.state);

      this.context.mixpanel.track('Show Mobile Filters');

    }

    hideFilters(){
      this.state.modal = null;
      this.state.dimDiv = null;
      this.setState(this.state);
    }

    hideModals(){
      this.state.modal = null;
      this.state.dimDiv = null;
      this.state.desktopRetailScoreExplanation = false;
      this.setState(this.state);
    }

    saveFilters(priceMin, priceMax, sqftMin, sqftMax, sortIndex) {
      this.state.priceMin = priceMin;
      this.state.priceMax = priceMax;
      this.state.sqftMin = sqftMin;
      this.state.sqftMax = sqftMax;
      this.state.sortIndex = sortIndex;
      this.state.resetList = true;
      this.setState(this.state);

      var sortString = "Price";

      //track sort change in mixpanel
      switch(this.state.sortIndex){
        case 1:
          sortString = "Price";
          break;
        case 2:
          sortString = "Square Feet";
        break;
        case 3:
          sortString = "RetailScore"
          break;
        default:
          sortString = "Price";
          break;
      }

      this.context.mixpanel.track('Save Mobile Filters', {'sort by':sortString, 'priceMin':this.state.priceMin, 'priceMax': this.state.priceMax, 'sqftMin': this.state.sqftMin, 'sqftMax': this.state.sqftMax});


      this.hideFilters();
    }

    saveTempFilters(priceMin, priceMax, sqftMin, sqftMax, sortIndex) {

      this.state.tempPriceMin = priceMin;
      this.state.tempPriceMax = priceMax;
      this.state.tempSqftMin = sqftMin;
      this.state.tempSqftMax = sqftMax;
      this.state.tempSortIndex = sortIndex;
      this.state.tempNeedsUpgrade = true;

      this.setState(this.state);

    }

    upgradeTempFilters() {

      if(this.state.tempPriceMin) {
        this.state.priceMin = this.state.tempPriceMin;
      }

      if(this.state.tempPriceMax) {
        this.state.priceMax = this.state.tempPriceMax;
      }

      if(this.state.tempSqftMin) {
        this.state.sqftMin = this.state.tempSqftMin;
      }

      if(this.state.tempSqftMax) {
        this.state.sqftMax = this.state.tempSqftMax;
      }

      this.state.sortIndex = this.state.tempSortIndex
      this.state.tempNeedsUpgrade = false;
      this.state.resetList = true;

      var sortString = "Price";

      //track sort change in mixpanel
      switch(this.state.tempSortIndex){
        case 1:
          sortString = "Price";
          break;
        case 2:
          sortString = "Square Feet";
        break;
        case 3:
          sortString = "RetailScore"
          break;
        default:
          sortString = "Price";
          break;
      }

      this.context.mixpanel.track('Save Desktop Filters', {'sort by':sortString, 'priceMin':this.state.tempPriceMin, 'priceMax': this.state.tempPriceMax, 'sqftMin': this.state.tempSqftMin, 'sqftMax': this.state.tempSqftMax});

      this.setState(this.state);

    }

    listDoneResetting(){
      console.log("in list done resetting");
      this.state.resetList = false;
      this.setState(this.state);  
    }

    scrollToFilters() {
      document.getElementById('desktopFilters').scrollIntoView();
    }

    showRetailScoreExplanation() {
      
      //Mobile explanation modals
      this.state.modal = <div className="hidden-lg hidden-md" style={{height:"350px", width:"100%", backgroundColor:"#FFFFFF", position:"absolute", zIndex:"3", bottom:"0", right:"0"}}>
                    <RetailScoreExplanation hide={this.hideFilters} mixpanel={this.context.mixpanel} />
                   </div>;
      this.state.dimDiv = <div className="dimDiv hidden-lg hidden-md" onClick={this.hideFilters}></div>;

      this.setState(this.state);

      this.context.mixpanel.track('Show RetailScore Explanation Modal', {'type':'mobile'});
    }

    showDesktopRetailScoreExpalantion() {
      //Desktop explanation modals
      console.log("show the desktop modal");
      this.state.desktopRetailScoreExplanation = true;

      this.setState(this.state);
      this.context.mixpanel.track('Show RetailScore Explanation Modal', {'type':'desktop'});
    }

    searchClick(city) {
      var cityString = city;
      cityString.replace(' ','-');
      this.state.city  = city;
      this.setState(this.state);
      this.props.history.push('/retail-space-for-lease/' + cityString);

      this.context.mixpanel.track('SRP Search', {'city':city});
    }

    setCurrentProperty(property){

      if(!this.state.currentProperty || this.state.currentProperty.id != property.id) {
        this.state.currentProperty = property;
      }

      this.setState(this.state);
    }

    componentDidMount() {      
      var cityString = this.state.city.split(',')[0];
      this.props.loadProperties(cityString, "CA");
    }

    render() {

      var properties = this.props.properties;

        var filterTransitionOptions = {
          transitionName: "filterFade",
          transitionEnterTimeout: 500,
          transitionLeaveTimeout: 500
        };

        var dimDivTransitionOptions = {
          transitionName: "dimFade",
          transitionEnterTimeout: 500,
          transitionLeaveTimeout: 500
        };

        var filteredProperties = [];

        var minPrice = this.state.priceMin ? this.state.priceMin : PRICE_MIN;
        var maxPrice = this.state.priceMax ? this.state.priceMax : PRICE_MAX;
        var minSqft = this.state.sqftMin ? this.state.sqftMin : SQ_MIN;
        var maxSqft = this.state.sqftMax ? this.state.sqftMax : SQ_MAX;

         for(var i = 0; i < properties.length; i++) {
           var property = properties[i];

          if(!property.rental_rate_min) {
            if(!property.min_sq_feet) {
              filteredProperties.push(property);
            } else if( (property.min_sq_feet <=  maxSqft && property.min_sq_feet >=  minSqft) || (property.max_sq_feet <= maxSqft && property.max_sq_feet >= minSqft) ) {
              filteredProperties.push(property);
            }
          } 
          else if( (property.rental_rate_min <= maxPrice  && property.rental_rate_min >=  minPrice) || (property.rental_rate_max <=  maxPrice && property.rental_rate_max >=  minPrice) ){
            if(!property.min_sq_feet) {
              filteredProperties.push(property);
            } else if( (property.min_sq_feet <=  maxSqft && property.min_sq_feet >=  minSqft) || (property.max_sq_feet <= maxSqft && property.max_sq_feet >= minSqft) ){
              filteredProperties.push(property);
            }
          }
         }

        var sortBy;

        switch (this.state.sortIndex) {
          case 1: sortBy = function compare(a,b) {
                              if (a.rental_rate_min < b.rental_rate_min)
                                return -1;
                              if (a.rental_rate_min > b.rental_rate_min)
                                return 1;
                              return 0;
                            }
            break;
          case 2: sortBy = function compare(a,b) {
                              if (a.max_sq_feet < b.max_sq_feet)
                                return 1;
                              if (a.max_sq_feet > b.max_sq_feet)
                                return -1;
                              return 0;
                            }
            break;
          case 3: sortBy = function compare(a,b) {
                              if (a.retail_score < b.retail_score)
                                return 1;
                              if (a.retail_score > b.retail_score)
                                return -1;
                              return 0;
                            }
            break;
          default: sortBy = function compare(a,b) {
                              if (a.rental_rate_min < b.rental_rate_min)
                                return -1;
                              if (a.rental_rate_min > b.rental_rate_min)
                                return 1;
                              return 0;
                            }
            break
        }

        if(this.state.sortIndex == 1) {
          var nonNullProps = filteredProperties.filter(function (a) {
                      return (a.rental_rate_min != null);
                 });

          var nullProps = filteredProperties.filter(function (a) {
                      return (a.rental_rate_min == null);
                 });

          nonNullProps.sort(sortBy);
          filteredProperties = nonNullProps.concat(nullProps);

        } else {
          filteredProperties.sort(sortBy);
        }

        var propertyList;

        if(isBrowser) {
          if(window.innerWidth < 700) {
            propertyList = <MobilePropertyList 
                          properties={filteredProperties} 
                          tileClick={this.tileClick} 
                          visibilityChanged={this.setCurrentProperty}
                          reset={this.state.resetList}
                          resetDone={this.listDoneResetting}
                          mixpanel={this.context.mixpanel} />;
          } else if (window.innerWidth < 800) {
            propertyList = <TabletPropertyList 
                          properties={filteredProperties} 
                          tileClick={this.tileClick} 
                          visibilityChanged={this.setCurrentProperty}
                          reset={this.state.resetList}
                          resetDone={this.listDoneResetting}
                          mixpanel={this.context.mixpanel} />;
          }
        }


        var saveFilterColor = "#49A3DC"
        var saveFilterBackground = "#FFFFFF";

        const popoverClick = (
              <Popover id="popover-trigger-click">
                <strong>{"What's RetailScore?"}</strong>
              </Popover>
            );

        if(this.state.tempNeedsUpgrade) {
          saveFilterColor = "#FFFFFF";
          saveFilterBackground = "#49A3DC";
        }


        return (
            <div style={{height:"100%"}}>

                <Row className="srpDesktopHeight">

                    <Col sm={12} xs={12} className="hidden-md hidden-lg" style={{height:"50px", width:"100%"}}>
                      <SearchBar 
                        searchClick={this.searchClick} 
                        city={this.state.city} />
                    </Col>

                    <Col md={12} lg={12} className="hidden-sm hidden-xs" style={{height:"50px", color:"#FFFFFF", width:"100%", backgroundColor:"#49A3DC"}}>
                      <img style={{height:"46px", paddingTop:"2px", paddingLeft:"15px"}} src="https://s3-us-west-2.amazonaws.com/homepage-image-assets/retail_score_logo_white.png" />
                    </Col>

                    <Col  md={5} lg={4} className="desktopListings hidden-sm hidden-xs">
                      <Row style={{marginLeft:"0px", borderRight:"solid thin #DCE0E0"}}>
                          <div id='desktopFilters' style={{backgroundColor:"#1abc9c", color:"#FFFFFF", height:"250px", width:"100%"}}>
                           <DesktopFilters 
                                saveFilters={this.saveTempFilters} 
                                priceMin={this.state.tempPriceMin} 
                                priceMax={this.state.tempPriceMax}
                                sqftMax={this.state.tempSqftMax}
                                sqftMin={this.state.tempSqftMin}
                                sortIndex={this.state.sortIndex}
                                searchClick={this.searchClick} 
                                city={this.state.city}
                                mixpanel={this.context.mixpanel} />
                            
                          </div>

                          <div id='desktopFilterBar' style={{backgroundColor:"#FFFFFF",width:"100%", height:"50px", color:"#FFFFFF", borderTop:"solid thin #DCE0E0"}}>
                            <div style={{height:"100%", padding:"15px",float:"left", color:"#95a5a6", width:"50%", fontSize:"16px"}}>{filteredProperties.length} properties for lease</div>
                            <div style={{height:"100%",float:"right", width:"50%", fontSize:"16px"}}>
                              <Button onClick={this.upgradeTempFilters} style={{backgroundColor:(saveFilterBackground), marginTop:"5px", marginRight:"15px", float:"right", color:(saveFilterColor), border:"solid thin #49A3DC",fontSize:"16px", fontWeight:"400"}}>Save</Button>
                            </div>
                          </div>

                          <div style={{backgroundColor:"#f1c40f", width:"100%"}}>
                            <DesktopPropertyList 
                              properties={filteredProperties} 
                              tileClick={this.tileClick} 
                              scrollToTop={this.scrollToFilters}
                              reset={this.state.resetList}
                              resetDone={this.listDoneResetting}
                              mixpanel={this.context.mixpanel} />
                          </div>
                      </Row>
                    </Col>

                    <Col md={7} lg={8} style={{marginRight:"0px", paddingRight:"0px"}} className="desktopMap hidden-xs hidden-sm">
                      <Button onClick={this.showDesktopRetailScoreExpalantion} style={{fontSize:"14px", backgroundColor:"#FFFFFF", color:"#7f8c8d", border:"solid thin #7f8c8d", position:"fixed", top:"65px", right:"5px", zIndex:"1"}}>What is RetailScore?</Button>

                      <div style={{width:"100%"}} className="fullHeight hidden-sm hidden-xs">
                        <GoogleMap 
                          id={"desktop"} 
                          properties={filteredProperties} 
                          pinClick={this.pinClick} 
                          currentPropertyMarker={this.state.currentProperty}
                          city={this.state.city}/>
                      </div>
                    </Col>

                    <Col xs={12} sm={12} className="smallGoogleMap hidden-md hidden-lg">
                      
                      <Button onClick={this.showRetailScoreExplanation} style={{fontSize:"20px", backgroundColor:"#7f8c8d", color:"#FFFFFF",borderRadius:"20px", position:"fixed", top:"65px", right:"5px", zIndex:"1"}}><em className="fa fa-question-circle"></em></Button>

                      <div style={{height:"100%"}} className="hidden-md hidden-lg">
                        <GoogleMap 
                          id={"mobile"} 
                          properties={filteredProperties} 
                          pinClick={this.pinClick} 
                          currentPropertyMarker={this.state.currentProperty}
                          city={this.state.city}/>
                      </div>
                    </Col>

                    <Col className="hidden-md hidden-lg" sm={12} xs={12}>

                      <div style={{width:"100%", height:"50px"}}>
                        <div style={{height:"100%", padding:"15px",float:"left", color:"#95a5a6", fontSize:"16px"}}>{filteredProperties.length} properties for lease</div>
                        <div style={{height:"100%",padding:"5px", float:"right"}}>
                            <Button onClick={this.showFilters} style={{backgroundColor:"#FFFFFF",color:"#49A3DC", border:"#49A3DC",fontSize:"16px", fontWeight:"400"}}>Filters</Button>
                        </div>
                      </div>

                      <div style={{width: "100%", height:"150px"}}>
                        {propertyList}
                      </div>

                    </Col>

                    <Col className="hidden-md hidden-lg">
                      <ReactCSSTransitionGroup {...dimDivTransitionOptions} >
                        {this.state.dimDiv}
                      </ReactCSSTransitionGroup>
                      <ReactCSSTransitionGroup {...filterTransitionOptions} >
                        {this.state.modal}
                      </ReactCSSTransitionGroup>
                    </Col>

                    <Modal show={this.state.desktopRetailScoreExplanation}>
                      <Modal.Body style={{height:"300px"}}>
                        <DesktopRetailScoreExplanation hide={this.hideModals} mixpanel={this.context.mixpanel}/>
                      </Modal.Body>
                    </Modal>
                </Row>
            </div>
            );
    }

}

SRP.contextTypes = {
    mixpanel: React.PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
  return {
    server_side: state.server_side,
    properties: state.properties
  };
};


export default connect(mapStateToProps, Actions)(SRP);

