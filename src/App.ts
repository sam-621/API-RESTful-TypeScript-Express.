import Express, { Application } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import NotFound from './middlewares/NotFound.middlewares';
import APIkey from './middlewares/apiKey.middlewares';

/*--------------------ROUTES------------------------------*/ 
import authRoutes from './routes/auth.routes';
import userRoutes from './routes/user.routes';
import postRoutes from './routes/posts.routes';
import HomeRoutes from './routes/home.routes';
import profileRoutes from './routes/profile.routes';
import postActions from './routes/postActions.routes';
/*--------------------------------------------------------*/

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
        this.App.use(cors());
        this.App.use(morgan('dev'));
        this.App.use(Express.json());
        this.App.use(Express.urlencoded({ extended: false }));
        this.App.use(APIkey);
    }

    private Routes() {
        this.App.use('/explorespace/api', authRoutes);
        this.App.use('/explorespace/api', userRoutes);
        this.App.use('/explorespace/api', postRoutes);
        this.App.use('/explorespace/api', HomeRoutes);
        this.App.use('/explorespace/api', profileRoutes);
        this.App.use('/explorespace/api', postActions);
    }

    private MiddlewaresOutput() {
        this.App.use(NotFound);
    }

    public StartServer(): void {
        this.App.listen(this.App.get('port'));
        console.log('Everything OK');
    }
}