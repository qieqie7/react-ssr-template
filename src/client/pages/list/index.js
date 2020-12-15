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
    let initialData = props.staticContext ? props.staticContext.initialData : props.initialData;
    this.state = initialData;
  }

  render() {
    const { code, data } = this.state;

    return (
      <>
        <h1>这里是列表页</h1>
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
