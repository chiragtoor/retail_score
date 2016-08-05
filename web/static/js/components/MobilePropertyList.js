import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import PropertyTile from './PropertyTile.js'
import { Grid, Row, Col, Panel, Button, FormGroup, ControlLabel, FormControl, InputGroup, Carousel, CarouselItem, DropdownButton, MenuItem } from 'react-bootstrap';

export default class MobilePropertyList extends Component {

  constructor(props) {
    super(props);
  }

  render () {

    var properties = this.props.properties;

    return (
        <div style={{overflowX: "scroll", overflowY: "hidden", display: "flex", width: "100%", height:"150px", backgroundColor:"#ecf0f1"}}>
          {properties.map((property, index) => {
            return <PropertyTile key={index} property={property} tileClick={this.props.tileClick} visibilityChanged={this.props.visibilityChanged} />
          })}
        </div>
    );
  }
}
