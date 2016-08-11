import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import PropertyTile from './PropertyTile.js';
import EmptyTile from './EmptyTile.js';
import { Grid, Row, Col, Panel, Button, FormGroup, ControlLabel, FormControl, InputGroup, Carousel, CarouselItem, DropdownButton, MenuItem } from 'react-bootstrap';

export default class MobilePropertyList extends Component {

  constructor(props) {
    super(props);

    this.visibilityChanged = this.visibilityChanged.bind(this);
    this.emptyTileVisible = this.emptyTileVisible.bind(this);


    this.state = {
      visibleIndex: 0
    }

  }

  visibilityChanged(property, index) {

      if(index != this.state.visibleIndex) {
        this.state.visibleIndex = index;
        this.setState(this.state);
        this.props.visibilityChanged(property);
      }
  }

  emptyTileVisible(index) {

      if(index != this.state.visibleIndex) {
        this.state.visibleIndex = index;
        this.setState(this.state);
      }
  }

  render () {

    var properties = this.props.properties;

    var maxLoad = this.state.visibleIndex + 10;
    var minLoad = this.state.visibleIndex - 10;

    if(maxLoad > (properties.length - 1) ) {
      maxLoad = properties.length - 1
    } 

    if(minLoad < 0 ) {
      minLoad = 0;
    }

    return (
        <div style={{overflowX: "scroll", overflowY: "hidden", display: "flex", width: "100%", height:"150px", backgroundColor:"#ecf0f1"}}>
          {properties.map((property, index) => {
            if(index <= maxLoad && index >= minLoad){
              return <PropertyTile key={index} index={index} property={property} tileClick={this.props.tileClick} visibilityChanged={this.visibilityChanged} />;
            } else {
              return <EmptyTile  key={index} index={index} visibilityChanged={this.emptyTileVisible} />;
            } 
          })}
        </div>
    );
  }
}
