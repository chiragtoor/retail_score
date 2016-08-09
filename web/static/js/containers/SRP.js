import React from 'react';
import { connect } from "react-redux";

import * as Actions from '../actions/ubgo_actions';

import ContentWrapper from '../components/Base/ContentWrapper';
import { Grid, Row, Col, Panel, Button, FormGroup, ControlLabel, FormControl, InputGroup, Carousel, CarouselItem, DropdownButton, MenuItem } from 'react-bootstrap';

// const isBrowser = typeof window !== 'undefined';
// const C3Chart = isBrowser ? require('react-c3') : undefined;
import Chart from '../components/Chart';
import GoogleMap from '../components/GoogleMap';
import SearchBar from '../components/SearchBar';
import Filters from '../components/Filters';
import MobilePropertyList from '../components/MobilePropertyList';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import RetailScoreExplanation from '../components/RetailScoreExplanation';

const PRICE_MIN = 0;
const PRICE_MAX = 50000;

const SQ_MIN = 0;
const SQ_MAX = 10000;

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
  },
  {
      streetAddress: "30105 Agoura Road",
      city: "Agoura Hills",
      state: "CA",
      zipCode: "91301",
      retailScore: "98",
      squareFeet: 1200,
      price: 2220,
      lat: 34.1453367,
      lng: -118.7786372,
      image_lat: 34.145094,
      image_lng: -118.7786185,
      image_heading: 356.351318523258,
      id: 4
  },
  {
      streetAddress: "28708 Roadside Drive",
      city: "Agoura Hills",
      state: "CA",
      zipCode: "91301",
      retailScore: "94",
      squareFeet: 1100,
      price: 1870,
      lat: 34.1434257,
      lng: -118.7512937,
      image_lat: 34.1440405,
      image_lng: -118.7511329,
      image_heading: 192.214181555281,
      id: 5
  },
  {
      streetAddress: "28115 Dorothy Drive",
      city: "Agoura Hills",
      state: "CA",
      zipCode: "91301",
      retailScore: "67",
      squareFeet: 2447,
      price: 4999.99588333,
      lat: 34.1427622,
      lng: -118.7389287,
      image_lat: 34.1424231,
      image_lng: -118.7389484,
      image_heading: 2.75276461428855,
      id: 6
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
      var cityString = city.split(',')[0];
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

    render() {

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

          if(!property.price && !property.square_feet) {
            filteredProperties.push(property);
          } else if (property.price <= this.state.priceMax && 
              property.squareFeet <= this.state.sqftMax && 
              property.squareFeet >= this.state.sqftMin &&
              property.price >= this.state.priceMin) {
            filteredProperties.push(property);
          }
        }

        var sortBy;

        switch (this.state.sortIndex) {
          case 1: sortBy = function compare(a,b) {
                              if (a.price < b.price)
                                return -1;
                              if (a.price > b.price)
                                return 1;
                              return 0;
                            }
            break;
          case 2: sortBy = function compare(a,b) {
                              if (a.squareFeet < b.squareFeet)
                                return 1;
                              if (a.squareFeet > b.squareFeet)
                                return -1;
                              return 0;
                            }
            break;
          case 3: sortBy = function compare(a,b) {
                              if (a.retailScore < b.retailScore)
                                return 1;
                              if (a.retailScore > b.retailScore)
                                return -1;
                              return 0;
                            }
            break;
          default: sortBy = function compare(a,b) {
                              if (a.price < b.price)
                                return -1;
                              if (a.price > b.price)
                                return 1;
                              return 0;
                            }
            break
        }

        filteredProperties.sort(sortBy);

        return (
            <div style={{height:"100%"}}>

                <Row className="srpDesktopHeight">

                    <Col md={5} xs={12}>

                      <div style={{height:"50px", width:"100%"}}>
                        <SearchBar 
                          searchClick={this.searchClick} 
                          city={this.state.city} />
                      </div>

                      <div style={{paddingLeft:"15px", paddingRight:"15px", overflow:"auto"}} className="hidden-sm hidden-xs">
                        {properties.map((property, index) => {
                          return <div key={index} className="panel b text-center">
                             <div className="panel-body" style={{padding:"0"}}>
                              <div>
                               <Carousel indicators={false} controls={false}>
                                 <CarouselItem style={{backgroundColor:"#000000"}}  onClick={() => this.props.history.push('pdp')}>
                                    <center>
                                        <img className="propertyImageSizeSmall" src="http://x.lnimg.com/photo/poster_1920/993a9a5967c844408cccb85593acd3fc.jpg" />
                                      </center>
                                    </CarouselItem>
                                </Carousel>
                              </div>
                             </div>
                             <div className="panel-body bt" style={{paddingTop:"5px", paddingBottom:"5px"}}  onClick={() => this.props.history.push('pdp')}>
                                <Row>
                                   <Col xs={4} className="br">
                                      <strong>{property.retailScore}</strong>
                                      <p className="m0">Retail Score</p>
                                   </Col>
                                   <Col xs={4} className="br">
                                      <strong>{property.squareFeet}</strong>
                                      <p className="m0">Square Feet</p>
                                   </Col>
                                   <Col xs={4}>
                                      <strong>{property.monthlyRent}</strong>
                                      <p className="m0">Monthly Rent</p>
                                   </Col>
                                </Row>
                             </div>
                          </div>
                        })}
                      </div>

                    </Col>

                    <Col md={7} style={{height:"100%", paddingLeft:"0px"}} className="hidden-xs hidden-sm">
                      <div className="fullHeight hidden-sm hidden-xs">
                        <GoogleMap 
                          id={"desktop"} 
                          properties={properties} 
                          pinClick={this.tileClick} 
                          currentPropertyMarker={this.state.currentProperty}
                          city={this.state.city}/>
                      </div>
                    </Col>

                    <Col xs={12} className="smallGoogleMap hidden-md hidden-lg">
                      <Button onClick={this.showRetailScoreExplanation} style={{fontSize:"20px", backgroundColor:"#7f8c8d", color:"#FFFFFF",borderRadius:"20px", position:"fixed", top:"65px", right:"5px", zIndex:"1"}}><em className="fa fa-question-circle"></em></Button>
                      <div style={{height:"100%"}} className="hidden-md hidden-lg">
                        <GoogleMap 
                          id={"mobile"} 
                          properties={properties} 
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
                        <MobilePropertyList 
                          properties={filteredProperties} 
                          tileClick={this.tileClick} 
                          visibilityChanged={this.setCurrentProperty} />
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
  };
};
export default connect(mapStateToProps, Actions)(SRP);

