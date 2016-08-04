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
    monthlyRent: "$4,000",
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
    monthlyRent: "$4,000",
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
    monthlyRent: "$4,000",
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
    monthlyRent: "$4,000",
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

                    <Col md={5} xs={12}>

                      <div style={{height:"50px"}}>
                        <FormGroup style={{border:"none"}}>
                          <InputGroup style={{border:"none"}}>
                            <Row className="noPaddingOrMargin">
                              <Col xs={10} className="noPaddingOrMargin">
                                <FormControl style={{height:"50px", border:"none"}} type="text"/>
                              </Col>
                              <Col xs={2} className="noPaddingOrMargin">
                                <InputGroup.Button>
                                  <Button style={{backgroundColor:"#49A3DC", width:"100%", color:"#FFFFFF", border:"none", height:"50px"}}><i className="fa fa-search"/></Button>
                                </InputGroup.Button>
                              </Col>
                            </Row>
                          </InputGroup>
                        </FormGroup>
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

                    <Col xs={12} className="smallGoogleMap hidden-md hidden-lg">
                      <div style={{height:"100%"}} className="hidden-md hidden-lg">
                        <GoogleMap id={"mobile"}/>
                      </div>
                    </Col>

                    <Col className="hidden-md hidden-lg" sm={12} xs={12}>

                      <div style={{width:"100%", height:"50px"}}>
                        <div style={{height:"100%", padding:"15px",float:"left", color:"#95a5a6", width:"50%", fontSize:"16px"}}>262 properties for lease</div>
                        <div style={{height:"100%",padding:"5px", float:"right"}}>
                            <Button style={{backgroundColor:"#49A3DC",color:"#FFFFFF", border:"none",fontSize:"16px", fontWeight:"400"}}><i className="fa fa-filter"/></Button>
                        </div>
                      </div>

                      <div style={{overflowX: "scroll", overflowY: "hidden", display: "flex", width: "100%", height:"150px", backgroundColor:"#ecf0f1"}}>
                        {properties.map((property, index) => {
                          return <div key={index} className="panel b text-center horizontalPDPTiles" style={{display:"inline-block", height:"130px", width:"85%", padding:"0px"}}>
                              <div>
                               <Carousel indicators={false} controls={false}>
                                  <CarouselItem style={{backgroundColor:"#2ecc71", padding:"0px", margin:"0px"}}  onClick={() => this.props.history.push('pdp')}>
                                    <div style={{width:"40%", height:"130px", float:"left", backgroundColor:"#16a085"}}>
                                    </div>
                                    <div style={{width:"60%", height:"130px", float:"right"}}>
                                      <div style={{textAlign:"center", width:"100%", fontSize:"16px", marginTop:"10px", fontWeight:"200"}}>{property.streetAddress}</div>
                                      <div style={{textAlign:"center", width:"45%", float:"left", fontSize:"14px", fontWeight:"100"}}>{property.monthlyRent}</div>
                                      <div style={{textAlign:"center", width:"45%", float:"right", fontSize:"14px", marginBottom:"5px", fontWeight:"100"}}>{property.squareFeet}</div>
                                    </div>
                                  </CarouselItem>
                                </Carousel>
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

