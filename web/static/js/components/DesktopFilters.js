import {default as React, Component} from "react";
import {Glyphicon,Modal, Button,ButtonGroup, FormGroup, Dropdown, Clearfix, MenuItem, DropdownButton, ControlLabel, FormControl, InputGroup, Panel, Nav, NavItem, NavBar, Col, Row} from "react-bootstrap";
import InputRange from 'react-input-range';
import DesktopSearchBar from './DesktopSearchBar';
import * as Util from '../Util.js';

const PRICE_MIN = 0;
const PRICE_MAX = 100000;

const SQ_MIN = 0;
const SQ_MAX = 30000;

export default class DesktopFilters extends Component {

  constructor(props) {
    super(props);

    this.updateMinPrice = this.updateMinPrice.bind(this);
    this.updateMaxPrice = this.updateMaxPrice.bind(this);
    this.updateMaxSqft = this.updateMaxSqft.bind(this);
    this.saveFilters = this.saveFilters.bind(this);
    this.sortIndexChanged = this.sortIndexChanged.bind(this);

    this.state = {
      priceMin: null,
      priceMax: null,
      sqftMin: null,
      sqftMax: null,
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

  updateMinSqft(index)  {
    this.state.sqftMin = Util.square_feet[index];
    this.setState(this.state);
    this.saveFilters();
  }

  updateMaxSqft(index)  {
    this.state.sqftMax = Util.square_feet[index];
    this.setState(this.state);
    this.saveFilters();
  }

  updateMinPrice(index) {
    this.state.priceMin = Util.prices[index];
    this.setState(this.state);
    this.saveFilters();
  }

  updateMaxPrice(index) {    
    this.state.priceMax = Util.prices[index];
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

    var priceBackground = this.state.sortIndex == 1 ? "#49A3DC" : "#FFFFFF";
    var priceColor = this.state.sortIndex == 1 ? "#FFFFFF" : "#95a5a6";
    var sqftBackground = this.state.sortIndex == 2 ? "#49A3DC" : "#FFFFFF";
    var sqftColor = this.state.sortIndex == 2 ? "#FFFFFF" : "#95a5a6";
    var retailScoreBackground = this.state.sortIndex == 3 ? "#49A3DC" : "#FFFFFF";
    var retailScoreColor = this.state.sortIndex == 3 ? "#FFFFFF" : "#95a5a6";

    var minPriceString = this.state.priceMin ? ('$' + this.state.priceMin.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")) : "Min";
    var maxPriceString = this.state.priceMax ? ('$' + this.state.priceMax.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","))  : "Max";

    var minSqftString = this.state.sqftMin ? this.state.sqftMin.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : "Min";
    var maxSqftString = this.state.sqftMax ? this.state.sqftMax.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : "Max";



    var minSqft = this.state.sqftMin;
    var maxSqft = this.state.sqftMax;
    var minPrice = this.state.priceMin;
    var maxPrice = this.state.priceMax;

    var maxSqftDropDown = <Dropdown.Menu style={{height:"auto", maxHeight:"200px", overflowX:"hidden"}}>
                    {Util.square_feet.map(function(sqft, index){
                      if(!minSqft) {
                        return <MenuItem key={index}  eventKey={index}>{sqft.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</MenuItem>;
                      } else if (sqft > minSqft) {
                        return <MenuItem key={index}  eventKey={index}>{sqft.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</MenuItem>;
                      }
                    })}
                </Dropdown.Menu>;

    var minSqftDropDown = <Dropdown.Menu style={{height:"auto", maxHeight:"200px", overflowX:"hidden"}}>
                    {Util.square_feet.map(function(sqft, index){
                      if(!maxSqft) {
                        return <MenuItem key={index} eventKey={index}>{sqft.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</MenuItem>;
                      } else if (sqft < maxSqft) {
                        return <MenuItem key={index} eventKey={index}>{sqft.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</MenuItem>;
                      }
                    })}
                </Dropdown.Menu>;


    var minPriceDropDown = <Dropdown.Menu style={{height:"auto", maxHeight:"200px", overflowX:"hidden"}}>
                    {Util.prices.map(function(price, index){
                      if(!maxPrice) {
                        return <MenuItem key={index}  eventKey={index}>{('$' + price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","))}</MenuItem>;
                      }
                      else if (price < maxPrice){
                        return <MenuItem key={index}  eventKey={index}>{('$' + price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","))}</MenuItem>;
                      }
                    })}
                </Dropdown.Menu>;

    var maxPriceDropDown = <Dropdown.Menu style={{height:"auto", maxHeight:"200px", overflowX:"hidden"}}>
                    {Util.prices.map(function(price, index){
                      if(!minPrice) {
                        return <MenuItem key={index}  eventKey={index}>{('$' + price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","))}</MenuItem>;
                      } else if(price > minPrice){
                        return <MenuItem key={index}  eventKey={index}>{('$' + price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","))}</MenuItem>
                      }
                    })}
                </Dropdown.Menu>;

    return (
      <div style={{height:"100%", width:"100%", backgroundColor:"#FFFFFF"}}>

        <Col md={12} lg={12} style={{height:"20%", marginTop:"10px"}}>
          <div style={{width:"100%", paddingLeft:"5px", paddingRight:"5px", height:"100%", position:"relative", color:"#000000"}}>
            <DesktopSearchBar searchClick={this.props.searchClick} city={this.props.city} />
          </div>
        </Col>

        <Col md={12} lg={12} style={{height:"30%", marginTop:"10px", textAlign:"center"}}>

          <div style={{width:"50%", color:"#95a5a6", textAlign:"center",paddingLeft:"5px", float:"left", fontSize:"18px"}}>
            <div style={{width:"100%"}}>Monthly Rent</div>

            <div style={{width:"100%"}}>
              <Dropdown onSelect={e => this.updateMinPrice(e)} id='minPriceDropDown'>
                <Dropdown.Toggle style={{fontSize:"16px" ,height:"50px", width:"100px", marginLeft:"5px", color:"#5C6872", fontWeight:"100", backgroundColor:"#FFFFFF"}}>
                  {minPriceString}
                </Dropdown.Toggle>
                {minPriceDropDown}
              </Dropdown>

              <Dropdown onSelect={e => this.updateMaxPrice(e)} id='maxPriceDropDown'>
                <Dropdown.Toggle style={{fontSize:"16px" ,height:"50px", width:"100px", marginLeft:"5px",  color:"#5C6872", fontWeight:"100", backgroundColor:"#FFFFFF"}}>
                  {maxPriceString}
                </Dropdown.Toggle>
                {maxPriceDropDown}
              </Dropdown>
            </div>
          </div>

          <div style={{width:"50%", color:"#95a5a6", textAlign:"center",paddingLeft:"5px", float:"right", fontSize:"18px"}}>
            <div style={{width:"100%"}}>Square Feet</div>
            
            <div style={{width:"100%"}}>
              <Dropdown onSelect={e => this.updateMinSqft(e)} id='minSqftDropDown'>
                <Dropdown.Toggle style={{fontSize:"16px" ,height:"50px", width:"100px", marginLeft:"5px",  color:"#5C6872", fontWeight:"100", backgroundColor:"#FFFFFF"}}>
                  {minSqftString}
                </Dropdown.Toggle>
                {minSqftDropDown}
              </Dropdown>

              <Dropdown onSelect={e => this.updateMaxSqft(e)} id='maxSqftDropDown'>
                <Dropdown.Toggle style={{fontSize:"16px" ,height:"50px", width:"100px", marginLeft:"5px",  color:"#5C6872", fontWeight:"100", backgroundColor:"#FFFFFF"}}>
                  {maxSqftString}
                </Dropdown.Toggle>
                {maxSqftDropDown}
              </Dropdown>
            </div>
          </div>
        </Col>

        <Col md={12} lg={12} style={{height:"20%", marginTop:"10px"}}>
          <div style={{width:"100%", color:"#95a5a6", textAlign:"center",fontSize:"18px"}}>Sort By</div>

          <div style={{width:"100%"}}>
            <ButtonGroup style={{width:"100%"}}>
                <Button onClick={e => this.sortIndexChanged(e, 1)} style={{width:"33%", float:"right", height:"40px", backgroundColor:(priceBackground), color:(priceColor)}}>Price</Button>
                <Button onClick={e => this.sortIndexChanged(e, 2)} style={{width:"33%",float:"right", height:"40px", backgroundColor:(sqftBackground), color:(sqftColor)}}>Square Feet</Button>
                <Button onClick={e => this.sortIndexChanged(e, 3)} style={{width:"33%",float:"right", height:"40px", backgroundColor:(retailScoreBackground), color:(retailScoreColor)}}>RetailScore</Button>
            </ButtonGroup>
          </div>
        </Col>

      </div>
    );
  }
}