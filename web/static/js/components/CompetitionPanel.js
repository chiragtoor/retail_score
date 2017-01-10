import {default as React, Component} from "react";
import {Glyphicon,Modal, Button, FormGroup, ControlLabel, FormControl, InputGroup, Panel, Nav, NavItem} from "react-bootstrap";
import GoogleMap from './GoogleMap';
import CompetitionGoogleMap from './CompetitionGoogleMap';
import CompetitionSearchBar from './CompetitionSearchBar';

const isBrowser = typeof window !== 'undefined';


export default class CompetitionPanel extends Component {

  constructor(props) {
    super(props);

    this.searchClick = this.searchClick.bind(this);
    this.pinClick = this.pinClick.bind(this);

    this.state = {
      keyword: null
    };
  }

  searchClick(keyword) {
    this.state.keyword = keyword;
    this.setState(this.state);

    this.props.mixpanel.track('Competition Searched', {'keyword':keyword});
  }

  pinClick(name) {
    this.props.mixpanel.track('Competition Pin Clicked', {'name':name});
  }

  render () {

    return (
      <div style={{height:"100%", width:"100%", marginTop:"10px"}}>
        <div className="row-masonry row-masonry-lg-2">
          <div className="col-masonry">
              <div className="panel b m0">

                 <div className="panel-heading">
                    <div className="media mt0">
                       <div className="media-left">
                          <Button style={{fontSize:"15px", backgroundColor:"#656565", color:"#FFFFFF",borderRadius:"20px"}}>
                            <em className="fa fa-globe"></em>
                          </Button>
                       </div>
                       <div className="media-body media-middle">
                        <center>
                          <h2 className="media-heading m0 text-bold">Competition Map</h2>
                        </center>
                       </div>
                    </div>
                 </div>

                 <div className="panel-body" style={{height:"350px"}}>
                    <div className="row" style={{height:"100%"}}>
                       <CompetitionSearchBar searchClick={this.searchClick} />
                       <div className="col-lg-8" style={{height:"85%"}}>
                          {this.props.property ? <CompetitionGoogleMap 
                            id={"competition"}
                            property={this.props.property}
                            pinClick={this.pinClick}
                            keyword={this.state.keyword}/> : null}
                       </div>
                    </div>
                 </div>
              </div>
          </div>
        </div>       
      </div>
    );

  }
}