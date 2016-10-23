import React from 'react';
import { connect } from "react-redux";

import ContentWrapper from '../components/Base/ContentWrapper';
import {Glyphicon, Button, FormGroup, ControlLabel, FormControl, InputGroup, Panel, Well} from "react-bootstrap";
import HomepageSearchBar from '../components/HomepageSearchBar';
import HomepageTile from '../components/HomepageTile';


const imageMap = {
  "Los Angeles": "https://s3-us-west-2.amazonaws.com/zamatics-images/los-angeles-downtown.jpg",
  "San Francisco": "https://s3-us-west-2.amazonaws.com/zamatics-images/san-francisco-downtown.jpg",
  "New York City": "https://s3-us-west-2.amazonaws.com/zamatics-images/new-york-downtown.jpg",
  "Boston": "https://s3-us-west-2.amazonaws.com/zamatics-images/boston-downtown.jpg",
  "Seattle": "https://s3-us-west-2.amazonaws.com/zamatics-images/seattle-downtown.jpg",
  "Chicago": "https://s3-us-west-2.amazonaws.com/zamatics-images/chicago-downtown.jpg",
  "San Diego": "https://s3-us-west-2.amazonaws.com/homepage-image-assets/san-diego-skyline.jpg",
  "San Jose" : "https://s3-us-west-2.amazonaws.com/homepage-image-assets/san-jose.jpg",
  "Sacramento" : "https://s3-us-west-2.amazonaws.com/homepage-image-assets/sacramento.jpg",
  "Fresno" : "https://s3-us-west-2.amazonaws.com/homepage-image-assets/sacramento.jpg",
  "Santa Monica" : "https://media.xogrp.com/images/c3d8109c-69fb-4589-a30b-ada0a395ec8e",
  "Long Beach" : "http://i1.trekearth.com/photos/8086/imgp1131.jpg",
  "Hollywood" : "http://redlinegrouptravel.com/wp-content/uploads/2013/08/Hollywood-Highland.jpg",
  "Beverly Hills": "http://rodeodrive-shop.com/images/SlideShow_Front/Rodeo-Drive-0799.jpg"
}

const BUSINESS_TYPE = 'business_type';

export class Homepage extends React.Component {

  constructor(props) {
    super(props);

    this.searchClick = this.searchClick.bind(this);
    this.tileClick = this.tileClick.bind(this);
    this.scrollToAboutUs = this.scrollToAboutUs.bind(this);
    this.searchButtonClicked = this.searchButtonClicked.bind(this);

    this.state = {
      value : "",
      city: ""
    };
  }

  renderLocationTile(city) {
    var imageSource = imageMap[city];
    return <HomepageTile img={imageSource} city={city} tileClick={this.tileClick} />;
  }

  searchClick(city) {
	  var cityString = city;

	  if(cityString == '') {
	  	return;
	  }

	  //track this click on mixpanel
	  this.context.mixpanel.track('Homepage Search', {'city':cityString});

    cityString.replace(' ','-');
    this.props.history.push('/retail-space-for-lease/' + cityString);
  }

  tileClick(city) {
	  var cityString = city;

	  //track this click on mixpanel
	  this.context.mixpanel.track('Location Tile Click', {'city':cityString});

    cityString.replace(' ','-');
    this.props.history.push('/retail-space-for-lease/' + cityString + ',%20CA');
  }

  searchButtonClicked(business) {
  	localStorage.setItem(BUSINESS_TYPE, business);

  	this.props.history.push('/retail-space-for-lease/Los%20Angeles,%20CA');
  }

  scrollToAboutUs() {

	  this.context.mixpanel.track('Homepage About Us Tap');

    document.getElementById('about_us').scrollIntoView();
  }

  render() {

    return(
	      <div className="container-fluid container-div">
	        <div className="row fullHeight">
	          {/* Background Image shown behind the glass */}
	          <div className="homepageImageContainer">
	            <div className="row noPaddingOrMargin">
	              <div className="hidden-sm hidden-xs hidden-md homepageLargeImage">
	                <img className="fullWidth" src="https://s3-us-west-2.amazonaws.com/homepage-image-assets/Stocksy_txp88dd7451zi3100_Small_746462.jpg" />
	              </div>
	              <div className="hidden-sm hidden-xs hidden-lg homepageMediumImage">
	                <img className="fullWidth" src="https://s3-us-west-2.amazonaws.com/homepage-image-assets/Stocksy_txp88dd7451zi3100_Small_746462.jpg" />
	              </div>
	              <div className="hidden-lg hidden-md hidden-xs homepageSmallImage">
	                <img className="fullWidth"  src="https://s3-us-west-2.amazonaws.com/homepage-image-assets/Stocksy_txp88dd7451zi3100_Small_983769.jpg" />
	              </div>
	              <div className="hidden-lg hidden-md hidden-sm homepageXSmallImage">
	                <img className="fullWidth"  src="https://s3-us-west-2.amazonaws.com/homepage-image-assets/Stocksy_txp88dd7451zi3100_Small_919509.jpg" />
	              </div>
	            </div>
	          </div>
	          <div className="homepageGlassContainer">
	            {/* Top bar container with the Logo */}
	            <div className="row homepageTopBarContainer">
	              <div className="hidden-sm hidden-xs" style={{width:"50%", float:"left"}}>
	              	<img className="homepageTopBarImage" src={"https://s3-us-west-2.amazonaws.com/homepage-image-assets/retail_score_logo_white.png"} />
	              </div>
	              <div className="hidden-lg hidden-md">
	                <center>
	                	<img className="homepageTopBarImage" src={"https://s3-us-west-2.amazonaws.com/homepage-image-assets/retail_score_logo_white.png"} />
	                </center>
	              </div>
	            </div>
	            {/* Below div contains two empty divs at start and end, needed for proper flex spacing */}
	            <div className="homepageFormContainer">

	              <div className="descriptionDivLg hidden-sm hidden-xs">
	                <center>
	                  <span className="homepageMottoText hidden-sm hidden-xs">Search Retail Listings for Free</span>
	                </center>
	              </div>

	              <div className="descriptionDivSm hidden-lg hidden-md">
	                <center>
	                  <span className="homepageMottoTextSm hidden-lg hidden-md">{"Search Retail Listings for Free"}</span>
	                </center>

	              </div>

	              <div style={{backgroundColor:"rgba(0, 0, 0, 0.0)", width:"100%", height:"200px", position:"absolute", bottom:"0"}}>
	                  <div className="col-lg-3 col-md-3 col-sm-1 col-xs-1"></div>

	                  <div className="col-lg-8 col-lg-offset-2 col-md-10 col-md-offset-1 col-sm-12 col-xs-12" style={{marginTop:"15"}}>
	                      <div style={{width:"100%", position:"relative"}}>
	                        	<HomepageSearchBar searchClick={this.searchClick}  />
	                      </div>
	                  </div>

	                  <div className="col-lg-3 col-md-3 col-sm-1 col-xs-1"></div>
	                  
	                  <div className="row hidden-md hidden-sm hidden-xs" style={{color:"white",backgroundColor:"rgba(0, 0, 0, 0.6)", textAlign:"center", margin:"0", padding:"0", paddingTop:"5px", width:"100%", height:"100px", position:"absolute", bottom:"0"}}>
	                  	<div className="col-lg-4 col-md-4" style={{color:"#FFFFFF",fontSize:"25px" ,fontWeight:"400px"}}>
	                  		<i className="fa fa-usd" style={{fontSize:"50px"}}/>
	                  		<br />
	                  		Customer Traffic
	                  	</div>
	                  	<div className="col-lg-4 col-md-4" style={{color:"#FFFFFF", fontSize:"25px", fontWeight:"400px"}}>
	                  		<i className="fa fa-pie-chart" style={{fontSize:"50px"}}/>
	                  		<br />
	                  		Demographic Data
	                  	</div>
	                  	<div className="col-lg-4 col-md-4" style={{color:"#FFFFFF", fontSize:"25px", fontWeight:"400px"}}>
	                  		<i className="fa fa-shopping-cart" style={{fontSize:"50px"}}/>
	                  		<br />
	                  		Surrounding Businesses 
	                  	</div>
	                  </div>
	              </div>

	              <div/>
	            </div>
	          </div>
	          {/* Select city section */}
	          <div id="cities" className="col-xs-12 homepageMidSectionContainer">
	            <center>
	              <h1>Popular Cities</h1>
	            </center>
	            <div className="homepageMidSectionSpacer"/>
	            <div className="row">
	              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 homepageMidSectionPadding">
                  <div className="col-lg-4 col-md-4 col-sm-6 col-xs-12">
                    <center>
                      <div className="homepageLocationTileImage">
                        {this.renderLocationTile("Los Angeles")}
                      </div>
                    </center>
                  </div>

                  <div className="col-lg-4 col-md-4 col-sm-6 col-xs-12">
                    <center>
                      <div className="homepageLocationTileImage">
                        {this.renderLocationTile("San Francisco")}
                      </div>
                    </center>
                  </div>

                  <div className="col-lg-4 col-md-4 col-sm-6 col-xs-12">
                    <center>
                      <div className="homepageLocationTileImage">
                        {this.renderLocationTile("Santa Monica")}
                      </div>
                    </center>
                  </div>

                  <div className="col-lg-4 col-md-4 col-sm-6 col-xs-12">
                    <center>
                      <div className="homepageLocationTileImage">
                        {this.renderLocationTile("Hollywood")}
                      </div>
                    </center>
                  </div>

                  <div className="col-lg-4 col-md-4 col-sm-6 col-xs-12">
                    <center>
                      <div className="homepageLocationTileImage">
                        {this.renderLocationTile("Long Beach")}
                      </div>
                    </center>
                  </div>

                  <div className="col-lg-4 col-md-4 col-sm-6 col-xs-12">
                    <center>
                      <div className="homepageLocationTileImage">
                        {this.renderLocationTile("Beverly Hills")}
                      </div>
                    </center>
                  </div>
                </div>

	            </div>

	            <div className="homepageMidSectionSpacer"/>
	            {/* Footer Section */}
	            <div className="row homepageFooter">
	              <center>
	              	<img className="FooterLogo" src="https://s3-us-west-2.amazonaws.com/homepage-image-assets/retail_score_logo_white.png" />
	                <p><a className="homepageFooterEmailLink" href="mailto:support@company.com">sudjeev@retailscore.com</a></p>
	              </center>
	            </div>
	          </div>
	        </div>
	      </div>
    );
  }
}

class SearchBar extends React.Component {
	constructor(props) {
    super(props);

    this.state = {
      value : ""
    };
  }

  render() {
    return(
      <div>
        <InputGroup className="searchBar">
          {/* <InputGroup.Button className="hidden-md hidden-lg"><Button style={this.props.noPadding ? mobileMenuButtonStyle : {height:"50px", borderColor:"#CCCCCC"}}>&nbsp;&nbsp;<i className="fa fa-list" style={{color:"#49A3DC"}}/>&nbsp;&nbsp;</Button></InputGroup.Button> */}
          {/* <FormControl type="text" style={this.props.noPadding ? mobileSearchBarStyle : {height:"50px"}}/> */}
          <FormControl 
          	style={{height:"50px"}}
            type="text" 
            placeholder="What business are you opening?"
            onChange={(e) => this.setState({value: e.target.value})}
            value={this.state.value}/>
          <InputGroup.Button><Button style={{height:"50px", borderColor:"#49A3DC", backgroundColor:"#49A3DC"}} onClick={() => this.props.onClick(this.state.value)}>&nbsp;&nbsp;<i className="fa fa-search" style={{color:"#FFFFFF"}}/>&nbsp;&nbsp;</Button></InputGroup.Button>
        </InputGroup>
      </div>
    );
  }
}


Homepage.contextTypes = {
    mixpanel: React.PropTypes.object.isRequired
};

export default Homepage;
