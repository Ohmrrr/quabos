export type Status = 'online' | 'idle' | 'dnd' | 'invisible';
export type Type = 'PLAYING' | 'LISTENING' | 'WATCHING' | 'STREAMING' | 'COMPETING';
export type StateSize = 1 | 2 | 3;

export interface Config {
  name: string;
  owners: string[];
  prefix: string;
  token: string;
  markov: Markov;
  presence: Presence;
}

interface Presence {
  status: Status;
  activity: string;
  type: Type;
}

interface Markov {
  stateSize: StateSize;
  maxTries: number;
}