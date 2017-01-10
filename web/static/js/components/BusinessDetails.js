import React from 'react';
import { connect } from "react-redux";

import * as Actions from '../actions';

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

import { Grid, Row, Col, Panel, Button, ButtonGroup, Modal, FormGroup, ControlLabel, FormControl, InputGroup, Carousel, CarouselItem } from 'react-bootstrap';

class BusinessDetails extends React.Component {

    constructor(props){
      super(props);

      this.showDetails = this.showDetails.bind(this);
      this.hideModals = this.hideModals.bind(this);
      this.openLink = this.openLink.bind(this);

      this.state = {
        dimDiv: null,
        details: null
      }
    }

    openLink(website){
      window.open(website,'_blank');
    }

    showDetails(business){
      console.log(business.place_id);
      var website = business.website ? business.website : null
      this.state.details = <div style={{height:"200px", width:"300px", zIndex:"3", position:"absolute", backgroundColor:"#FFFFFF"}}>
        <div>{business.name}</div>
        <div>{business.phone_number ? business.phone_number : null}</div>
        {website ? <div style={{color:"blue"}} onClick={e=> this.openLink(website)}><u>{website}</u></div> : null}
      </div>;

      this.state.dimDiv = <div className="dimDiv" onClick={this.hideModals}></div>;

      this.setState(this.state);
    }

    hideModals(){
      this.state.details = null;
      this.state.dimDiv = null;
      this.setState(this.state);
    }

    render() {
        var businesses = this.props.businesses;

        var dimDivTransitionOptions = {
          transitionName: "dimFade",
          transitionEnterTimeout: 500,
          transitionLeaveTimeout: 500
        };

        var detailsTransitionOptions = {
          transitionName: "detailsFade",
          transitionEnterTimeout: 500,
          transitionLeaveTimeout: 500
        };

        return (
            <div style={{width:"100%", height:"100%", backgroundColor:"#FFFFFF", overflow:"auto"}}>
              <Col sm={12} xs={12} style={{height:"30px",backgroundColor:"#49A3DC", color:"#FFFFFF", padding:"0", margin:"0"}}>
                <Button onClick={this.props.hideBusinessDetails} style={{float:"left", border:"none", marginLeft:"0px", backgroundColor:"#49A3DC", color:"#FFFFFF", position:"absolute", zIndex:"1"}}>
                  <em className="fa fa-chevron-left"></em>
                </Button>
                <span style={{float:"left", marginLeft:"10px", textAlign:"center", width:"100%", fontSize:"18px"}}>
                  {this.props.label ? this.props.label : "Restaurants"}
                </span>
              </Col>
              <Col sm={12} xs={12} style={{height:"-webkit-calc(100%-50px)", width:"100%", backgroundColor:"#FFFFFF", padding:"0", margin:"0"}}>
                {businesses.map((business, index) => {
                  return <Button onClick={e => this.showDetails(business)} style={{border:"none", textAlign:"left", borderBottom:"solid thin #ecf0f1", height:"50px", width:"100%", fontSize:"16px", paddingLeft:"5px"}}>
                    {business.name}
                  </Button>;
                })
                }
              </Col>
              <ReactCSSTransitionGroup {...dimDivTransitionOptions} >
                {this.state.dimDiv}
              </ReactCSSTransitionGroup>
              <ReactCSSTransitionGroup {...dimDivTransitionOptions} >
                {this.state.details}
              </ReactCSSTransitionGroup>
            </div>
            );
    }

}

BusinessDetails.contextTypes = {
    mixpanel: React.PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
  return {
    server_side: state.server_side,
    property: state.property
  };
};
export default connect(mapStateToProps, Actions)(BusinessDetails);