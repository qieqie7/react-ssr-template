import React from 'react';
import { renderToString } from 'react-dom/server';
import Index from '../../client/pages/index';

export default (ctx, next) => {
  const html = renderToString(<Index />);
  ctx.body = `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>my react ssr</title></head><body><div id="root">${html}</div><script type="text/javascript" src="index.js"></script></body></html>`;

  return next();
};
