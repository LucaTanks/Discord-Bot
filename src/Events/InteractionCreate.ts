import { CommandInteraction, Interaction } from "discord.js";
import Embeds from "../Services/EmbedService";
import { Event } from "../Types/Event";


export default class InteractionCreate extends Event {
    public readonly name = "interactionCreate";

    run = (interaction: Interaction[]): Promise<void> => {
        const [int] = interaction;
        if (!int.isCommand()) return;

        const commandInteraction = int as CommandInteraction;
        const { commandName } = commandInteraction;
        const command = this.client.commands.get(commandName);
        try {
            command.run(commandInteraction);
        } catch (error) {
            this.client.logger.error(error);
            const embed = Embeds.error("Error", "There was an error while running the command.");

            int.reply({ embeds: [embed], ephemeral: true });
        }
    };
}