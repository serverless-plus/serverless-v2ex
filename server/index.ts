import { join } from 'path';
import Next from 'next';
import Express, { Request, Response } from 'express';
import { ParsedUrlQuery } from 'querystring';
import cacheableResponse from 'cacheable-response';

const dev = process.env.NODE_ENV !== 'production';
const port = parseInt(process.env.PORT as string, 10) || 8000;

const app = Next({ dev });
const handle = app.getRequestHandler();

type CacheOptions = {
  req: Request;
  res: Response;
};

const ssrCache = cacheableResponse({
  ttl: 1000 * 60 * 60, // 1hour
  get: async ({ req, res }: CacheOptions) => {
    const data = await app.render(req, res, req.path, {
      ...(req.query as ParsedUrlQuery),
      ...req.params,
    });

    // Add here custom logic for when you do not want to cache the page, for
    // example when the page returns a 404 status code:
    if (res.statusCode === 404) {
      res.end(data);
      return null;
    }

    return null;
  },
  send: ({ data, res }) => res.send(data),
});

async function startServer() {
  await app.prepare();

  const server = Express();
  server.use(Express.static(join(__dirname, '../public/static')));

  server.get('/', async (req, res) => {
    return ssrCache({ req, res });
  });

  server.get('/about', async (req, res) => {
    return ssrCache({ req, res });
  });

  server.get('/topic', async (req, res) => {
    return ssrCache({ req, res });
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
