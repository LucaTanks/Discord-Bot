import {Client as DiscordClient, Collection} from 'discord.js';
import { GatewayIntentBits, Routes } from 'discord-api-types/v9';
import Logger from './Services/LogService';
import {REST} from "@discordjs/rest";
import {Envuments} from 'envuments';
import {Command} from "./Types/Command";
import {readdirSync} from "fs";


export default class Client extends DiscordClient {
    commands: Collection<string, Command>
    logger = Logger.getLogger("Client");

    constructor() {
        super({
            intents: [
                GatewayIntentBits.Guilds,
                GatewayIntentBits.GuildMessages,
                GatewayIntentBits.GuildMessageReactions,
            ]
        });

        this.commands = new Collection();
        this.logger.level = Envuments.get("LOG_LEVEL", "debug");
    }

    private loadEvents() {
        this.logger.debug("Loading events...");
        const eventFiles = readdirSync("build/Events").filter(file => file.endsWith(".js"));

        for(const file of eventFiles) {
            const newEvent = require(`./Events/${file}`).default;
            const event = new newEvent(this);
            this.logger.debug(`Loaded ${event.name} event`);

            this.on(event.name, (...args: unknown[]) => {
                event.run(args);
            });
        }
        this.logger.info(`Loaded ${eventFiles.length} events!`);
    }

    private loadCommands() {
        this.logger.debug("Loading commands...");
        const commandFiles = readdirSync("build/Commands").filter(file => file.endsWith(".js"));
        const slashCommands = [];

        for(const file of commandFiles) {
            const newCommand = require(`./Commands/${file}`).default;
            const command = new newCommand(this);
            this.logger.debug(`Loaded ${command.name} command`);

            slashCommands.push(command.data.toJSON()) // Deploy the command
            this.commands.set(command.name, command);
        }
        const rest = new REST({version: '9'}).setToken(Envuments.get("BOT_TOKEN")); // Create a new REST client
        rest.put(Routes.applicationGuildCommands(Envuments.get("CLIENT_ID"), Envuments.get("GUILD_ID")), {body: slashCommands})
            .then(() => this.logger.info(`Loaded ${slashCommands.length} commands!`))
            .catch(console.error);
    }

    async start() {
        this.loadEvents();
        this.loadCommands();

        await this.login(Envuments.get("BOT_TOKEN"))
            .catch(error => {
                this.logger.fatal("Failed to log in")
                this.logger.error(error);
            });
    }
}
