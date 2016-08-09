import {default as React, Component} from "react";
import {Glyphicon,Modal, Button,ButtonGroup, FormGroup, ControlLabel, FormControl, InputGroup, Panel, Nav, NavItem, NavBar} from "react-bootstrap";
import InputRange from 'react-input-range';


const PRICE_MIN = 0;
const PRICE_MAX = 50000;

const SQ_MIN = 0;
const SQ_MAX = 10000;

export default class Filters extends Component {

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
  }

  updatePrice(component, values) {
    this.state.priceMin = values.min;
    this.state.priceMax = values.max;
    this.setState(this.state);
  }

  sortIndexChanged(e, selectedKey) {
    this.state.sortIndex = selectedKey;
    this.setState(this.state);

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

        <div style={{width:"100%", textAlign:"center", fontSize:"18px", marginTop:"10px"}}>Sort By:</div> 

        <center>
          <ButtonGroup style={{width:"80%", marginTop:"5px"}}>
              <Button onClick={e => this.sortIndexChanged(e, 1)} style={{width:"33%", height:"40px", backgroundColor:(priceBackground), color:(priceColor)}}>Price</Button>
              <Button onClick={e => this.sortIndexChanged(e, 2)} style={{width:"33%", height:"40px", backgroundColor:(sqftBackground), color:(sqftColor)}}>Square Feet</Button>
              <Button onClick={e => this.sortIndexChanged(e, 3)} style={{width:"33%", height:"40px", backgroundColor:(retailScoreBackground), color:(retailScoreColor)}}>RetailScore</Button>
          </ButtonGroup>
        </center>
        
        <div style={{width:"100%", textAlign:"center", fontSize:"18px", marginTop:"15px"}}>Price</div>
        <div style={{width:"80%", marginLeft:"10%", marginTop:"5px", height:"25px"}}>
          <InputRange
              maxValue={PRICE_MAX}
              minValue={PRICE_MIN}
              value={{min: this.state.priceMin, max: this.state.priceMax}}
              onChange={this.updatePrice} />
        </div>
        <div style={{height:"15px", width:"90%",color:"#95a5a6",  marginLeft:"5%", marginTop:"10px"}}>
          <div style={{float:"left"}}>{styledPriceMin}</div>
          <div style={{float:"right"}}>{styledPriceMax}</div>
        </div>

        <div style={{width:"100%", textAlign:"center", fontSize:"18px", marginTop:"10px"}}>Square Feet</div>
        <div style={{width:"80%", marginLeft:"10%", marginTop:"5px", height:"25px"}}>
          <InputRange
              maxValue={SQ_MAX}
              minValue={SQ_MIN}
              value={{min: this.state.sqftMin, max: this.state.sqftMax}}
              onChange={this.updateSqft} />
        </div>
        <div style={{height:"15px", width:"90%", color:"#95a5a6", marginLeft:"5%", marginTop:"10px"}}>
          <div style={{float:"left"}}>{styledSqftMin}</div>
          <div style={{float:"right"}}>{styledSqftMax}</div>
        </div>


        <Button onClick={this.saveFilters} style={{backgroundColor:"#49A3DC",color:"#FFFFFF", marginTop:"30px", border:"solid thin #49A3DC", width:"60%", marginLeft:"20%", fontSize:"18px", fontWeight:"400px"}}>Save</Button>
      </div>
    );
  }
}