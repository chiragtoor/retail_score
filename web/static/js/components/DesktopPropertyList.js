import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import DesktopPropertyTile from './DesktopPropertyTile.js';
import { Grid, Row, Col, Panel, Button,Pagination, FormGroup, ControlLabel, FormControl, InputGroup, Carousel, CarouselItem, DropdownButton, MenuItem } from 'react-bootstrap';

export default class DesktopPropertyList extends Component {

  constructor(props) {
    super(props);

    this.handleSelect = this.handleSelect.bind(this);

    this.state = {
      page: 1
    };
  }

  handleSelect(eventKey) {
    this.state.page = eventKey;
    this.setState(this.state);
  }

  render () {

    var properties = this.props.properties;
    var num = properties.length/20;
    if(properties.length % 20 != 0) {
      num = num + 1;
    }

    num = Math.floor(num);

    var min = 20*(this.state.page - 1);
    var max = min + 20;

    var tiles = properties.slice(min, max);

    return (
        <div style={{overflowY: "scroll", width: "100%", height:"100%", backgroundColor:"#ecf0f1"}}>
          {tiles.map((property, index) => {
            return <DesktopPropertyTile key={index} property={property} tileClick={this.props.tileClick} />;
          })}

          <div style={{width:"100%", textAlign:"center", display:"inline-block"}}>
            <Pagination
              bsSize="large"
              items={num}
              activePage={this.state.page}
              maxButtons={5}
              onSelect={this.handleSelect} />
          </div>
        </div>
    );
  }
}
