import React from 'react';
import LandingPage from './containers/LandingPage';
import {
    BrowserRouter,
    Route,
    Switch
} from 'react-router-dom'

const App = () => {
    return(
        <BrowserRouter>
            <Switch>
                <Route exact path="/">
                    <LandingPage/>
                </Route>
            </Switch>
        </BrowserRouter>
    )
}

export default App;