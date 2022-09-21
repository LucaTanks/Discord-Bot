import { SlashCommandBuilder } from '@discordjs/builders';
import { CommandInteraction } from 'discord.js';
import Client from '../Client';


export abstract class Command {
    client: Client;
    public name: string;
    public description: string;
    abstract data: Omit<SlashCommandBuilder, "addSubcommand" | "addSubcommandGroup">
    abstract run: (interaction: CommandInteraction) => Promise<void>;

    protected constructor(client: Client) {
        this.client = client;
    }
}