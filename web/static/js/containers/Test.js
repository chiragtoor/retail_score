import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { Row, FormControl, Button, ButtonGroup } from 'react-bootstrap';

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
      <div className="container-fluid container-div" style={{width:"100%", height:"100%", margin:"0px", padding:"0px"}}>
        <div style={{backgroundColor:"#49A3DC", height:"100%", width:"100%", margin:"0", padding:"0", display:"flex", flexDirection:"column", justifyContent:"space-around"}}>

          <div className="panel b text-center" style={{marginLeft:"20px", marginRight:"20px", backgroundColor:"#49A3DC", borderColor:"#FFFFFF"}}>
            <div className="panel-body">
              <p className="h4 text-bold" style={{color:"#FFFFFF", marginBottom:"10px", marginTop:"0px"}}>{"higher-end, expensive"}</p>
              <ButtonGroup>
                <Button style={{backgroundColor:"#49A3DC", borderColor:"#FFFFFF"}}><i className="fa fa-dollar" style={{color:"#FFFFFF", fontSize:"8vw"}}/></Button>
              </ButtonGroup>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Test;
