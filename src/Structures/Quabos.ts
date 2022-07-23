import { Client } from 'discord.js';

export default class Quabos extends Client {
  constructor() {
    super({
      intents: ['GUILDS', 'GUILD_MEMBERS', 'GUILD_MESSAGES'],
    });
  }

  public init() {
    this.login();
  }
}
