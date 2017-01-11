import {default as React, Component} from "react";
import {Glyphicon,Modal, Button, FormGroup, ControlLabel, FormControl, InputGroup, Panel, Nav, NavItem, Badge} from "react-bootstrap";
import * as Actions from '../actions';

const isBrowser = typeof window !== 'undefined';


export default class DesktopRetailScorePanel extends Component {

  constructor(props) {
    super(props);
  }

  render () {

    var firstLabel;
    var secondLabel;
    var thirdLabel;

    var firstArr = [];
    var secondArr = [];
    var thirdArr = [];

    var retailScoreValue = 1;



    switch(this.props.scoreType) {
      case Actions.SCORE_FASHION:
        console.log("FASHION");
        var allBusinesses =  this.props.property.fashion_businesses ? this.props.property.fashion_businesses : {};;

        for(var i = 0; i < allBusinesses.length; i++) {
          if(allBusinesses[i].clothing_store) {
            console.log("Clothing");
            firstArr.push(allBusinesses[i]);
          }
          if(allBusinesses[i].shoe_store) {
            console.log("Shoe");
            secondArr.push(allBusinesses[i]);
          }
          if(allBusinesses[i].jewelry_store) {
            console.log("Jewelry");
            thirdArr.push(allBusinesses[i]);
          }
        }

        firstLabel = firstArr.length == 1 ? "Clothing Store" : "Clothing Stores";
        secondLabel = secondArr.length == 1 ? "Shoe Store": "Shoe Stores";
        thirdLabel = thirdArr.length == 1 ? "Jewelry Store" : "Jewelry Stores";

        var count = this.props.property.fashion_count ;

        console.log(this.props.property.fashion_count);

        if(count <= 1) {
          retailScoreValue = 1;
        } else if (count <= 3) {
          retailScoreValue = 2;
        } else if (count <= 7) {
          retailScoreValue = 3;
        } else if (count <= 22) {
          retailScoreValue = 4;
        } else {
          retailScoreValue = 5;
        }

        break;
      case Actions.SCORE_WELLNESS:
        console.log("WELLNESS");
        var allBusinesses = this.props.property.wellness_businesses ? this.props.property.wellness_businesses : {};

        for(var i = 0; i < allBusinesses.length; i++) {
          if(allBusinesses[i].beauty_salon) {
            firstArr.push(allBusinesses[i]);
          }
          if(allBusinesses[i].spa) {
            secondArr.push(allBusinesses[i]);
          }
          if(allBusinesses[i].hair_care) {
            thirdArr.push(allBusinesses[i]);
          }
        }

        firstLabel = firstArr.length == 1 ? "Beauty Salon" : "Beauty Salons";
        secondLabel = secondArr.length == 1 ? "Spa" : "Spas";
        thirdLabel = thirdArr.length == 1 ? "Hair Salon" : "Hair Salons";

        var count = this.props.property.wellness_count;

        if(count <= 3) {
          retailScoreValue = 1;
        } else if (count <= 6) {
          retailScoreValue = 2;
        } else if (count <= 10) {
          retailScoreValue = 3;
        } else if (count <= 18) {
          retailScoreValue = 4;
        } else {
          retailScoreValue = 5;
        }

        break;
      case Actions.SCORE_RESTAURANT:
        console.log("RESTAURANT");
        var allBusinesses = this.props.property.food_businesses ? this.props.property.food_businesses : {};

        for(var i = 0; i < allBusinesses.length; i++) {
          if(allBusinesses[i].restaurant) {
            firstArr.push(allBusinesses[i]);
          }
          if(allBusinesses[i].cafe) {
            secondArr.push(allBusinesses[i]);
          }
          if(allBusinesses[i].bar) {
            thirdArr.push(allBusinesses[i]);
          }
        }

        firstLabel = firstArr.length == 1 ? "Restaurant" : "Restaurants";
        secondLabel = secondArr.length == 1 ? "Cafe" : "Cafes";
        thirdLabel = thirdArr.length == 1 ? "Bar" : "Bars";

        var count = this.props.property.food_count;

        if(count <= 6) {
          retailScoreValue = 1;
        } else if (count <= 11) {
          retailScoreValue = 2;
        } else if (count <= 16) {
          retailScoreValue = 3;
        } else if (count <= 26) {
          retailScoreValue = 4;
        } else {
          retailScoreValue = 5;
        }

        break;
    }

    var stars;
    var text;

    if(retailScoreValue == 5) {
      stars = <span><em className="fa fa-star"></em><em className="fa fa-star"></em><em className="fa fa-star"></em><em className="fa fa-star"></em><em className="fa fa-star"></em></span>;
      text = "This is a great area for starting a retail business!"
    } else if (retailScoreValue == 4) {
      stars = <span><em className="fa fa-star"></em><em className="fa fa-star"></em><em className="fa fa-star"></em><em className="fa fa-star"></em></span>;
      text = "This is a very good area for starting a retail business!"
    } else if (retailScoreValue == 3) {
      stars = <span><em className="fa fa-star"></em><em className="fa fa-star"></em><em className="fa fa-star"></em></span>;
      text = "This is a good area for starting a retail business!"
    } else if (retailScoreValue == 2) {
      stars = <span><em className="fa fa-star"></em><em className="fa fa-star"></em></span>;
      text = "You may have to work to drive traffic to this location"
    } else if (retailScoreValue == 1) {
      stars = <span><em className="fa fa-star"></em></span>;
      text = "You will have to work to drive traffic to this location"
    }

    return (
      <div style={{height:"100%", width:"100%", marginTop:"10px"}}>
        <div className="row-masonry">
          <div className="col-masonry">
            <div className="panel b m0">
              <div className="panel-heading">
                <div className="media mt0">
                  <center>
                    <h2 style={{color:"#E6C200"}} className="media-heading m0 text-bold">{stars}</h2>
                    <h3>{text}</h3>
                  </center>
                </div>
              </div>
            </div>
          </div>
        </div>       
      </div>
    );

  }
}