import React from 'react';
import ReactDom from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import App from '../router/index';
import routeList from '../router/route-config';
import matchRoute from '../../share/match-route';
import proConfig from '../../share/pro-config'

function clientRender() {
    //初始数据
    let initialData = {};
    try {
        initialData = JSON.parse(document.getElementById('ssrTextInitData').value);
    } catch (error) {
        console.log('initialData 初始化失败');
    }

    //查找路由
    let matchResult = matchRoute(document.location.pathname, routeList);
    let { targetRoute } = matchResult;

    if (targetRoute) {
        //设置组件初始化数据
        targetRoute.initialData = initialData;

        if (targetRoute.component[proConfig.asyncComponentKey]) {
            targetRoute
                .component()
                .props.load()
                .then(res => {
                    //异步组件加载完成后再渲染页面
                    console.log('异步组件加完成');

                    //加载完成再执行 dom 挂载
                    renderDom(routeList);
                });
        } else {
            renderDom(routeList);
        }
    }

    function renderDom(routeList) {
        //渲染 index 组件 到页面
        ReactDom.hydrate(
            <BrowserRouter>
                <App routeList={routeList} />
            </BrowserRouter>,
            document.getElementById('root'),
        );
    }
}

clientRender();

if (process.env.NODE_ENV === 'development' && module.hot) {
    module.hot.accept();
}
