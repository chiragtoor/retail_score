import React from 'react';
import { connect } from "react-redux";

import { Row, FormControl, Button, ButtonGroup } from 'react-bootstrap';

import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import TypeWriter from 'react-typewriter';

const GENDER_MALE = 'GENDER_MALE';
const GENDER_FEMALE = 'GENDER_FEMALE';
const GENDER_BOTH = 'GENDER_BOTH';

const genderMaleText = 'are men';
const genderFemaleText = 'are women';
const genderBothText = 'are men and women';

const PRICE_AFFORDABLE = 'PRICE_AFFORDABLE';
const PRICE_AVERAGE = 'PRICE_AVERAGE';
const PRICE_QUALITY = 'PRICE_QUALITY';
const PRICE_HIGH_END = 'PRICE_HIGH_END';

const priceAffordableText = 'cheap';
const priceAverageText = 'affordable';
const priceQualityText = 'higher quality';
const priceHighEndText = 'expensive, high-end';

export class CP extends React.Component {

  constructor(props) {
    super(props);

    this.setGender = this.setGender.bind(this);
    this.setPrice = this.setPrice.bind(this);
    this.typingEnd = this.typingEnd.bind(this);
    this.updateBusiness = this.updateBusiness.bind(this);
    this.updateGender = this.updateGender.bind(this);
    this.updatePrice = this.updatePrice.bind(this);
    this.searchClick = this.searchClick.bind(this);
    this.stopAnimating = this.stopAnimating.bind(this);

    // workaround since React library method of animation on componentDidMount not working (transitionAppear),
    //  when component is mounted render children of any ReactCSSTransitionGroup, otherwise just render the 
    //  ReactCSSTransitionGroup
    // due to this issue, all elements that need to animate in on mount are not displayed until the mounted flag is true,
    //  otherwise they show up on the screen for the initial render and then animate after already being displayed
    this.state = {
      mounted: false,
      gender: {key: GENDER_FEMALE, text: genderFemaleText},
      price: {key: PRICE_AVERAGE, text: priceAverageText},
      typing: 1,
      text: "Casual Shoes .",
      index: 0,
      business: ""
    }
  }

  componentDidMount() {
    this.context.mixpanel.track('CP container did mount');
    // on mount set the flag so the children of each ReactCSSTransitionGroup get animated in
    this.setState({mounted: true});
  }

  setGender(gender, text) {
    // set the gender state so the correct button is displayed as pressed
    this.setState({gender: {key: gender, text: text}});
  }

  setPrice(price, text) {
    // set the price state so the correct button is displayed as pressed
    this.setState({price: {key: price, text: text}});
  }

  updateBusiness(business) {
    this.state.business = business.target.value;
    this.refs.typer.reset();
    this.state.index = 2;
    this.setState(this.state);
  }

  updatePrice(index){
    this.state.price = prices[index];
    this.setState(this.state);
  }

  updateGender(index){
    this.state.gender = genders[index];
    this.setState(this.state);
  }

  searchClick(){
    if(this.state.business == "") {
      alert("Don't forget to let us know what type of business you're starting");
      return;
    }

    this.context.mixpanel.track('CP Search', {'business':this.state.business, 'gender':this.state.gender, 'price': this.state.price});
    this.props.history.push('/scoreproperties');
  }

  stopAnimating(){
    this.refs.typer.reset();
    this.state.index = 2;
    this.state.text = "";
    this.setState(this.state);
  }

  typingEnd() {
    if(this.state.typing == 1 ) {
      this.state.typing = -1;
    } else {
      switch(this.state.index) {
        case 0:
          this.state.index = 1;
          this.state.text = "Designer Clothing .";
          this.state.typing = 1;
          break;
        case 1:
          this.state.index = 2;
          this.state.text = "Skateboarding Equipment .";
          this.state.typing = 1;
          break;
        default: 
          this.state.text = "";
          break;
      }
    }

    this.setState(this.state);
  }

  render() {
    const {gender, price, typing, business} = this.state;
    const delays = [{at: '.', delay: 200}];

    return(
      <div className="container-fluid container-div" style={{width:"100%", height:"100%", margin:"0px", padding:"0px"}}>
        {/* use flexBox so that the bottom button takes up the remaining height, gives equal spacing around it vertically */}
        {/* set a minHeight so that on smaller mobile devices the UI does not look super crammed */}
        <div style={{backgroundColor:"#49A3DC", height:"100%", minHeight:"400px", width:"100%", margin:"0", padding:"0", display:"flex", flexDirection:"column", justifyContent:"flex-start", alignItems:"stretch", alignContent:"stretch"}}>
          {/* Initial text and logo that is shown by itself asking the question to the user, use the mounted flag to make it dissapear */}
          {this.state.mounted ?
            false
          :
            <div style={{height:"100%"}}>
              <div style={{textAlign:"center", width:"100%", paddingTop:"5px", marginBottom:"5px"}}>
                <img className="homepageTopBarImage" src={"https://s3-us-west-2.amazonaws.com/homepage-image-assets/retail_score_logo_white.png"} />
              </div>
              <div style={{height:"-webkit-calc(100% - 120px)", marginLeft:"20px", marginRight:"20px", display:"flex", flexDirection:"column", justifyContent:"center"}}>
                <p style={{textAlign:"center", color:"#FFFFFF", fontSize:"8vw", fontWeight:"600px"}}>Who is your main customer?</p>
              </div>
            </div>
          }
          {/* fade-in animate the start of the response form */}
          <ReactCSSTransitionGroup transitionName="fadeIn" transitionEnterTimeout={500} transitionLeaveTimeout={500}>
            {this.state.mounted ?
              <div>
                <div style={{textAlign:"center", marginTop:"10px", color:"#FFFFFF", fontSize:"8vw"}}>
                  {"My target customers"}
                </div>
              </div>
            :
              false
            }
          </ReactCSSTransitionGroup>
          {/* bounce-in animate the genderType */}
          <ReactCSSTransitionGroup transitionName="fadedBounceIn" transitionEnterTimeout={500} transitionLeaveTimeout={500}>
            {this.state.mounted ?
              <div className="panel b text-center" style={{marginLeft:"20px", marginRight:"20px", marginTop:"10px", backgroundColor:"#49A3DC", borderColor:"#FFFFFF"}}>
                <div className="panel-body">
                  <p className="h4" style={{color:"#FFFFFF", marginBottom:"10px", marginTop:"0px", fontSize:"8vw"}}>{gender.text}</p>
                  <ButtonGroup>
                    <Button onClick={() => this.setGender(GENDER_MALE, genderMaleText)} style={{backgroundColor: gender.key == GENDER_MALE ? "#FFFFFF" : "#49A3DC", fontSize:"8vw"}}><i className="fa fa-male" style={{color: gender.key == GENDER_MALE ? "#49A3DC" : "#FFFFFF"}}/></Button>
                    <Button onClick={() => this.setGender(GENDER_FEMALE, genderFemaleText)} style={{backgroundColor: gender.key == GENDER_FEMALE ? "#FFFFFF" : "#49A3DC", fontSize:"8vw"}}><i className="fa fa-female" style={{color: gender.key == GENDER_FEMALE ? "#49A3DC" : "#FFFFFF"}}/></Button>
                    <Button onClick={() => this.setGender(GENDER_BOTH, genderBothText)} style={{backgroundColor: gender.key == GENDER_BOTH ? "#FFFFFF" : "#49A3DC", fontSize:"8vw"}}><i className="fa fa-male" style={{color: gender.key == GENDER_BOTH ? "#49A3DC" : "#FFFFFF"}}/>&nbsp;<i className="fa fa-female" style={{color: gender.key == GENDER_BOTH ? "#49A3DC" : "#FFFFFF"}}/></Button>
                  </ButtonGroup>
                </div>
              </div>
            :
              false
            }
          </ReactCSSTransitionGroup>
          {/* fade-in animate the text leading into pricing info */}
          <ReactCSSTransitionGroup transitionName="fadeIn" transitionEnterTimeout={500} transitionLeaveTimeout={500}>
            {this.state.mounted ?
              <div style={{textAlign:"center", marginTop:"0px", color:"#FFFFFF", fontSize:"8vw"}}>
                {"looking for"}
              </div>
            :
              false
            }
          </ReactCSSTransitionGroup>
          {/* bounce-in animate the priceType */}
          <ReactCSSTransitionGroup transitionName="fadedBounceIn" transitionEnterTimeout={500} transitionLeaveTimeout={500}>
            {this.state.mounted ?
              <div className="panel b text-center" style={{marginLeft:"20px", marginRight:"20px", marginTop:"10px", backgroundColor:"#49A3DC", borderColor:"#FFFFFF"}}>
                <div className="panel-body">
                  <p className="h4" style={{color:"#FFFFFF", marginBottom:"10px", marginTop:"0px", fontSize:"8vw"}}>{price.text}</p>
                  <ButtonGroup>
                    <Button onClick={() => this.setPrice(PRICE_AFFORDABLE, priceAffordableText)} style={{backgroundColor: price.key == PRICE_AFFORDABLE ? "#FFFFFF" : "#49A3DC"}}><i className="fa fa-dollar" style={{color: price.key == PRICE_AFFORDABLE ? "#49A3DC" : "#FFFFFF", fontSize:"8vw"}}/></Button>
                    <Button onClick={() => this.setPrice(PRICE_AVERAGE, priceAverageText)} style={{backgroundColor: price.key == PRICE_AVERAGE ? "#FFFFFF" : "#49A3DC"}}><i className="fa fa-dollar" style={{color: price.key == PRICE_AVERAGE ? "#49A3DC" : "#FFFFFF", fontSize:"8vw"}}/><i className="fa fa-dollar" style={{color: price.key == PRICE_AVERAGE ? "#49A3DC" : "#FFFFFF", fontSize:"8vw"}}/></Button>
                    <Button onClick={() => this.setPrice(PRICE_QUALITY, priceQualityText)} style={{backgroundColor: price.key == PRICE_QUALITY ? "#FFFFFF" : "#49A3DC"}}><i className="fa fa-dollar" style={{color: price.key == PRICE_QUALITY ? "#49A3DC" : "#FFFFFF", fontSize:"8vw"}}/><i className="fa fa-dollar" style={{color: price.key == PRICE_QUALITY ? "#49A3DC" : "#FFFFFF", fontSize:"8vw"}}/><i className="fa fa-dollar" style={{color: price.key == PRICE_QUALITY ? "#49A3DC" : "#FFFFFF", fontSize:"8vw"}}/></Button>
                    <Button onClick={() => this.setPrice(PRICE_HIGH_END, priceHighEndText)} style={{backgroundColor: price.key == PRICE_HIGH_END ? "#FFFFFF" : "#49A3DC"}}><i className="fa fa-dollar" style={{color: price.key == PRICE_HIGH_END ? "#49A3DC" : "#FFFFFF", fontSize:"8vw"}}/><i className="fa fa-dollar" style={{color: price.key == PRICE_HIGH_END ? "#49A3DC" : "#FFFFFF", fontSize:"8vw"}}/><i className="fa fa-dollar" style={{color: price.key == PRICE_HIGH_END ? "#49A3DC" : "#FFFFFF", fontSize:"8vw"}}/><i className="fa fa-dollar" style={{color: price.key == PRICE_HIGH_END ? "#49A3DC" : "#FFFFFF", fontSize:"8vw"}}/></Button>
                  </ButtonGroup>
                </div>
              </div>
            :
              false
            }
          </ReactCSSTransitionGroup>
          {/* fade-in animate the businessType part of the form */}
          <ReactCSSTransitionGroup transitionName="fadeIn" transitionEnterTimeout={500} transitionLeaveTimeout={500}>
            {this.state.mounted ?

              <div style={{height:"50px", position:"relative", marginTop:"0px", width:"90%", marginLeft:"5%", position:"relative"}}>
                <TypeWriter ref="typer" delayMap={delays} typing={typing} fixed={true} onTypingEnd={this.typingEnd}>
                   <div style={{position:"absolute", width:"80%", marginLeft:"10%", zIndex:"0", fontSize:"25px", color:"#FFFFFF", fontWeight:"400px", textAlign:"center"}}>
                    {this.state.text}
                   </div>
                </TypeWriter>
                <FormControl 
                  type="text"
                  onClick={this.stopAnimating}
                  onChange={(e) => this.updateBusiness(e)}
                  value={this.state.business}
                  style={{backgroundColor:"rgba(0,0,0,0)", zIndex:"1", position:"absolute", fontSize:"25px", fontWeight:"400px", border:"solid thin #49A3DC", borderBottom:"solid thin #FFFFFF", color:"#FFFFFF"}}/>
              </div>
            :
              false
            }
          </ReactCSSTransitionGroup>
          {/* make the button appear on mount, no animation because animation wraps in a div that is not styled for flexbox */}
          {this.state.mounted ?
            <div style={{width:"100%", flexGrow:"1", paddingLeft:"20px", paddingRight:"20px", display:"flex", flexDirection:"column", justifyContent:"space-around"}}>
              <Button onClick={this.searchClick} style={{width:"100%", minHeight:"40px", backgroundColor:"#FFFFFF", color:"#49A3DC", fontSize:"7vw"}}>Find my perfect property</Button>
            </div>
          :
            false
          }
        </div>
      </div>
    );
  }
}

CP.contextTypes = {
  mixpanel: React.PropTypes.object.isRequired
};

export default CP;
