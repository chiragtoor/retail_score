import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Grid, Row, Col, Panel, Button, FormGroup, ControlLabel, Glyphicon, FormControl, InputGroup, Carousel, CarouselItem, DropdownButton, MenuItem } from 'react-bootstrap';

export default class DesktopRetailScoreExplanation extends Component {

  constructor(props) {
    super(props);

    this.helpful = this.helpful.bind(this);
    this.notHelpful = this.notHelpful.bind(this);

  }

  helpful() {
    this.props.mixpanel.track('RetailScore Explanation Modal Helpful');
    this.props.hide();
  }

  notHelpful() {
    this.props.mixpanel.track('RetailScore Explanation Modal Not Helpful');
    this.props.hide();
  }

  render () {
    return (
            <div style={{height:"100%", widht:"100%"}}>
              <h3 style={{textAlign:"center"}}>What is Retail Score?</h3>

              <p style={{textAlign:"center", fontSize:"16px"}} >{"The colors on this map show you what city blocks have the highest RetailScores, the greener the better! This means that retail businesses located in green areas on the map are doing more sales and have more traffic than businesses located in the yellower areas."}</p>
              
              <div style={{width:"70%", marginLeft:"15%", marginTop:"20px"}}>
                <p style={{width:"100%", textAlign:"center", fontSize:"20px", fontWeight:"400"}}>Was this helpful?</p>
                <Button style={{backgroundColor:"#49A3DC", color:"#FFFFFF", fontSize:"20px",  float:"left"}} onClick={this.helpful}><em className="fa fa-thumbs-up"></em></Button>
                <Button style={{backgroundColor:"#49A3DC", color:"#FFFFFF", fontSize:"20px", float:"right"}} onClick={this.notHelpful}><em className="fa fa-thumbs-down"></em></Button>
              </div>
            </div>
    );
  }
}
