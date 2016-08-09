import React from 'react';
import { connect } from "react-redux";

import * as Actions from '../actions/ubgo_actions';

import ContentWrapper from '../components/Base/ContentWrapper';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import RetailScoreExplanation from '../components/RetailScoreExplanation';
import ContactModal from '../components/ContactModal';

import { Grid, Row, Col, Panel, Button, ButtonGroup, FormGroup, ControlLabel, FormControl, InputGroup, Carousel, CarouselItem } from 'react-bootstrap';

// const isBrowser = typeof window !== 'undefined';
// const C3Chart = isBrowser ? require('react-c3') : undefined;
import Chart from '../components/Chart';

let data = {
  columns: [
    ['Male', 250],
    ['Female', 500],
    ['Other', 100],
    ['Test', 0]
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

    constructor(props){
      super(props);

      this.showRetailScoreExpalanation = this.showRetailScoreExpalanation.bind(this);
      this.hideModals = this.hideModals.bind(this);
      this.showContactModal = this.showContactModal.bind(this);

      this.state= 
      { 
        dimDiv: null,
        modal: null
      }
    }

    showContactModal(){
      this.state.modal = <div style={{height:"350px", width:"100%", backgroundColor:"#FFFFFF", position:"fixed", zIndex:"3", bottom:"0", right:"0"}}>
                    <ContactModal />
                   </div>;
      this.state.dimDiv = <div className="dimDiv" onClick={this.hideModals}></div>;
      this.setState(this.state);
    }

    showRetailScoreExpalanation() {
      this.state.modal = <div style={{height:"350px", width:"100%", backgroundColor:"#FFFFFF", position:"fixed", zIndex:"3", bottom:"0", right:"0"}}>
                    <RetailScoreExplanation helpful={this.hideModals} notHelpful={this.hideModals} />
                   </div>;
      this.state.dimDiv = <div className="dimDiv" onClick={this.hideModals}></div>;
      this.setState(this.state);
    }

    hideModals() {
      this.state.modal = null;
      this.state.dimDiv = null;
      this.setState(this.state);
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
                        <div className="col-xs-6 br">
                            <h3 className="m0">{"2,450"}</h3>
                            <p className="m0">Square Feet</p>
                        </div>
                        <div className="col-xs-6">
                            <h3 className="m0">{"$8,000"}</h3>
                            <p className="m0">Monthly Rate</p>
                        </div>
                    </div>
                </div>
                <div className="p-lg">
                    <Row>
                        <Col lg={ 12 }>
                          <div className="row-masonry row-masonry-lg-2">
                           <div className="col-masonry">
                              <div className="panel b m0">
                                 <div className="panel-heading">
                                    <div className="media mt0">
                                       <div className="media-left">
                                          <em onClick={this.showRetailScoreExpalanation} className="fa fa-question"></em>
                                       </div>
                                       <div className="media-body media-middle">
                                        <center>
                                          <h3 className="media-heading m0 text-bold">Retail Score: 85</h3>
                                          <small className="text-muted">What does that mean?</small>
                                        </center>
                                       </div>
                                    </div>
                                 </div>
                                 <div className="panel-body">
                                    <div className="row">
                                       <div className="col-lg-8">
                                            <p>
                                                &nbsp;&nbsp; - Higher retail sales in this block than 85% of Santa Monica
                                                <br/>
                                                &nbsp;&nbsp; - Higher retail sales in this block then 90% of Los Angeles County
                                            </p>
                                       </div>
                                    </div>
                                 </div>
                              </div>
                           </div>
                          </div>
                          <div className="row-masonry row-masonry-lg-2">
                           <div className="col-masonry">
                              <div className="panel b m0">
                                 <div className="panel-heading">
                                    <div className="media mt0">
                                       <div className="media-left">
                                        <em className="fa fa-pie-chart"></em>
                                       </div>
                                       <div className="media-body media-middle">
                                        <center>
                                          <h5 className="media-heading m0 text-bold">Demographics</h5>
                                          <small className="text-muted">Gender Breakdown</small>
                                        </center>
                                       </div>
                                    </div>
                                 </div>
                                 <div className="panel-body">
                                    <div className="row">
                                       <div className="col-lg-8">
                                            <center>
                                                <div id="testchart" />
                                            </center>
                                            <Chart data={data} element='testchart' type='pie' options={options}/>
                                            <center>
                                                <ButtonGroup>
                                                    <Button><em className="fa fa-usd"></em></Button>
                                                    <Button><em className="fa fa-globe"></em></Button>
                                                    <Button><em className="fa fa-heart"></em></Button>
                                                    <Button><em className="fa fa-user"></em></Button>
                                                </ButtonGroup>
                                            </center>
                                       </div>
                                    </div>
                                 </div>
                              </div>
                           </div>
                          </div>
                        </Col>
                        <Col xs={ 12 }>
                            <div className="panel panel-default">
                                <div className="panel-heading"><center>Other Listings</center></div>
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
                        <Col className="hidden-md hidden-lg">
                          <ReactCSSTransitionGroup {...dimDivTransitionOptions} >
                            {this.state.dimDiv}
                          </ReactCSSTransitionGroup>
                          <ReactCSSTransitionGroup {...filterTransitionOptions} >
                            {this.state.modal}
                          </ReactCSSTransitionGroup>
                        </Col>
                    </Row>
                    <Button onClick={this.showContactModal} style={{width:"100%", height:"50px", backgroundColor:"#49A3DC", color:"#FFFFFF", position:"fixed", bottom:"0", left:"0", zIndex:"1"}}>Contact Broker</Button>
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

