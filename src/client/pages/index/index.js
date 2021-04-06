import React from 'react';
import DataInitial from '../../components/DataInitial/DataInitial';
import './index.less';

function Index(props) {
    function handlerClick() {
        alert('一起来玩 react ssr 啊111');
    }

    return <h1 onClick={handlerClick}>click here!1213</h1>;
}

Index.getInitialProps = ctx => {
    return {
        page: {
            tdk: {
                title: '首页 - koa-react-ssr',
                keywords: '关键词 - koa-react-ssr',
                description: '描述',
            },
        },
    };
};

export default DataInitial(Index);
