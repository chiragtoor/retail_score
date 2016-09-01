import React from 'react';
import { connect } from "react-redux";

import ContentWrapper from '../components/Base/ContentWrapper';
import { Grid, Row, Modal, Col, Panel, Button, Popover,Pagination,Dropdown, Clearfix, OverlayTrigger, Overlay, FormGroup, ControlLabel, FormControl, InputGroup, Carousel, CarouselItem, DropdownButton, MenuItem } from 'react-bootstrap';

const isBrowser = typeof window !== 'undefined';

export class SurveyEnd extends React.Component {

  constructor(props) {
    super(props);

    this.saveInfo = this.saveInfo.bind(this);
    this.updateEmail = this.updateEmail.bind(this);
    this.updateCity = this.updateCity.bind(this);

    this.state = {
      email: "",
      city: "",
      done: false
    }
  }

  saveInfo(){
    if(this.state.email = "" || this.state.city == ""){
      alert("Please enter your email and the city you are interested in");
      return;
    }
    this.context.mixpanel.track('Save Info Tapped', {'email' : this.state.email, 'city' : this.state.city});
    this.state.done = true;
    this.setState(this.state);
  }

  updateEmail(e){
    this.state.email = e.target.value;
    this.setState(this.state);
  }

  updateCity(e){
    this.state.city = e.target.value;
    this.setState(this.state);
  }

  componentDidMount(){
    this.context.mixpanel.track('Survey End container did mount');
  }

  render() {

    return(
        <div className="container-fluid container-div" style={{backgroundColor:"#49A3DC", height:"100%", width:"100%", margin:"0", padding:"0",fontSize:"30px", color:"#FFFFFF", fontWeight:"400px"}}>
          {this.state.done ? 
            <div style={{width:"90%", marginLeft:"5%", textAlign:"center", fontSize:"8vw", marginTop:"10px"}}>
              {"Awesome!"}
              <br/>
              {"Expect to receive an email from us as soon as the scoring is done!"}
            </div>
          :
            <div style={{height:"100%", display:"flex", flexDirection:"column", justifyContent:"space-between"}}>
                <div style={{width:"90%", marginLeft:"5%", textAlign:"center", fontSize:"8vw", marginTop:"10px"}}>
                  {"We'll send you the listings closest to your customer once we are done scoring!"}
                </div>

                <div>
                  <FormControl 
                    type="text" 
                    onChange={(e) => this.updateCity(e)}
                    value={this.state.city}
                    placeholder={"City"}
                    style={{backgroundColor:"#FFFFFF", fontSize:"30px", height:"50px", fontWeight:"400px", border:"solid thin #49A3DC", width:"90%", marginLeft:"5%", borderBottom:"solid thin #FFFFFF"}}/>

                  <FormControl 
                    type="text" 
                    onChange={(e) => this.updateEmail(e)}
                    value={this.state.email}
                    placeholder={"Your e-mail"}
                    style={{backgroundColor:"#FFFFFF", fontSize:"30px", height:"50px", fontWeight:"400px", marginTop:"10px", border:"solid thin #49A3DC", width:"90%", marginLeft:"5%", borderBottom:"solid thin #FFFFFF"}}/>
                </div>

                <div style={{width:"100%", marginBottom:"5px"}}>
                  <Button onClick={this.saveInfo} style={{width:"90%", marginLeft:"5%", height:"60px", backgroundColor:"#FFFFFF", color:"#49A3DC", fontSize:"25px", fontWeight:"400px"}}><b>Send Me Best Listings</b></Button>
                </div>
            </div>
          }
        </div>
    );
  }
}


SurveyEnd.contextTypes = {
    mixpanel: React.PropTypes.object.isRequired
};

export default SurveyEnd;
