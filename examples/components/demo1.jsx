import React from 'react';
const propTypes = {
	name:React.PropTypes.string,
}
const defaultProps = {
	name:'Hello World'
}


class DEMO1 extends React.Component {
  render() {
    return (
      <h1>{this1.props.name}</h1>
    );
  }
}
// function DEMO1() {
//   return <h1>Hello World</h1>;
// }
DEMO1.propTypes = propTypes;
DEMO1.defaultProps = defaultProps;
export default DEMO1;
