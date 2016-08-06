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
import MobilePropertyList from '../components/MobilePropertyList';


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

      this.state = {
        currentProperty: null,
        city: "Los Angeles, CA"
      };

    }

    tileClick(propertyId) {
      this.props.history.push('pdp');
    }

    searchClick(city) {
      this.state.city  = city;
      this.setState(this.state);
      // this.props.history.push('srp');
    }

    setCurrentProperty(property){

      if(!this.state.currentProperty || this.state.currentProperty.id != property.id) {
        this.state.currentProperty = property;
        this.setState(this.state);
      }
    }

    render() {

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
                        <div style={{height:"100%", padding:"15px",float:"left", color:"#95a5a6", width:"50%", fontSize:"16px"}}>{properties.length} properties for lease</div>
                        <div style={{height:"100%",padding:"5px", float:"right"}}>
                            <Button style={{backgroundColor:"#FFFFFF",color:"#49A3DC", border:"#49A3DC",fontSize:"16px", fontWeight:"400"}}>Filters</Button>
                        </div>
                      </div>

                      <div style={{width: "100%", height:"150px"}}>
                        <MobilePropertyList 
                          properties={properties} 
                          tileClick={this.tileClick} 
                          visibilityChanged={this.setCurrentProperty} />
                      </div>
                      
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

