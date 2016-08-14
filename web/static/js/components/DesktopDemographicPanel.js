import {default as React, Component} from "react";
import {Glyphicon,Modal, Button, ButtonGroup, FormGroup, ControlLabel, FormControl, InputGroup, Panel, Nav, NavItem} from "react-bootstrap";

const isBrowser = typeof window !== 'undefined';

let options = {
  size: {
    width: 350,
    height: 350
  },
  labels: true,
};

import Chart from '../components/Chart';

export default class DesktopDemographicPanel extends Component {

  constructor(props) {
    super(props);

    this.setDemographicIndex = this.setDemographicIndex.bind(this);

    this.state = {
      demographicIndex: 0
    };
  }

  setDemographicIndex(index) {
    this.state.demographicIndex = index;
    this.setState(this.state);
    // console.log("just set the demographicIndex to " + this.state.demographicIndex);
  }

  render () {

    var data;
    var title;

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

    var ethnicFont = "#333333";
    var ethnicBackground = "#FFFFFF";
    var incomeFont = "#333333";
    var incomeBackground = "#FFFFFF";
    var maritalFont = "#333333";
    var maritalBackground = "#FFFFFF";
    var ageFont = "#333333";
    var ageBackground = "#FFFFFF";
    var genderFont = "#333333";
    var genderBackground = "#FFFFFF";

    switch(this.state.demographicIndex){
      case 0:
          data = incomeData;
          title = 'Household Income';
          incomeFont = "#FFFFFF";
          incomeBackground = "#49A3DC";
        break;
      case 1:
          data = ethnicData;
          title = 'Ethnicities';
          ethnicFont = "#FFFFFF";
          ethnicBackground = "#49A3DC";
        break;
      case 2:
          data = maritalData;
          title = 'Marriage';
          maritalFont = "#FFFFFF";
          maritalBackground = "#49A3DC";
        break;
      case 3:
          data = ageData;
          title = 'Age';
          ageFont = "#FFFFFF";
          ageBackground = "#49A3DC";
        break;
      case 4:
          data = genderData;
          title = 'Gender';
          genderFont = "#FFFFFF";
          genderBackground = "#49A3DC";
        break;
      default:
          data = incomeData;
          title = 'Household Income';
          incomeFont = "#FFFFFF";
          incomeBackground = "#49A3DC";
        break;
    }

    return (
      <div style={{height:"100%", width:"100%", marginTop:"10px"}}>
        
        <div className="row-masonry">
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

                 <div className="panel-body" >

                  <div style={{width:"50%",float:"right"}}>
                    <div style={{fontSize:"22px", fontWeight:"400", textAlign:"center"}}>
                      {title}
                    </div>
                    <div style={{textAlign:"center"}}> 
                      <div id="desktoptestchart" />
                      <Chart data={data} element={this.props.tag} type='pie' options={options}/>
                    </div>
                    <div>
                      <center>
                          <ButtonGroup style={{border:"solid thin #333333", marginTop:"5px", borderRadius:"5px"}}>
                              <Button style={{color:(incomeFont), width:"50px", backgroundColor:(incomeBackground),border:"none", borderRight:"solid thin #333333"}} onClick={e => this.setDemographicIndex(0)}><em className="fa fa-usd"></em></Button>
                              <Button style={{color:(ethnicFont), width:"50px", backgroundColor:(ethnicBackground),border:"none", borderRight:"solid thin #333333"}} onClick={e => this.setDemographicIndex(1)}><em className="fa fa-globe"></em></Button>
                              <Button style={{color:(maritalFont),width:"50px", backgroundColor:(maritalBackground), border:"none", borderRight:"solid thin #333333"}} onClick={e => this.setDemographicIndex(2)}><em className="fa fa-heart"></em></Button>
                              <Button style={{color:(ageFont),width:"50px", backgroundColor:(ageBackground),border:"none", borderRight:"solid thin #333333"}} onClick={e => this.setDemographicIndex(3)}><em className="fa fa-user"></em></Button>
                              <Button style={{color:(genderFont),width:"50px", backgroundColor:(genderBackground),border:"none"}} onClick={e => this.setDemographicIndex(4)}><em className="fa fa-venus-mars"></em></Button>
                          </ButtonGroup>
                        </center>
                    </div>
                  </div>

                  <div style={{width:"50%", float:"left"}}>
                    <div style={{fontSize:"22px", fontWeight:"400", textAlign:"center"}}>
                      Who lives in this area?
                    </div>
                    <div style={{fontSize:"18px", fontWeight:"100", textAlign:"center"}}> 
                      <br />
                      {this.props.data.tapestry}
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