import {default as React, Component} from "react";
import {Glyphicon,Modal, Button, FormGroup, ControlLabel, FormControl, InputGroup, Panel, Nav, NavItem} from "react-bootstrap";
import GoogleMap from './GoogleMap';
import CompetitionGoogleMap from './CompetitionGoogleMap';
import DesktopCompetitionSearchBar from './DesktopCompetitionSearchBar';

const isBrowser = typeof window !== 'undefined';


export default class DesktopCompetitionPanel extends Component {

  constructor(props) {
    super(props);

    this.searchClick = this.searchClick.bind(this);

    this.state = {
      keyword: null
    };
  }

  searchClick(keyword) {
    this.state.keyword = keyword;
    this.setState(this.state);
  }

  render () {

    return (
      <div style={{height:"100%", width:"100%", marginTop:"10px"}}>
        <div className="row-masonry " >

          <div className="col-masonry">

              <div className="panel b m0" style={{height:"100%"}}>

                 <div className="panel-heading" style={{height:"100%", width:"100%"}}>
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

                 <div className="panel-body" style={{height:"500px"}}>
                    <div className="row" style={{height:"100%"}}>
                       <div className="col-lg-offset-1 col-md-offset-1 col-lg-10 col-md-10"  style={{height:"90%"}}>
                          <DesktopCompetitionSearchBar searchClick={this.searchClick} />
                          <CompetitionGoogleMap 
                            id={this.props.tag}
                            property={this.props.property}
                            keyword={this.state.keyword}/>
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