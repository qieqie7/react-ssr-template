import React from 'react';
import AsyncLoader from './async-loader';

function pageNotFound() {
    return <div>404页面</div>;
}

export default [
    {
        path: ['/', '/index'],
        component: AsyncLoader(() => import('../pages/index')),
        exact: true,
    },
    {
        path: '/list',
        component: AsyncLoader(() => import('../pages/list')),
        exact: true,
    },
    {
        path: '*',
        component: pageNotFound,
        exact: true,
    },
];
