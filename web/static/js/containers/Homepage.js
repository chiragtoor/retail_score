import React from 'react';
import { Row, Col } from 'react-bootstrap';

import AppBar from '../components/AppBar';
import SearchBar from '../components/SearchBar';

const imageMap = {
  "Los Angeles": "https://s3-us-west-2.amazonaws.com/zamatics-images/los-angeles-downtown.jpg",
  "San Francisco": "https://s3-us-west-2.amazonaws.com/zamatics-images/san-francisco-downtown.jpg",
  "Santa Monica" : "https://media.xogrp.com/images/c3d8109c-69fb-4589-a30b-ada0a395ec8e"
}

export class Homepage extends React.Component {

  renderLocationTile(city) {
    var imageSource = imageMap[city];
    return <div className="homepageTile-container" onClick={e => this.props.history.push('/retail-space-for-lease/' + city + ', CA')}>
            <div className="homepageTile">
              <h4 className="homepageTileText" >{city}</h4>
            </div>
            <img className="homepageTileImage" src={imageSource} />
          </div>;
  }

  render() {
    return(
      <div style={{width:"100%", height:"100%", margin:"0px", padding:"0px"}}>
        <AppBar noShadow={true}/>
        <div style={{width:"100%", height:"100%"}}>
          <div className="homepageBackground" />
          <div className="homepageGlassContainer" style={{display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center"}}>
            <h1 style={{color:"#FFFFFF", marginBottom:"40px", marginLeft:"40px", marginRight:"40px", textAlign:"center"}}>Search Retail Spaces for Free</h1>
            <div style={{width:"80%"}}>
              <SearchBar value={""} onSearch={(city) => this.props.history.push('/retail-space-for-lease/' + city)} />
            </div>
            <h2 style={{color:"#FFFFFF", marginTop:"40px", marginLeft:"40px", marginRight:"40px", textAlign:"center"}}>Find the Retail Space with the traffic your business needs</h2>
          </div>
        </div>
        <div className="container-fluid" style={{margin:"0px", padding:"0px"}}>
          <Row style={{width:"100%", margin:"0px", marginBottom:"20px"}}>
            <Col md={4} style={{display:"flex", justifyContent:"center", alignItems:"center"}}>
              <div style={{width:"100%", display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center"}}>
                <div style={{display:"flex", justifyContent:"center", alignItems:"center", width:"150px", height:"150px", borderWidth:"3px", borderStyle:"solid", borderRadius:"100px", borderColor:"#49A3DC"}}>
                  <i className="fa fa-users fa-5x" style={{color: "#49A3DC"}}/>
                </div>
                <h2>Retail Traffic Drivers</h2>
                <p style={{textAlign:"center", marginTop:"10px", marginBottom:"20px"}}>The right Retail Space has access to the type of traffic you are looking for, stop spending hours scouting locations in person. RetailScore provides you with detailed info on the traffic drivers of each retail space.</p>
              </div>
            </Col>
            <Col md={4} style={{display:"flex", justifyContent:"center", alignItems:"center"}}>
              <div style={{width:"100%", display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center"}}>
                <div className="crossThrough" style={{display:"flex", justifyContent:"center", alignItems:"center", width:"150px", height:"150px", borderWidth:"3px", borderStyle:"solid", borderRadius:"100px", borderColor:"#49A3DC"}}>
                  <i className="fa fa-usd fa-5x" style={{color: "#49A3DC"}}/>
                </div>
                <h2>Free to Search</h2>
                <p style={{textAlign:"center", marginTop:"10px", marginBottom:"20px"}}>You have enough to do to get your business up and running, with us there are no hidden listings or data, get all the info you need to find and contact a compatible space for your business for no charge.</p>
              </div>
            </Col>
            <Col md={4} style={{display:"flex", justifyContent:"center", alignItems:"center"}}>
              <div style={{width:"100%", display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center"}}>
                <div style={{display:"flex", justifyContent:"center", alignItems:"center", width:"150px", height:"150px", borderWidth:"3px", borderStyle:"solid", borderRadius:"100px", borderColor:"#49A3DC"}}>
                  <i className="fa fa-pie-chart fa-5x" style={{color: "#49A3DC"}}/>
                </div>
                <h2>Demographics</h2>
                <p style={{textAlign:"center", marginTop:"10px", marginBottom:"20px"}}>Understand who lives around each retail space and be sure they match your target market. With up-to-date demographic information (provided by Esri), you will be able to make an informed decision.</p>
              </div>
            </Col>
          </Row>
          <hr style={{marginLeft:"40px", marginRight:"40px"}}/>
          <center>
            <h3>Popular Cities</h3>
          </center>
          <div className="row" style={{marginBottom:"40px"}}>
            <div className="homepageMidSectionPadding">
              <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12">
                <center>
                  <div className="homepageLocationTileImage">
                    {this.renderLocationTile("Los Angeles")}
                  </div>
                </center>
              </div>
              <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12">
                <center>
                  <div className="homepageLocationTileImage">
                    {this.renderLocationTile("San Francisco")}
                  </div>
                </center>
              </div>
              <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12">
                <center>
                  <div className="homepageLocationTileImage">
                    {this.renderLocationTile("Santa Monica")}
                  </div>
                </center>
              </div>
            </div>
          </div>
          <Row style={{width:"100%", backgroundColor:"#49A3DC", margin:"0px", padding:"20px 0px"}}>
            <Col md={4} style={{display:"flex", justifyContent:"center", alignItems:"center", flexDirection:"column", marginTop:"20px"}}>
              <img style={{height:"45px", marginLeft:"15px"}} src="https://s3-us-west-2.amazonaws.com/homepage-image-assets/retail_score_logo_white.png" />
              <p className="footer-company-name">RetailScore &copy; 2016</p>
            </Col>
            <Col md={4} style={{display:"flex", justifyContent:"center", alignItems:"center", flexDirection:"column"}}>
              <div className="footer-center" style={{display:"flex", justifyContent:"center", alignItems:"left", flexDirection:"column"}}>
                <div style={{display:"flex", alignItems:"center"}}>
                  <i className="fa fa-map-marker"></i>
                  <p style={{color:"#FFFFFF"}}><span>222 Idaho Ave.</span> Santa Monica, CA</p>
                </div>
                <div style={{display:"flex", alignItems:"center"}}>
                  <i className="fa fa-phone"></i>
                  <p style={{color:"#FFFFFF"}}>+1 555 123456</p>
                </div>
                <div style={{display:"flex", alignItems:"center"}}>
                  <i className="fa fa-envelope"></i>
                  <p style={{color:"#FFFFFF"}}><a href="mailto:info@retailscore.com" className="footer-links">info@retailscore.com</a></p>
                </div>
              </div>
            </Col>
            <Col md={4} style={{display:"flex", justifyContent:"center", alignItems:"center", flexDirection:"column", textAlign:"center"}}>
              <p className="footer-company-about">
                <span>About the company</span>
                RetailScore is a retail listings website that aims to make it easy for you to find the right space for your business.
              </p>
              <div className="footer-icons">
                <a href="#"><i className="fa fa-facebook"></i></a>
                <a href="#"><i className="fa fa-twitter"></i></a>
                <a href="#"><i className="fa fa-linkedin"></i></a>
                <a href="#"><i className="fa fa-github"></i></a>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

export default Homepage;
