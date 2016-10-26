import React from 'react';
import { InputGroup, Button } from 'react-bootstrap';

import GooglePlacesTypeahead from './GooglePlacesTypeahead';

export default class SearchBar extends React.Component {

  constructor(props) {
    super(props);

  }

  render() {
    {/* styles to use when on mobile to give sharp edges on top bar, round edges stick out */}
    const mobileMenuButtonStyle = {height:"50px", borderColor:"#CCCCCC", borderRadius: "0", borderTop:"none", borderLeft:"none", borderBottom:"none"};
    const mobileSearchBarStyle = {height:"50px", borderColor:"#CCCCCC", borderRadius: "0", borderTop:"none", borderLeft:"none", borderBottom:"none"};
    const mobileSearchButtonStyle = {height:"50px", borderColor:"#49A3DC", backgroundColor:"#49A3DC", borderRadius: "0", borderTop:"none", borderRight:"none", borderBottom:"none"};
    return(
      <div>
        <InputGroup className="searchBar" style={{borderRadius: "0px", padding: this.props.noPadding ? "0px" : "20px 10px 0px 10px", height:"50px", width:"100%"}}>
          {/* <InputGroup.Button className="hidden-md hidden-lg"><Button style={this.props.noPadding ? mobileMenuButtonStyle : {height:"50px", borderColor:"#CCCCCC"}}>&nbsp;&nbsp;<i className="fa fa-list" style={{color:"#49A3DC"}}/>&nbsp;&nbsp;</Button></InputGroup.Button> */}
          <GooglePlacesTypeahead
            onChange={(e) => e[0] != null ? this.props.onSearch(e[0].display) : false}
            placeHolder={"Enter a City"} 
            value={this.props.value} />
          <InputGroup.Button><Button style={this.props.noPadding ? mobileSearchButtonStyle : {height:"50px", borderColor:"#49A3DC", backgroundColor:"#49A3DC"}}>&nbsp;&nbsp;<i className="fa fa-search" style={{color:"#FFFFFF"}}/>&nbsp;&nbsp;</Button></InputGroup.Button>
        </InputGroup>
        {this.props.noPadding ?
          <div style={{width:"100%", height:"1px", borderTop:"solid thin #CCCCCC"}} />
        :
          false
        }
      </div>
    );
  }
}
