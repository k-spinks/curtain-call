import { Hono } from 'hono';
import { findOrCreateUser } from '../services/index.js';
import { authMiddleware } from '../middleware/auth.js';
const app = new Hono<{ Variables: { authId: string } }>();

app.post('/me', authMiddleware, async (c) => {
  const id = c.get('authId');
  const { name } = await c.req.json();

  try {
    const user = await findOrCreateUser(id, name);
    return c.json({ message: 'Success', user: user }, 200);
  } catch (e) {
    return c.json({ message: 'Failed to auth' }, 500);
  }
});

export { app };
