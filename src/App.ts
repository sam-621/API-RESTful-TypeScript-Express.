import Express, { Application } from 'express';
import morgan from 'morgan';

export class Server {

    private App: Application;

    constructor(private port: string) {
        this.App = Express();
        this.Settings();
        this.Middlewares();
    }

    private Settings(): void {
        this.App.set('port', this.port);
    }

    private Middlewares() {
        this.App.use(morgan('dev'));
    }

    public StartServer(): void {
        this.App.listen(this.App.get('port'));
        console.log('Everything OK');
    }
}