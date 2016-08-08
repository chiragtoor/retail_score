import {default as React, Component} from "react";
import {Glyphicon,Modal, Button, FormGroup, ControlLabel, FormControl, InputGroup, Panel, Nav, NavItem} from "react-bootstrap";
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

    this.state = {
      priceMin: PRICE_MIN,
      priceMax: PRICE_MAX,
      sqftMin: SQ_MIN,
      sqftMax: SQ_MAX
    };
  }

  componentDidMount() {
    console.log("priceMin: " + this.props.priceMin + " priceMax " + this.props.priceMax + " sqftmin " + this.props.sqftMin + " sqftMax " + this.props.sqftMax);
    this.state.priceMin = this.props.priceMin;
    this.state.priceMax = this.props.priceMax;
    this.state.sqftMin = this.props.sqftMin;
    this.state.sqftMax = this.props.sqftMax;
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

  saveFilters(){
    console.log("save Filters in filter component priceMin: " + this.state.priceMin + " priceMax " + this.state.priceMax + " sqftmin " + this.state.sqftMin + " sqftMax " + this.state.sqftMax);

    this.props.saveFilters(this.state.priceMin, this.state.priceMax, this.state.sqftMin, this.state.sqftMax);
  }

  render () {

    return (
      <div style={{height:"100%", width:"100%", backgroundColor:"#FFFFFF"}}>
        
        <div style={{width:"100%", textAlign:"center", fontSize:"18px", marginTop:"5px"}}>Price</div>
        <div style={{width:"80%", marginLeft:"10%", marginTop:"30px"}}>
          <InputRange
              maxValue={PRICE_MAX}
              minValue={PRICE_MIN}
              value={{min: this.state.priceMin, max: this.state.priceMax}}
              onChange={this.updatePrice} />
        </div>
        <div style={{height:"15px", width:"90%",color:"#95a5a6",  marginLeft:"5%", marginTop:"10px"}}>
          <div style={{float:"left"}}>{this.state.priceMin}</div>
          <div style={{float:"right"}}>{this.state.priceMax}</div>
        </div>

        <div style={{width:"100%", textAlign:"center", fontSize:"18px", marginTop:"5px"}}>Square Feet</div>
        <div style={{width:"80%", marginLeft:"10%", marginTop:"30px"}}>
          <InputRange
              maxValue={SQ_MAX}
              minValue={SQ_MIN}
              value={{min: this.state.sqftMin, max: this.state.sqftMax}}
              onChange={this.updateSqft} />
        </div>
        <div style={{height:"15px", width:"90%", color:"#95a5a6", marginLeft:"5%", marginTop:"10px"}}>
          <div style={{float:"left"}}>{this.state.sqftMin}</div>
          <div style={{float:"right"}}>{this.state.sqftMax}</div>
        </div>

        <div style={{width:"100%", textAlign:"center", fontSize:"18px", marginTop:"5px"}}>Sort By</div>


        <Button onClick={this.saveFilters} style={{backgroundColor:"#49A3DC",color:"#FFFFFF", border:"solid thin #49A3DC", width:"60%", marginLeft:"20%", fontSize:"18px", fontWeight:"400px"}}>Save</Button>
      </div>
    );
  }
}