import { EmbedBuilder, ColorResolvable } from 'discord.js';
import {Envuments} from "envuments";

export default class Embeds {

    private static base(title: string, description: string, color: ColorResolvable) {
        return new EmbedBuilder()
            .setTitle(title)
            .setDescription(description)
            .setColor(color)
            .setTimestamp();
    }

    static info(title: string, description: string, color: ColorResolvable = "#0099ff") {
        return Embeds.base(title, description, color);
    }

    static error(title: string, description: string, color: ColorResolvable = "#ff0000") {
        return Embeds.base('<a:no:877286928922337401> ' + title, description, color);
    }

    static success(title: string, description: string, color: ColorResolvable = "#00ff00") {
        return Embeds.base('<a:yes:877286929715036170> ' + title, description, color);
    }

}