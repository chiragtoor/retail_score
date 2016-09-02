import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { Row, Col, InputGroup, FormGroup, FormControl, DropdownButton, MenuItem } from 'react-bootstrap';

import GoogleMap from '../components/GoogleMap';

export class Test extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      mounted: false
    }
  }

  componentDidMount() {
    this.setState({mounted: true});
  }

  render() {
    return(
      <div style={{width:"100%", height:"100%", margin:"0px", padding:"0px", display:"flex", flexDirection:"column", justifyContent:"space-around"}}>
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
        <Row style={{flex:"1"}}>
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
          <div className="col-xs-12 col-md-6 col-md-pull-6 srpContentHeightOther">
            <ReactCSSTransitionGroup transitionName="fadeInUp" transitionEnterTimeout={500} transitionLeaveTimeout={500}>
            {this.state.mounted ?
              <div style={{width:"100%", height:"100%"}}>
                <div className="hidden-sm hidden-xs">
                  <SearchBar />
                </div>
                <div>
                  <Filters />
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

class SearchBar extends React.Component {
  render() {
    return(
      <InputGroup style={{padding: this.props.noPadding ? "0px" : "10px", height:"50px"}}>
        <InputGroup.Addon style={{backgroundColor:"#49A3DC"}}>&nbsp;&nbsp;<i className="fa fa-users" style={{color:"#FFFFFF"}}/>&nbsp;&nbsp;</InputGroup.Addon>
        <FormControl type="text" style={{height:"50px"}}/>
        <InputGroup.Addon style={{backgroundColor:"#49A3DC"}}>&nbsp;&nbsp;<i className="fa fa-search" style={{color:"#FFFFFF"}}/>&nbsp;&nbsp;</InputGroup.Addon>
      </InputGroup>
    );
  }
}
class Filters extends React.Component {
  render() {
    return(
      <div>
        <center><label className="control-label" style={{fontSize:"18px"}}>Filters: </label></center>
        <Row style={{paddingLeft:"0px", paddingRight:"0px"}}>
          <Col xs={3} sm={2} md={2} className="noPaddingColumn">
            <div style={{backgroundColor:"#FF0000", height:"20px"}} />
          </Col>
          <Col xs={9} sm={10} md={4} className="noPaddingColumn">
            <div style={{backgroundColor:"#00FF00", height:"20px"}} />
          </Col>
          <Col xs={3} sm={2} md={2}  className="noPaddingColumn">
            <div style={{backgroundColor:"#0000FF", height:"20px"}} />
          </Col>
          <Col xs={9} sm={10} md={4} className="noPaddingColumn">
            <div style={{backgroundColor:"#FF00FF", height:"20px"}} />
          </Col>
        </Row>
        <Row>
          <Col xs={2} sm={1} style={{display:"flex", flexDirection:"column", justifyContent:"center", height:"60px"}}>
            <label className="control-label" style={{fontSize:"16px", marginLeft:"10px"}}>Rent: </label>
          </Col>
          <Col xs={10}  sm={11}>
            <InputGroup style={{padding:"10px", height:"40px", width:"100%"}}>
              <DropdownButton
                componentClass={InputGroup.Button}
                id="input-dropdown-addon"
                title="Minimum"
                style={{height:"40px", width:"100%"}}>
                <MenuItem key="1">Item</MenuItem>
              </DropdownButton>
              <DropdownButton
                componentClass={InputGroup.Button}
                id="input-dropdown-addon"
                title="Maximum"
                style={{height:"40px", width:"100%"}}>
                <MenuItem key="1">Item</MenuItem>
              </DropdownButton>
            </InputGroup>
          </Col>
        </Row>
        <Row>
          <Col xs={2} sm={1} style={{display:"flex", flexDirection:"column", justifyContent:"center", height:"60px"}}>
            <label className="control-label" style={{fontSize:"16px", marginLeft:"10px"}}>Size: </label>
          </Col>
          <Col xs={10} sm={11}>
            <InputGroup style={{padding:"10px", height:"40px", width:"100%"}}>
              <DropdownButton
                componentClass={InputGroup.Button}
                id="input-dropdown-addon"
                title="Min Sq. Feet"
                style={{height:"40px", width:"100%"}}>
                <MenuItem key="1">Item</MenuItem>
              </DropdownButton>
              <DropdownButton
                componentClass={InputGroup.Button}
                id="input-dropdown-addon"
                title="Max Sq. Feet"
                style={{height:"40px", width:"100%"}}>
                <MenuItem key="1">Item</MenuItem>
              </DropdownButton>
            </InputGroup>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Test;
