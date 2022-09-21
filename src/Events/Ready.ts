import { Event } from "../Types/Event";


export default class Ready extends Event {
    public readonly name: string = "ready";

    run = async (): Promise<void> => {
        this.client.logger.info(`${this.client.user.tag} is online!`);
    }
}
