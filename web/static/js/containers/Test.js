import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from "react-redux";
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { Row, Col, InputGroup, FormGroup, ButtonGroup, Button, FormControl, DropdownButton, MenuItem, Pagination } from 'react-bootstrap';

import * as Actions from '../actions';
import * as Util from '../Util';

import GoogleMap from '../components/GoogleMap';

export class Test extends React.Component {
  constructor(props) {
    super(props);

    this.listingsDivScrolled = this.listingsDivScrolled.bind(this);
    this.filterButtonClicked = this.filterButtonClicked.bind(this);
    this.pageSelect = this.pageSelect.bind(this);

    // used on mobile to store all propertyTile refs
    this._propertyTiles = new Map();
    // timeout used for only performing computations on end of mobile scroll
    this._scrollTimeout = null;

    // store current city in state
    var thisCity = this.props.params.city;
    thisCity = thisCity.replace("-", " ");
    //if the city doesnt contain the state it wont match against the cities in the array
    if(!thisCity.includes(',')) {
      thisCity = thisCity + ", CA";
    }

    this.state = {
      mounted: false,
      // used to highlight the correct tile on mobile and desktop, will be used to pass into the map which pin to enlarge and center on
      mobileSelectedIndex: 0,
      // flag for whether to show the container for filters, CP
      mobileShowSecondaryContent: false,
      city: thisCity,
      // type of sort currently being applied
      currentSort: Actions.SORT_RS,
      // default filter values are all null, this way initial text displays in filter dropdowns
      filterPriceMin: null,
      filterPriceMax: null,
      filterSqFtMin: null,
      filterSqFtMax: null,
      // page # used with pagination
      currentPage: 1
    }
  }

  componentDidMount() {
    // used for flag on animations, on mount animations don't work if they are rendered, so we wait till mount to run animation
    this.setState({mounted: true});
    // get the properties for the current city
    const cityString = this.state.city.split(',')[0];
    this.props.loadProperties(cityString, "CA");
  }

  // mobile only filter button clicked
  filterButtonClicked() {
    this.setState({mobileShowSecondaryContent: true});
  }

  // method is called on mobile when the listingsDiv (which contains all tiles horizontally) is scrolled
  // use a timer so that check is not done on every little bit of a scroll, we only want to check when user is done
  //  scrolling so give it a 50ms timer before checking
  // on every scroll reset the timer, this way during a scroll no checks happen
  listingsDivScrolled() {
    // if a timeout is already set, clear it and restart timer
    if(this._scrollTimeout) {
      clearTimeout(this._scrollTimeout);
    }
    // set a timer so that we only perform computation on the end of a scroll
    this._scrollTimeout = setTimeout(() => {
      this._scrollTimeout = null;
      
      // value to compare the left edge of all propertyTile's distance to, whichever tile is closest to this value (measured to the right of the left edge)
      //  is what is considered the main scroll psoition tile
      const edgeLimit = 50;
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
    }, 50);
  }

  sortByRetailScore(properties) {
    // no property will have a null retail score, so sort by just comparing the two values
    // < because we want to go from high to low
    return properties.sort((propertyA, propertyB) => {
      if(propertyA.retail_score < propertyB.retail_score) {
        return 1;
      } else {
        return -1;
      }
    });
  }

  sortByPrice(properties) {
    // properties can have null values for price, need to account for that and concat the filtered out ones
    var popertiesToSort = properties.filter(property => property.rental_rate_min != null);
    var popertiesToConcat = properties.filter(property => property.rental_rate_min == null);

    // > because we want to go from low to high
    popertiesToSort.sort((propertyA, propertyB) => {
      if(propertyA.rental_rate_min > propertyB.rental_rate_min) {
        return 1;
      } else {
        return -1;
      }
    });
    // add the properties with nothing to sort by to the end, their place was unknown
    return popertiesToSort.concat(popertiesToConcat);
  }

  sortBySqFt(properties) {
    // properties can have null values for price, need to account for that and concat the filtered out ones
    var propertiesToSort = properties.filter(property => property.min_sq_feet != null);
    var propertiesToConcat = properties.filter(property => property.min_sq_feet == null);

    // > because we want to go from low to high
    propertiesToSort.sort((propertyA, propertyB) => {
      if(propertyA.min_sq_feet > propertyB.min_sq_feet) {
        return 1;
      } else {
        return -1;
      }
    });
    // add the properties with nothing to sort by to the end, their place was unknown
    return propertiesToSort.concat(propertiesToConcat);
  }

  // if minFlag is true this will filter with price as a lower bound, otherwise upper bound
  filterByPrice(properties, price, minFlag) {
    // since max price can only be there if a min is already there, we use min to grab filter and concat lists
    var propertiesToFilter = properties.filter(property => property.rental_rate_min != null);
    var propertiesToConcat = properties.filter(property => property.rental_rate_min == null);

    var filteredProperties = propertiesToFilter.filter((property) => {
      // check with lower bound
      if(minFlag) {
        // if the property rental rate is over the limit, keep it in
        if(property.rental_rate_min > price) {
          return true;
        // else if property has a range and the upper bound of range is over limit, keep it in
        } else if(property.rental_rate_max && property.rental_rate_max > price) {
          return true;
        }
        // otherwise filter it out
        return false;
      } else {
      // filter out with price as upper bound, only need to check if min is < price because
      //  if property has a max value it will be > min, so just checking min is enough
        // if the property rental rate is under the limit, keep it in
        if(property.rental_rate_min < price) {
          return true;
        }
        // otherwise filter it out
        return false;
      }
      
    });

    return filteredProperties.concat(propertiesToConcat);
  }

  // if minFlag is true this will filter with price as a lower bound, otherwise upper bound
  filterBySqFt(properties, sqFt, minFlag) {
    // since max price can only be there if a min is already there, we use min to grab filter and concat lists
    var propertiesToFilter = properties.filter(property => property.min_sq_feet != null);
    var propertiesToConcat = properties.filter(property => property.min_sq_feet == null);

    var filteredProperties = propertiesToFilter.filter((property) => {
      // check with lower bound
      if(minFlag) {
        // if the property sq ft is over the limit, keep it in
        if(property.min_sq_feet > sqFt) {
          return true;
        // else if property has a range and the upper bound of range is over limit, keep it in
        } else if(property.max_sq_feet && property.max_sq_feet > sqFt) {
          return true;
        }
        // otherwise filter it out
        return false;
      } else {
      // filter out with sq ft as upper bound, only need to check if min is < sq ft because
      //  if property has a max value it will be > min, so just checking min is enough
        // if the property sq ft is under the limit, keep it in
        if(property.min_sq_feet < sqFt) {
          return true;
        }
        // otherwise filter it out
        return false;
      }
      
    });

    return filteredProperties.concat(propertiesToConcat);
  }

  // handle when user selects another page from pagination, passed as prop to listings component
  pageSelect(page, mobileFlag) {
    this.setState({currentPage: page});
    if(mobileFlag) {
      console.log("Moving to the left");
      // move the scrolled div back to the left
      ReactDOM.findDOMNode(this.refs.desktopListingsDiv).scrollLeft = -100000;
    } else {
      // move the scrolled div back to the top, pagination is on bottom
      ReactDOM.findDOMNode(this.refs.mobileListingsDiv).scrollTop = 0;
    }
  }

  render() {
    var properties = this.props.properties;

    // filter out properties according to user selection
    if(this.state.filterPriceMin != null) {
      // if user selected min price, filter out anything above
      properties = this.filterByPrice(properties, this.state.filterPriceMin, true);
    }
    if(this.state.filterPriceMax != null) {
      // if user selected max price, filter out anything below
      properties = this.filterByPrice(properties, this.state.filterPriceMax, false);
    }
    if(this.state.filterSqFtMin != null) {
      // if user selected min price, filter out anything above
      properties = this.filterBySqFt(properties, this.state.filterSqFtMin, true);
    }
    if(this.state.filterSqFtMax != null) {
      // if user selected max price, filter out anything below
      properties = this.filterBySqFt(properties, this.state.filterSqFtMax, false);
    }

    // Sorting has to be done after the filtering, otherwise it wont be in proper order
    // sort properties by the current selected sort method 
    switch(this.state.currentSort) {
      // sort by retail score
      case Actions.SORT_RS:
        properties = this.sortByRetailScore(properties);
        break;
      // sort by price
      case Actions.SORT_PRICE:
        properties = this.sortByPrice(properties);
        break;
      // sort by sq feet
      case Actions.SORT_SQ_FT:
        properties = this.sortBySqFt(properties);
        break;
    }

    // Paginate remaining properties in blocks of 20 so UI does not freeze up for the listings section, map will still have all properties up
    var numPages = Math.floor(properties.length / 20);
    if(properties.length % 20 != 0) {
      numPages = numPages + 1;
    }
    // get the min and max of the current page to cut those 20 properties out
    var min = 20 * (this.state.currentPage - 1);
    var max = min + 20;
    // cut out the 20 properties, these are what to display now
    var propertyTiles = properties.slice(min, max);

    console.log("numPages: " + numPages);
    console.log("currentPage: " + this.state.currentPage);

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
          <div className="col-xs-12 col-md-6 col-md-push-6 srpMapSection">
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
          <div className="col-xs-12 col-md-6 col-md-pull-6 srpListingsSection">
            <ReactCSSTransitionGroup transitionName="fadeInUp" transitionEnterTimeout={500} transitionLeaveTimeout={500}>
            {this.state.mounted ?
              <div style={{width:"100%", height:"100%", maxHeight:"100%"}}>
                {/* Search Bar is above at top on mobile, so hide in that case */}
                <div className="hidden-sm hidden-xs">
                  <SearchBar />
                </div>
                {/* Filters are opened by a button on mobile, so hide in that case */}
                <div className="hidden-sm hidden-xs" style={{marginBottom:"10px"}}>
                  <Filters 
                    filterPriceMin={this.state.filterPriceMin}
                    filterPriceMax={this.state.filterPriceMax}
                    filterSqFtMin={this.state.filterSqFtMin}
                    filterSqFtMax={this.state.filterSqFtMax}
                    onUpdatePriceMin={(value) => this.setState({filterPriceMin: value, currentPage: 1})}
                    onUpdatePriceMax={(value) => this.setState({filterPriceMax: value, currentPage: 1})}
                    onUpdateSqFtMin={(value) => this.setState({filterSqFtMin: value, currentPage: 1})}
                    onUpdateSqFtMax={(value) => this.setState({filterSqFtMax: value, currentPage: 1})}
                    selectedSort={this.state.currentSort}
                    onUpdateSort={(newValue) => this.setState({currentSort: newValue, currentPage: 1})}/>
                </div>
                {/* Button for CP edit, # of Listings, and if on mobile button for Filters */}
                <div style={{borderTop:"solid thin #CCCCCC", borderBottom:"solid thin #CCCCCC", height:"40px", display:"flex", alignItems:"center"}}>
                  <Button style={{marginLeft:"15px", border:"none",fontSize:"16px", fontWeight:"100"}}><i className="fa fa-user" style={{color:"#49A3DC"}}/></Button>
                  <label className="control-label" style={{fontSize:"16px", flexGrow:"1", textAlign:"center", color:"#656565", padding:"0"}}>{properties.length} Properties</label>
                  {/* Add a empty div for desktop the same size as Filter button, this way the # properties text stays centered with flexbox */}
                  <div className="hidden-sm hidden-xs" style={{width:"36px", height:"10px", marginRight: "15px"}} />
                  <Button onClick={() => this.filterButtonClicked()} className="hidden-md hidden-lg" style={{marginRight:"15px", border:"none",fontSize:"16px", fontWeight:"100"}}><i className="fa fa-filter" style={{color:"#49A3DC"}}/></Button>
                </div>
                {/* 
                  listingsDiv is what controls the horizontal v vertical scrolling, by default it is mobile first and uses flex-box to go in a row with 
                    flex-shrink 0 on children so they take up desired width, on mobile width is a set value
                  on desktops it is still in a row direction, but ads a wrap to it with a set width on listingsDiv, this way content automatically wraps
                    in order with tile specific sizing CSS setting it to 50% of available space on desktop listings, so there are pairs of 2 going down
                */}
                {/* Rendered twice and hidden, this is to pass in the needed functionality and a flag so that the component does only what is needed only */}
                {/* Bootstrap hidden is using display:none, so performance of doing this should not be a issue. But even so with pagination we should be avoiding any perfomance problem with many tiles */}
                <div ref="desktopListingsDiv" className="listingsDiv hidden-sm hidden-xs">
                  {propertyTiles.map((property, index) => {
                    return <PropertyTile property={property} mobile={false} key={index} index={(index + (this.state.currentPage - 1) * 20)} onHover={(index) => this.setState({mobileSelectedIndex: index})} selected={this.state.mobileSelectedIndex == index} style={{flexShrink: "1"}}/>
                  })}
                  {numPages >= 2 ?
                    <div style={{width:"100%", height:"80px", display:"flex", justifyContent:"center", alignItems:"center"}}>
                      <div style={{width:"100%", textAlign:"center", display:"inline-block"}}>
                        <Pagination
                          bsSize="medium"
                          items={numPages}
                          activePage={this.state.currentPage}
                          maxButtons={5}
                          onSelect={(page) => this.pageSelect(page, false)} />
                      </div> 
                    </div>
                  : false}
                </div>
                <div ref="mobileListingsDiv" className="listingsDiv hidden-md hidden-lg" onScroll={this.listingsDivScrolled}>
                  {(numPages >= 2 && this.state.currentPage > 1) ?
                    <Button onClick={() => this.pageSelect(this.state.currentPage - 1, true)} style={{width:"150px", height:"100%", flexShrink: "1", backgroundColor:"rgba(255,0,0,0.4)"}}>Back</Button>
                  :
                    false
                  }
                  {propertyTiles.map((property, index) => {
                    {/* Add the ref of this to the mobile tiles ref storage, this is used for calculating which element is in the main scroll position */}
                    return <PropertyTile property={property} mobile={true} key={index} index={(index + (this.state.currentPage - 1) * 20)} selected={this.state.mobileSelectedIndex == index} style={{flexShrink: "1"}} ref={c => this._propertyTiles.set(index, c)}/>
                  })}
                  {(numPages >= 2 && this.state.currentPage != numPages) ?
                    <Button onClick={() => this.pageSelect(this.state.currentPage + 1, true)} style={{width:"150px", height:"100%", flexShrink: "1", backgroundColor:"rgba(255,0,0,0.4)"}}>Next</Button>
                  :
                    false
                  }
                </div>
              </div>
            :
              false
            }
            </ReactCSSTransitionGroup>
          </div>
        </Row>
        {/* For content that animates in from buttons, we want to dim out the SRP and display content on top so it is easy to read */}
        {/* Below transition fades in a dimDiv */}
        <ReactCSSTransitionGroup transitionName="fadeIn" transitionEnterTimeout={500} transitionLeaveTimeout={500}>
          {this.state.mobileShowSecondaryContent ?
            <div onClick={() => this.setState({mobileShowSecondaryContent: false})} style={{backgroundColor:"rgba(0,0,0,0.5)", width:"100%", height:"100%", position:"absolute", left:"0", top:"0", zIndex:"10"}} />
          :
            false
          }
        </ReactCSSTransitionGroup>
      {/* Below transition bouncesIn Content we want to display */}
        <ReactCSSTransitionGroup transitionName="fadedBounceIn" transitionEnterTimeout={500} transitionLeaveTimeout={500}>
          {this.state.mobileShowSecondaryContent ?
            <div onClick={() => this.setState({mobileShowSecondaryContent: false})} style={{width:"100%", height:"100%", position:"absolute", left:"0", top:"0", zIndex:"10", display:"flex", justifyContent:"center", alignItems:"center"}}>
              <div onClick={(e) => e.stopPropagation()} style={{width:"95%", height:"70%"}}>
                <Filters 
                  filterPriceMin={this.state.filterPriceMin}
                  filterPriceMax={this.state.filterPriceMax}
                  filterSqFtMin={this.state.filterSqFtMin}
                  filterSqFtMax={this.state.filterSqFtMax}
                  onUpdatePriceMin={(value) => this.setState({filterPriceMin: value, currentPage: 1})}
                  onUpdatePriceMax={(value) => this.setState({filterPriceMax: value, currentPage: 1})}
                  onUpdateSqFtMin={(value) => this.setState({filterSqFtMin: value, currentPage: 1})}
                  onUpdateSqFtMax={(value) => this.setState({filterSqFtMax: value, currentPage: 1})}
                  selectedSort={this.state.currentSort} 
                  onUpdateSort={(newValue) => this.setState({currentSort: newValue, currentPage: 1})} 
                  onSave={() => this.setState({mobileShowSecondaryContent: false})} 
                  padded={true} />
              </div>
            </div>
          :
            false
          }
        </ReactCSSTransitionGroup>
      </div>
    );
  }
}
class PropertyTile extends React.Component {
  formatPrice(property) {
    // properties will either have null for both, only a min, or a min and max value
    //  will never have a max and no min
    if(property.rental_rate_min == null) {
      return "Unknown Rate"
    } else if(property.rental_rate_min != null && property.rental_rate_max == null) {
      return "$" + Actions.numberToString(property.rental_rate_min) + "/mo"; 
    } else if(property.rental_rate_min == property.rental_rate_max){
      return "$" + Actions.numberToString(property.rental_rate_min) + "/mo";
    } else {
      return "$" + Actions.numberToString(property.rental_rate_min) + " - " + Actions.numberToString(property.rental_rate_max) + "/mo";
    }
  }

  formatSqFt(property) {
    // properties will either have null for both, only a min, or a min and max value
    //  will never have a max and no min
    if(property.min_sq_feet == null) {
      return "Unknown Size"
    } else if(property.min_sq_feet != null && property.max_sq_feet == null) {
      return Actions.numberToString(property.rental_rate_min) + " Sq.Ft."; 
    } else if(property.min_sq_feet == property.max_sq_feet) {
      return Actions.numberToString(property.min_sq_feet) + " Sq.Ft.";
    } else {
      return Actions.numberToString(property.min_sq_feet) + " - " + Actions.numberToString(property.max_sq_feet) + " Sq.Ft.";
    }
  }

  getImageUrl(property) {
    return `https://maps.googleapis.com/maps/api/streetview?size=200x150&location=${property.image_lat},${property.image_lng}&heading=${property.image_heading}&key=AIzaSyASv9f24GcF78YIKRsX3uCRkj58JzZ8NaA`;
  }

  render() {
    {/* styles and color to use when a tile is currently selected, this is hovered over on desktop and in the main scroll position on mobile */}
    const selectedPanelContainerStyle = {display:"flex", flexDirection:"column", borderColor:"#49A3DC", borderWidth:"2px", boxShadow:"0 0 2px #49A3DC", marginBottom:"0px"};
    const panelBordersColor = this.props.selected ? "#49A3DC" : "#CCCCCC";

    {/* Below code gets the correct RS color and stars depending on score value */}
    var retailScore = false;
    if(this.props.property.retail_score >= 90) {
      retailScore = <label className="control-label" style={{fontSize:"12px", marginLeft:"10px", color:"#27ae60", borderBottom:"solid thin"}}>Retail Score: <i className="fa fa-star"/><i className="fa fa-star"/><i className="fa fa-star"/><i className="fa fa-star"/><i className="fa fa-star"/></label>;
    } else if(this.props.property.retail_score >= 80) {
      retailScore = <label className="control-label" style={{fontSize:"12px", marginLeft:"10px", color:"#f1c40f", borderBottom:"solid thin"}}>Retail Score: <i className="fa fa-star"/><i className="fa fa-star"/><i className="fa fa-star"/><i className="fa fa-star"/></label>;
    } else if(this.props.property.retail_score >= 70) {
      retailScore = <label className="control-label" style={{fontSize:"12px", marginLeft:"10px", color:"#e67e22", borderBottom:"solid thin"}}>Retail Score: <i className="fa fa-star"/><i className="fa fa-star"/><i className="fa fa-star"/></label>;
    } else if(this.props.property.retail_score >= 60) {
      retailScore = <label className="control-label" style={{fontSize:"12px", marginLeft:"10px", color:"#c0392b", borderBottom:"solid thin"}}>Retail Score: <i className="fa fa-star"/><i className="fa fa-star"/></label>;
    } else {
      retailScore = <label className="control-label" style={{fontSize:"12px", marginLeft:"10px", color:"#c0392b", borderBottom:"solid thin"}}>Retail Score: <i className="fa fa-star"/></label>;
    }

    return(
      <div className="propertyTileContainer" onMouseOver={() => this.props.mobile ? false : this.props.onHover(this.props.index)}>
      {/* For desktop we want hover to put this panel in focus, so check flag and call prop function if needed */}
        {/* Panels are of a fixed height, using media queries to adjust based on device width */}
        {/* If a panel is selected we want the blue action color, otherwise the gray normal color */}
        <div className="panel b text-center propertyTile" style={this.props.selected ? selectedPanelContainerStyle : {borderColor:"#CCCCCC", borderWidth:"1px", marginBottom:"0px"}}>
          <div className="panel-body" style={{padding:"0px"}}>
            {/* Image is of a specific height, this changes in CSS depending on screen width */}
            <div className="srpTilePanelImageHeight">
              <img style={{minWidth:"100%", height:"auto"}} src={this.getImageUrl(this.props.property)} />
            </div>
          </div>
          {/* If CP given we have a RS for each property, otherwise we add a button  */}
          {true ?
            <div className="panel-body bt" style={{padding:"2px", borderColor: panelBordersColor}}>
              {/* RS and explanation, explanation uses CSS text cutoof technique on smaller devices with varying # of lines depending on screen width */}
              {retailScore}
              <p className="lineClamp">6 other businesses in this area attract high-end shoppers looking for casual clothing, by locating here your business will be another option for these customers.</p>
            </div>
          :
            <div className="panel-body bt tileRetailScore" style={{padding:"0px", borderColor: panelBordersColor}}>
              <Button className="tileRetailScore" style={{border:"none", color:"#49A3DC", width:"100%"}}><i className="fa fa-user" style={{color:"#49A3DC"}}/>&nbsp;&nbsp;Add Customer Profile for Score</Button>
            </div>
          }
          {/* Price and SQ FT info shown side by side, margins are different to account for padding of other elements */}
          <div className="panel-body bt" style={{padding:"2px", borderColor: panelBordersColor, marginTop:"2px"}}>
            <Row>
              <Col xs={6} className="br" style={{borderColor: panelBordersColor}}>
                <p style={{marginBottom:"7px", marginTop:"5px"}}>{this.formatPrice(this.props.property)}</p>
              </Col>
              <Col xs={6}>
                <p style={{marginBottom:"7px", marginTop:"5px"}}>{this.formatSqFt(this.props.property)}</p>
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
  // price and sq foot options are stored in the Util.js file
  render() {
    const sortButtonStyle = {height:"40px", color:"#49A3DC", borderColor:"#CCCCCC"};
    const selectedSortButtonStyle = {borderColor: "#49A3DC", height:"40px", color:"#49A3DC", marginLeft:"0px", marginRight:"1px"};

    // for min price options, filter out anything greater than the max (if not null)
    var minPriceOptions = Util.prices;
    if(this.props.filterPriceMax != null) {
      minPriceOptions = minPriceOptions.filter(price => price < this.props.filterPriceMax);
    }
    // for max price options, filter out anything less than the min (if not null)
    var maxPriceOptions = Util.prices;
    if(this.props.filterPriceMin != null) {
      maxPriceOptions = maxPriceOptions.filter(price => price > this.props.filterPriceMin);
    }
    // for min sqft options, filter out anything greater than the max (if not null)
    var minSqFtOptions = Util.square_feet;
    if(this.props.filterSqFtMax != null) {
      minSqFtOptions = minSqFtOptions.filter(sqFeet => sqFeet < this.props.filterSqFtMax);
    }
    // for max sqft options, filter out anything less than the min (if not null)
    var maxSqFtOptions = Util.square_feet;
    if(this.props.filterSqFtMin != null) {
      maxSqFtOptions = maxSqFtOptions.filter(sqFeet => sqFeet > this.props.filterSqFtMin);
    }

    return(
      <div style={{backgroundColor:"#FFFFFF", width:"100%", height:"100%", padding: this.props.padded ? "10px" : "0", display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center"}}>
        {/* Filters label */}
        <center><label className="control-label" style={{fontSize:"18px", marginBottom:"0px", color:"#656565"}}>Filters</label></center>
        {/* Use bootstrap responsive columns to arrange filters section differently for mobile and desktop */}
        <Row>
          {/* On mobile we want this label on the left side, on desktop we want it on top of the corresponding dropdowns */}
          {/* Use flexbox to center the label vertically, <center> tag to center it horizontally in the column */}
          <Col xs={2} sm={1} md={6} className="filtersLabelSize" style={{display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center"}}>
            <label className="control-label" style={{fontSize:"16px", marginLeft:"10px", color:"#656565"}}>Rent:</label>
          </Col>
          {/* Bootstrap column pushing/pulling doesn't work when wrapping columns, so using hidden-[size], for this one label only */}
          {/* Use flexbox to center the label vertically, <center> tag to center it horizontally in the column */}
          <Col xs={2} sm={1} md={6} className="hidden-sm hidden-xs filtersLabelSize" style={{display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center"}}>
            <label className="control-label" style={{fontSize:"16px", marginLeft:"10px", color:"#656565"}}>Size:</label>
          </Col>
          {/* On desktop this will be under a label and sharing space with the Sq Ft dropdowns, so half space there and majority space on mobile where it will be in its own row with just a label */}
          <Col xs={10} sm={11} md={6}>
            <InputGroup style={{padding:"10px", height:"40px", width:"100%"}}>
              <DropdownButton
                onSelect={((newValue) => this.props.onUpdatePriceMin(newValue))}
                componentClass={InputGroup.Button}
                id="input-dropdown-addon"
                title={this.props.filterPriceMin == null ? "Minimum" : ("$" + Actions.numberToString(this.props.filterPriceMin) + "/mo")}
                style={{height:"40px", width:"100%", color:"#49A3DC", borderColor:"#CCCCCC"}}>
                {this.props.filterPriceMin != null ? <MenuItem key={index} eventKey={null}>None</MenuItem> : false}
                {minPriceOptions.map((price, index) => {
                  return <MenuItem key={index} eventKey={price}>{Actions.numberToString(price)}</MenuItem>
                })}
              </DropdownButton>
              <DropdownButton
                onSelect={((newValue) => this.props.onUpdatePriceMax(newValue))}
                componentClass={InputGroup.Button}
                id="input-dropdown-addon"
                title={this.props.filterPriceMax == null ? "Maximum" : ("$" + Actions.numberToString(this.props.filterPriceMax) + "/mo")}
                style={{height:"40px", width:"100%", color:"#49A3DC", borderColor:"#CCCCCC"}}>
                {this.props.filterPriceMax != null ? <MenuItem key={index} eventKey={null}>None</MenuItem> : false}
                {maxPriceOptions.map((price, index) => {
                  return <MenuItem key={index} eventKey={price}>{Actions.numberToString(price)}</MenuItem>
                })}
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
                onSelect={((newValue) => this.props.onUpdateSqFtMin(newValue))}
                componentClass={InputGroup.Button}
                id="input-dropdown-addon"
                title={this.props.filterSqFtMin == null ? "Min Sq. Feet" : (Actions.numberToString(this.props.filterSqFtMin) + " Sq.Ft.")}
                style={{height:"40px", width:"100%", color:"#49A3DC", borderColor:"#CCCCCC"}}>
                {this.props.filterSqFtMin != null ? <MenuItem key={index} eventKey={null}>None</MenuItem> : false}
                {minSqFtOptions.map((sqFt, index) => {
                  return <MenuItem key={index} eventKey={sqFt}>{Actions.numberToString(sqFt)}</MenuItem>
                })}
              </DropdownButton>
              <DropdownButton
                onSelect={((newValue) => this.props.onUpdateSqFtMax(newValue))}
                componentClass={InputGroup.Button}
                id="input-dropdown-addon"
                title={this.props.filterSqFtMax == null ? "Max Sq. Feet" : (Actions.numberToString(this.props.filterSqFtMax) + " Sq.Ft.")}
                style={{height:"40px", width:"100%", color:"#49A3DC", borderColor:"#CCCCCC"}}>
                {this.props.filterSqFtMax != null ? <MenuItem key={index} eventKey={null}>None</MenuItem> : false}
                {maxSqFtOptions.map((sqFt, index) => {
                  return <MenuItem key={index} eventKey={sqFt}>{Actions.numberToString(sqFt)}</MenuItem>
                })}
              </DropdownButton>
            </InputGroup>
          </Col>
        </Row>
        {/* Sort filters are always side by side with the label, only adjust sizing for white-space on tablets */}
        <Row style={{marginLeft:"0px", marginRight:"0px", marginTop:"5px", marginBottom:"20px", width:"100%"}}>
          {/* Use flexbox to center the label vertically, <center> tag to center it horizontally in the column */}
          <Col xs={2} sm={1} md={2} style={{display:"flex", flexDirection:"column", justifyContent:"center", height:"40px"}}>
            <label className="control-label" style={{fontSize:"16px", color:"#656565"}}>Sort:</label>
          </Col>
          <Col xs={10} sm={11} md={10} style={{paddingRight:"10px"}}>
            <ButtonGroup style={{width:"100%", height:"40px"}}>
              <Button onClick={() => this.props.onUpdateSort(Actions.SORT_RS)} className="filterSortButtonWidthRS" style={this.props.selectedSort == Actions.SORT_RS ? selectedSortButtonStyle : sortButtonStyle}>Retail Score</Button>
              <Button onClick={() => this.props.onUpdateSort(Actions.SORT_PRICE)} className="filterSortButtonWidthPrice" style={this.props.selectedSort == Actions.SORT_PRICE ? selectedSortButtonStyle : sortButtonStyle}>Price</Button>
              <Button onClick={() => this.props.onUpdateSort(Actions.SORT_SQ_FT)} className="filterSortButtonWidthSq" style={this.props.selectedSort == Actions.SORT_SQ_FT ? selectedSortButtonStyle : sortButtonStyle}>Sq. Feet</Button>
            </ButtonGroup>
          </Col>
          {/* If on Mobile add a Save/Done button since cannot see the changes reflected easily, user needs way to dismiss the slide out */}
        </Row>
        <div className="hidden-md hidden-lg" style={{width:"100%", flexGrow:"1", display:"flex", justifyContent:"center", alignItems:"center"}}>
          <Button onClick={this.props.onSave} style={{height:"40px", width:"50%", color:"#49A3DC", borderColor:"#CCCCCC"}}>Save</Button>
        </div>
      </div>
    );
  }
}

Test.contextTypes = {
  mixpanel: React.PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
  return {
    server_side: state.server_side,
    properties: state.properties
  };
};

export default connect(mapStateToProps, Actions)(Test);
