// builds and exports the Hono app
import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { authMiddleware } from './middleware/index.js';
import { app as usersRoute } from './routes/users.js';

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

app.get('/health', (c) => {
  return c.json({ message: 'Server is healthy' });
});

app.route('/users', usersRoute);

export default app;
