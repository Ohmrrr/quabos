import { Message, PermissionResolvable } from 'discord.js';
import { Quabos } from '../Structures/Quabos';

export interface Command {
  name: string;
  aliases: string[];
  description: string;
  usage: string;
  cooldown: number;
  userPermission: PermissionResolvable[];
  botPermission: PermissionResolvable[];
  execute(client: Quabos, message: Message, args: string[]): Promise<void>;
}
