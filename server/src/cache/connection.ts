import { createClient } from 'redis';
import { configs } from '../configs.ts';

const client = createClient({
  socket: {
    reconnectStrategy: (retries) => {
      if (retries > 3) {
        return new Error(
          'Max Redis reconnection attempts reached. Giving up...',
        );
      }
      return 2000; // wait 2 seconds between retries
    },
  },
  url: `redis://${configs.REDIS_HOST}:${configs.REDIS_PORT}`,
});

client.on('error', (err) => console.log('Redis Client Error', err));

try {
  await client.connect();
} catch (error) {
  // Redis is optional: warn and keep going without a cache
  console.warn('Redis unavailable, continuing without cache:', error);
}

export { client };
