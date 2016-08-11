import {default as React, Component} from "react";
import CityAutoComplete from './CityAutoComplete';
import {Glyphicon,Modal, Button, FormGroup, ControlLabel, FormControl, InputGroup, Panel, Nav, NavItem} from "react-bootstrap";

export default class CompetitionSearchBar extends Component {

  constructor(props) {
    super(props);

    this.updateCompetition = this.updateCompetition.bind(this);
    this.search = this.search.bind(this);

    this.state = {
      competition: "" 
    };
  }

  updateCompetition(e) {
    this.state.competition = e.target.value;
    this.setState(this.state);
  }

  search() {
    this.props.searchClick(this.state.competition);
  }

  render () {

    return (
      <div style={{height:"50px", width:"100%"}}>
         <div style={{width:"85%", backgroundColor:"#FFFFFF", float:"left"}} >
            <FormGroup controlId="formControlsText">
              <FormControl 
                type="text" 
                placeholder="Tell us what business you are starting and we'll find your competition!"
                value={this.state.competition}
                onChange={(e) => this.updateCompetition(e)}/>
            </FormGroup>
         </div>
         <Button onClick={this.search} style={{border:"none", backgroundColor:"#49A3DC", width:"15%", float:"right", height:"40px", color:"#FFFFFF"}}><i className="fa fa-search"/></Button>
      </div>
    );
  }
}