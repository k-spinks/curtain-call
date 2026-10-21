import * as jose from 'jose';
import { configs } from '../configs.js';

const extractJWT = (authString: string) => {
  if (!authString.startsWith('Bearer ')) {
    throw new Error('Invalid auth string');
  }
  // replace 'bearer' with nothing from authString and trim space
  const jwt = authString.replace('Bearer ', '').trim();

  return jwt;
};

const verifyJWT = async (jwt: string) => {
  if (!jwt) {
    throw new Error('No token provided');
  }
  // creates a key set
  const JWKS = jose.createRemoteJWKSet(
    new URL(`https://${configs.AUTH0_DOMAIN}/.well-known/jwks.json`),
  );

  // Extract payload from jose verification function
  const { payload } = await jose.jwtVerify(jwt, JWKS, {
    issuer: `https://${configs.AUTH0_DOMAIN}/`,
    audience: configs.AUTH0_AUDIENCE,
  });

  if (!payload.sub) {
    throw new Error('Token missing subject');
  }
  // Returns the subject from the payload object
  return payload.sub;
};

export { verifyJWT, extractJWT };
