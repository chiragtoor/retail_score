import {default as React, Component} from "react";

export default class RetailScorePanel extends Component {

  constructor(props) {
    super(props);
  }

  render () {
    var retailScoreValue = 1;

    var count = this.props.property.fashion_count;
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

    var stars = <span><em className="fa fa-star"></em></span>;
    var text = "You will have to work to drive traffic to this location";

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