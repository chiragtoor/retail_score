import React from 'react';
import { connect } from "react-redux";

import * as Actions from '../actions';

import ContentWrapper from '../components/Base/ContentWrapper';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import RetailScoreExplanation from '../components/RetailScoreExplanation';
import ContactModal from '../components/ContactModal';
import MobilePropertySummary from '../components/MobilePropertySummary';
import DesktopPropertySummary from '../components/DesktopPropertySummary';
import RetailScorePanel from '../components/RetailScorePanel';
import DemographicPanel from '../components/DemographicPanel';
import DesktopDemographicPanel from '../components/DesktopDemographicPanel';
import PeoplePanel from '../components/PeoplePanel';
import CompetitionPanel from '../components/CompetitionPanel';
import DesktopCompetitionPanel from '../components/DesktopCompetitionPanel';
import DesktopRetailCompetitionPanel from '../components/DesktopRetailCompetitionPanel';
import BusinessDetails from '../components/BusinessDetails';


import { Grid, Row, Col, Panel, Button, ButtonGroup, Modal, FormGroup, ControlLabel, FormControl, InputGroup, Carousel, CarouselItem } from 'react-bootstrap';

// const isBrowser = typeof window !== 'undefined';
// const C3Chart = isBrowser ? require('react-c3') : undefined;


class PDP extends React.Component {

    constructor(props){
      super(props);

      this.showRetailScoreExpalanation = this.showRetailScoreExpalanation.bind(this);
      this.hideModals = this.hideModals.bind(this);
      this.showContactModal = this.showContactModal.bind(this);
      this.submitContactAndHideModal = this.submitContactAndHideModal.bind(this);
      this.submitContact = this.submitContact.bind(this);
      this.desktopContactFailed = this.desktopContactFailed.bind(this);
      this.mobileContactFailed = this.mobileContactFailed.bind(this);
      this.showBusinessDetailsModal  = this.showBusinessDetailsModal.bind(this);
      this.hideBusinessDetails = this.hideBusinessDetails.bind(this);

      this.state= 
      { 
        dimDiv: null,
        modal: null,
        desktopContactSuccess: false,
        desktopContactFailure: false,
        mobileContactSuccess: false,
        businessDetailsModal: null
      }
    }

    showContactModal(){

      var name;
      var email;
      var message;

      if (typeof(Storage) !== "undefined") {
        name = localStorage.getItem('name');
        email = localStorage.getItem('email');
        message = localStorage.getItem('message');
      }

      //if we already have the data we need to contact then 1-tap contact
      if(name && email){
        if(!message) {
          message = "Hello, I am interested in this property and want some more information.";
        }
        this.submitContact({
          "message":{
            "contact_name": name,
            "contact_email_address": email,
            "body": message,
            "property_id": this.props.property.id
          }
        });
      } else if(this.props.property.agents) {
        console.log("show the modal");
        this.state.modal = <div style={{height:"300px", width:"100%", backgroundColor:"#FFFFFF", position:"fixed", zIndex:"3", bottom:"0", right:"0"}}>
                      <ContactModal contactFailed={this.mobileContactFailed} submitContact={this.submitContactAndHideModal} propertyId={this.props.property.id} agent={this.props.property.agents[0]} mixpanel={this.context.mixpanel} />
                     </div>;
        this.state.dimDiv = <div className="PDPDimDiv" onClick={this.hideModals}></div>;
        this.setState(this.state);

        this.context.mixpanel.track('Show Mobile Contact Modal');
      }
    }

    submitContact(data){
      this.props.submitContact(data);
      this.state.desktopContactSuccess = true;
      this.state.mobileContactSuccess = true;
      this.setState(this.state);
    }

    submitContactAndHideModal(data) {
      console.log("in pdp");
      this.props.submitContact(data);
      this.hideModals();
    }

    showRetailScoreExpalanation() {
      this.state.modal = <div style={{height:"300px", width:"100%", backgroundColor:"#FFFFFF", position:"fixed", zIndex:"3", bottom:"0", right:"0"}}>
                    <RetailScoreExplanation hide={this.hideFilters} mixpanel={this.context.mixpanel} />
                   </div>;
      this.state.dimDiv = <div className="PDPDimDiv" onClick={this.hideModals}></div>;
      this.setState(this.state);
    }

    showBusinessDetailsModal(data, label) {

      this.state.businessDetailsModal = <div style={{height:"100%", width:"100%", position:"fixed", zIndex:"5", bottom:"0", top:"0"}}> 
      <BusinessDetails  businesses={data} label={label} hideBusinessDetails={this.hideBusinessDetails} />
      </div>;
      this.setState(this.state);
    }

    hideBusinessDetails(){
      this.state.businessDetailsModal = null;
      this.setState(this.state);
    }

    mobileContactFailed() {
      this.state.modal = <div style={{height:"200px", width:"100%", textAlign:"center", backgroundColor:"#FFFFFF", position:"fixed", zIndex:"3", bottom:"0", right:"0"}}>
                        <p style={{fontSize:"18px", fontWeight:"400px", textAlign:"center", marginTop:"10px"}}>Please provide your Name, E-Mail and a Message for the broker.</p>
                        <Button style={{backgroundColor:"#49A3DC", color:"#FFFFFF", fontSize:"18px"}} onClick={this.showContactModal}>Got it</Button>
                   </div>;
      this.state.dimDiv = <div className="PDPDimDiv" onClick={this.hideModals}></div>;
      this.setState(this.state);
    }

    desktopContactFailed() {
      this.state.desktopContactFailure = true;
      this.setState(this.state);
    }

    hideModals() {
      this.state.modal = null;
      this.state.dimDiv = null;
      this.state.desktopContactSuccess = false;
      this.state.desktopContactFailure = false;
      this.setState(this.state);
    }

    componentDidMount(){
      this.props.loadProperty(this.props.params.propertyId);
    }

    render() {

        var property = this.props.property;


        var demographics = this.props.property.demographics;
        var tapestry;

        if(demographics) {
          tapestry = demographics.tapestry;
        }

        var filterTransitionOptions = {
          transitionName: "contactFade",
          transitionEnterTimeout: 500,
          transitionLeaveTimeout: 500
        };

        var businessDetailsOptions = {
          transitionName: "businessDetails",
          transitionEnterTimeout: 500,
          transitionLeaveTimeout: 500
        };

        var dimDivTransitionOptions = {
          transitionName: "dimFade",
          transitionEnterTimeout: 500,
          transitionLeaveTimeout: 500
        };


        var contactButtonText = "I want more information";

        if (typeof(Storage) !== "undefined") {
          if(localStorage.getItem('name') && localStorage.getItem('email')){
            contactButtonText = "1-Tap Contact";
          }
        } 

        if(this.state.mobileContactSuccess == true){
          contactButtonText = "Expect to hear back soon!";
        }

        return (
            <ContentWrapper unwrap>
                {/*MOBILE AND TABLET HTML*/}

                <Col md={12} lg={12} className="hidden-sm hidden-xs" style={{height:"50px", borderBottom:"solid thin #CCCCCC", width:"100%", backgroundColor:"#FFFFFF"}}>
                  <img style={{height:"46px", paddingTop:"2px"}} src="https://s3-us-west-2.amazonaws.com/homepage-image-assets/retail_score_logo_blue.png" />
                </Col>

                <div className="hidden-md hidden-lg" style={{width:"100%", backgroundColor:"#FFFFFF"}}>
                  <Row>
                    <Col className="col-sm-offset-1" sm={ 10 } xs={12}>
                      { property ? <MobilePropertySummary property={property} /> : null}
                    </Col>
                  </Row>
                </div>
                <div className="hidden-md hidden-lg"  style={{backgroundColor:"#FFFFFF"}} className="p-lg">
                    <Row>
                        <Col className="col-sm-offset-1 hidden-md hidden-lg" lg={ 12 } md={ 10 } sm={ 10 } xs={12}>
                          {property ? <RetailScorePanel scoreType={this.props.scoreType} showModal={this.showRetailScoreExpalanation} showBusinessDetails={this.showBusinessDetailsModal} property={property} /> : null }
                          { demographics ? <DemographicPanel data={demographics} mixpanel={this.context.mixpanel} /> : null}
                          {property.lat ? <CompetitionPanel property={property} mixpanel={this.context.mixpanel} /> : null}
                          { tapestry ? <PeoplePanel people={tapestry}/> : null}
                        </Col>
                        
                        <Col className="hidden-md hidden-lg">
                          <ReactCSSTransitionGroup {...dimDivTransitionOptions} >
                            {this.state.dimDiv}
                          </ReactCSSTransitionGroup>
                          <ReactCSSTransitionGroup {...filterTransitionOptions} >
                            {this.state.modal}
                          </ReactCSSTransitionGroup>
                          <ReactCSSTransitionGroup {...businessDetailsOptions}>
                            {this.state.businessDetailsModal}
                          </ReactCSSTransitionGroup>

                        </Col>
                    </Row>
                    <div className="hidden-md hidden-lg" style={{width:"100%", height:"50px"}}/>
                    <Button className="hidden-md hidden-lg" onClick={this.showContactModal} style={{width:"100%", height:"50px", fontSize:"20px", fontWeight:"300px", backgroundColor:"#49A3DC", color:"#FFFFFF", position:"fixed", bottom:"0", left:"0", zIndex:"2"}}>{contactButtonText}</Button>
                </div>

                {/*DESKTOP HTML*/}

                <div className="hidden-xs hidden-sm hidden-md" style={{width:"100%", backgroundColor:"#FFFFFF"}}>
                  <Row>
                    <Col className="col-lg-offset-1 " lg={ 10 } >
                      { property ? <DesktopPropertySummary scoreType={this.props.scoreType} submitContact={this.submitContact} contactFailed={this.desktopContactFailed} property={property} mixpanel={this.context.mixpanel} /> : null}
                    </Col>
                    <Col className="col-lg-offset-1" lg={10}>
                      {property.lat ? <DesktopRetailCompetitionPanel property={property} mixpanel={this.context.mixpanel} tag={"largeRetailCompetition"}/> : null }
                    </Col>                  
                    <Col className="col-lg-offset-1 " lg={ 10 } >
                      { demographics ? <DesktopDemographicPanel data={demographics} mixpanel={this.context.mixpanel} tag={"largeDemographics"} /> : null}
                    </Col>
                  </Row>
                </div>

                <div className="hidden-xs hidden-sm hidden-lg" style={{width:"100%", backgroundColor:"#FFFFFF"}}>
                  <Row>
                    <Col md={ 12 } >
                      { property ? <DesktopPropertySummary submitContact={this.submitContact} contactFailed={this.desktopContactFailed} property={property} mixpanel={this.context.mixpanel} /> : null}
                    </Col>
                    <Col md={ 12 } >
                      {property.lat ? <DesktopRetailCompetitionPanel property={property} mixpanel={this.context.mixpanel} tag={"mediumRetailCompetition"}/> : null }
                    </Col>
                    <Col md={ 12 } >
                      { demographics != null ? <DesktopDemographicPanel data={demographics} mixpanel={this.context.mixpanel} tag={"mediumDemographics"}/> : null}
                    </Col>

                    <Modal className="hidden-sm hidden-xs" show={this.state.desktopContactSuccess}>
                      <Modal.Body style={{textAlign:"center"}}>
                        <p style={{fontSize:"18px", fontWeight:"400px", textAlign:"center"}}>Your message has been sent. Expect a response soon!</p>
                        <Button style={{backgroundColor:"#49A3DC", color:"#FFFFFF"}} onClick={this.hideModals}>Awesome</Button>
                      </Modal.Body>
                    </Modal>

                     <Modal className="hidden-sm hidden-xs" show={this.state.desktopContactFailure}>
                      <Modal.Body style={{textAlign:"center"}}>
                        <p style={{fontSize:"18px", fontWeight:"400px", textAlign:"center"}}>Please provide your Name, E-Mail and a Message for the broker.</p>
                        <Button style={{backgroundColor:"#49A3DC", color:"#FFFFFF"}} onClick={this.hideModals}>Ok</Button>
                      </Modal.Body>
                    </Modal>
                  </Row>
                </div>

            </ContentWrapper>
            );
    }

}

PDP.contextTypes = {
    mixpanel: React.PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
  return {
    server_side: state.server_side,
    property: state.property,
    scoreType: state.score_type
  };
};
export default connect(mapStateToProps, Actions)(PDP);

