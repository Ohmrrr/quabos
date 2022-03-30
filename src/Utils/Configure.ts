import { Config, Status, Type, StateSize } from '../Interfaces/Config';
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

    markov: {
      stateSize: config.markov.stateSize as StateSize,
      maxTries: config.markov.maxTries,
    },

    presence: {
      status: config.presence.status as Status,
      activity: config.presence.activity,
      type: config.presence.type as Type,
    }
  };
};
