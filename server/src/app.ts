// builds and exports the Hono app
import { Hono } from 'hono';
import { cors } from 'hono/cors';

// Creates new instance of a server
const app = new Hono();

// CORS middleware
app.use(
  '/*',
  cors({
    origin: 'http://localhost:5173',
  }),
);

app.get('/', (c) => {
  return c.json({ message: 'Server is running!' });
});

export default app;
