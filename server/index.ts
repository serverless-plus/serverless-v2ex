import { join } from 'path';
import Next from 'next';
import Express, { Request, Response } from 'express';
import Cache from './cache';
import { ParsedUrlQuery } from 'querystring';

const dev = process.env.NODE_ENV !== 'production';
const port = parseInt(process.env.PORT as string, 10) || 8000;

const app = Next({ dev });
const handle = app.getRequestHandler();

function getCacheKey(req: Request) {
  return `${req.url}`;
}
async function cacheRender(req: Request, res: Response) {
  const key = getCacheKey(req);
  const reqPath = req.path;
  if (Cache.has(key)) {
    res.setHeader('X-Cache', 'HIT');

    return res.send(Cache.get(key));
  }

  try {
    const html = await app.renderToHTML(
      req,
      res,
      reqPath,
      req.query as ParsedUrlQuery,
    );

    if (res.statusCode !== 200) {
      res.send(html);
    } else {
      res.setHeader('X-Cache', 'MISS');

      Cache.set(key, html);
      res.send(html);
    }
  } catch (err) {
    res.statusCode = 500;
    app.renderError(err, req, res, reqPath, req.query as ParsedUrlQuery);
  }
}

async function startServer() {
  await app.prepare();

  const server = Express();
  server.use(Express.static(join(__dirname, '../public/static')));

  server.get('/', async (req, res) => {
    return cacheRender(req, res);
  });

  server.get('/about', async (req, res) => {
    return cacheRender(req, res);
  });

  server.get('*', (req, res) => {
    // @ts-ignore
    req['__SLS_NO_REPORT__'] = true;
    return handle(req, res);
  });

  // define binary type for response
  // if includes, will return base64 encoded, very useful for images
  // @ts-ignore
  server['binaryTypes'] = ['*/*'];

  return server;
}

if (process.env.SERVERLESS) {
  module.exports = startServer;
} else {
  try {
    startServer().then((server) => {
      server.listen(port, () => {
        console.log(`> Ready on http://localhost:${port}`);
      });
    });
  } catch (e) {
    throw e;
  }
}

process.on('unhandledRejection', (e) => {
  throw e;
});
