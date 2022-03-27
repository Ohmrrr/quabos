import { Client } from 'discord.js';
import { Config } from './Interfaces/Config';

export class Quabos extends Client {
  public name: string;
  public owners: string[];
  public prefix: string;
  public config: Config;

  constructor(config: Config) {
    super({
      intents: 32767,
      allowedMentions: {
        parse: ['users', 'roles'],
      },
    });

    this.name = config.name;
    this.owners = config.owners;
    this.prefix = config.prefix;
    this.config = config;

    this.once('ready', () => {
      console.log(`${this.name} is ready. Logged in as ${this.user?.tag}`);
    });
  }

  public async init() {
    await this.login(this.config.token);
  }
}
