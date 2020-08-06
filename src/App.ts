import Express, { Application } from 'express';

export class Server {

    private App: Application;

    constructor(private port: string) {
        this.App = Express();
        this.Settings();
    }

    private Settings(): void {
        this.App.set('port', this.port);
    }

    public StartServer(): void {
        this.App.listen(this.App.get('port'));
        console.log('Everything OK');
    }
}