import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Grid, Row, Col, Panel, Button, FormGroup, ControlLabel, Glyphicon, FormControl, InputGroup, Carousel, CarouselItem, DropdownButton, MenuItem } from 'react-bootstrap';

export default class ContactModal extends Component {

  constructor(props) {
    super(props);
  }

  render () {
    return (
            <div style={{height:"100%", widht:"100%"}}>
              <div className="row-masonry row-masonry-lg-2">
                 <div className="col-masonry">
                    <div className="panel b m0">
                       <div className="panel-heading">
                          <div className="media mt0">
                             <div className="media-left">
                              <img src="http://x.lnimg.com/xnet/mainsite/HttpHandlers/attachment/ServeAttachment.ashx?FileGuid=19FBC02A-86DD-4142-94FD-037D2E705AA8&Extension=jpg&Width=166&Height=189&PadImage=True&ClipImage=False&ExactDim=-1&UseThumbnailAsOriginal=False&UseStandardAsOriginal=False" alt="Image" className="media-object img-circle thumb48" />
                             </div>
                             <div className="media-body media-middle">
                              <center>
                                <h5 className="media-heading m0 text-bold">Drew Glickman</h5>
                                <small className="text-muted">Musselli Real Estate</small>
                              </center>
                             </div>
                          </div>
                       </div>
                       <div className="panel-body">
                          <div className="row">
                             <div className="col-lg-8">
                                  <FormGroup controlId="formControlsText">
                                    <FormControl 
                                      type="text" 
                                      placeholder="Your Name" 
                                      value={this.props.brokerName}
                                      onChange={(e) => false}/>
                                  </FormGroup>
                                  <FormGroup controlId="formControlsText">
                                    <FormControl 
                                      type="text" 
                                      placeholder="Your E-mail" 
                                      value={this.props.brokerName}
                                      onChange={(e) => false}/>
                                  </FormGroup>
                                  <FormGroup controlId="formControlsText">
                                    <FormControl 
                                      type="text" 
                                      placeholder="Your Phone #" 
                                      value={this.props.brokerName}
                                      onChange={(e) => false}/>
                                  </FormGroup>
                                  <FormGroup controlId="formControlsTextarea">
                                    <FormControl componentClass="textarea" placeholder="Optional Message ..." />
                                  </FormGroup>
                                  <center>
                                    <Button bsClass="btn btn-labeled btn-success mr">
                                      <span className="btn-label"><i className="fa fa-comment"></i></span>Submit
                                    </Button>
                                  </center>
                             </div>
                          </div>
                       </div>
                    </div>
                 </div>
                </div>
            </div>
    );
  }
}
