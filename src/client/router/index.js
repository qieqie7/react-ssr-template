import Layout from '../app/layout';
import React from 'react';
import { Route, Switch, BrowserRouter, Redirect } from 'react-router-dom';

function Page404() {
    return <div>404拉 </div>;
}

//服务端也会用到所以通过参数的方式将配置传递进来
const App = ({ routeList }) => (
    <Layout>
        <Switch>
            {routeList.map(item =>
                item.initialData ? (
                    <Route
                        key={item.path}
                        exact={item.exact}
                        path={item.path}
                        render={props => <item.component {...props} initialData={item.initialData} />}
                    />
                ) : (
                    <Route key={item.path} {...item} />
                ),
            )}
            <Route to="*" component={Page404} />
        </Switch>
    </Layout>
);

export default App;
