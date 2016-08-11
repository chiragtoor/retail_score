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
  "Fresno" : "https://s3-us-west-2.amazonaws.com/homepage-image-assets/fresno.jpg"
}

export class Homepage extends React.Component {

  constructor(props) {
    super(props);

    this.searchClick = this.searchClick.bind(this);
    this.tileClick = this.tileClick.bind(this);

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
    cityString.replace(' ','-');
    this.props.history.push('/retail-space-for-lease/' + cityString);
  }

  tileClick(city) {
	  var cityString = city;
    cityString.replace(' ','-');
    this.props.history.push('/retail-space-for-lease/' + cityString);
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
	              <div className="hidden-sm hidden-xs" style={{color:"#FFFFFF", fontWeight:"300px", float:"right"}}>
	                <Button onClick={this.scrollToAboutUs} style={{backgroundColor:"rgba(46, 204, 113,0.0)", marginRight:"10px", border:"solid thin white", color:"#FFFFFF"}} >About Us</Button>
	              </div>
	            </div>
	            {/* Below div contains two empty divs at start and end, needed for proper flex spacing */}
	            <div className="homepageFormContainer">
	              <div className="descriptionDivLg hidden-sm hidden-xs">
	                <center>
	                  <span className="homepageMottoText hidden-sm hidden-xs">{"Find the perfect retail location"}</span>
	                </center>
	                <center>
	                  <span className="productDescriptionSpan hidden-xs hidden-sm" style={{color:"#FFFFFF", marginTop:"10px", fontSize:"18px", fontWeight:"550"}} >{"With foot traffic, competition and demographic data for 1000+ properties, we'll help you find the perfect location for your business"}</span>
	                </center>
	              </div>
	              <div className="descriptionDivSm hidden-lg hidden-md">
	                <center>
	                  <span className="homepageMottoTextSm hidden-lg hidden-md">{"Find the perfect retail location"}</span>
	                </center>
	                <center>
	                  <span className="productDescriptionSpanSm hidden-md hidden-lg" style={{color:"#FFFFFF", fontSize:"18px", fontWeight:"550"}} >{"With foot traffic, competition and demographic data for 1000+ properties, we'll help you find the perfect location for your business"}</span>
	                </center>
	              </div>
	              <div style={{backgroundColor:"rgba(0, 0, 0, 0.5)", width:"100%", height:"80px", position:"absolute", bottom:"0"}}>
	                  <div className="col-lg-3 col-md-3 col-sm-1 col-xs-1"></div>
	                  <div className="col-lg-8 col-lg-offset-2 col-md-10 col-md-offset-1 col-sm-12 col-xs-12" style={{marginTop:"15"}}>

	                        <div className="hidden-xs" style={{width:"100%", float:"left", position:"relative"}}>
	                        	<HomepageSearchBar searchClick={this.searchClick} />
	                        </div>

	                      <div style={{width:"100%"}} className="hidden-lg hidden-md hidden-sm">
	                        	<HomepageSearchBar searchClick={this.searchClick}  />
	                      </div>

	                  </div>
	                  <div className="col-lg-3 col-md-3 col-sm-1 col-xs-1"></div>
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
	              {/* Large and Medium */}
	              <div className="col-lg-12 col-md-12 hidden-sm hidden-xs homepageMidSectionPadding">
	                <div className="row">
	                  <div className="col-lg-4 hidden-md">
	                    <center>
	                      <div className="homepageLocationTileLg">
	                        {this.renderLocationTile("Los Angeles")}
	                      </div>
	                    </center>
	                  </div>
	                  <div className="col-md-4 hidden-lg">
	                    <center>
	                      <div className="homepageLocationTileMd">
	                        {this.renderLocationTile("Los Angeles")}
	                      </div>
	                    </center>
	                  </div>
	                  <div className="col-lg-4 hidden-md">
	                    <center>
	                      <div className="homepageLocationTileLg">
	                        {this.renderLocationTile("San Francisco")}
	                      </div>
	                    </center>
	                  </div>
	                  <div className="col-md-4 hidden-lg">
	                    <center>
	                      <div className="homepageLocationTileMd">
	                        {this.renderLocationTile("San Francisco")}
	                      </div>
	                    </center>
	                  </div>
	                  <div className="col-lg-4 hidden-md">
	                    <center>
	                      <div className="homepageLocationTileLg">
	                        {this.renderLocationTile("San Diego")}
	                      </div>
	                    </center>
	                  </div>
	                  <div className="col-md-4 hidden-lg">
	                    <center>
	                      <div className="homepageLocationTileMd">
	                        {this.renderLocationTile("San Diego")}
	                      </div>
	                    </center>
	                  </div>
	                </div>
	                <div className="homepageMidSectionSpacer"/>
	                <div className="row">
	                  <div className="col-lg-4 hidden-md">
	                    <center>
	                      <div className="homepageLocationTileLg">
	                        {this.renderLocationTile("San Jose")}
	                      </div>
	                    </center>
	                  </div>
	                  <div className="col-md-4 hidden-lg">
	                    <center>
	                      <div className="homepageLocationTileMd">
	                        {this.renderLocationTile("San Jose")}
	                      </div>
	                    </center>
	                  </div>
	                  <div className="col-lg-4 hidden-md">
	                    <center>
	                      <div className="homepageLocationTileLg">
	                        {this.renderLocationTile("Sacramento")}
	                      </div>
	                    </center>
	                  </div>
	                  <div className="col-md-4 hidden-lg">
	                    <center>
	                      <div className="homepageLocationTileMd">
	                        {this.renderLocationTile("Sacramento")}
	                      </div>
	                    </center>
	                  </div>
	                  <div className="col-lg-4 hidden-md">
	                    <center>
	                      <div className="homepageLocationTileLg">
	                        {this.renderLocationTile("Fresno")}
	                      </div>
	                    </center>
	                  </div>
	                  <div className="col-md-4 hidden-lg">
	                    <center>
	                      <div className="homepageLocationTileMd">
	                        {this.renderLocationTile("Fresno")}
	                      </div>
	                    </center>
	                  </div>
	                </div>
	              </div>
	              {/* Small */}
	              <div className="col-sm-12 hidden-md hidden-lg hidden-xs homepageMidSectionPadding">
	                <div className="row">
	                  <div className="col-sm-6">
	                    <center>
	                      <div className="homepageLocationTile">
	                        {this.renderLocationTile("Los Angeles")}
	                      </div>
	                    </center>
	                  </div>
	                  <div className="col-sm-6">
	                    <center>
	                      <div className="homepageLocationTile">
	                        {this.renderLocationTile("San Francisco")}
	                      </div>
	                    </center>
	                  </div>
	                </div>
	                <div className="homepageMidSectionSpacer"/>
	                <div className="row">
	                  <div className="col-sm-6">
	                    <center>
	                      <div className="homepageLocationTile">
	                        {this.renderLocationTile("San Diego")}
	                      </div>
	                    </center>
	                  </div>
	                  <div className="col-sm-6">
	                    <center>
	                      <div className="homepageLocationTile">
	                        {this.renderLocationTile("San Jose")}
	                      </div>
	                    </center>
	                  </div>
	                </div>
	                <div className="homepageMidSectionSpacer"/>
	                <div className="row">
	                  <div className="col-sm-6">
	                    <center>
	                      <div className="homepageLocationTile">
	                        {this.renderLocationTile("Sacramento")}
	                      </div>
	                    </center>
	                  </div>
	                  <div className="col-sm-6">
	                    <center>
	                      <div className="homepageLocationTile">
	                        {this.renderLocationTile("Fresno")}
	                      </div>
	                    </center>
	                  </div>
	                </div>
	              </div>
	              {/* XSmall */}
	              <div className="col-xs-12 hidden-md hidden-lg hidden-sm">
	                <div className="homepageLocationTileSm">
	                  {this.renderLocationTile("Los Angeles")}
	                </div>
	                <div className="homepageLocationSpacerSm"/>
	                <div className="homepageLocationTileSm">
	                  {this.renderLocationTile("San Francisco")}
	                </div>
	                <div className="homepageLocationSpacerSm"/>
	                <div className="homepageLocationTileSm">
	                  {this.renderLocationTile("San Diego")}
	                </div>
	                <div className="homepageLocationSpacerSm"/>
	                <div className="homepageLocationTileSm">
	                  {this.renderLocationTile("San Jose")}
	                </div>
	                <div className="homepageLocationSpacerSm"/>
	                <div className="homepageLocationTileSm">
	                  {this.renderLocationTile("Sacramento")}
	                </div>
	                <div className="homepageLocationSpacerSm"/>
	                <div className="homepageLocationTileSm">
	                  {this.renderLocationTile("Fresno")}
	                </div>
	              </div>
	            </div>
	            <div id="about_us" className="homepageMidSectionSpacer"/>
	            {/* Zamatics Info Section */}
	            <center>
	              <h1>What is Retail Score?</h1>
	            </center>
	            <div className="row">
	              <div className="homepageMidSectionSpacer"/>
	              <div className="col-md-1" />
	              <div className="col-md-10">
	                <center>
	                  <div className="homepageInfoBoxes">
	                    <div className="row" >
	                      <div className="col-md-4 col-sm-6">
	                        <img className="fullWidth" src={"https://s3-us-west-2.amazonaws.com/homepage-image-assets/Stocksy_txp88dd7451zi3100_Small_440112.jpg"} />
	                      </div>
	                      <div className="col-md-8 col-sm-6">
	                        <center>
	                          <h4 className="homepageInfoBoxText">{"While a good location can help your business flourish, a bad location can almost guarantee its failure. So what makes a good location? On our website we score all available retail properties on traffic and the sales of surrounding retail businesses, both of which are indicators of good locations. By analyzing business density and aggregate sales records (from Census and Bureau of Labor Statistics data) we also chart out a map of the highest traffic points in a given city to help you find the perfect location to start your business."}</h4>
	                        </center>
	                      </div>
	                    </div>
	                  </div>
	                </center>
	              </div>
	              <div className="col-md-1" />
	            </div>
	            <div className="homepageMidSectionSpacer"/>
	            {/* Footer Section */}
	            <div className="row homepageFooter">
	              <center>
	              	<img className="FooterLogo" src="https://s3-us-west-2.amazonaws.com/homepage-image-assets/retail_score_logo_white.png" />
	                <p><a className="homepageFooterEmailLink" href="mailto:support@company.com">sudjeev@zamatics.com</a></p>
	              </center>
	            </div>
	          </div>
	        </div>
	      </div>
    );
  }
}

export default Homepage;
