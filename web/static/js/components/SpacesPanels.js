import {default as React, Component} from "react";
import {Glyphicon,Modal, Button, FormGroup, ControlLabel, FormControl, InputGroup, Panel, Nav, NavItem, Badge} from "react-bootstrap";

const isBrowser = typeof window !== 'undefined';


export default class SpacesPanels extends Component {

  constructor(props) {
    super(props);
  }

  render () {

    var spacesDiv;

    var spaces = this.props.spaces;

    if(spaces&& spaces.length > 1) {

      spacesDiv = <div style={{height:(height), backgroundColor:"red"}}>
                  {spaces.map((space, index) => {
                      if(index % 2 == 0) {
                        return <div key={index} style={{height:"100px", marginTop:"15px", width:"45%", float:"right"}}>
                          <div className="row-masonry row-masonry-lg-2">
                            <div className="col-masonry" style={{height:"100%"}}>
                                <div className="panel b m0">
                                  <span style={{fontSize:"16px"}}><b>{space.name}</b></span>
                                  <div className="row">
                                     <div className="col-lg-6" style={{textAlign:"center"}}>
                                        {space.sq_feet ? <p>Square Feet: {space.sq_feet.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</p> : <p>Square Feet: Ask Broker</p>}
                                        {space.monthly_rate ? <p>Monthly Rent: {('$' + space.monthly_rate.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ","))}</p> : <p>Monthly Rent: Ask Broker</p>}
                                        {space.lease_type ? <p>Lease Type: {space.lease_type}</p> : <p>Lease Type: Ask Broker</p>}
                                     </div>
                                  </div>
                                </div>
                            </div>
                          </div>       
                        </div>;
                      } else {
                        return <div key={index} style={{height:"100px", marginTop:"15px",width:"45%", float:"left"}}>
                          <div className="row-masonry row-masonry-lg-2">
                            <div className="col-masonry" style={{height:"100%"}}>
                                <div className="panel b m0">
                                  <span style={{fontSize:"16px"}}><b>{space.name}</b></span>
                                  <div className="row">
                                     <div className="col-lg-6" style={{textAlign:"center"}}>
                                        {space.sq_feet ? <p>Square Feet: {space.sq_feet}</p> : <p>Square Feet: Ask Broker</p>}
                                        {space.monthly_rate ? <p>Monthly Rent: {space.monthly_rate}</p> : <p>Monthly Rent: Ask Broker</p>}
                                        {space.lease_type ? <p>Lease Type: {space.lease_type}</p> : <p>Lease Type: Ask Broker</p>}
                                     </div>
                                  </div>
                                </div>
                            </div>
                          </div>       
                        </div>;
                      }

                        })}
                  </div>;
    }


    var height = (spaces.length % 2)*110 + 150;

    return (
      <div style={{height:(height)}}>
        {spacesDiv}
      </div>
    );

  }
}