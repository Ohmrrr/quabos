import { Config } from '../Interfaces/Config';
import * as config from '../Data/config.json';
import dotenv from 'dotenv';

dotenv.config();

export const Configure = (): Config => {
  if (!process.env.TOKEN) {
    throw new Error('TOKEN environment variable missing.');
  }

  return {
    name: config.name,
    owners: config.owners,
    prefix: config.prefix,
    token: process.env.TOKEN,
  };
};
