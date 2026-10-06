// imports app, calls serve() from @hono/node-server
import { serve } from '@hono/node-server';
import app from './app.js';
import { configs } from './configs.js';

serve(
  {
    fetch: app.fetch,
    port: Number(configs.SERVER_PORT),
    hostname: configs.SERVER_HOST,
  },
  (info) => {
    console.log(info);
    console.log(`Server is running on http://${info.address}:${info.port}`);
  },
);
