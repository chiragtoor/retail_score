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

    var maritalData = {
      columns: [
        ['Single', this.props.data.marital_status.unmarried],
        ['Married', this.props.data.marital_status.married]
      ]
    };

    var incomeData = {
      columns: [
        ['$75 - $100,000', this.props.data.income.income_75_100K],
        ['$35 - $75,000', this.props.data.income.income_35_75K],
        ['$150,000 +', this.props.data.income.income_150_plus],
        ['$100 - $150,000', this.props.data.income.income_100_150K],
        ['$0 - $35,000', this.props.data.income.income_0_35K]
      ]
    };

    var genderData = {
      columns: [
        ['Male', this.props.data.gender.male],
        ['Female', this.props.data.gender.female]
      ]
    };

    var ethnicData = {
      columns: [
        ['Caucasian', this.props.data.ethnic.caucasian],
        ['African American', this.props.data.ethnic.african_american],
        ['Asian', this.props.data.ethnic.asian],
        ['Hispanic', this.props.data.ethnic.hispanic],
        ['Other', this.props.data.ethnic.other]
      ]
    };

    var ageData = {
      columns: [
        ['0 - 15', this.props.data.age.zero_to_fifteen],
        ['20 - 30', this.props.data.age.twenty_to_thirty],
        ['30 - 50', this.props.data.age.thirty_to_fifty],
        ['15 - 20', this.props.data.age.fifteen_to_twenty],
        ['50 +', this.props.data.age.fifty_plus]
      ]
    };

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
                            <Chart data={ageData} element='testchart' type='pie' options={options}/>
                            <center>
                                <ButtonGroup>
                                    <Button><em className="fa fa-usd">Income</em></Button>
                                    <Button><em className="fa fa-globe">Ethnicity</em></Button>
                                    <Button><em className="fa fa-heart">Marriage</em></Button>
                                    <Button><em className="fa fa-user">Age</em></Button>
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