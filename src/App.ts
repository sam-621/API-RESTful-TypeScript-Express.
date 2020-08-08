import Express, { Application } from 'express';
import morgan from 'morgan';
import NotFound from './middlewares/NotFound.middlewares';
import authRoutes from './routes/auth.routes';
import userRoutes from './routes/user.routes';
import postRoutes from './routes/posts.routes';

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
        this.App.use('/explorespace/api', userRoutes);
        this.App.use('/explorespace/api', postRoutes);
    }

    private MiddlewaresOutput() {
        this.App.use(NotFound);
    }

    public StartServer(): void {
        this.App.listen(this.App.get('port'));
        console.log('Everything OK');
    }
}