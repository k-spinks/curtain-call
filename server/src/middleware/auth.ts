// Middleware for authorizing a user with a jwt
import type { Context, Next } from 'hono';
import { extractJWT, verifyJWT } from './jwtHelper.js';

const authMiddleware = async (
  c: Context<{ Variables: { authId: string } }>,
  next: Next,
) => {
  // capture auth header from context
  const authHeader = c.req.header('Authorization');

  // guard if auth header is not present
  if (!authHeader) {
    return c.json({ message: 'Cannot authorize user' }, 401);
  }
  // try to extract and verify jwt
  try {
    const jwt = extractJWT(authHeader);
    const jwtSubject = await verifyJWT(jwt);
    if (!jwtSubject) {
      throw new Error();
    }
    c.set('authId', jwtSubject);
  } catch (e) {
    // return unauthorized if we cannot verify
    return c.json({ message: 'Cannot verify user' }, 401);
  }
  await next();
};

export { authMiddleware };
