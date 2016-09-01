import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { Row, Col, FormControl, Button, ButtonGroup } from 'react-bootstrap';

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
            <div className="hidden-md hidden-lg" style={{backgroundColor:"#49A3DC", height:"40px"}} />
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
              <div style={{backgroundColor: "rgba(0,255,0,0.4)", width:"100%", height:"100%"}} />
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

export default Test;
