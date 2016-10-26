import React from 'react';

export default class AppBar extends React.Component {

  constructor(props) {
    super(props);

  }

  render() {
    const shadowStyle = {backgroundColor:"#49A3DC", paddingTop:"5px", paddingBottom:"5px", boxShadow:"0px 1px 3px 1px #7f8c8d", position:"relative", zIndex:"10"};
    const noShadowStyle = {backgroundColor:"#49A3DC", paddingTop:"5px", paddingBottom:"5px", position:"relative", zIndex:"10"};
    return(
      <div className={this.props.className} style={this.props.noShadow ? noShadowStyle : shadowStyle}>
        <img style={{height:"45px", marginLeft:"15px"}} src="https://s3-us-west-2.amazonaws.com/homepage-image-assets/retail_score_logo_white.png" />
      </div>
    );
  }
}
