import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Grid, Row, Col, Panel, Button, FormGroup, ControlLabel, FormControl, InputGroup, Carousel, CarouselItem, DropdownButton, MenuItem } from 'react-bootstrap';

const isBrowser = typeof window !== 'undefined';
const VisibilitySensor = isBrowser ? require('react-visibility-sensor') : undefined;

export default class TabletEmptyTile extends Component {

  constructor(props) {
    super(props);

    this.visibilityChanged = this.visibilityChanged.bind(this);
  }

  visibilityChanged(isVisible) {
    
    if(isVisible) {
      console.log("empty tile is visible ");
      this.props.visibilityChanged(this.props.index);
    }
  }

  render () {

    return (
          <div className="panel b text-center horizontalPDPTiles" style={{display:"inline-block", position:"relative", height:"130px", width:"60%", padding:"0px", overflowY:"hidden"}} onClick={this.tileClick}>

           {isBrowser ? 
                <VisibilitySensor onChange={this.visibilityChanged}>
                  <div>
                    <div style={{width:"40%", height:"130px", position:"absolute", zIndex:"0", float:"left", backgroundColor:"#95a5a6"}}>
                    </div>
                    <div style={{width:"60%", height:"130px", float:"right"}}>
                      <div style={{textAlign:"center", width:"100%", fontSize:"16px", marginTop:"10px", fontWeight:"200", backgroundColor:"#95a5a6"}}></div>
                      <div style={{textAlign:"center", width:"45%", float:"left", fontSize:"14px", fontWeight:"100", backgroundColor:"#95a5a6"}}></div>
                      <div style={{textAlign:"center", width:"45%", float:"right", fontSize:"14px", fontWeight:"100", backgroundColor:"#95a5a6"}}></div>
                    </div>
                  </div>
                </VisibilitySensor>
              : 
                <div>
                  <div style={{width:"40%", height:"130px", position:"absolute", zIndex:"0", float:"left", backgroundColor:"#95a5a6"}}>
                  </div>
                  <div style={{width:"60%", height:"130px", float:"right"}}>
                    <div style={{textAlign:"center", width:"100%", fontSize:"16px", marginTop:"10px", fontWeight:"200", backgroundColor:"#95a5a6"}}></div>
                    <div style={{textAlign:"center", width:"45%", float:"left", fontSize:"14px", fontWeight:"100", backgroundColor:"#95a5a6"}}></div>
                    <div style={{textAlign:"center", width:"45%", float:"right", fontSize:"14px", fontWeight:"100", backgroundColor:"#95a5a6"}}></div>
                  </div>
                </div>
           }
          </div>

    );
  }
}
