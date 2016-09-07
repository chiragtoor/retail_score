import {default as React, Component} from "react";
import {Glyphicon,Modal, Button, FormGroup, ControlLabel, FormControl, InputGroup, Panel, Nav, NavItem, Badge} from "react-bootstrap";

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

const retailScore = 5;

export default class RetailScorePanel extends Component {

  constructor(props) {
    super(props);

    this.showDetails = this.showDetails.bind(this);
  }


  showDetails(businesses) {
    this.props.showBusinessDetails(businesses)
  }

  render () {


    var restaurants = [];
    var bars = [];
    var cafes = [];

    for(var i = 0; i < food.length; i++) {
      if(food[i].restaurant) {
        restaurants.push(food[i]);
      }
      if(food[i].cafe) {
        cafes.push(food[i]);
      }
      if(food[i].bar) {
        bars.push(food[i]);
      }
    }

    var clothingSales;
    var foodSales;
    var entertainmentSales;
    var stars;

    if(retailScore == 5) {
      stars = <span><em className="fa fa-star"></em><em className="fa fa-star"></em><em className="fa fa-star"></em><em className="fa fa-star"></em><em className="fa fa-star"></em></span>;
    } else if (retailScore == 4) {
      stars = <span><em className="fa fa-star"></em><em className="fa fa-star"></em><em className="fa fa-star"></em><em className="fa fa-star"></em></span>;
    } else if (retailScore == 3) {
      stars = <span><em className="fa fa-star"></em><em className="fa fa-star"></em><em className="fa fa-star"></em></span>;
    } else if (retailScore == 2) {
      stars = <span><em className="fa fa-star"></em><em className="fa fa-star"></em></span>;
    } else if (retailScore == 1) {
      stars = <span><em className="fa fa-star"></em></span>;
    }

    if(this.props.property.demographics && this.props.property.demographics.spending) {
     clothingSales = "$" + (this.props.property.demographics.spending.clothing/12).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
     foodSales = "$" + (this.props.property.demographics.spending.food/12).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
     entertainmentSales = "$" + (this.props.property.demographics.spending.entertainment/12).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    return (
      <div style={{height:"100%", width:"100%", marginTop:"10px", backgroundColor:"#FFFFFF"}}>
        <div className="row-masonry">
          <div className="col-masonry">
              <div className="panel b m0">
                 <div className="panel-heading">
                  <center>
                    <h3 className="media-heading m0 text-bold" style={{color:"#FFDF00"}}>{stars}</h3>
                  </center>
                 </div>
                 <div className="panel-body">
                    <center>
                      <h5 className="media-heading m0 text-bold">Within walking distance of this property:</h5>
                    </center>
                    <div onClick={e => this.showDetails(restaurants)} style={{height:"30px", backgroundColor:"#ecf0f1", fontSize:"16px"}}>
                     {restaurants.length} Restaurants
                    </div>
                    <div onClick={e => this.showDetails(bars)} style={{height:"30px", fontSize:"16px"}}>
                     {bars.length} Bars
                    </div>
                    <div onClick={e => this.showDetails(cafes)} style={{height:"30px", fontSize:"16px", backgroundColor:"#ecf0f1"}}>
                     {cafes.length} Cafes
                    </div>
                 </div>
              </div>
          </div>
        </div>       
      </div>
    );

  }
}