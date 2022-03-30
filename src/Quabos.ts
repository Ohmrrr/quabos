import {
  Client,
  Collection,
  Message,
  MessageEmbed,
  MessageEmbedOptions,
} from 'discord.js';
import { Config } from './Interfaces/Config';
import { Command } from './Interfaces/Command';
import path from 'path';
import fs from 'fs';

export class Quabos extends Client {
  public name: string;
  public owners: string[];
  public prefix: string;
  public config: Config;
  public commands: Collection<string, Command> = new Collection();

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

    this.on('messageCreate', (message: Message) => {
      if (!message.guild) return;
      if (!message.guild.available) return;
      if (message.author.bot) return;

      if (!message.content.startsWith(this.prefix)) return;

      const args = message.content.slice(this.prefix.length).split(/ +/);
      const target = args[0].toLowerCase();

      const command =
        this.commands.get(target) ??
        this.commands.find((cmd) => cmd.aliases.includes(target));
      if (!command) return;

      const clientPermission = message.member?.permissions.has(
        command.userPermission,
        true
      );
      if (!clientPermission) return;

      const botPermission = message.guild.me?.permissions.has(
        command.botPermission,
        true
      );
      if (!botPermission) return;

      command.execute(this, message, args);
    });
  }

  public async init() {
    await this.login(this.config.token);

    const commandDir = path.join(__dirname, 'Commands');

    fs.readdirSync(commandDir)
      .filter((file) => file.endsWith('.js'))
      .forEach(async (file) => {
        const { default: defaultExport } = await import(
          `${commandDir}/${file}`
        );
        const cmd = defaultExport as Command;
        this.commands.set(cmd.name, cmd);
      });
  }

  public embed(options: MessageEmbedOptions): MessageEmbed {
    return new MessageEmbed({ ...options });
  }
}
