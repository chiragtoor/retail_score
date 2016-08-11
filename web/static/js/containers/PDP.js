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
import PeoplePanel from '../components/PeoplePanel';
import CompetitionPanel from '../components/CompetitionPanel';

import { Grid, Row, Col, Panel, Button, ButtonGroup, FormGroup, ControlLabel, FormControl, InputGroup, Carousel, CarouselItem } from 'react-bootstrap';

// const isBrowser = typeof window !== 'undefined';
// const C3Chart = isBrowser ? require('react-c3') : undefined;


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
      if(this.props.property.agents) {
        this.state.modal = <div style={{height:"300px", width:"100%", backgroundColor:"#FFFFFF", position:"fixed", zIndex:"3", bottom:"0", right:"0"}}>
                      <ContactModal submitContact={this.hideModals} agent={this.props.property.agents[0]} />
                     </div>;
        this.state.dimDiv = <div className="PDPDimDiv" onClick={this.hideModals}></div>;
        this.setState(this.state);
      }
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

    componentDidMount(){
      // this.props.loadProperty(this.props.params.propertyId);
    }

    render() {

        var property = this.props.property;

        var demographics = this.props.property.demographics;
        var tapestry = demographics.tapestry;

        console.log("this is the property " + JSON.stringify(property));

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


        return (
            <ContentWrapper unwrap>
                <div className="hidden-md hidden-lg" style={{width:"100%", backgroundColor:"#ecf0f1"}}>
                  { property ? <MobilePropertySummary property={property} /> : null}
                </div>

                <div style={{backgroundColor:"#ecf0f1"}} className="p-lg">
                    <Row>
                        <Col lg={ 12 }>
                          {property ? <RetailScorePanel showModal={this.showRetailScoreExpalanation} property={property} /> : null }
                          { demographics ? <DemographicPanel data={demographics} /> : null}
                          {property ? <CompetitionPanel property={property} /> : null}
                          { tapestry ? <PeoplePanel people={tapestry}/> : null}
                        </Col>
                        
                        <Col className="hidden-md hidden-lg">
                          <ReactCSSTransitionGroup {...dimDivTransitionOptions} >
                            {this.state.dimDiv}
                          </ReactCSSTransitionGroup>
                          <ReactCSSTransitionGroup {...filterTransitionOptions} >
                            {this.state.modal}
                          </ReactCSSTransitionGroup>
                        </Col>

                        <div className="hidden-lg hidden-md" style={{width:"100%", height:"50px"}}/>
                    </Row>
                    <Button onClick={this.showContactModal} style={{width:"100%", height:"50px", fontSize:"20px", fontWeight:"300px", backgroundColor:"#49A3DC", color:"#FFFFFF", position:"fixed", bottom:"0", left:"0", zIndex:"2"}}>I want more information</Button>
                </div>
            </ContentWrapper>
            );
    }

}

const mapStateToProps = (state) => {
  return {
    server_side: state.server_side,
    property: state.property
  };
};
export default connect(mapStateToProps, Actions)(PDP);

