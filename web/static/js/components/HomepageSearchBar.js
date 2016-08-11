import {default as React, Component} from "react";
import CityAutoComplete from './CityAutoComplete';
import {Glyphicon,Modal, Button, FormGroup, ControlLabel, FormControl, InputGroup, Panel, Nav, NavItem} from "react-bootstrap";

export default class HomepageSearchBar extends Component {

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
      <div style={{width:"100%", backgroundColor:"#9b59b6"}}>
        <FormGroup style={{width:"100%"}}>
          <InputGroup style={{width:"100%", position:"relative"}}>
           <div className="homepageSearchBar" > 
               <CityAutoComplete selectedCity={this.state.city} cityChanged={this.cityChanged} citySelected={this.citySelected} />
           </div>
           <Button onClick={this.search} style={{borderRadius:"0px", position:"absolute", zIndex:"2", right:"0", border:"none", backgroundColor:"#49A3DC", width:"50px", height:"50px", color:"#FFFFFF"}}><i className="fa fa-search"/></Button>
          </InputGroup>
        </FormGroup>
      </div>
    );
  }
}