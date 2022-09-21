import {Message as DiscordMessage} from "discord.js";
import {Event} from "../Types/Event";


export default class MessageCreate extends Event {
    public readonly name: string = "messageCreate";

    run = async (message: DiscordMessage[]): Promise<DiscordMessage> => {
        const [msg] = message;

        if (msg.author.bot) return;
    }
}
