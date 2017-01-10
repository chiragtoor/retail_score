import {default as React, Component} from "react";
import {Glyphicon,Modal, Button, FormGroup, ControlLabel, FormControl, InputGroup, Panel, Nav, NavItem, Badge} from "react-bootstrap";
import * as Actions from '../actions';

const isBrowser = typeof window !== 'undefined';

const food = [
 {name : "Papa John's Pizza", street_address: "3970 Sepulveda Blvd, Culver City, CA 90230, USA", phone_number: "(310) 636-1600", website : "https://www.papajohns.com/", restaurant : true, bar: false, cafe: false, beauty_salon: false, spa: false, hair_care: false},
 {name : "Panda Express", street_address: "3812 Midway Ave, Culver City, CA 90232, USA", phone_number: "(310) 253-9827", website : "http://www.pandaexpress.com/", restaurant : true, bar: false, cafe: false, beauty_salon: false, spa: false, hair_care: false},
 {name : "Pampas Grill", street_address: "3850 Main St, Culver City, CA 90232, USA", phone_number: "(310) 836-0080", website : "http://www.pampas-grill.com/", restaurant : true, bar: false, cafe: false, beauty_salon: false, spa: false, hair_care: false},
 {name : "Pieology Pizzeria", street_address: "3812 Midway Ave, Culver City, CA 90232, USA", phone_number: "(310) 280-9810", website : "http://locations.pieology.com/ca/culver-city/3850-main-street.html", restaurant : true, bar: false, cafe: false, beauty_salon: false, spa: false, hair_care: false},
 {name : "Govinda's ", street_address: "3764 Watseka Ave, Los Angeles, CA 90034, USA", phone_number: "(310) 836-1269", website : "http://www.govindasla.com/", restaurant : true, bar: false, cafe: false, beauty_salon: false, spa: false, hair_care: false},
 {name : "Casa Oaxaca", street_address: "9609 Venice Blvd, Culver City, CA 90232, USA", phone_number: "(310) 838-3000", website : "http://www.casaoaxacala.com/", restaurant : true, bar: false, cafe: false, beauty_salon: false, spa: false, hair_care: false},
 {name : "ArcLight Cinemas - Culver City", street_address: "9500 Culver Blvd, Culver City, CA 90232, USA", phone_number: "(310) 559-2416", website : "http://www.arclightcinemas.com/", restaurant : false, bar: true, cafe: false, beauty_salon: false, spa: false, hair_care: false},
 {name : "George Petrelli Famous Steakhouse", street_address: "5615 Sepulveda Blvd, Culver City, CA 90230, USA", phone_number: "(310) 397-1438", website : "http://www.georgepetrellisteaks.com/", restaurant : true, bar: true, cafe: false, beauty_salon: false, spa: false, hair_care: false},
 {name : "Old Man Bar", street_address: "12517 W Washington Blvd, Los Angeles, CA 90066, USA", phone_number: "(310) 391-4222", restaurant : false, bar: true, cafe: false, beauty_salon: false, spa: false, hair_care: false},
 {name : "Café Brasil", street_address: "10831 Venice Blvd, Los Angeles, CA 90034, USA", phone_number: "(310) 837-8957", website : "http://www.cafe-brasil.com/", restaurant : false, bar: false, cafe: true, beauty_salon: false, spa: false, hair_care: false},
 {name : "Cafe Surfas", street_address: "8777 Washington Blvd, Culver City, CA 90232, USA", phone_number: "(310) 558-1458", website : "http://www.surfasonline.com/", restaurant : false, bar: false, cafe: true, beauty_salon: false, spa: false, hair_care: false}
];

export default class RetailScorePanel extends Component {

  constructor(props) {
    super(props);

    this.showDetails = this.showDetails.bind(this);
  }


  showDetails(businesses, label) {
    this.props.showBusinessDetails(businesses, label)
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

        var allBusinesses =  this.props.property.fashion_businesses ? this.props.property.fashion_businesses : {};;

        for(var i = 0; i < allBusinesses.length; i++) {
          if(allBusinesses[i].clothing_store) {
            firstArr.push(allBusinesses[i]);
          }
          if(allBusinesses[i].shoe_store) {
            secondArr.push(allBusinesses[i]);
          }
          if(allBusinesses[i].jewelry_store) {
            thirdArr.push(allBusinesses[i]);
          }
        }

        firstLabel = firstArr.length == 1 ? "Clothing Store" : "Clothing Stores";
        secondLabel = secondArr.length == 1 ? "Shoe Store": "Shoe Stores";
        thirdLabel = thirdArr.length == 1 ? "Jewelry Store" : "Jewelry Stores";

        var count = this.props.property.fashion_count ;

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

    if(retailScoreValue == 5) {
      stars = <span><em className="fa fa-star"></em><em className="fa fa-star"></em><em className="fa fa-star"></em><em className="fa fa-star"></em><em className="fa fa-star"></em></span>;
    } else if (retailScoreValue == 4) {
      stars = <span><em className="fa fa-star"></em><em className="fa fa-star"></em><em className="fa fa-star"></em><em className="fa fa-star"></em></span>;
    } else if (retailScoreValue == 3) {
      stars = <span><em className="fa fa-star"></em><em className="fa fa-star"></em><em className="fa fa-star"></em></span>;
    } else if (retailScoreValue == 2) {
      stars = <span><em className="fa fa-star"></em><em className="fa fa-star"></em></span>;
    } else if (retailScoreValue == 1) {
      stars = <span><em className="fa fa-star"></em></span>;
    }

    return (
      <div style={{height:"100%", width:"100%", marginTop:"10px", backgroundColor:"#FFFFFF"}}>
        <div className="row-masonry">
          <div className="col-masonry">
              <div className="panel b m0">
                  <center>
                    <h3 className="media-heading m0 text-bold" style={{color:"#E6C200"}}>{stars}</h3>
                  </center>
                 <div className="panel-body">
                    <center>
                      <div style={{marginTop:"0px", fontSize:"16px"}} className="media-heading m0 text-bold">Within walking distance:</div>
                    </center>
                    <div style={{height:"40px", backgroundColor:"#ecf0f1", fontSize:"16px"}}>
                     <span style={{float:"left", marginLeft:"5px"}}>{firstArr.length} {firstLabel}</span>
                    </div>
                    <div style={{height:"40px", fontSize:"16px"}}>
                     <span style={{float:"left", marginLeft:"5px"}}>{secondArr.length} {secondLabel}</span>
                    </div>
                    <div style={{height:"40px", fontSize:"16px", backgroundColor:"#ecf0f1"}}>
                     <span style={{float:"left", marginLeft:"5px"}}>{thirdArr.length} {thirdLabel}</span>
                    </div>
                 </div>
              </div>
          </div>
        </div>       
      </div>
    );

  }
}