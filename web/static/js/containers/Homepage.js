import React from 'react';
import { connect } from "react-redux";

import ContentWrapper from '../components/Base/ContentWrapper';

class Homepage extends React.Component {
  render() {
    return (
      <ContentWrapper>
        <h1>Homepage</h1>
      </ContentWrapper>
    );
  }
}

export default Homepage;
