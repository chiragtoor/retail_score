import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Grid, Row, Col, Panel, Button, FormGroup, ControlLabel, Glyphicon, FormControl, InputGroup, Carousel, CarouselItem, DropdownButton, MenuItem } from 'react-bootstrap';

export default class ContactModal extends Component {

  constructor(props) {
    super(props);

    this.submitContact = this.submitContact.bind(this);

    this.state = {
      name: (localStorage.getItem('name') || ""),
      email: (localStorage.getItem('email') || ""),
      message: (localStorage.getItem('message') || "Hello, I am interested in this property and want some more information.")
    }
  }


  updateName(name) {
    this.state.name = name.target.value;
    this.setState(this.state);

    if (typeof(Storage) !== "undefined") {
      localStorage.setItem("name", this.state.name);
    } 
  }

  updateEmail(email) {
    this.state.email = email.target.value;
    this.setState(this.state);

    if (typeof(Storage) !== "undefined") {
      localStorage.setItem("email", this.state.email);
    } 
  }

  updateMessage(message) {
    this.state.message = message.target.value;
    this.setState(this.state);

    if (typeof(Storage) !== "undefined") {
      localStorage.setItem("message", this.state.message);
    } 

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
        "body": this.state.message,
        "property_id": this.props.propertyId
      }
    });

    console.log("submit contact with: " + this.state.name + " " + this.state.email + " " + this.state.message + " " + this.props.propertyId);

    this.props.mixpanel.track('Submit Contact', {'name':this.state.name, 'email': this.state.email, 'message': this.state.message});
  }

  render () {

    var agent = this.props.agent;

    return (
            <div className="row-masonry" style={{margin:"0", padding:"0", height:"500px", width:"100%"}}>
               <div className="col-masonry">
                  <div className="panel b m0">
                     <div className="panel-heading">
                        <div className="media mt0">
                           <div className="media-left">
                            <img src="https://lh3.googleusercontent.com/-znTaTDKLflU/AAAAAAAAAAI/AAAAAAAAAAA/i5PcDmAQPF8/photo.jpg" alt="Image" className="media-object img-circle thumb48" />
                           </div>
                           <div className="media-body media-middle">
                            <center>
                              <h5 className="media-heading m0 text-bold">{agent.name}</h5>
                              <small className="text-muted">{agent.company_name}</small>
                            </center>
                           </div>
                        </div>
                     </div>
                     <div className="panel-body">
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
                          <Button onClick={this.submitContact} bsClass="btn btn-labeled btn-success mr">
                            <span className="btn-label"><i className="fa fa-comment"></i></span>Submit
                          </Button>
                        </center>
                     </div>
                  </div>
               </div>
            </div>
    );
  }
}