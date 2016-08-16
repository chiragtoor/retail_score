import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Grid, Row, Col, Panel, Button, FormGroup, ControlLabel, FormControl, InputGroup, Carousel, CarouselItem, DropdownButton, MenuItem } from 'react-bootstrap';

const isBrowser = typeof window !== 'undefined';
const VisibilitySensor = isBrowser ? require('react-visibility-sensor') : undefined;

export default class MobileNextTile extends Component {

  render () {

    return (
            <div className="hidden-sm text-center horizontalPDPTiles" style={{display:"inline-block", position:"relative", border:"solid thin #7f8c8d", height:"130px", marginLeft:"0px", padding:"0px", overflowY:"hidden"}}>
              <Button onClick={this.props.userClick} style={{fontSize:"20px", backgroundColor:"#FFFFFF", color:"#7f8c8d", height:"100%"}}>Load More<br/> <em className="fa fa-arrow-right"></em></Button>
            </div>
    );
  }
}
