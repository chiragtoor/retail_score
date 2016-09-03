import React from 'react';
import ReactDOM from 'react-dom';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { Row, Col, InputGroup, FormGroup, ButtonGroup, Button, FormControl, DropdownButton, MenuItem } from 'react-bootstrap';

import GoogleMap from '../components/GoogleMap';
    
const properties = [5, 4, 3, 2, 1];

export class Test extends React.Component {
  constructor(props) {
    super(props);

    this.listingsDivScrolled = this.listingsDivScrolled.bind(this);

    // used on mobile to store all propertyTile refs
    this._propertyTiles = new Map();

    this.state = {
      mounted: false,
      // used to highlight the correct tile on mobile and desktop, will be used to pass into the map which pin to enlarge and center on
      mobileSelectedIndex: 0
    }
  }

  componentDidMount() {
    this.setState({mounted: true});
  }

  // method is called on mobile when the listingsDiv (which contains all tiles horizontally) is scrolled
  listingsDivScrolled() {
    // value to compare the left edge of all propertyTile's distance to, whichever tile is closest to this value (measured to the right of the left edge)
    //  is what is considered the main scroll psoition tile
    const edgeLimit = 100;
    // method loops through all current mobile property tiles on screen and gets the one in the main scroll position
    // filter out possible null values
    const minTuple = Array.from(this._propertyTiles.values()).filter(propertyTile => propertyTile != null)
      // map over and get the actual dom elements left edge using ReactDOM
      .map((propertyTile) => {
        return ReactDOM.findDOMNode(propertyTile).getBoundingClientRect().left;
      // reduce the array to find which tile's left edge is closest to the main scroll position
      }).reduce((minToLimit, leftEdge, index) => {
        if(Math.abs(leftEdge - edgeLimit) < Math.abs(minToLimit.value - edgeLimit)) {
          return {index: index, value: leftEdge};
        } else {
          return minToLimit;
        }
      // initial values are a null index and very large distance that any tile will be considered closer to
      }, {index: -1, value: 10000});

    // set the state to the new closest tile's index, this way the right tile is highlighted on the device
    this.setState({mobileSelectedIndex: minTuple.index});
  }

  render() {
    return(
      <div style={{width:"100%", height:"100%", margin:"0px", padding:"0px"}}>
        {/* Use flex-box so that we can automatically resize the content below the desktop only header bar when it dissapears on mobile */}
        {/* header bar that has the logo and app color, only visible on desktop and larger sizes */}
        <ReactCSSTransitionGroup transitionName="fadeIn" transitionEnterTimeout={500} transitionLeaveTimeout={500}>
        {this.state.mounted ?
          <div>
            <div className="hidden-sm hidden-xs" style={{color:"#FFFFFF", backgroundColor:"#49A3DC", paddingTop:"5px", paddingBottom:"5px"}}>
              <img style={{height:"45px", marginLeft:"15px"}} src="https://s3-us-west-2.amazonaws.com/homepage-image-assets/retail_score_logo_white.png" />
            </div>
            <div className="hidden-md hidden-lg" style={{backgroundColor:"#49A3DC"}}>
              <SearchBar noPadding={true} />
            </div>
          </div>
        :
          false
        }
        </ReactCSSTransitionGroup>
        {/* main content of the SRP page, this has flex = 1 so that it takes up all remaining space when the bar is there and 100% of screen when bar is not there */}
        <Row className="contentSRP" style={{flex:"1"}}>
          {/* 
              Since we want the map on top on mobile and to the right on desktop, we need to place them in accordance to smaller screens and then use
               col-[size]-[push|pull]-[value] in order to reorder them
              Below columns are setup so that the map comes first and then the listings, the push and pull classNames make it so it is the reverse order
               on desktop and larger screens
              srpContnetHeight uses media queries to make the height of the two 50% on mobile and full 100% otherwise
          */}
          <div className="col-xs-12 col-md-6 col-md-push-6 srpContentHeight">
            <ReactCSSTransitionGroup transitionName="fadeInLeft" transitionEnterTimeout={500} transitionLeaveTimeout={500}>
            {this.state.mounted ?
              <div style={{width:"100%", height:"100%"}}>
                <GoogleMap 
                  id={"desktop"} 
                  properties={[]} 
                  pinClick={() => false}
                  city={"Test"}/>
              </div>
            :
              false
            }
            </ReactCSSTransitionGroup>
          </div>
          {/* Listings section */}
          <div className="col-xs-12 col-md-6 col-md-pull-6 srpContentHeightOther">
            <ReactCSSTransitionGroup transitionName="fadeInUp" transitionEnterTimeout={500} transitionLeaveTimeout={500}>
            {this.state.mounted ?
              <div style={{width:"100%", height:"100%", maxHeight:"100%"}}>
                {/* Search Bar is above at top on mobile, so hide in that case */}
                <div className="hidden-sm hidden-xs">
                  <SearchBar />
                </div>
                {/* Filters are opened by a button on mobile, so hide in that case */}
                <div className="hidden-sm hidden-xs" style={{marginBottom:"10px"}}>
                  <Filters />
                </div>
                {/* Button for CP edit, # of Listings, and if on mobile button for Filters */}
                <div style={{borderTop:"solid thin #CCCCCC", borderBottom:"solid thin #CCCCCC", height:"40px", display:"flex", alignItems:"center"}}>
                  <Button style={{marginTop:"5px", marginBottom:"5px", marginLeft:"15px", border:"none",fontSize:"16px", fontWeight:"400"}}><i className="fa fa-user" style={{color:"#49A3DC"}}/></Button>
                  <label className="control-label" style={{fontSize:"16px", flexGrow:"1", textAlign:"center"}}>25 Spaces for Lease</label>
                  <Button className="hidden-md hidden-lg" style={{marginTop:"5px", marginBottom:"5px", marginRight:"15px", border:"none",fontSize:"16px", fontWeight:"400"}}><i className="fa fa-filter" style={{color:"#49A3DC"}}/></Button>
                </div>
                {/* 
                    listingsDiv is what controls the horizontal v vertical scrolling, by default it is mobile first and uses flex-box to go in a row with 
                      flex-shrink 0 on children so they take up desired width, on mobile width is a set value
                    on desktops it is still in a row direction, but ads a wrap to it with a set width on listingsDiv, this way content automatically wraps
                      in order with tile specific sizing CSS setting it to 50% of available space on desktop listings, so there are pairs of 2 going down
                  */}
                {/* Rendered twice and hidden, this is to pass in the needed functionality and a flag so that the component does only what is needed only */}
                {/* Bootstrap hidden is using display:none, so performance of doing this should not be a issue. But even so with pagination we should be avoiding any perfomance problem with many tiles */}
                <div className="listingsDiv hidden-sm hidden-xs">
                  {properties.map((property, index) => {
                    return <PropertyTile mobile={false} key={index} index={index} onHover={(index) => this.setState({mobileSelectedIndex: index})} selected={this.state.mobileSelectedIndex == index} style={{flexShrink: "1"}}/>
                  })}
                </div>
                <div className="listingsDiv hidden-md hidden-lg" onScroll={this.listingsDivScrolled}>
                  {properties.map((property, index) => {
                    {/* Add the ref of this to the mobile tiles ref storage, this is used for calculating which element is in the main scroll position */}
                    return <PropertyTile mobile={true} key={index} index={index} selected={this.state.mobileSelectedIndex == index} style={{flexShrink: "1"}} ref={c => this._propertyTiles.set(index, c)}/>
                  })}
                </div>
              </div>
            :
              false
            }
            </ReactCSSTransitionGroup>
          </div>
        </Row>
      </div>
    );
  }
}
class PropertyTile extends React.Component {
  render() {
  {/* styles and color to use when a tile is currently selected, this is hovered over on desktop and in the main scroll position on mobile */}
    const selectedPanelContainerStyle = {display:"flex", flexDirection:"column", borderColor:"#49A3DC", borderWidth:"2px", boxShadow:"0 0 2px #49A3DC", marginBottom:"0px"};
    const panelBordersColor = this.props.selected ? "#49A3DC" : "#CCCCCC";

    {/* Below code is temporary, just for simulating different RS values */}
    var retailScore = <label className="control-label" style={{fontSize:"12px", marginLeft:"10px", color:"#27ae60", borderBottom:"solid thin"}}>Retail Score: <i className="fa fa-star"/><i className="fa fa-star"/><i className="fa fa-star"/><i className="fa fa-star"/><i className="fa fa-star"/></label>;
    if(this.props.index == 1) {
      retailScore = <label className="control-label" style={{fontSize:"12px", marginLeft:"10px", color:"#f1c40f", borderBottom:"solid thin"}}>Retail Score: <i className="fa fa-star"/><i className="fa fa-star"/><i className="fa fa-star"/><i className="fa fa-star"/></label>;
    } else if(this.props.index == 2) {
      retailScore = <label className="control-label" style={{fontSize:"12px", marginLeft:"10px", color:"#e67e22", borderBottom:"solid thin"}}>Retail Score: <i className="fa fa-star"/><i className="fa fa-star"/><i className="fa fa-star"/></label>;
    } else if(this.props.index == 3) {
      retailScore = <label className="control-label" style={{fontSize:"12px", marginLeft:"10px", color:"#c0392b", borderBottom:"solid thin"}}>Retail Score: <i className="fa fa-star"/><i className="fa fa-star"/></label>;
    } else if(this.props.index == 4) {
      retailScore = <label className="control-label" style={{fontSize:"12px", marginLeft:"10px", color:"#c0392b", borderBottom:"solid thin"}}>Retail Score: <i className="fa fa-star"/></label>;
    }

    return(
      <div className="panelContainer" onMouseOver={() => this.props.mobile ? false : this.props.onHover(this.props.index)}>
      {/* For desktop we want hover to put this panel in focus, so check flag and call prop function if needed */}
        {/* Panels are of a fixed height, using media queries to adjust based on device width */}
      {/* If a panel is selected we want the blue action color, otherwise the gray normal color */}
        <div className="panel b text-center srpTilePanel" style={this.props.selected ? selectedPanelContainerStyle : {borderColor:"#CCCCCC", borderWidth:"2px", marginBottom:"0px"}}>
          <div className="panel-body" style={{padding:"0px"}}>
            {/* Image is of a specific height, this changes in CSS depending on screen width */}
            <div className="srpTilePanelImageHeight" style={{backgroundColor:"rgba(255,0,0,0.1)"}} />
          </div>
          {/* RS and explanation, explanation uses CSS text cutoof technique on smaller devices with varying # of lines depending on screen width */}
          <div className="panel-body bt" style={{padding:"2px", borderColor: panelBordersColor}}>
            {retailScore}
            <p className="lineClamp">6 other businesses in this area attract high-end shoppers looking for casual clothing, by locating here your business will be another option for these customers.</p>
          </div>
          {/* Price and SQ FT info shown side by side, margins are different to account for padding of other elements */}
          <div className="panel-body bt" style={{padding:"2px", borderColor: panelBordersColor}}>
            <Row>
              <Col xs={6} className="br" style={{borderColor: panelBordersColor}}>
                <p style={{marginBottom:"7px", marginTop:"5px"}}>$2,500/mo</p>
              </Col>
              <Col xs={6}>
                <p style={{marginBottom:"7px", marginTop:"5px"}}>600 Sq. Ft.</p>
              </Col>
            </Row>
          </div>
          {/* Button that in 1-Tap contact mode sends a message to Broker, otherwise takes user to PDP -> this avoid more media query logic to take out the button and resize entire tile */}
          {/* Button is not visible on phones <= 320px wide (iPhone 4 and 5) because it will not fit, CSS media query catches this */}
          <div className="panel-body bt srpContactButton" style={{borderColor: panelBordersColor, margin:"0px", padding:"0px"}}>
            <Button style={{border:"none", color:"#49A3DC", width:"100%", paddingBottom:"5px"}}>Contact</Button>
          </div>
        </div>
      </div>
    );
  }
}
class SearchBar extends React.Component {
  render() {
  {/* styles to use when on mobile to give sharp edges on top bar, round edges stick out */}
    const mobileMenuButtonStyle = {height:"50px", borderColor:"#CCCCCC", borderRadius: "0", borderTop:"none", borderLeft:"none", borderBottom:"none"};
    const mobileSearchBarStyle = {height:"50px", borderColor:"#CCCCCC", borderRadius: "0", borderTop:"none", borderLeft:"none", borderBottom:"none"};
    const mobileSearchButtonStyle = {height:"50px", borderColor:"#CCCCCC", borderRadius: "0", borderTop:"none", borderRight:"none", borderBottom:"none"};
    return(
      <div>
        <InputGroup className="searchBar" style={{borderRadius: "0", padding: this.props.noPadding ? "0px" : "10px", height:"50px", width:"100%", backgroundColor:"#FFFFFF"}}>
          <InputGroup.Button className="hidden-md hidden-lg"><Button style={this.props.noPadding ? mobileMenuButtonStyle : {height:"50px", borderColor:"#CCCCCC"}}>&nbsp;&nbsp;<i className="fa fa-list" style={{color:"#49A3DC"}}/>&nbsp;&nbsp;</Button></InputGroup.Button>
          <FormControl type="text" style={this.props.noPadding ? mobileSearchBarStyle : {height:"50px"}}/>
          <InputGroup.Button><Button style={this.props.noPadding ? mobileSearchButtonStyle : {height:"50px", borderColor:"#CCCCCC"}}>&nbsp;&nbsp;<i className="fa fa-search" style={{color:"#49A3DC"}}/>&nbsp;&nbsp;</Button></InputGroup.Button>
        </InputGroup>
        {this.props.noPadding ?
          <div style={{borderTop:"solid thin #CCCCCC"}} />
        :
          false
        }
      </div>
    );
  }
}
class Filters extends React.Component {
  render() {
    return(
      <div>
        {/* Filters label */}
        <center><label className="control-label" style={{fontSize:"18px", marginBottom:"0px"}}>Filters</label></center>
        {/* Use bootstrap responsive columns to arrange filters section differently for mobile and desktop */}
        <Row>
          {/* On mobile we want this label on the left side, on desktop we want it on top of the corresponding dropdowns */}
          {/* Use flexbox to center the label vertically, <center> tag to center it horizontally in the column */}
          <Col xs={2} sm={1} md={6} className="filtersLabelSize" style={{display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center"}}>
            <label className="control-label" style={{fontSize:"16px", marginLeft:"10px"}}>Rent:</label>
          </Col>
          {/* Bootstrap column pushing/pulling doesn't work when wrapping columns, so using hidden-[size], for this one label only */}
          {/* Use flexbox to center the label vertically, <center> tag to center it horizontally in the column */}
          <Col xs={2} sm={1} md={6} className="hidden-sm hidden-xs filtersLabelSize" style={{display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center"}}>
            <label className="control-label" style={{fontSize:"16px", marginLeft:"10px"}}>Size:</label>
          </Col>
          {/* On desktop this will be under a label and sharing space with teh Sq Ft dropdowns, so half space there and majority space on mobile where it will be in its own row with just a label */}
          <Col xs={10} sm={11} md={6}>
            <InputGroup style={{padding:"10px", height:"40px", width:"100%"}}>
              <DropdownButton
                componentClass={InputGroup.Button}
                id="input-dropdown-addon"
                title="Minimum"
                style={{height:"40px", width:"100%", color:"#49A3DC", borderColor:"#CCCCCC"}}>
                <MenuItem key="1">Item</MenuItem>
              </DropdownButton>
              <DropdownButton
                componentClass={InputGroup.Button}
                id="input-dropdown-addon"
                title="Maximum"
                style={{height:"40px", width:"100%", color:"#49A3DC", borderColor:"#CCCCCC"}}>
                <MenuItem key="1">Item</MenuItem>
              </DropdownButton>
            </InputGroup>
          </Col>
          {/* On mobile we want this label on the left side, on desktop we want it on top of the corresponding dropdowns */}
          {/* Hide this on desktop screens because of the wrap issue, this way we reuse the whole layout except this label */}
          {/* Use flexbox to center the label vertically, <center> tag to center it horizontally in the column */}
          <Col xs={2} sm={1} md={6} className="hidden-md hidden-lg filtersLabelSize" style={{display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center"}}>
            <label className="control-label" style={{fontSize:"16px", marginLeft:"10px"}}>Size:</label>
          </Col>
          {/* On desktop this will be under a label and sharing space with teh Sq Ft dropdowns, so half space there and majority space on mobile where it will be in its own row with just a label */}
          <Col xs={10} sm={11} md={6}>
            <InputGroup style={{padding:"10px", height:"40px", width:"100%"}}>
              <DropdownButton
                componentClass={InputGroup.Button}
                id="input-dropdown-addon"
                title="Min Sq. Feet"
                style={{height:"40px", width:"100%", color:"#49A3DC", borderColor:"#CCCCCC"}}>
                <MenuItem key="1">Item</MenuItem>
              </DropdownButton>
              <DropdownButton
                componentClass={InputGroup.Button}
                id="input-dropdown-addon"
                title="Max Sq. Feet"
                style={{height:"40px", width:"100%", color:"#49A3DC", borderColor:"#CCCCCC"}}>
                <MenuItem key="1">Item</MenuItem>
              </DropdownButton>
            </InputGroup>
          </Col>
        </Row>
        {/* Sort filters are always side by side with the label, only adjust sizing for white-space on tablets */}
        <Row style={{marginLeft:"0px", marginRight:"0px", marginTop:"5px", marginBottom:"20px"}}>
          {/* Use flexbox to center the label vertically, <center> tag to center it horizontally in the column */}
          <Col xs={2} sm={1} md={2} style={{display:"flex", flexDirection:"column", justifyContent:"center", height:"40px"}}>
            <label className="control-label" style={{fontSize:"16px"}}>Sort:</label>
          </Col>
          <Col xs={10} sm={11} md={10} style={{paddingRight:"10px"}}>
            <ButtonGroup style={{width:"100%", height:"40px"}}>
              <Button style={{height:"40px", width:"33.33%", color:"#49A3DC", borderColor:"#CCCCCC"}}>Retail Score</Button>
              <Button style={{height:"40px", width:"33.33%", color:"#49A3DC", borderColor:"#CCCCCC"}}>Price</Button>
              <Button style={{borderColor: "#49A3DC", height:"40px", width:"33.33%", color:"#49A3DC"}}>Sq. Feet</Button>
            </ButtonGroup>
          </Col>
          {/* If on Mobile add a Save/Done button since cannot see the changes reflected easily, user needs way to dismiss the slide out */}
        </Row>
      </div>
    );
  }
}

export default Test;
