import {default as React, Component} from "react";


export default class HomepageTile extends Component {
  render () {
    return (
      <div className="homepageTile-container" onClick={e => this.props.onClick(e, this.props.city)}>
        <div className="homepageTile">
          <h3 className="homepageTileText" >{this.props.city}</h3>
        </div>
        <img className="homepageTileImage" src={this.props.img} />
      </div>
    );
  }
}