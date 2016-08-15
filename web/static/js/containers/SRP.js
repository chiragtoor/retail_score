import React from 'react';
import { connect } from "react-redux";

import * as Actions from '../actions';

import ContentWrapper from '../components/Base/ContentWrapper';
import { Grid, Row, Col, Panel, Button, FormGroup, ControlLabel, FormControl, InputGroup, Carousel, CarouselItem, DropdownButton, MenuItem } from 'react-bootstrap';

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

const PRICE_MIN = 0;
const PRICE_MAX = 100000;

const SQ_MIN = 0;
const SQ_MAX = 30000;

var properties = [
  {
      streetAddress: "13900 Francisquito",
      city: "Baldwin Park",
      state: "CA",
      zipCode: "91706",
      retailScore: "95",
      squareFeet: 764,
      price: 1495.00156667,
      lat: 34.0674545,
      lng: -117.9731211,
      image_lat: 34.0676669,
      image_lng: -117.9729022,
      image_heading: 220.488380302844,
      id: 48
  }
];

class SRP extends React.Component {

    constructor(props) {

      super(props);
      this.tileClick = this.tileClick.bind(this);
      this.searchClick = this.searchClick.bind(this);
      this.setCurrentProperty = this.setCurrentProperty.bind(this);
      this.showFilters = this.showFilters.bind(this);
      this.hideFilters = this.hideFilters.bind(this);
      this.saveFilters = this.saveFilters.bind(this);
      this.showRetailScoreExplanation = this.showRetailScoreExplanation.bind(this);

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
        priceMin: PRICE_MIN,
        priceMax: PRICE_MAX,
        sqftMin: SQ_MIN,
        sqftMax: SQ_MAX,
        sortIndex: 1
      };

    }

    tileClick(propertyId) {
      this.props.history.push('/properties/' + propertyId);
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
                              sortChanged={this.sortChanged} />
                           </div>;
      this.state.dimDiv = <div className="dimDiv" onClick={this.hideFilters}></div>;
      this.setState(this.state);
    }

    hideFilters(){
      this.state.modal = null;
      this.state.dimDiv = null;
      this.setState(this.state);
    }

    saveFilters(priceMin, priceMax, sqftMin, sqftMax, sortIndex) {
      this.state.priceMin = priceMin;
      this.state.priceMax = priceMax;
      this.state.sqftMin = sqftMin;
      this.state.sqftMax = sqftMax;
      this.state.sortIndex = sortIndex;
      this.setState(this.state);

      this.hideFilters();
    }

    showRetailScoreExplanation() {
      this.state.modal = <div style={{height:"350px", width:"100%", backgroundColor:"#FFFFFF", position:"absolute", zIndex:"3", bottom:"0", right:"0"}}>
                    <RetailScoreExplanation helpful={this.hideFilters} notHelpful={this.hideFilters} />
                   </div>;
      this.state.dimDiv = <div className="dimDiv" onClick={this.hideFilters}></div>;
      this.setState(this.state);
    }

    searchClick(city) {
      var cityString = city;
      cityString.replace(' ','-');
      this.state.city  = city;
      this.setState(this.state);
      this.props.history.push('/retail-space-for-lease/' + cityString);
    }

    setCurrentProperty(property){

      if(!this.state.currentProperty || this.state.currentProperty.id != property.id) {
        this.state.currentProperty = property;
        this.setState(this.state);
      }
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

         for(var i = 0; i < properties.length; i++) {
           var property = properties[i];

          if(!property.rental_rate_min) {
            if(!property.min_sq_feet) {
              filteredProperties.push(property);
            } else if( (property.min_sq_feet <=  this.state.sqftMax && property.min_sq_feet >=  this.state.sqftMin) || (property.max_sq_feet <= this.state.sqftMax && property.max_sq_feet >= this.state.sqftMin) ) {
              filteredProperties.push(property);
            }
          } 
          else if( (property.rental_rate_min <=  this.state.priceMax && property.rental_rate_min >=  this.state.priceMin) || (property.rental_rate_max <=  this.state.priceMax && property.rental_rate_max >=  this.state.priceMin) ){
            if(!property.min_sq_feet) {
              filteredProperties.push(property);
            } else if( (property.min_sq_feet <=  this.state.sqftMax && property.min_sq_feet >=  this.state.sqftMin) || (property.max_sq_feet <= this.state.sqftMax && property.max_sq_feet >= this.state.sqftMin) ){
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
                          visibilityChanged={this.setCurrentProperty} />;
          } else if (window.innerWidth < 800) {
            propertyList = <TabletPropertyList 
                          properties={filteredProperties} 
                          tileClick={this.tileClick} 
                          visibilityChanged={this.setCurrentProperty} />;
          }
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

                    <Col md={5} lg={5} className="desktopListings hidden-sm hidden-xs">
                      <Row style={{marginLeft:"0px"}}>
                        <div style={{backgroundColor:"#1abc9c", color:"#FFFFFF", height:"250px", width:"100%"}}>
                         <DesktopFilters 
                              saveFilters={this.saveFilters} 
                              priceMin={this.state.priceMin} 
                              priceMax={this.state.priceMax}
                              sqftMax={this.state.sqftMax}
                              sqftMin={this.state.sqftMin}
                              sortIndex={this.state.sortIndex}
                              sortChanged={this.sortChanged}
                              searchClick={this.searchClick} 
                              city={this.state.city} />
                          
                        </div>
                        <div style={{backgroundColor:"#FFFFFF",width:"100%", height:"50px", color:"#FFFFFF", borderTop:"solid thin #DCE0E0"}}>
                          <div style={{height:"100%", padding:"15px",float:"left", color:"#95a5a6", width:"50%", fontSize:"16px"}}>{filteredProperties.length} properties for lease</div>
                        </div>
                        <div style={{backgroundColor:"#f1c40f", width:"100%"}}>
                          <DesktopPropertyList properties={filteredProperties} tileClick={this.tileClick} />
                        </div>
                      </Row>
                    </Col>

                    <Col md={7} lg={7} style={{marginRight:"0px", paddingRight:"0px"}} className="desktopMap hidden-xs hidden-sm">
                      <div style={{width:"100%"}} className="fullHeight hidden-sm hidden-xs">
                        <GoogleMap 
                          id={"desktop"} 
                          properties={filteredProperties} 
                          pinClick={this.tileClick} 
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
                          pinClick={this.tileClick} 
                          currentPropertyMarker={this.state.currentProperty}
                          city={this.state.city}/>
                      </div>
                    </Col>

                    <Col className="hidden-md hidden-lg" sm={12} xs={12}>

                      <div style={{width:"100%", height:"50px"}}>
                        <div style={{height:"100%", padding:"15px",float:"left", color:"#95a5a6", width:"50%", fontSize:"16px"}}>{filteredProperties.length} properties for lease</div>
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
                </Row>
            </div>
            );
    }

}

const mapStateToProps = (state) => {
  return {
    server_side: state.server_side,
    properties: state.properties
  };
};
export default connect(mapStateToProps, Actions)(SRP);

