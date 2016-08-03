import React from 'react';
import { connect } from "react-redux";

import * as Actions from '../actions/ubgo_actions';

import ContentWrapper from '../components/Base/ContentWrapper';
import { Grid, Row, Col, Panel, Button, FormGroup, ControlLabel, FormControl, InputGroup, Carousel, CarouselItem, DropdownButton, MenuItem } from 'react-bootstrap';

// const isBrowser = typeof window !== 'undefined';
// const C3Chart = isBrowser ? require('react-c3') : undefined;
import Chart from '../components/Chart';
import GoogleMap from '../components/GoogleMap';

var properties = [
{
    streetAddress: "30345 Sierra Madre Dr.",
    cityState: "Temecula, CA",
    retailScore: "85",
    squareFeet: "2,900 sqft.",
    monthlyRent: "$4,000.00",
    pictures: [
      "http://x.lnimg.com/photo/poster_1920/993a9a5967c844408cccb85593acd3fc.jpg",
      "http://x.lnimg.com/photo/poster_1920/ed354036d8654b3bb4e85532de5f6447.jpg",
      "http://x.lnimg.com/photo/poster_1920/6b4080d0ecdc491baa65a18e3147fe37.jpg"
    ]
},
{
    streetAddress: "30345 Sierra Madre Dr.",
    cityState: "Temecula, CA",
    retailScore: "85",
    squareFeet: "2,900 sqft.",
    monthlyRent: "$4,000.00",
    pictures: [
      "http://x.lnimg.com/photo/poster_1920/993a9a5967c844408cccb85593acd3fc.jpg",
      "http://x.lnimg.com/photo/poster_1920/ed354036d8654b3bb4e85532de5f6447.jpg",
      "http://x.lnimg.com/photo/poster_1920/6b4080d0ecdc491baa65a18e3147fe37.jpg"
    ]
},
{
    streetAddress: "30345 Sierra Madre Dr.",
    cityState: "Temecula, CA",
    retailScore: "85",
    squareFeet: "2,900 sqft.",
    monthlyRent: "$4,000.00",
    pictures: [
      "http://x.lnimg.com/photo/poster_1920/993a9a5967c844408cccb85593acd3fc.jpg",
      "http://x.lnimg.com/photo/poster_1920/ed354036d8654b3bb4e85532de5f6447.jpg",
      "http://x.lnimg.com/photo/poster_1920/6b4080d0ecdc491baa65a18e3147fe37.jpg"
    ]
},
{
    streetAddress: "30345 Sierra Madre Dr.",
    cityState: "Temecula, CA",
    retailScore: "85",
    squareFeet: "2,900 sqft.",
    monthlyRent: "$4,000.00",
    pictures: [
      "http://x.lnimg.com/photo/poster_1920/993a9a5967c844408cccb85593acd3fc.jpg",
      "http://x.lnimg.com/photo/poster_1920/ed354036d8654b3bb4e85532de5f6447.jpg",
      "http://x.lnimg.com/photo/poster_1920/6b4080d0ecdc491baa65a18e3147fe37.jpg"
    ]
}
]

class SRP extends React.Component {
    render() {
        return (
            <div style={{height:"100%"}}>
                <Row className="srpDesktopHeight">
                    <Col md={5} xs={12} style={{paddingRight:"0px"}}>
                      <div style={{padding:"10px"}}>
                        <FormGroup>
                          <InputGroup>
                            <InputGroup.Button>
                              <Button>Sale</Button>
                            </InputGroup.Button>
                            <InputGroup.Button>
                              <Button>Lease</Button>
                            </InputGroup.Button>
                            <FormControl type="text" />
                            <InputGroup.Button>
                              <Button><i className="fa fa-search"/></Button>
                            </InputGroup.Button>
                          </InputGroup>
                        </FormGroup>
                        <div>
                          <center>
                            <strong><i className="fa fa-tags"/> Retail spaces in Los Angeles, CA</strong>
                          </center>
                        </div>
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
                        <GoogleMap id={"desktop"}/>
                      </div>
                    </Col>
                    <Col xs={12} style={{height:"450px", paddingLeft:"0px"}} className="hidden-md hidden-lg">
                      <div style={{height:"450px", paddingLeft:"0px"}} className="hidden-md hidden-lg">
                        <GoogleMap id={"mobile"}/>
                      </div>
                    </Col>
                    <Col className="hidden-md hidden-lg" sm={12} xs={12}>
                      <div style={{overflowX: "scroll", overflowY: "hidden", display: "flex", width: "100%", height:"250px"}}>
                        {properties.map((property, index) => {
                          return <div key={index} className="panel b text-center horizontalPDPTiles" style={{display:"inline-block", height:"250px", width:"300px"}}>
                             <div className="panel-body" style={{padding:"0"}}>
                              <div>
                               <Carousel indicators={false} controls={false}>
                                  <CarouselItem style={{backgroundColor:"#000000"}}  onClick={() => this.props.history.push('pdp')}>
                                    <div style={{width:"100%", height:"100%", position:"relative", zIndex:"0"}}>
                                      <center>
                                        <img className="propertyImageSizeSmall" src="http://x.lnimg.com/photo/poster_1920/993a9a5967c844408cccb85593acd3fc.jpg" />
                                      </center>
                                      <div style={{width:"100%", height:"100%", position:"absolute", zIndex:"2", top:"0px", left:"0px", background: "linear-gradient(to top, rgba(0, 0, 0,0.8) , rgba(0, 0, 0,0.0))"}} />
                                    </div>
                                  </CarouselItem>
                                </Carousel>
                              </div>
                             </div>
                          </div>
                        })}
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

