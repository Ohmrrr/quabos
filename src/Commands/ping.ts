import { Command } from '../Interfaces/Command';

const ping: Command = {
  name: 'ping',
  aliases: ['pong'],
  description: "Sends the client's ping to the channel.",
  usage: 'ping',
  cooldown: 5000,
  userPermission: ['SEND_MESSAGES'],
  botPermission: ['SEND_MESSAGES'],

  execute: async (client, message, args) => {
    const response = args[0].toLowerCase() === 'pong' ? 'Pong' : 'Ping';

    const msg = await message.channel.send(`${response}: | **WS**: `);
    const ping = msg.createdTimestamp - message.createdTimestamp;

    msg.edit(`${response}: ${ping}ms | **WS**: ${client.ws.ping}ms`);
  },
};

export default ping;
