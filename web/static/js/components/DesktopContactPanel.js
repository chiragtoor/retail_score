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
      message: "",
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
    console.log("submot contact with: " + this.state.name + " " + this.state.email + " " + this.state.message);
    this.props.submitContact();
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
                              <h4 className="media-heading m0 text-bold">{agent.name}</h4>
                              <h5>{agent.company_name}</h5>
                              <h5>{agent.phone_number}</h5>
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
                                value={this.state.email}
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
                              <FormControl 
                                componentClass="textarea" 
                                placeholder="Optional Message ..." 
                                value={this.state.message}
                                onChange={(e) => this.updateMessage(e)}/>
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
