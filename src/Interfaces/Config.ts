type Type = 'PLAYING' | 'LISTENING' | 'WATCHING' | 'STREAMING' | 'COMPETING';
type StateSize = 1 | 2 | 3;

export interface Config {
  name: string;
  owners: string[];
  prefix: string;
  token: string;
  markov: Markov;
  presence: Presence;
}

interface Presence {
  status: string;
  activity: string;
  type: Type;
}

interface Markov {
  stateSize: StateSize;
  maxTries: number;
}