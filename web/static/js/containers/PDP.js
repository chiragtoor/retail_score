import React from 'react';
import { connect } from "react-redux";

import * as Actions from '../actions';

import ContentWrapper from '../components/Base/ContentWrapper';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import RetailScoreExplanation from '../components/RetailScoreExplanation';
import ContactModal from '../components/ContactModal';
import MobilePropertySummary from '../components/MobilePropertySummary';
import RetailScorePanel from '../components/RetailScorePanel';
import DemographicPanel from '../components/DemographicPanel';


import { Grid, Row, Col, Panel, Button, ButtonGroup, FormGroup, ControlLabel, FormControl, InputGroup, Carousel, CarouselItem } from 'react-bootstrap';

// const isBrowser = typeof window !== 'undefined';
// const C3Chart = isBrowser ? require('react-c3') : undefined;

const property = {
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
      this.state.modal = <div style={{height:"300px", width:"100%", backgroundColor:"#FFFFFF", position:"fixed", zIndex:"3", bottom:"0", right:"0"}}>
                    <ContactModal submitContact={this.hideModals} />
                   </div>;
      this.state.dimDiv = <div className="PDPDimDiv" onClick={this.hideModals}></div>;
      this.setState(this.state);
    }

    showRetailScoreExpalanation() {
      this.state.modal = <div style={{height:"300px", width:"100%", backgroundColor:"#FFFFFF", position:"fixed", zIndex:"3", bottom:"0", right:"0"}}>
                    <RetailScoreExplanation helpful={this.hideModals} notHelpful={this.hideModals} />
                   </div>;
      this.state.dimDiv = <div className="PDPDimDiv" onClick={this.hideModals}></div>;
      this.setState(this.state);
    }

    hideModals() {
      this.state.modal = null;
      this.state.dimDiv = null;
      this.setState(this.state);
    }

    render() {

        var filterTransitionOptions = {
          transitionName: "contactFade",
          transitionEnterTimeout: 500,
          transitionLeaveTimeout: 500
        };

        var dimDivTransitionOptions = {
          transitionName: "dimFade",
          transitionEnterTimeout: 500,
          transitionLeaveTimeout: 500
        };

        var formattedAddress = property.streetAddress + ", " + property.city + ", " + property.state;

        return (
            <ContentWrapper unwrap>
                <div className="hidden-md hidden-lg" style={{width:"100%", height:"350px"}}>
                  <MobilePropertySummary property={property} />
                </div>

                <div className="p-lg">
                    <Row>
                        <Col lg={ 12 }>
                          <RetailScorePanel showModal={this.showRetailScoreExpalanation} property={property} />
                          <DemographicPanel />
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

