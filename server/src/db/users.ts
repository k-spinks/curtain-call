import { db } from './connection.js';
import type { User } from '../types/user.js';

const getUserByAuthId = async (auth0Id: string) => {
  const query = db<User>('users').where({ auth0_id: auth0Id }).first();

  return await query;
};

const createUser = async (auth0Id: string, name: string) => {
  const query = db<User>('users')
    .insert({
      name: name,
      created_on: db.fn.now(),
      auth0_id: auth0Id,
    })
    .returning('*');
  const [user] = await query;

  return user;
};

export { getUserByAuthId, createUser };
