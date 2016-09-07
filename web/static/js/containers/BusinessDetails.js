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

import { Grid, Row, Col, Panel, Button, ButtonGroup, Modal, FormGroup, ControlLabel, FormControl, InputGroup, Carousel, CarouselItem } from 'react-bootstrap';

class BusinessDetails extends React.Component {

    constructor(props){
      super(props);
    }


    render() {

        var businesses = this.props.businesses;

        return (
            <div style={{width:"100%", height:"100%"}}>
              <Col sm={12} xs={12} className="hidden-sm hidden-xs" style={{height:"50px", width:"100%", backgroundColor:"#49A3DC", color:"#FFFFFF"}}>
               Restaurants
              </Col>
              <Col sm={12} xs={12} className="hidden-sm hidden-xs" style={{height:"-webkit-calc(100%-50px)", width:"100%", backgroundColor:"#FFFFFF"}}>
                {businesses.map(business, index){

                });
                }
              </Col>
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

