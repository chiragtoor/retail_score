import {default as React, Component} from "react";
import {Glyphicon,Modal, Button, FormGroup, ControlLabel, FormControl, InputGroup, Panel, Nav, NavItem} from "react-bootstrap";

const isBrowser = typeof window !== 'undefined';


export default class RetailScorePanel extends Component {

  constructor(props) {
    super(props);
  }

  render () {

    return (
      <div style={{height:"100%", width:"100%", marginTop:"10px"}}>
        <div className="row-masonry row-masonry-lg-2">
          <div className="col-masonry">
              <div className="panel b m0">
                 <div className="panel-heading">
                    <div className="media mt0">
                       <div className="media-left">
                          <Button onClick={this.props.showModal} style={{fontSize:"15px", backgroundColor:"#656565", color:"#FFFFFF",borderRadius:"20px"}}>
                            <em className="fa fa-question"></em>
                          </Button>
                       </div>
                       <div className="media-body media-middle">
                        <center>
                          <h2 className="media-heading m0 text-bold">Retail Score: {this.props.property.retailScore}</h2>
                        </center>
                       </div>
                    </div>
                 </div>
                 <div className="panel-body">
                    <div className="row">
                       <div className="col-lg-8">
                            <p>
                                &nbsp;&nbsp; Monthly In-Store Retail Sales:  $9.2 M
                                <br/>
                                &nbsp;&nbsp; Monthly Restaurant Food and Drink Sales: $5.4 M
                                <br/>
                                &nbsp;&nbsp; Monthly Entertainment and Recreation Sales: $2.3 M
                            </p>
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