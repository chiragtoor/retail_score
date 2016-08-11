import {default as React, Component} from "react";
import {Glyphicon,Modal, Button, FormGroup, ControlLabel, FormControl, InputGroup, Panel, Nav, NavItem, Badge} from "react-bootstrap";

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
                          <h2 className="media-heading m0 text-bold">Retail Score: {this.props.property.retail_score}</h2>
                        </center>
                        <center>
                          <h5 className="media-heading m0 text-bold">Monthly Sales Breakdown</h5>
                        </center>
                       </div>
                    </div>
                 </div>
                 <div className="panel-body">
                    <div className="row">
                       <div className="col-lg-6">
                            <p>
                                &nbsp;&nbsp; Clothing & Apparel: <Badge style={{backgroundColor:"#D4AF37", float:"right", fontSize:"15px", color:"#FFFFFF"}}>$9,200,000</Badge>
                                <br/>
                                <br/>
                                &nbsp;&nbsp;  Restaurants, Food & Drinks: <Badge style={{backgroundColor:"#C0C0C0", float:"right", fontSize:"15px", color:"#FFFFFF"}}>$5,400,000</Badge>
                                <br/>
                                <br/>
                                &nbsp;&nbsp;  Entertainment & Recreation: <Badge style={{backgroundColor:"#CD7F32", float:"right", fontSize:"15px", color:"#FFFFFF"}}>$2,300,000</Badge>
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