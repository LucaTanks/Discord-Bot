import {SlashCommandBuilder, CommandInteraction} from "discord.js";
import Embeds from "../Services/EmbedService";
import {Command} from "../Types/Command";


export default class Ping extends Command {
    name = "ping";
    description = "Pong!";
    data = new SlashCommandBuilder()
        .setName(this.name)
        .setDescription(this.description);

    run = async (interaction: CommandInteraction): Promise<void> => {
        const embed = Embeds.info("Pong!", `My latency is ${interaction.client.ws.ping}ms`);
        await interaction.reply({embeds: [embed], ephemeral: true});
    }
}