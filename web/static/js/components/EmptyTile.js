import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Grid, Row, Col, Panel, Button, FormGroup, ControlLabel, FormControl, InputGroup, Carousel, CarouselItem, DropdownButton, MenuItem } from 'react-bootstrap';

const isBrowser = typeof window !== 'undefined';
const VisibilitySensor = isBrowser ? require('react-visibility-sensor') : undefined;

export default class EmptyTile extends Component {

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
          <div className="panel b text-center horizontalPDPTiles" style={{display:"inline-block", position:"relative", height:"130px", width:"85%", padding:"0px", overflowY:"hidden"}} onClick={this.tileClick}>

           {isBrowser ? 
                <VisibilitySensor onChange={this.visibilityChanged}>
                  <div style={{width:"100px", height:"100px"}}>
                      Loading
                  </div>
                </VisibilitySensor>
              : 
                <div>
                    Loading
                </div>
            }
          </div>

    );
  }
}
