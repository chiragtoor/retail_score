import React, { Component, PropTypes } from 'react';
import { Button, FormGroup, FormControl } from 'react-bootstrap';

const DEFAULT_MESSAGE = "Hello, I am interested in this property and want some more information.";

export default class ContactForm extends Component {

  constructor(props) {
    super(props);

    this.submitContact = this.submitContact.bind(this);

    this.state = {
      name: "",
      email: "",
      message: DEFAULT_MESSAGE,
      nameError: false,
      emailError: false
    }
  }

  updateName(name) {
    this.setState({
      name: name,
      nameError: false
    });
  }

  updateEmail(email) {
    this.setState({
      email: email,
      emailError: false
    });
  }

  updateMessage(message) {
    this.setState({
      message: message
    });
  }

  submitContact() {
    const {name, email, message} = this.state;

    if(name == "") {
      this.setState({nameError: true});
      return;
    }

    if(email == "") {
      this.setState({emailError: true});
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
  }

  render () {
    const {agent} = this.props;
    const {name, email, message} = this.state;

    return (
      <div className="row-masonry" style={{margin:"0", padding:"0", height:"500px", width:"100%"}}>
         <div className="col-masonry">
            <div className="panel b m0">
               <div className="panel-heading">
                  <div className="media mt0">
                     <div className="media-body media-middle">
                      <center>
                        <h5 className="media-heading m0 text-bold">{agent.name}</h5>
                        <small className="text-muted">{agent.company_name}</small>
                      </center>
                     </div>
                  </div>
               </div>
               <div className="panel-body">
                  <FormGroup controlId="formControlsText" validationState={this.state.nameError ? 'error' : null}>
                    <FormControl 
                      type="text" 
                      placeholder="Your Name"
                      value={name}
                      onChange={(e) => this.updateName(e.target.value)}/>
                  </FormGroup>
                  <FormGroup controlId="formControlsText" validationState={this.state.emailError ? 'error' : null}>
                    <FormControl 
                      type="text" 
                      placeholder="Your E-mail" 
                      value={email}
                      onChange={(e) => this.updateEmail(e.target.value)}/>
                  </FormGroup>
                  <FormGroup controlId="formControlsTextarea">
                    <FormControl 
                      componentClass="textarea" 
                      placeholder="Optional Message ..." 
                      value={message}
                      onChange={(e) => this.updateMessage(e.target.value)}/>
                  </FormGroup>
                  <center>
                    <Button onClick={this.submitContact} bsClass="btn btn-labeled btn-primary mr">
                      <span className="btn-label"><i className="fa fa-comment"></i></span>  Contact Agent
                    </Button>
                  </center>
               </div>
            </div>
         </div>
      </div>
    );
  }
}