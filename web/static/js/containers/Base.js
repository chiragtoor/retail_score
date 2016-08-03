import React from 'react';

class Base extends React.Component {
  render() {
    return (
      <div className="wrapper">
        {React.cloneElement(this.props.children, {
          key: Math.random()
        })}
      </div>
    );
  }
}

export default Base;