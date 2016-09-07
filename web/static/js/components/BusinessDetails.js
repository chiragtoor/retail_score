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
      console.log('business details');
    }

    render() {
        var businesses = this.props.businesses;

        console.log(this.props.businesses);
        return (
            <div style={{width:"100%", height:"100%", backgroundColor:"#FFFFFF"}}>
              <Col sm={12} xs={12} style={{height:"30px",backgroundColor:"#49A3DC", color:"#FFFFFF", padding:"0", margin:"0"}}>
                <Button onClick={this.props.hideBusinessDetails} style={{float:"left", border:"none", marginLeft:"0px", backgroundColor:"#49A3DC", color:"#FFFFFF", position:"absolute", zIndex:"1"}}>
                  <em className="fa fa-chevron-left"></em>
                </Button>
                <span style={{float:"left", marginLeft:"10px", textAlign:"center", width:"100%", fontSize:"18px"}}>
                  Restaurants
                </span>
              </Col>
              <Col sm={12} xs={12} style={{height:"-webkit-calc(100%-50px)", width:"100%", backgroundColor:"#FFFFFF", padding:"0", margin:"0"}}>
                {businesses.map((business, index) => {
                  return <div style={{borderBottom:"solid thin #ecf0f1", height:"50px", width:"100%", fontSize:"16px", paddingLeft:"5px"}}>
                    {business.name}
                  </div>;
                })
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

