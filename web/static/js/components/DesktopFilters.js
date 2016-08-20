import {default as React, Component} from "react";
import {Glyphicon,Modal, Button,ButtonGroup, FormGroup, ControlLabel, FormControl, InputGroup, Panel, Nav, NavItem, NavBar, Col, Row} from "react-bootstrap";
import InputRange from 'react-input-range';
import DesktopSearchBar from './DesktopSearchBar';


const PRICE_MIN = 0;
const PRICE_MAX = 100000;

const SQ_MIN = 0;
const SQ_MAX = 30000;

export default class DesktopFilters extends Component {

  constructor(props) {
    super(props);

    this.updatePrice = this.updatePrice.bind(this);
    this.updateSqft = this.updateSqft.bind(this);
    this.saveFilters = this.saveFilters.bind(this);
    this.sortIndexChanged = this.sortIndexChanged.bind(this);

    this.state = {
      priceMin: PRICE_MIN,
      priceMax: PRICE_MAX,
      sqftMin: SQ_MIN,
      sqftMax: SQ_MAX,
      sortIndex: 1
    };
  }

  componentDidMount() {
    this.state.priceMin = this.props.priceMin;
    this.state.priceMax = this.props.priceMax;
    this.state.sqftMin = this.props.sqftMin;
    this.state.sqftMax = this.props.sqftMax;
    this.state.sortIndex  = this.props.sortIndex;
    this.setState(this.state);
  }

  updateSqft(component, values)  {
    this.state.sqftMin = values.min;
    this.state.sqftMax = values.max;
    this.setState(this.state);
    this.saveFilters();
  }

  updatePrice(component, values) {
    this.state.priceMin = values.min;
    this.state.priceMax = values.max;
    this.setState(this.state);
    this.saveFilters();
  }

  sortIndexChanged(e, selectedKey) {
    this.state.sortIndex = selectedKey;
    this.setState(this.state);

    var sortString = "Price";

    //track sort change in mixpanel
    switch(selectedKey){
      case 1:
        sortString = "Price";
        break;
      case 2:
        sortString = "Square Feet";
      break;
      case 3:
        sortString = "RetailScore"
        break;
      default:
        sortString = "Price";
        break;
    }

    this.props.mixpanel.track('Sort Changed',{'sortBy': sortString});

    this.saveFilters();
  }

  saveFilters(){
    this.props.saveFilters(this.state.priceMin, this.state.priceMax, this.state.sqftMin, this.state.sqftMax, this.state.sortIndex);
  }

  render () {


    var styledPriceMin = '$' + this.state.priceMin.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + ' /mo';
    var styledPriceMax = '$' + this.state.priceMax.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + ' /mo';
    var styledSqftMin = this.state.sqftMin.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + ' sqft';
    var styledSqftMax = this.state.sqftMax.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + ' sqft';

    var priceBackground = this.state.sortIndex == 1 ? "#49A3DC" : "#FFFFFF";
    var priceColor = this.state.sortIndex == 1 ? "#FFFFFF" : "#95a5a6";
    var sqftBackground = this.state.sortIndex == 2 ? "#49A3DC" : "#FFFFFF";
    var sqftColor = this.state.sortIndex == 2 ? "#FFFFFF" : "#95a5a6";
    var retailScoreBackground = this.state.sortIndex == 3 ? "#49A3DC" : "#FFFFFF";
    var retailScoreColor = this.state.sortIndex == 3 ? "#FFFFFF" : "#95a5a6";

    return (
      <div style={{height:"100%", width:"100%", backgroundColor:"#FFFFFF"}}>

        <Col md={12} lg={12} style={{height:"20%", marginTop:"10px"}}>
          <div style={{width:"100%", paddingLeft:"5px", paddingRight:"5px", height:"100%", position:"relative", color:"#000000"}}>
            <DesktopSearchBar searchClick={this.props.searchClick} city={this.props.city} />
          </div>
        </Col>

        <Col md={12} lg={12} style={{height:"20%", marginTop:"10px"}}>
          <div style={{width:"20%", color:"#95a5a6", float:"left", textAlign:"left",paddingLeft:"5px", fontSize:"14px"}}>Sort By</div>

          <div style={{width:"80%", float:"right"}}>
            <ButtonGroup style={{width:"100%"}}>
                <Button onClick={e => this.sortIndexChanged(e, 1)} style={{width:"33%", float:"right", height:"40px", backgroundColor:(priceBackground), color:(priceColor)}}>Price</Button>
                <Button onClick={e => this.sortIndexChanged(e, 2)} style={{width:"33%",float:"right", height:"40px", backgroundColor:(sqftBackground), color:(sqftColor)}}>Square Feet</Button>
                <Button onClick={e => this.sortIndexChanged(e, 3)} style={{width:"33%",float:"right", height:"40px", backgroundColor:(retailScoreBackground), color:(retailScoreColor)}}>RetailScore</Button>
            </ButtonGroup>
          </div>
        </Col>

        <Col md={12} lg={12} style={{height:"20%", marginTop:"10px"}}>
          <div style={{width:"20%", color:"#95a5a6", float:"left", textAlign:"left",paddingLeft:"5px", fontSize:"14px"}}>Price</div>

          <div style={{width:"80%", marginTop:"10px",  float:"right"}}>
            <InputRange
                maxValue={PRICE_MAX}
                minValue={PRICE_MIN}
                value={{min: this.state.priceMin, max: this.state.priceMax}}
                onChange={this.updatePrice} />
          </div>

          <div style={{height:"15px", float:"right", width:"80%",color:"#95a5a6",fontSize:"12px",  marginLeft:"5%"}}>
            <div style={{float:"left", marginLeft:"5px"}}>{styledPriceMin}</div>
            <div style={{float:"right", marginRight:"5px"}}>{styledPriceMax}</div>
          </div>
        </Col>

        <Col  md={12} lg={12} style={{height:"20%", marginTop:"10px"}}>
          <div style={{width:"20%", color:"#95a5a6",float:"left", textAlign:"left", paddingLeft:"5px", fontSize:"14px"}}>Square Feet</div>

          <div style={{width:"80%", marginTop:"10px",  float:"right"}}>
            <InputRange
                maxValue={SQ_MAX}
                minValue={SQ_MIN}
                value={{min: this.state.sqftMin, max: this.state.sqftMax}}
                onChange={this.updateSqft} />
          </div>
          <div style={{height:"15px", width:"80%", float:"right", color:"#95a5a6", fontSize:"12px", marginLeft:"5%"}}>
            <div style={{float:"left", marginLeft:"5px"}}>{styledSqftMin}</div>
            <div style={{float:"right", marginRight:"5px"}}>{styledSqftMax}</div>
          </div>
        </Col>

      </div>
    );
  }
}