import React from 'react';
import { connect } from "react-redux";

import * as Actions from '../actions';

import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { Row, Col, Button, Modal } from 'react-bootstrap';

import ContactForm from '../components/ContactForm';
import DemographicPanel from '../components/DemographicPanel';
import RetailScorePanel from '../components/RetailScorePanel';

const isBrowser = typeof window !== 'undefined';

class PropertyDetailsPage extends React.Component {

    constructor(props) {
      super(props);

      this.hideModals = this.hideModals.bind(this);
      this.showContactModal = this.showContactModal.bind(this);
      this.submitContactAndHideModal = this.submitContactAndHideModal.bind(this);
      this.submitContact = this.submitContact.bind(this);

      this.state = { 
        dimDiv: null,
        modal: null,
        contactSuccess: false
      }
    }

    showContactModal(){
      this.state.modal = <div style={{height:"300px", width:"100%", backgroundColor:"#FFFFFF", position:"fixed", zIndex:"3", bottom:"0", right:"0"}}>
                          <ContactForm submitContact={this.submitContactAndHideModal} propertyId={this.props.property.id} agent={this.props.property.agents[0]} />
                        </div>;
      this.state.dimDiv = <div className="PDPDimDiv" onClick={this.hideModals}></div>;
      this.setState(this.state);
    }

    submitContact(data){
      this.props.submitContact(data);
      this.setState({contactSuccess: true});
    }

    submitContactAndHideModal(data) {
      this.props.submitContact(data);
      this.hideModals();
    }

    hideModals() {
      this.state.modal = null;
      this.state.dimDiv = null;
      this.setState(this.state);
    }

    componentDidMount(){
      this.props.loadProperty(this.props.params.propertyId);
    }

    getImageUrl(lat, lng, heading) {
      var width = isBrowser ? window.innerWidth : 640;

      return `https://maps.googleapis.com/maps/api/streetview?size=${width}x250&location=${lat},${lng}&heading=${heading}&key=AIzaSyASv9f24GcF78YIKRsX3uCRkj58JzZ8NaA`;
    }

    render() {

        var property = this.props.property;


        var demographics = this.props.property.demographics;

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

        var styledPrice;
        var styledSqft;


        if(this.props.property.min_sq_feet) {

          if(property.min_sq_feet == property.max_sq_feet) {
            styledSqft = property.min_sq_feet.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " Square Feet";
          } else {
            styledSqft = property.min_sq_feet.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " - " + property.max_sq_feet.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " Square Feet";
          }
        }
        if(property.rental_rate_min) {
          if(property.rental_rate_min == property.rental_rate_max) {
            styledPrice = "$" + property.rental_rate_min.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " Monthly Rent";
          } else {
            styledPrice = "$" + property.rental_rate_min.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " - " + "$" + property.rental_rate_max.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " Monthly Rent";
          }

        }

        return (
          <div className="containerWrapper">
            {/*MOBILE AND TABLET HTML*/}
            <div className="hidden-sm hidden-xs" style={{height:"50px", borderBottom:"solid thin #CCCCCC", width:"100%", backgroundColor:"#FFFFFF", marginBottom:"10px"}}>
              <img style={{height:"46px", paddingTop:"2px", marginLeft:"10px"}} src="https://s3-us-west-2.amazonaws.com/homepage-image-assets/retail_score_logo_blue.png" />
            </div>
            <div className="row pdpPadding">
              <div className="col-md-3 hidden-sm hidden-xs">
                {property.agents ? <ContactForm submitContact={this.props.submitContact} agent={property.agents[0]} propertyId={property.id} /> : null}
              </div>
              <div className="col-md-9 col-sm-12">
                <img className="propertyImageSize" src={this.getImageUrl(property.image_lat, property.image_lng, property.image_heading)} />
                <div className="row">
                  <div className="col-md-6 col-sm-12">
                    <center>
                      <div style={{fontSize:"24px"}}>
                        {this.props.property ? this.props.property.street_address : "Loading..."}
                        <span style={{fontSize:"18px"}} >{ this.props.property.city ? ", " + this.props.property.city + ", " + this.props.property.state : "Loading..."}</span> 
                        <h4 className="m0">{styledSqft}</h4>
                        <h4 className="m0">{styledPrice}</h4>
                      </div>
                    </center>
                  </div>
                  <div className="col-md-6 col-sm-12">
                    <RetailScorePanel property={property} />
                  </div>
                </div>
              </div>
            </div>
            <div>
              {demographics ? <DemographicPanel data={demographics} mixpanel={this.context.mixpanel} /> : null}
            </div>
            <div className="hidden-md hidden-lg"  style={{backgroundColor:"#FFFFFF"}} className="p-lg">
              <Row>
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
            <Modal className="hidden-sm hidden-xs" show={this.state.contactSuccess}>
              <Modal.Body style={{textAlign:"center"}}>
                <p style={{fontSize:"18px", fontWeight:"400px", textAlign:"center"}}>Your message has been sent. Expect a response soon!</p>
                <Button style={{backgroundColor:"#49A3DC", color:"#FFFFFF"}} onClick={this.hideModals}>Awesome</Button>
              </Modal.Body>
            </Modal>
          </div>
        );
    }

}

PropertyDetailsPage.contextTypes = {
    mixpanel: React.PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
  return {
    property: state.property,
    scoreType: state.score_type
  };
};
export default connect(mapStateToProps, Actions)(PropertyDetailsPage);