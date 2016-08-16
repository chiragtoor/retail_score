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
        this.state.modal = <div className="" style={{height:"300px", width:"100%", backgroundColor:"#FFFFFF", position:"fixed", zIndex:"3", bottom:"0", right:"0"}}>
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

        var dimDivTransitionOptions = {
          transitionName: "dimFade",
          transitionEnterTimeout: 500,
          transitionLeaveTimeout: 500
        };


        return (
            <ContentWrapper unwrap>
                {/*MOBILE AND TABLET HTML*/}

                <Col md={12} lg={12} className="hidden-sm hidden-xs" style={{height:"50px", color:"#FFFFFF", width:"100%", backgroundColor:"#49A3DC"}}>
                  <img style={{height:"46px", paddingTop:"2px"}} src="https://s3-us-west-2.amazonaws.com/homepage-image-assets/retail_score_logo_white.png" />
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
                          {property ? <RetailScorePanel showModal={this.showRetailScoreExpalanation} property={property} /> : null }
                          { demographics ? <DemographicPanel data={demographics} /> : null}
                          {property.lat ? <CompetitionPanel property={property} /> : null}
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
                    </Row>
                    <div className="hidden-md hidden-lg" style={{width:"100%", height:"50px"}}/>
                    <Button className="hidden-md hidden-lg" onClick={this.showContactModal} style={{width:"100%", height:"50px", fontSize:"20px", fontWeight:"300px", backgroundColor:"#49A3DC", color:"#FFFFFF", position:"fixed", bottom:"0", left:"0", zIndex:"2"}}>I want more information</Button>
                </div>

                {/*DESKTOP HTML*/}

                <div className="hidden-xs hidden-sm hidden-md" style={{width:"100%", backgroundColor:"#FFFFFF"}}>
                  <Row>
                    <Col className="col-lg-offset-1 " lg={ 10 } >
                      { property ? <DesktopPropertySummary property={property} /> : null}
                    </Col>
                    <Col className="col-lg-offset-1 " lg={ 10 } >
                      { demographics ? <DesktopDemographicPanel data={demographics} tag={"largeDemographics"} /> : null}
                    </Col>
                    <Col className="col-lg-offset-1 " lg={ 10 } >
                      {property.lat ? <DesktopCompetitionPanel property={property} tag={"largeCompetition"} /> : null}
                    </Col>
                  </Row>
                </div>

                <div className="hidden-xs hidden-sm hidden-lg" style={{width:"100%", backgroundColor:"#FFFFFF"}}>
                  <Row>
                    <Col md={ 12 } >
                      { property ? <DesktopPropertySummary property={property} /> : null}
                    </Col>
                    <Col md={ 12 } >
                      { demographics != null ? <DesktopDemographicPanel data={demographics} tag={"mediumDemographics"}/> : null}
                    </Col>
                    <Col md={ 12 } >
                      {property.lat ? <DesktopCompetitionPanel property={property} tag={"mediumCompetition"}/> : null}
                    </Col>
                  </Row>
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

