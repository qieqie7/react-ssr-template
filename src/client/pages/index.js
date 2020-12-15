import React from 'react';
import tempData from './data';

export default class Index extends React.Component {
  static async getInitialProps() {
    //模拟数据请求方法
    const fetchData = () => {
      return new Promise(resolve => {
        setTimeout(() => {
          resolve({
            code: 0,
            data: tempData,
          });
        }, 100);
      });
    };

    let res = await fetchData();

    return res;
  }

  constructor(props) {
    super(props);
    console.log(props)
    props.initialData = (props.staticContext && props.staticContext.initialData) || {};
    this.state = props.initialData;
  }

  handlerClick() {
    alert('一起来玩 react ssr 啊111');
  }

  render() {
    const { code, data } = this.state;
    return (
      <>
        <h1 onClick={this.handlerClick}>click here!</h1>
        <div>
          {data &&
            data.map((item, index) => {
              return (
                <div key={index}>
                  <h3>{item.title}</h3>
                  <p>{item.desc}</p>
                </div>
              );
            })}
          {!data && <div>暂无数据</div>}
        </div>
      </>
    );
  }
}
