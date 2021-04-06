import React from 'react';
import DataInitial from '../../components/DataInitial/DataInitial';
import tempData from './data';

class Index extends React.Component {
    static async getInitialProps() {
        //模拟数据请求方法
        const fetchData = () => {
            console.log('List fetchData')
            return new Promise(resolve => {
                setTimeout(() => {
                    resolve({
                        code: 0,
                        data: tempData,
                    });
                }, 1000);
            });
        };

        let res = await fetchData();

        return {
            fetchData: res,
            page: {
                tdk: {
                    title: '列表页 - react ssr',
                    keywords: '前端技术江湖',
                    description: '关键词',
                },
            },
        };
    }

    render() {
        const {fetchData,page} = this.props.initialData;
        const { code, data } = fetchData||{};

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

export default DataInitial(Index);
