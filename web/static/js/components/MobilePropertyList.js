import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import MobilePropertyTile from './MobilePropertyTile.js';
import MobileNextTile from './MobileNextTile.js';
import MobileLastTile from './MobileLastTile.js';
import { Grid, Row, Col, Panel, Button, FormGroup, ControlLabel, FormControl, InputGroup, Carousel, CarouselItem, DropdownButton, MenuItem } from 'react-bootstrap';

export default class MobilePropertyList extends Component {

  constructor(props) {
    super(props);

    this.visibilityChanged = this.visibilityChanged.bind(this);
    this.lastPage = this.lastPage.bind(this);
    this.nextPage = this.nextPage.bind(this);
    this.scrollToFront = this.scrollToFront.bind(this);

    this.state = {
      visibleIndex: 0,
      page: 0,
      minIndex: 0,
      maxIndex: 20
    }

  }

  componentWillReceiveProps(nextProps){
    
    if(nextProps.reset) {
      this.state.page = 0;
      this.state.minIndex = 0;
      this.state.maxIndex = 20;
      this.setState(this.state);
      this.scrollToFront();

      this.props.resetDone();
    }
    
  }

  visibilityChanged(property, index) {

      if(index != this.state.visibleIndex) {

        this.props.visibilityChanged(property);

        this.state.visibleIndex = index;
        this.setState(this.state);
      }

  }

  nextPage() {
    this.state.page = this.state.page + 1;
    this.state.minIndex = this.state.minIndex + 20;
    this.state.maxIndex = this.state.maxIndex + 20;
    this.setState(this.state);

    this.scrollToFront();
  }

  lastPage() {
    if(this.state.page > 0) {
      this.state.page = this.state.page - 1;
      this.state.minIndex = this.state.minIndex - 20;
      this.state.maxIndex = this.state.maxIndex - 20;
      this.setState(this.state);
    }
  }

  scrollToFront() {
    document.getElementById('first').scrollIntoView();
  }

  render () {

    var min = this.state.minIndex;
    var max = this.state.maxIndex;

    var maxLength = this.props.properties.length;

    var tiles = this.props.properties.slice(min, max);

    return (
        <div style={{overflowX: "scroll", overflowY: "hidden", display: "flex", width: "100%", height:"150px", backgroundColor:"#ecf0f1"}}>
          { min > 0 ? <MobileLastTile userClick={this.lastPage}/> : null}
          <div id="first" style={{color:"#ecf0f1", width:"2px", fontSize:"2px"}}>f</div>
          {tiles.map((property, index) => {
            return <MobilePropertyTile key={index} index={index} property={property} tileClick={this.props.tileClick} visibilityChanged={this.visibilityChanged} />;
          })}
          { max < maxLength ? <MobileNextTile userClick={this.nextPage}/> : null}
        </div>
    );
  }
}
