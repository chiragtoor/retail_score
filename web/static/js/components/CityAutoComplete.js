import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import PropertyTile from './PropertyTile.js'
import Autocomplete from 'react-autocomplete';
import * as Util from '../Util.js';

import { Grid, Row, Col, Panel, Button, FormGroup, ControlLabel, FormControl, InputGroup, Carousel, CarouselItem, DropdownButton, MenuItem } from 'react-bootstrap';


const styles = {
  item: {
    padding: '10px 6px',
    cursor: 'default'
  },
  highlightedItem: {
    color: 'white',
    background: 'hsl(203, 68%, 57%)',
    padding: '10px 6px',
    cursor: 'default'
  },
  menu: {
    border: 'solid 1px #ccc',
    backgroundColor:"#FFFFFF",
    overflow:"auto",
    maxHeight: '150px'
  },
  boxInput : {
    width:"100%",
    height:"100%",
    fontSize:"14px",
    borderWidth:"2px",
    float:"right",
    paddingLeft:"10px"
  },
  wrapper : {
    width: "100%",
    height:"50px",
    fontSize:"14px",
    borderWidth:"2px",
    position:"absolute",
    zIndex:"2"
  }
}

export default class CityAutoComplete extends Component {

  constructor(props) {
    super(props);

    this.sortStates = this.sortStates.bind(this);
    this.matchStateToTerm = this.matchStateToTerm.bind(this);
  }

  sortStates (a, b, value) {
    return (
      a.name.toLowerCase().indexOf(value.toLowerCase()) >
      b.name.toLowerCase().indexOf(value.toLowerCase()) ? -1 : 1
    )
  }

  matchStateToTerm (state, value) {
    return (
      state.name.toLowerCase().indexOf(value.toLowerCase()) !== -1 || state.generic
    )
  }

  render () {

    return (
      <div style={{width:"100%", height:"100%"}}>
        <Autocomplete
                        value={this.props.selectedCity}
                        inputProps={{name: "US state", style : styles.boxInput, placeholder: "Where are you opening this business?"}}
                        items={Util.cities}
                        getItemValue={(item) => item.name}
                        shouldItemRender={this.matchStateToTerm}
                        sortItems={this.sortStates}
                        menuStyle={styles.menu}
                        onChange={(event, value) => this.props.cityChanged(event, value)}
                        onSelect={value => this.props.citySelected(value)}
                        renderItem={(item, isHighlighted) => (
                          <div
                            style={isHighlighted ? styles.highlightedItem : styles.item}
                          >{item.name}</div>
                        )}
                        wrapperProps={{style : styles.wrapper }}/>
      </div>
    );
  }
}
