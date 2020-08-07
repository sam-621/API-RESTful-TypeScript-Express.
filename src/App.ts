import Express, { Application } from 'express';
import morgan from 'morgan';
import authRoutes from './routes/auth.routes';


export class Server {

    private App: Application;

    constructor(private port: string) {
        this.App = Express();
        this.Settings();
        this.MiddlewaresInput();
        this.Routes();
        this.MiddlewaresOutput();
    }

    private Settings(): void {
        this.App.set('port', this.port);
    }

    private MiddlewaresInput() {
        this.App.use(morgan('dev'));
        this.App.use(Express.json());
        this.App.use(Express.urlencoded({ extended: false }));
    }

    private Routes() {
        this.App.use('/explorespace/api', authRoutes);
    }

    private MiddlewaresOutput() {
        this.App.use((req, res) => {
            res.status(404).json({
                message: 'Not Found',
                path: req.url,
                statusCode: 404
            })
        })
    }

    public StartServer(): void {
        this.App.listen(this.App.get('port'));
        console.log('Everything OK');
    }
}