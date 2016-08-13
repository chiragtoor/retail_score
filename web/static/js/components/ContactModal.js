import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Grid, Row, Col, Panel, Button, FormGroup, ControlLabel, Glyphicon, FormControl, InputGroup, Carousel, CarouselItem, DropdownButton, MenuItem } from 'react-bootstrap';

export default class ContactModal extends Component {

  constructor(props) {
    super(props);

    this.submitContact = this.submitContact.bind(this);

    this.state = {
      name: "",
      email: "",
      message: ""
    };
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
            <div className="row-masonry" style={{margin:"0", padding:"0", width:"500px"}}>
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
