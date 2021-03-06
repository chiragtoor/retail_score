import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from "react-redux";
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { Row, Col, InputGroup, ButtonGroup, Button, DropdownButton, MenuItem, Pagination } from 'react-bootstrap';

import * as Actions from '../actions';
import * as Util from '../Util';

import AppBar from '../components/AppBar';
import SearchBar from '../components/SearchBar';
import GoogleMap from '../components/GoogleMap';

// size of pages when splitting property tiles for pagination
const PAGE_SIZE = 20;
// flag for showing filters in secondary content
const SECONDARY_FILTERS = 0;

export class SearchResultsPage extends React.Component {

  /*
   * Using bootstrap and css media queries, desktop and mobile share the same layout, but there are parts of the logic that are
   *  handled differently for the two. Components are mostly the same in both and render once, except for ones that are rendered
   *  in very different locations between the two, or the listings section because we pass in different params to the tiles.
   *
   * Search Bar, Filters, are rendered twice and hidden on either mobile or desktop once for proper placement.
   *
   * Logic wise, the main difference between the two is how we select the current main property, which is the one highlighted in the UI.
   *  
   * On mobile the scrolling is left to right and the one that is at the tile whose left edge is closest to the phone's left edge is what is
   *  considered the current main property. To do this, we render the mobileListingsDiv and store a ref to each tile. onScroll we use a timer
   *  setup to only check for the current main property when the user stops scrolling, at that point we go through all stored refs and
   *  use ReactDOM to get the actual DOM info and check the left edges to get what is closest to the phone left edge.
   *
   * On desktop we render a separate desktopListingsDiv and pass in a onHover to the propertyTile, this callback method takes in a index
   *  (which is passed as a ref to each tile) and updates the current main property that way.
   *
   * Properties and tile's displayed are not the same thing, properties come in as a array of listings. The filters and sorting operate directly
   *  on this full property list. For pagination we take what is left after filter and sort and cut it into pages of PAGE_SIZE, that is
   *  propertyTile's and that is what we map over and render each propertyTile with.
   */

  constructor(props) {
    super(props);

    this.listingsDivScrolled = this.listingsDivScrolled.bind(this);
    this.pageSelect = this.pageSelect.bind(this);
    this.updateMainProperty = this.updateMainProperty.bind(this);
    this.isMainProperty = this.isMainProperty.bind(this);
    this.searchCity = this.searchCity.bind(this);
    this.submitContact = this.submitContact.bind(this);
    this.propertyClick = this.propertyClick.bind(this);
    this.goHome = this.goHome.bind(this);

    // get the properties for the current city
    const city = this.props.params.city.replace("-", " ");
    const cityParts = city.split(",");
    this.props.loadProperties(cityParts[0], cityParts[1].trim());

    // used on mobile to store all propertyTile refs
    this._propertyTiles = new Map();
    // timeout used for only performing computations on end of mobile scroll
    this._scrollTimeout = null;

    this.state = {
      mounted: false,
      // current city results being shown on page
      currentCity: city,
      // used to highlight the correct tile on mobile and desktop, will be used to pass into the map which pin to enlarge and center on
      selectedPropertyIndex: 0,
      // flag for whether to show the container for filters, CP
      mobileShowSecondaryContent: false,
      // the content to show in mobile modal
      secondaryContent: null,
      // type of sort currently being applied
      currentSort: Actions.SORT_RS,
      // default filter values are all null, this way initial text displays in filter dropdowns
      filterPriceMin: null,
      filterPriceMax: null,
      filterSqFtMin: null,
      filterSqFtMax: null,
      // page # used with pagination
      currentPage: 1,
      // propertyId to contact -> for contact from SRP page functionality
      propertyToContact: null,
      // contact agent name
      currentContactAgentName: "",
      currentContactAgentCompany: ""
    }
  }

  componentDidMount() {
    // used for flag on animations, on mount animations don't work if they are rendered, so we wait till mount to run animation
    this.setState({mounted: true});

    this.trackCall(() => this.context.mixpanel.track('srp_mounted'));
  }

  /* 
   * When rendered on the server there is no mixpanel, the library relies on the browser so we cannot use MixPanelProvider.
   *  Because of this some calls to mixpanel.track could be errors because mixpanel will be undefined, so this function wraps
   *  all calls to mixpanel and makes sure it is able to be called. Without this we have issues rendering server side because of
   *  tracking calls made on page load in componentDidMount, etc.
   */
  trackCall(callIfTrackable) {
    if(this.context.mixpanel) {
      callIfTrackable();
    }
  }

  // search and get properties for a city
  searchCity(city) {
    const cityParts = city.split(',');
    // trim because city comes with a space after the ',' and backend will return no properties for ' CA' as the state
    this.props.loadProperties(cityParts[0], cityParts[1].trim());
    // update local state to keep track of where SRP is
    this.setState({currentCity: city});

    this.trackCall(() => this.context.mixpanel.track('srp_city_changed', {'city': cityParts[0], 'state': cityParts[1]}));
  }

  // mobile secondary content helper function to bring up the correct modal
  showSecondaryContent(content) {
    switch (content) {
      case SECONDARY_FILTERS:
        this.trackCall(() => this.context.mixpanel.track('srp_filters_button_clicked'));
        this.setState({
          mobileShowSecondaryContent: true,
          secondaryContent: SECONDARY_FILTERS
        });
        break;
    }
  }

  propertyClick(property) {
    this.trackCall(() => this.context.mixpanel.track('property_clicked', {'property_id': property.id}));
    this.props.history.push('/properties/' + property.id);
  }

  submitContact(name, email, message, propertyId) {
    this.trackCall(() => this.context.mixpanel.track('srp_contact', {'property_id': propertyId, 'name': name, 'email': email, 'message': message}));

    this.props.submitContact({
      "message":{
        "contact_name": name,
        "contact_email_address": email,
        "body": message,
        "property_id": propertyId
      }
    });
    this.setState({propertyToContact: null, secondaryContent: null, mobileShowSecondaryContent: false});

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

        //this.context.mixpanel.track('srp_listings_div_scrolled');
      // use helper method to update current main index based on pagination
      this.updateMainProperty(minTuple.index);
    }, 50);
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
    this.trackCall(() => this.context.mixpanel.track('srp_page_changed', {'page': page}));
    // update the current page
    this.setState({currentPage: page});
    // update the current main property, will be the first one on this page
    // this.updateMainProperty(0);
    if(mobileFlag) {
      // move the scrolled div back to the left
      ReactDOM.findDOMNode(this.refs.mobileListingsDiv).scrollLeft = 0;
    } else {
      // move the scrolled div back to the top, pagination is on bottom
      ReactDOM.findDOMNode(this.refs.desktopListingsDiv).scrollTop = 0;
    }
    // due to weird issue where this.state.currentPage is still the old value even after above update (race condition?)
    //  use the page and update current main property without the helper method
    //  otherwise on mobile when going back to previous page the current main property does not update on its own, only when
    //  you scroll
    this.setState({selectedPropertyIndex: (0 + (page - 1) * PAGE_SIZE)});
  }

  // method to update the main property based on index selected and current page
  updateMainProperty(index) {
    this.setState({selectedPropertyIndex: (index + (this.state.currentPage - 1) * PAGE_SIZE)});
  }

  // boolean method to check if a index is the current main property based on current page
  isMainProperty(index) {
    return this.state.selectedPropertyIndex == (index + (this.state.currentPage - 1) * PAGE_SIZE);
  }

  goHome() {
    this.props.history.push('/');
  }

  render() {
    // use slice() on the props because we want to clone and then apply sorting and filtering,
    //  if you do just var = props.properties then below when var properties is sorted and filtered
    //  it does the same on the props.properties -> need to confirm this was the issue
    var properties = this.props.properties.slice();

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

    // Paginate remaining properties in blocks of PAGE_SIZE so UI does not freeze up for the listings section, map will still have all properties up
    var numPages = Math.floor(properties.length / PAGE_SIZE);
    if(properties.length % PAGE_SIZE != 0) {
      numPages = numPages + 1;
    }
    // get the min and max index of the current page to cut those 20 properties out
    var min = PAGE_SIZE * (this.state.currentPage - 1);
    var max = min + PAGE_SIZE;
    // cut out the 20 properties, these are what to display now
    var propertyTiles = properties.slice(min, max);

    // current main property, this is the one that is highlighted on the UI -> this is used by the map to enlarge corresponding pin
    // have to look in full properties, not the cut out propertyTiles from above
    var mainProperty = properties[this.state.selectedPropertyIndex];

    var secondaryContent = false;
    switch(this.state.secondaryContent) {
      case SECONDARY_FILTERS:
        secondaryContent = <div onClick={(e) => e.stopPropagation()} style={{width:"95%", height:"60%"}}>
                              <Filters 
                                filterPriceMin={this.state.filterPriceMin}
                                filterPriceMax={this.state.filterPriceMax}
                                filterSqFtMin={this.state.filterSqFtMin}
                                filterSqFtMax={this.state.filterSqFtMax}
                                onUpdatePriceMin={(value) => {this.trackCall(() => this.context.mixpanel.track('srp_filter_changed', {'min_price': value})); this.setState({filterPriceMin: value, currentPage: 1});}}
                                onUpdatePriceMax={(value) => {this.trackCall(() => this.context.mixpanel.track('srp_filter_changed', {'max_price': value})); this.setState({filterPriceMax: value, currentPage: 1});}}
                                onUpdateSqFtMin={(value) => {this.trackCall(() => this.context.mixpanel.track('srp_filter_changed', {'min_sqft': value})); this.setState({filterSqFtMin: value, currentPage: 1});}}
                                onUpdateSqFtMax={(value) => {this.trackCall(() => this.context.mixpanel.track('srp_filter_changed', {'max_sqft': value})); this.setState({filterSqFtMax: value, currentPage: 1});}}
                                selectedSort={this.state.currentSort} 
                                onUpdateSort={(newValue) => {this.trackCall(() => this.context.mixpanel.track('srp_sort_type_changed', {'sort_by': newValue})); this.setState({currentSort: newValue, currentPage: 1});}}
                                onSave={() => this.setState({mobileShowSecondaryContent: false})} 
                                padded={true} />
                            </div>;
        break;
    }

    return(
      <div className="containerWrapper">
        {/* Use flex-box so that we can automatically resize the content below the desktop only header bar when it dissapears on mobile */}
        {/* header bar that has the logo and app color, only visible on desktop and larger sizes */}
        <div>
          <AppBar className="hidden-sm hidden-xs" />
          <div className="hidden-md hidden-lg" style={{backgroundColor:"#49A3DC"}}>
            <SearchBar noPadding={true} value={this.state.currentCity} onSearch={this.searchCity} />
          </div>
        </div>
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
            <div style={{width:"100%", height:"100%"}}>
              <GoogleMap 
                id={"desktop"} 
                properties={properties}
                pinClick={this.propertyClick}
                currentPropertyMarker={mainProperty} />
            </div>
          </div>
          {/* Listings section */}
          <div className="col-xs-12 col-md-6 col-md-pull-6 srpListingsSection" style={{boxShadow:"2px 0px 3px -1px #7f8c8d", position:"relative", zIndex:"5"}}>
            <div style={{width:"100%", height:"100%", maxHeight:"100%"}}>
                {/* Search Bar is above at top on mobile, so hide in that case */}
                <div className="hidden-sm hidden-xs">
                  <SearchBar value={this.state.currentCity} onSearch={this.searchCity} />
                </div>
                {/* Filters are opened by a button on mobile, so hide in that case */}
                {/* on filter update set currentPage to 1 in case user was looking at other pages */}
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
                <div style={{borderTop:"solid thin #CCCCCC", borderBottom:"solid thin #CCCCCC", height:"40px", display:"flex", alignItems:"center", boxShadow:"0px 1px 3px -1px #7f8c8d", position:"relative", zIndex:"10"}}>
                  <label className="control-label" style={{fontSize:"16px", flexGrow:"1", textAlign:"center", color:"#656565", padding:"0"}}>{properties.length} Properties</label>
                  {/* Add a empty div for desktop the same size as Filter button, this way the # properties text stays centered with flexbox */}
                  <div className="hidden-sm hidden-xs" style={{width:"36px", height:"10px", marginRight: "15px"}} />
                  <Button onClick={() => this.showSecondaryContent(SECONDARY_FILTERS)} className="hidden-md hidden-lg" style={{marginRight:"15px", border:"none",fontSize:"16px", fontWeight:"100"}}><i className="fa fa-filter" style={{color:"#49A3DC"}}/></Button>
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
                    return <PropertyTile onClick={this.propertyClick} oneTapContact={this.state.oneTapContact} property={property} mobile={false} key={index} index={index} onHover={(index) => this.updateMainProperty(index)} selected={this.isMainProperty(index)} style={{flexShrink: "1"}}/>
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
                    <div style={{display:"flex", flexDirection:"column", justifyContent:"center"}}>
                      <Button onClick={() => this.pageSelect(this.state.currentPage - 1, true)} style={{height:"40px", width:"50px", marginLeft:"10px", marginRight:"10px", color:"#49A3DC", borderColor:"#CCCCCC", flexShrink: "1"}}>Back</Button>
                    </div>
                  :
                    false
                  }
                  {propertyTiles.map((property, index) => {
                    {/* Add the ref of this to the mobile tiles ref storage, this is used for calculating which element is in the main scroll position */}
                    return <PropertyTile onClick={this.propertyClick} oneTapContact={this.state.oneTapContact} property={property} mobile={true} key={index} index={index} selected={this.isMainProperty(index)} style={{flexShrink: "1"}} ref={c => this._propertyTiles.set(index, c)}/>
                  })}
                  {(numPages >= 2 && this.state.currentPage != numPages) ?
                    <div style={{display:"flex", flexDirection:"column", justifyContent:"center"}}>
                      <Button onClick={() => this.pageSelect(this.state.currentPage + 1, true)} style={{height:"40px", width:"50px", marginLeft:"10px", marginRight:"10px", color:"#49A3DC", borderColor:"#CCCCCC", flexShrink: "1"}}>Next</Button>
                    </div>
                  :
                    false
                  }
                </div>
              </div>
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
              {/* If user clicks outside dimDiv we want it to close the secondary content */}
              {/* Clicking inside the secondary content (buttons, dropdowns) should not close it, so use stopPropogation so that event does not go to the outer div above and close */}
              {/* on filter update set currentPage to 1 in case user was looking at other pages */}
              {secondaryContent}
            </div>
          :
            false
          }
        </ReactCSSTransitionGroup>
      </div>
    );
  }
}

/* PropertyTile component is only used in this Container */
class PropertyTile extends React.Component {
  constructor(props) {
    super(props);

  }
  formatPrice(property) {
    // properties will either have null for both, only a min, or a min and max value
    //  will never have a max and no min
    if(property.rental_rate_min == null) {
      return "Unavailable"
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
      return "Unavailable"
    } else if(property.min_sq_feet != null && property.max_sq_feet == null) {
      return Actions.numberToString(property.rental_rate_min) + " Sq.Ft."; 
    } else if(property.min_sq_feet == property.max_sq_feet) {
      return Actions.numberToString(property.min_sq_feet) + " Sq.Ft.";
    } else {
      return Actions.numberToString(property.min_sq_feet) + " - " + Actions.numberToString(property.max_sq_feet) + " Sq.Ft.";
    }
  }

  getImageUrl(property) {
    return `https://maps.googleapis.com/maps/api/streetview?size=350x150&location=${property.image_lat},${property.image_lng}&heading=${property.image_heading}&key=AIzaSyASv9f24GcF78YIKRsX3uCRkj58JzZ8NaA`;
  }

  render() {
    {/* styles and color to use when a tile is currently selected, this is hovered over on desktop and in the main scroll position on mobile */}
    const selectedPanelContainerStyle = {display:"flex", flexDirection:"column", borderColor:"#49A3DC", borderWidth:"2px", boxShadow:"0 0 2px #49A3DC", marginBottom:"0px"};
    const panelBordersColor = this.props.selected ? "#49A3DC" : "#CCCCCC";

    return(
      <div className="propertyTileContainer" onMouseOver={() => this.props.mobile ? false : this.props.onHover(this.props.index)} onClick={() => this.props.onClick(this.props.property)}>
      {/* For desktop we want hover to put this panel in focus, so check flag and call prop function if needed */}
        {/* Panels are of a fixed height, using media queries to adjust based on device width */}
        {/* If a panel is selected we want the blue action color, otherwise the gray normal color */}
        <div className="panel b text-center propertyTile" style={this.props.selected ? selectedPanelContainerStyle : {borderColor:"#CCCCCC", borderWidth:"1px", marginBottom:"0px"}}>
          <div className="panel-body" style={{padding:"0px"}}>
            {/* Image is of a specific height, this changes in CSS depending on screen width */}
            <div className="srpTilePanelImageHeight" style={{backgroundColor:"#CCCCCC", position:"relative"}}>
              <img src={this.getImageUrl(this.props.property)} />
            </div>
          </div>
          {/* If CP given we have a RS for each property, otherwise we add a button  */}
          {true ?
            <div className="panel-body bt" style={{padding:"2px", borderColor: panelBordersColor}}>
              <p style={{margin:"0px"}}>{this.props.property.street_address}</p>
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
        </div>
      </div>
    );
  }
}

/* Filters component is only used in this Container */
class Filters extends React.Component {
  // price and sq foot options are stored in the Util.js file
  render() {
    const sortButtonStyle = {height:"40px", color:"#49A3DC", borderColor:"#CCCCCC"};
    const selectedSortButtonStyle = {backgroundColor: "#49A3DC", borderColor: "#49A3DC", height:"40px", color:"#FFFFFF", marginLeft:"0px", marginRight:"1px"};

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
        {/* Use bootstrap responsive columns to arrange filters section differently for mobile and desktop */}   
        <Row>
          {/* On desktop this will be under a label and sharing space with the Sq Ft dropdowns, so half space there and majority space on mobile where it will be in its own row with just a label */}
          <Col xs={12} sm={12} md={6}>
            <InputGroup style={{padding:"10px", height:"40px", width:"100%", marginTop:"10px"}}>
              <DropdownButton
                onSelect={((newValue) => this.props.onUpdatePriceMin(newValue))}
                componentClass={InputGroup.Button}
                id="input-dropdown-addon"
                title={this.props.filterPriceMin == null ? "Min Rent" : ("$" + Actions.numberToString(this.props.filterPriceMin) + "/mo")}
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
                title={this.props.filterPriceMax == null ? "Max Rent" : ("$" + Actions.numberToString(this.props.filterPriceMax) + "/mo")}
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

          {/* On desktop this will be under a label and sharing space with teh Sq Ft dropdowns, so half space there and majority space on mobile where it will be in its own row with just a label */}
          <Col xs={12} sm={12} md={6}>
            <InputGroup style={{padding:"10px", height:"40px", width:"100%", marginTop:"10px"}}>
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
        <div className="hidden-md hidden-lg" style={{width:"100%", flexGrow:"1", display:"flex", justifyContent:"center", alignItems:"center"}}>
          <Button onClick={this.props.onSave} style={{height:"40px", width:"50%", color:"#49A3DC", borderColor:"#CCCCCC"}}>Save</Button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    properties: state.properties
  };
};

export default connect(mapStateToProps, Actions)(SearchResultsPage);
