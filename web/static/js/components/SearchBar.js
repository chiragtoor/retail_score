import {default as React, Component} from "react";
import CityAutoComplete from './CityAutoComplete';
import {Glyphicon,Modal, Button, FormGroup, ControlLabel, FormControl, InputGroup, Panel, Nav, NavItem} from "react-bootstrap";

const isBrowser = typeof window !== 'undefined';
const width = isBrowser ? window.innerWidth : 400;

export default class SearchBar extends Component {

  constructor(props) {
    super(props);

    this.cityChanged = this.cityChanged.bind(this);
    this.citySelected = this.citySelected.bind(this);

    this.search = this.search.bind(this);

    this.state = {
      city: "" 
    };
  }

  componentDidMount() {

    if(this.props.city) {
      this.state.city = this.props.city;
    }

    this.setState(this.state);
  }  

  cityChanged(event, value) {
    this.state.city = value;
    this.setState(this.state);
  }

  citySelected (value) {
    this.state.city = value;
    this.setState(this.state);
    this.props.searchClick(value);
  }

  search() {
    this.props.searchClick(this.state.city);
  }

  render () {

    return (
      <div style={{height:"100%", width:"100%"}}>
         <div style={{height:"100%", width:(width - 60)}}>
          <CityAutoComplete selectedCity={this.state.city} cityChanged={this.cityChanged} citySelected={this.citySelected} />
         </div>
         <Button onClick={this.search} style={{position:"fixed", zIndex:"2", top:"0", right:"0",border:"none", backgroundColor:"#49A3DC", width:"50px", height:"50px", color:"#FFFFFF"}}><i className="fa fa-search"/></Button>
      </div>
    );
  }
}