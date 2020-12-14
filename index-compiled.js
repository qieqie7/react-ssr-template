const React = require('react'); //组件


class Index extends React.Component {
  constructor(props) {
    super(props);
  }

  handlerClick() {
    alert('一起来玩 react ssr 啊');
  }

  render() {
    return /*#__PURE__*/React.createElement("h1", {
      onClick: this.handlerClick
    }, "click here!");
  }

} //node http 模块


const http = require('http'); //服务端渲染方法


const {
  renderToString
} = require('react-dom/server'); //创建服务


http.createServer((req, res) => {
  res.writeHead(200, {
    'Content-Type': 'text/html'
  }); //将组件转换为 html

  const html = renderToString( /*#__PURE__*/React.createElement(Index, null));
  res.end(`<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <title>传统 ssr</title>
        </head>
        <body>
            <div id="root">${html}</div>
        </body>
        </html>
`);
}).listen(9001); //服务监听9001端口