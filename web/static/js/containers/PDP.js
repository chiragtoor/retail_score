import React from 'react';
import { connect } from "react-redux";

import * as Actions from '../actions/ubgo_actions';

import ContentWrapper from '../components/Base/ContentWrapper';

import { Grid, Row, Col, Panel, Button, FormGroup, ControlLabel, FormControl, InputGroup, Carousel, CarouselItem } from 'react-bootstrap';

// const isBrowser = typeof window !== 'undefined';
// const C3Chart = isBrowser ? require('react-c3') : undefined;
import Chart from '../components/Chart';

let data = {
  columns: [
    ['Male', 250],
    ['Female', 500],
    ['Other', 100]
  ]
};

let options = {
  size: {
    width: 250,
    height: 250
  },
  labels: true,
};

class PDP extends React.Component {
    render() {
        return (
            <ContentWrapper unwrap>
                <Carousel indicators={false} controls={false}>
                    <CarouselItem style={{backgroundColor:"#000000"}}>
                      <center>
                        <img className="propertyImageSize" src="http://x.lnimg.com/photo/poster_1920/993a9a5967c844408cccb85593acd3fc.jpg" />
                      </center>
                    </CarouselItem>
                    <CarouselItem style={{backgroundColor:"#000000"}}>
                      <center>
                        <img className="propertyImageSize" src="http://x.lnimg.com/photo/poster_1920/ed354036d8654b3bb4e85532de5f6447.jpg" />
                      </center>
                    </CarouselItem>
                    <CarouselItem style={{backgroundColor:"#000000"}}>
                      <center>
                        <img className="propertyImageSize" src="http://x.lnimg.com/photo/poster_1920/6b4080d0ecdc491baa65a18e3147fe37.jpg" />
                      </center>
                    </CarouselItem>
                </Carousel>
                <div className="text-center bg-gray-dark p-lg mb-sm">
                    <div className="row row-table">
                        <div className="col-xs-4 br">
                            <h3 className="m0">85</h3>
                            <p className="m0">Retail Score</p>
                        </div>
                        <div className="col-xs-4 br">
                            <h3 className="m0">{"2,450"}</h3>
                            <p className="m0">Square Feet</p>
                        </div>
                        <div className="col-xs-4">
                            <h3 className="m0">{"$8,000"}</h3>
                            <p className="m0">Monthly Rate</p>
                        </div>
                    </div>
                </div>
                <div className="p-lg">
                    <Row style={{paddingLeft:"45px", paddingBottom:"20px"}}>
                        <Col sm={6} xs={12} style={{paddingBottom:"15px"}}>
                            <center>
                              <Button bsClass="btn btn-labeled btn-primary mr">
                                <span className="btn-label"><i className="fa fa-arrow-left"></i></span> Back to Listings
                              </Button>
                            </center>
                        </Col>
                        <Col sm={6} xs={12}>
                            <center>
                              <Button bsClass="btn btn-labeled btn-success mr">
                                <span className="btn-label"><i className="fa fa-comment"></i></span> Contact Agent
                              </Button>
                            </center>
                        </Col>
                    </Row>
                    <Row>
                        <Col lg={ 12 }>
                          <div>
                            <div className="timeline-badge primary">
                                        <em className="fa fa-map-marker"></em>
                                    </div>
                                    <div className="timeline-panel">
                                        <div className="popover left">
                                            <div className="arrow"></div>
                                            <div className="popover-content">
                                                <div className="table-grid table-grid-align-middle mb">
                                                    <div className="col">
                                                      <center>
                                                        <strong>222 Idaho Ave.</strong>
                                                        <p className="m0">Santa Monica, CA</p>
                                                      </center>
                                                    </div>
                                                </div>
                                                <p>
                                                    &nbsp;&nbsp; Located in the heart of Santa Monica Promenade this location features:
                                                    <br/>
                                                    &nbsp;&nbsp; - Ready to go layout for a clothing retail store, fitting rooms in place
                                                    <br/>
                                                    &nbsp;&nbsp; - High Foot Traffic
                                                    <br/>
                                                    &nbsp;&nbsp; - High Proximity of other clothing retailers
                                                    <br/>
                                                    &nbsp;&nbsp; - Access to public transportation
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            { /* START timeline */ }
                            <ul className="timeline">
                                <li data-datetime="Details" className="timeline-separator"></li>
                                { /* START timeline item */ }
                                <li>
                                    <div className="timeline-badge primary">
                                        <em className="fa fa-map-marker"></em>
                                    </div>
                                    <div className="timeline-panel">
                                        <div className="popover left">
                                            <div className="arrow"></div>
                                            <div className="popover-content">
                                                <div className="table-grid table-grid-align-middle mb">
                                                    <div className="col">
                                                      <center>
                                                        <strong>222 Idaho Ave.</strong>
                                                        <p className="m0">Santa Monica, CA</p>
                                                      </center>
                                                    </div>
                                                </div>
                                                <p>
                                                    &nbsp;&nbsp; Located in the heart of Santa Monica Promenade this location features:
                                                    <br/>
                                                    &nbsp;&nbsp; - Ready to go layout for a clothing retail store, fitting rooms in place
                                                    <br/>
                                                    &nbsp;&nbsp; - High Foot Traffic
                                                    <br/>
                                                    &nbsp;&nbsp; - High Proximity of other clothing retailers
                                                    <br/>
                                                    &nbsp;&nbsp; - Access to public transportation
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                                { /* END timeline item */ }
                                { /* END timeline item */ }
                                <li className="timeline-inverted">
                                    <div className="timeline-badge info">
                                        <em className="fa fa-question"></em>
                                    </div>
                                    <div className="timeline-panel">
                                        <div className="popover right">
                                            <div className="arrow"></div>
                                            <div className="popover-content">
                                                <div className="table-grid table-grid-align-middle mb">
                                                    <div className="col">
                                                      <center>
                                                        <strong>This property can be used for:</strong>
                                                        <p className="m0">(Contact Broker for details)</p>
                                                      </center>
                                                    </div>
                                                </div>
                                                <p>
                                                    &nbsp;&nbsp; - Clothing Retail
                                                    <br/>
                                                    &nbsp;&nbsp; - Restaurant
                                                    <br/>
                                                    &nbsp;&nbsp; - Accessories Store (watches, glasses, etc.)
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                                { /* END timeline item */ }
                                { /* START timeline separator */ }
                                <li data-datetime="Retail Score" className="timeline-separator"></li>
                                { /* END timeline separator */ }
                                { /* START timeline item */ }
                                <li>
                                    <div className="timeline-badge primary">
                                        <em className="fa fa-star"></em>
                                    </div>
                                    <div className="timeline-panel">
                                        <div className="popover left">
                                            <div className="arrow"></div>
                                            <div className="popover-content">
                                                <div className="table-grid table-grid-align-middle mb">
                                                    <div className="col">
                                                      <center>
                                                        <strong>Retail Score: 95</strong>
                                                      </center>
                                                    </div>
                                                </div>
                                                <center>
                                                    <p>This score means this is among the best locations available for lease in the city of Santa Monica.</p>
                                                </center>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                                { /* END timeline item */ }
                                <li className="timeline-inverted">
                                    <div className="timeline-badge info">
                                        <em className="fa fa-info-circle"></em>
                                    </div>
                                    <div className="timeline-panel">
                                        <div className="popover right">
                                            <div className="arrow"></div>
                                            <div className="popover-content">
                                                <div className="table-grid table-grid-align-middle mb">
                                                    <div className="col">
                                                      <center>
                                                        <strong>Retail Score Details</strong>
                                                      </center>
                                                    </div>
                                                </div>
                                                <p>
                                                    &nbsp;&nbsp; - Higher retail sales in this block than 85% of Santa Monica
                                                    <br/>
                                                    &nbsp;&nbsp; - Higher retail sales in this block then 90% of Los Angeles
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                                { /* END timeline item */ }
                                <li data-datetime="Agent" className="timeline-separator"></li>
                                { /* START timeline item */ }
                                <li>
                                    <div className="timeline-badge success">
                                        <em className="fa fa-comment"></em>
                                    </div>
                                    <div className="timeline-panel">
                                        <div className="popover left">
                                            <div className="arrow"></div>
                                            <div className="popover-content">
                                                <div className="table-grid table-grid-align-middle mb">
                                                    <div className="col col-xs">
                                                        <img src="http://x.lnimg.com/xnet/mainsite/HttpHandlers/attachment/ServeAttachment.ashx?FileGuid=19FBC02A-86DD-4142-94FD-037D2E705AA8&Extension=jpg&Width=166&Height=189&PadImage=True&ClipImage=False&ExactDim=-1&UseThumbnailAsOriginal=False&UseStandardAsOriginal=False" alt="Image" className="media-object img-circle thumb48" />
                                                    </div>
                                                    <div className="col">
                                                      <center>
                                                        <strong>Drew Glickman</strong>
                                                        <p className="m0">Musselli Real Estate</p>
                                                      </center>
                                                    </div>
                                                </div>
                                                <FormGroup controlId="formControlsText">
                                                  <FormControl 
                                                    type="text" 
                                                    placeholder="Your Name" 
                                                    value={this.props.brokerName}
                                                    onChange={(e) => false}/>
                                                </FormGroup>
                                                <FormGroup controlId="formControlsText">
                                                  <FormControl 
                                                    type="text" 
                                                    placeholder="Your E-mail" 
                                                    value={this.props.brokerName}
                                                    onChange={(e) => false}/>
                                                </FormGroup>
                                                <FormGroup controlId="formControlsText">
                                                  <FormControl 
                                                    type="text" 
                                                    placeholder="Your Phone #" 
                                                    value={this.props.brokerName}
                                                    onChange={(e) => false}/>
                                                </FormGroup>
                                                <FormGroup controlId="formControlsTextarea">
                                                  <FormControl componentClass="textarea" placeholder="Optional Message ..." />
                                                </FormGroup>
                                                <center>
                                                  <Button bsClass="btn btn-labeled btn-success mr">
                                                    <span className="btn-label"><i className="fa fa-comment"></i></span>Contact Agent
                                                  </Button>
                                                </center>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                                { /* END timeline item */ }
                                <li data-datetime="Demographics" className="timeline-separator"></li>
                                { /* START timeline item */ }
                                <li>
                                    <div className="timeline-badge info">
                                        <em className="fa fa-pie-chart"></em>
                                    </div>
                                    <div className="timeline-panel">
                                        <div className="popover left">
                                            <div className="arrow"></div>
                                            <div className="popover-content">
                                              <div className="table-grid table-grid-align-middle mb">
                                                <div className="col">
                                                  <center>
                                                    <strong>Gender Breakdown</strong>
                                                  </center>
                                                </div>
                                              </div>
                                              <center>
                                                <div id="testchart" />
                                              </center>
                                              <Chart data={data} element='testchart' type='pie' options={options}/>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                                { /* END timeline item */ }
                                { /* START timeline item */ }
                                <li className="timeline-inverted">
                                    <div className="timeline-badge info">
                                        <em className="fa fa-bar-chart"></em>
                                    </div>
                                    <div className="timeline-panel">
                                        <div className="popover right">
                                            <div className="arrow"></div>
                                            <div className="popover-content">
                                              <div className="table-grid table-grid-align-middle mb">
                                                <div className="col">
                                                  <center>
                                                    <strong>Gender Breakdown</strong>
                                                  </center>
                                                </div>
                                              </div>
                                              <center>
                                                <div id="testchart2" />
                                              </center>
                                              <Chart data={data} element='testchart2' type='pie' options={options}/>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                                { /* END timeline item */ }
                                { /* START timeline item */ }
                                <li>
                                    <div className="timeline-badge info">
                                        <em className="fa fa-line-chart"></em>
                                    </div>
                                    <div className="timeline-panel">
                                        <div className="popover left">
                                            <div className="arrow"></div>
                                            <div className="popover-content">
                                              <div className="table-grid table-grid-align-middle mb">
                                                <div className="col">
                                                  <center>
                                                    <strong>Gender Breakdown</strong>
                                                  </center>
                                                </div>
                                              </div>
                                              <center>
                                                <div id="testchart3" />
                                              </center>
                                              <Chart data={data} element='testchart3' type='bar' options={options}/>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                                { /* END timeline item */ }
                                <li data-datetime="Other Listings" className="timeline-separator"></li>
                            </ul>
                            { /* END timeline */ }
                        </Col>
                        <Col xs={ 12 }>
                            <div className="panel panel-default">
                                <div className="list-group">
                                    <a href="#" className="media p mt0 list-group-item">
                                        <div className="pull-right">
                                            <center>
                                                <span>Retail Score: 95</span>
                                            </center>
                                        </div>
                                        <div className="pull-left">
                                            <img src="http://x.lnimg.com/photo/poster_1920/993a9a5967c844408cccb85593acd3fc.jpg" alt="Image" className="img-thumbnail img-circle thumb128" />
                                        </div>
                                        { /* Contact info */ }
                                        <div className="media-body">
                                            <center>
                                                <span className="media-heading">
                                                   <strong>40495 Winchester Road</strong>
                                                   <br/>
                                                   <strong>Temecula, CA</strong>
                                                </span>
                                            </center>
                                        </div>
                                    </a>
                                    <a href="#" className="media p mt0 list-group-item">
                                        <div className="pull-right">
                                            <center>
                                                <span>Retail Score: 95</span>
                                            </center>
                                        </div>
                                        <div className="pull-left">
                                            <img src="http://x.lnimg.com/photo/poster_1920/6b4080d0ecdc491baa65a18e3147fe37.jpg" alt="Image" className="img-thumbnail img-circle thumb128" />
                                        </div>
                                        { /* Contact info */ }
                                        <div className="media-body">
                                            <center>
                                                <span className="media-heading">
                                                   <strong>40495 Winchester Road</strong>
                                                   <br/>
                                                   <strong>Temecula, CA</strong>
                                                </span>
                                            </center>
                                        </div>
                                    </a>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </div>
            </ContentWrapper>
            );
    }

}

const mapStateToProps = (state) => {
  return {
  };
};
export default connect(mapStateToProps, Actions)(PDP);

