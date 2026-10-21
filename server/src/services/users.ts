import { getUserByAuthId, createUser } from '../db/index.js';

const findOrCreateUser = async (auth0Id: string, name: string) => {
  const user = await getUserByAuthId(auth0Id);
  if (!user) {
    const newUser = await createUser(auth0Id, name);
    return newUser;
  }
  return user;
};

export { findOrCreateUser };
