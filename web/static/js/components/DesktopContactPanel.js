import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Grid, Row, Col, Panel, Button, FormGroup, ControlLabel, Glyphicon, FormControl, InputGroup, Carousel, CarouselItem, DropdownButton, MenuItem } from 'react-bootstrap';

export default class DesktopContactPanel extends Component {

  constructor(props) {
    super(props);

    this.submitContact = this.submitContact.bind(this);
    this.updateName = this.updateName.bind(this);
    this.updateEmail = this.updateEmail.bind(this);
    this.updateMessage = this.updateMessage.bind(this);
    this.updatePhone = this.updatePhone.bind(this);

    this.state = {
      name: "",
      email: "",
      message: "Hello, \nI'm interested in this location and wanted some more information.",
      phone: ""
    };
  }

  updatePhone(phone) {
    this.state.phone = phone.target.value;
    this.setState(this.state);
  }

  updateName(name) {
    this.state.name = name.target.value;
    this.setState(this.state);
  }

  updateEmail(email) {
    this.state.email = email.target.value;
    this.setState(this.state);
  }

  updateMessage(message) {
    this.state.message = message.target.value;
    this.setState(this.state);
  }

  submitContact() {

    if(this.state.name == "" || this.state.email == "" || this.state.message == ""){
      this.props.contactFailed();
      return;
    }

    this.props.submitContact({
      "message":{
        "contact_name": this.state.name,
        "contact_email_address": this.state.email,
        "contact_phone_number": this.state.phone,
        "body": this.state.message,
        "property_id": this.props.propertyId
      }
    });

    this.props.mixpanel.track('Submit Contact', {'name':this.state.name, 'email': this.state.email, 'message': this.state.message, 'phone': this.state.phone});
    
    this.state.name = "";
    this.state.email = "";
    this.state.phone = "";
    this.state.message = "Hello, I am intered in this property and want some more information.";
    this.setState(this.state);
  }

  render () {

    var agent = this.props.agent;

    return (
            <div style={{height:"500px", width:"100%", marginTop:"20px"}}>
                  <div className="panel b m0">
                     <div className="panel-heading" >
                        <div className="media mt0">
                           <center>
                            <img src="https://lh3.googleusercontent.com/-znTaTDKLflU/AAAAAAAAAAI/AAAAAAAAAAA/i5PcDmAQPF8/photo.jpg" alt="Image" className="media-object img-circle thumb48" />
                           </center>
                           <div className="media-body media-middle">
                            <center>
                              <h4 className="media-heading m0 text-bold">{agent ? agent.name : "Unavailable"}</h4>
                              <h5>{agent ? agent.company_name : "Unavailable"}</h5>
                              <h5>{agent ? agent.phone_number : "Unavailable"}</h5>
                            </center>
                           </div>
                        </div>
                     </div>
                     <div className="panel-body">
                       <div>
                            <FormGroup controlId="formControlsText">
                              <FormControl 
                                type="text" 
                                placeholder="Your Name"
                                value={this.state.name}
                                onChange={(e) => this.updateName(e)}/>
                            </FormGroup>
                            <FormGroup controlId="formControlsText">
                              <FormControl 
                                type="text" 
                                placeholder="Your Phone Number(optional)" 
                                value={this.state.phone}
                                onChange={(e) => this.updatePhone(e)}/>
                            </FormGroup>
                            <FormGroup controlId="formControlsText">
                              <FormControl 
                                type="text" 
                                placeholder="Your E-mail" 
                                value={this.state.email}
                                onChange={(e) => this.updateEmail(e)}/>
                            </FormGroup>
                            <FormGroup controlId="formControlsTextarea">
                              <textarea rows="4" style={{width:"100%", borderColor:"#CCCCCC"}} value={this.state.message} onChange={(e) => this.updateMessage(e)}>
                                {"Hello, \nI'm interested in this location and wanted some more information."}
                              </textarea>
                            </FormGroup>
                            <center>
                              <Button style={{color:"#FFFFFF", width:"100%", fontSize:"18px", backgroundColor:"#49A3DC", textAlign:"left"}} onClick={this.submitContact} bsClass="btn btn-labeled mr">
                                <span className="btn-label"><i className="fa fa-comment"></i></span>Contact Agent
                              </Button>
                            </center>
                       </div>
                     </div>
                  </div>
            </div>
    );
  }
}
