import React from 'react';
import './assets/styles/app.css'
import LandingPage from './containers/LandingPage';
import Register from './containers/Register';
import {
    BrowserRouter,
    Route,
    Switch
} from 'react-router-dom'

const App = () => {
    return(
        <BrowserRouter>
            <Switch>

                <Route exact path="/" component={LandingPage} />

                <Route exact path="/register" component={Register} />
                
            </Switch>
        </BrowserRouter>
    )
}

export default App;