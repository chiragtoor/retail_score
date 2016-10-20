import {default as React, Component} from "react";
import {Glyphicon,Modal, Button, ButtonGroup, FormGroup, ControlLabel, FormControl, InputGroup, Panel, Nav,Grid, Row, Col, NavItem} from "react-bootstrap";
import GoogleMap from './GoogleMap';
import RetailCompetitionGoogleMap from './RetailCompetitionGoogleMap';
import DesktopCompetitionSearchBar from './DesktopCompetitionSearchBar';

const isBrowser = typeof window !== 'undefined';


export default class DesktopRetailCompetitionPanel extends Component {

  constructor(props) {
    super(props);

    this.searchClick = this.searchClick.bind(this);
    this.pinClick = this.pinClick.bind(this);
    this.foodTap = this.foodTap.bind(this);
    this.coffeeTap = this.coffeeTap.bind(this);
    this.barTap = this.barTap.bind(this);
    this.healthTap = this.healthTap.bind(this);
    this.clothingTap = this.clothingTap.bind(this);
    this.hairTap = this.hairTap.bind(this);
    this.beautyTap = this.beautyTap.bind(this);


    this.jewelryTap = this.jewelryTap.bind(this);
    this.shoeTap = this.shoeTap.bind(this);

    this.state = {
      keyword: "food",
      type: "restaurant",
      selected: 0
    };
  }

  pinClick(name) {
    this.props.mixpanel.track('Competition Pin Clicked', {'name':name});
  }

  searchClick(keyword) {
    this.state.keyword = keyword;
    this.setState(this.state);

    this.props.mixpanel.track('Competition Searched', {'keyword':keyword});
  }

  foodTap(){
    this.state.keyword = "food"
    this.state.type = "restaurant";
    this.state.selected = 0;
    this.setState(this.state);
  }

  coffeeTap(){
    this.state.keyword = "coffee"
    this.state.type = "cafe";
    this.state.selected = 1;
    this.setState(this.state);
  }

  jewelryTap(){
    this.state.keyword = "jewelry"
    this.state.type = "jewelry_store";
    this.state.selected = 7;
    this.setState(this.state);
  }

  shoeTap(){
    this.state.keyword = "shoe"
    this.state.type = "shoe_store";
    this.state.selected = 8;
    this.setState(this.state);
  }

  barTap(){
    this.state.keyword = "bar";
    this.state.type = "bar";
    this.state.selected = 2;
    this.setState(this.state);
  }

  healthTap(){
    this.state.keyword = "spa";
    this.state.type = "spa";
    this.state.selected = 4;
    this.setState(this.state);
  }

  beautyTap(){
    this.state.keyword = "beauty";
    this.state.type = "beauty_salon";
    this.state.selected = 3;
    this.setState(this.state);    
  }

  hairTap(){
    this.state.keyword = "salon";
    this.state.type = "hair_care";
    this.state.selected = 5;
    this.setState(this.state);
  }

  clothingTap(){
    this.state.keyword = "clothing";
    this.state.type = "clothing_store";
    this.state.selected = 6;
    this.setState(this.state);
  }

  render () {

  var retailScoreText = "";

  if(this.props.property.fashion_count){
    var count = this.props.property.fashion_count ;

    retailScoreText = retailScoreText + count + " fashion businesses"

    if(this.props.property.food_count){
        retailScoreText = retailScoreText + ", " + this.props.property.food_count + " food/drink businesses" 
    }

    if(this.props.property.wellness_count){
        retailScoreText = retailScoreText + ", " + this.props.property.wellness_count + " wellness businesses" 
    }

    retailScoreText = retailScoreText + " within a 5 min walk of this property";
  }

  var foodBackground = "#FFFFFF";
  var foodText  = "#FC5C63";
  var coffeeBackground = "#FFFFFF";
  var coffeeText = "#FC5C63";
  var nightlifeBackground = "#FFFFFF";
  var nightlifeText = "#FC5C63";
  var beautyBackground = "#FFFFFF";
  var beautyText = "#FC5C63";
  var healthBackground = "#FFFFFF";
  var healthText = "#FC5C63";
  var hairBackground = "#FFFFFF";
  var hairText = "#FC5C63";
  var clothingBackground = "#FFFFFF";
  var clothingText = "#FC5C63";
  var jewelryBackground = "#FFFFFF";
  var jewelryText = "#FC5C63";
  var shoeBackground = "#FFFFFF";
  var shoeText = "#FC5C63";

  switch (this.state.selected) {
    case 0:
      foodBackground = "#FC5C63";
      foodText = "#FFFFFF";
      break;
    case 1:
      coffeeBackground = "#FC5C63";
      coffeeText = "#FFFFFF";
      break;
    case 2:
      nightlifeBackground = "#FC5C63";
      nightlifeText = "#FFFFFF";
      break;
    case 3:
      beautyBackground = "#FC5C63";
      beautyText = "#FFFFFF";
      break;
    case 4:
      healthBackground = "#FC5C63";
      healthText = "#FFFFFF";
      break;
    case 5:
      hairBackground = "#FC5C63";
      hairText = "#FFFFFF";
      break;
    case 6:
      clothingBackground = "#FC5C63";
      clothingText = "#FFFFFF";
      break;
    case 7:
      jewelryBackground = "#FC5C63";
      jewelryText = "#FFFFFF";
      break;
    case 8:
      shoeBackground = "#FC5C63";
      shoeText = "#FFFFFF";
      break;
  }

    return (
      <div style={{height:"500px", width:"100%", marginTop:"20px"}}>
        <h3 style={{width:"100%", height:"50px", textAlign:"center", color:"#FC5C63"}}>{retailScoreText}</h3>
        <div className="row-masonry" style={{height:"400px", border:"solid thin #FFFFFF"}}>
          <Col lg={2} style={{margin:"0px", padding:"0px", height:"100%"}}>
            <ButtonGroup style={{width:"100%", height:"100%"}}>
              <Button onClick={this.foodTap} style={{backgroundColor:(foodBackground), color:(foodText), fontSize:"20px", width:"100%", height:"11.1%", textAlign:"left"}}><em className="fa fa-cutlery"></em> Restaurants</Button>
              <Button onClick={this.coffeeTap} style={{backgroundColor:(coffeeBackground), color:(coffeeText),fontSize:"20px", width:"100%", height:"11.1%", textAlign:"left"}}><em className="fa fa-coffee"></em> Coffee</Button>
              <Button onClick={this.barTap} style={{backgroundColor:(nightlifeBackground), color:(nightlifeText),fontSize:"20px", width:"100%", height:"11.1%", textAlign:"left"}}><em className="fa fa-glass"></em> Nightlife</Button>
              <Button onClick={this.beautyTap} style={{backgroundColor:(beautyBackground), color:(beautyText),fontSize:"20px",width:"100%", height:"11.1%", textAlign:"left"}}><em className="fa fa-heart-o"></em> Beauty Salon</Button>
              <Button onClick={this.healthTap} style={{backgroundColor:(healthBackground), color:(healthText),fontSize:"20px",width:"100%", height:"11.1%", textAlign:"left"}}><em className="fa fa-heart"></em> Health Spa</Button>
              <Button onClick={this.hairTap} style={{backgroundColor:(hairBackground), color:(hairText),fontSize:"20px",width:"100%", height:"11.1%", textAlign:"left"}}><em className="fa fa-heart-o"></em> Hair Salon</Button>
              <Button onClick={this.clothingTap} style={{backgroundColor:(clothingBackground), color:(clothingText),fontSize:"20px",width:"100%", height:"11.1%", textAlign:"left"}}><em className="fa fa-shopping-bag"></em> Clothing Store</Button>
              <Button onClick={this.jewelryTap} style={{backgroundColor:(jewelryBackground), color:(jewelryText),fontSize:"20px",width:"100%", height:"11.1%", textAlign:"left"}}><em className="fa fa-diamond"></em> Jewelry Store</Button>
              <Button onClick={this.shoeTap} style={{backgroundColor:(shoeBackground), color:(shoeText),width:"100%",fontSize:"20px", height:"11.1%", textAlign:"left"}}><em className="fa fa-shopping-bag"></em> Shoe Store</Button>
            </ButtonGroup>
          </Col>
          <Col lg={10} style={{margin:"0px", padding:"0px", height:"100%"}}>
            <div style={{height:"400px", width:"100%", margin:"0px", padding:"0px"}}>
                <RetailCompetitionGoogleMap
                  id={this.props.tag}
                  pinClick={this.pinClick}
                  property={this.props.property}
                  type={this.state.type}
                  keyword={this.state.keyword}/>
             </div>
          </Col>
        </div>      
      </div>
    );

  }
}