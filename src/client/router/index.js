import Layout from '../app/layout';
import React from 'react';
import { Route, Switch, BrowserRouter, Redirect } from 'react-router-dom';

function Page404() {
  return <div>404拉 </div>;
}

//服务端也会用到所以通过参数的方式将配置传递进来
function App({ routeList }) {
  return (
    <Layout>
      <Switch>
        {routeList.map(item => {
          return item.initialData ? (
            <Route
              key={item.path}
              exact={item.exact}
              path={item.path}
              render={props => {
                return <item.component {...props} initialData={item.initialData}></item.component>;
              }}></Route>
          ) : (
            <Route key={item.path} {...item}></Route>
          );
        })}
        <Route to="*" component={Page404}></Route>
      </Switch>
    </Layout>
  );
}

export default App;
