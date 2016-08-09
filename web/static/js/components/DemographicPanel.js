import {default as React, Component} from "react";
import {Glyphicon,Modal, Button, ButtonGroup, FormGroup, ControlLabel, FormControl, InputGroup, Panel, Nav, NavItem} from "react-bootstrap";

const isBrowser = typeof window !== 'undefined';

let options = {
  size: {
    width: 250,
    height: 250
  },
  labels: true,
};

let data = {
  columns: [
    ['Male', 250],
    ['Female', 500],
    ['Other', 100],
    ['Test', 0]
  ]
};

import Chart from '../components/Chart';

export default class DemographicPanel extends Component {

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
                       <div style={{fontSize:"25px"}} className="media-left">
                        <em className="fa fa-pie-chart"></em>
                       </div>
                       <div className="media-body media-middle">
                        <center>
                          <h2 className="media-heading m0 text-bold">Demographics</h2>
                        </center>
                       </div>
                    </div>
                 </div>
                 <div className="panel-body">
                    <div className="row">
                       <div className="col-lg-8">
                            <center>
                                <div id="testchart" />
                            </center>
                            <Chart data={data} element='testchart' type='pie' options={options}/>
                            <center>
                                <ButtonGroup>
                                    <Button><em className="fa fa-usd"></em></Button>
                                    <Button><em className="fa fa-globe"></em></Button>
                                    <Button><em className="fa fa-heart"></em></Button>
                                    <Button><em className="fa fa-user"></em></Button>
                                </ButtonGroup>
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