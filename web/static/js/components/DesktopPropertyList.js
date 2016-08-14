import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import DesktopPropertyTile from './DesktopPropertyTile.js';
import { Grid, Row, Col, Panel, Button, FormGroup, ControlLabel, FormControl, InputGroup, Carousel, CarouselItem, DropdownButton, MenuItem } from 'react-bootstrap';

export default class DesktopPropertyList extends Component {

  constructor(props) {
    super(props);
  }

  render () {

    var properties = this.props.properties;

    return (
        <div style={{overflowY: "scroll", width: "100%", height:"100%", backgroundColor:"#ecf0f1"}}>
          {properties.map((property, index) => {
            return <DesktopPropertyTile key={index} property={property} tileClick={this.props.tileClick} />;
          })}
        </div>
    );
  }
}
