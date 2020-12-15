import React from 'react';

export default class List extends React.Component {
  constructor(props) {
    super(props);
  }

  handlerClick() {
    alert('这里是列表页');
  }

  render() {
    return <h1 onClick={this.handlerClick}>这里是列表页</h1>;
  }
}
