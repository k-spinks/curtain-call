// const required = [
//   'POSTGRES_HOST',
//   'POSTGRES_PORT',
//   'POSTGRES_DB',
//   'POSTGRES_USER',
//   'POSTGRES_PASSWORD',
//   'AUTH0_DOMAIN',
//   'AUTH0_AUDIENCE',
//   'TICKETMASTER_API_KEY',
// ];

// const missing = required.filter((name) => !process.env[name]);

// if (missing.length > 0) {
//   throw new Error(
//     `Missing required environment variables: ${missing.join(', ')}`,
//   );
// }

export const configs = {
  SERVER_PORT: process.env.SERVER_PORT,
  SERVER_HOST: process.env.SERVER_HOST,
  POSTGRES_HOST: process.env.POSTGRES_HOST,
  POSTGRES_PORT: process.env.POSTGRES_PORT,
  POSTGRES_DB: process.env.POSTGRES_DB,
  POSTGRES_USER: process.env.POSTGRES_USER,
  POSTGRES_PASSWORD: process.env.POSTGRES_PASSWORD,
  REDIS_HOST: process.env.REDIS_HOST,
  REDIS_PORT: process.env.REDIS_PORT,
  AUTH0_DOMAIN: process.env.AUTH0_DOMAIN,
  AUTH0_AUDIENCE: process.env.AUTH0_AUDIENCE,
  TICKETMASTER_API_KEY: process.env.TICKETMASTER_API_KEY,
  TICKETMASTER_BASE_URL: process.env.TICKETMASTER_BASE_URL,
};
