import Client from "../Client";


export abstract class Event {
    client: Client;
    public name: string;
    abstract run: (args?: unknown) => void;

    protected constructor(client: Client) {
        this.client = client;
    }
}