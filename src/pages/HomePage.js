import Sidebar from "../components/Sidebar";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import HelloWorldPage from "./HelloWorldPage";
import VideoGamesPage from "./VideoGamesPage";
import SignInSide from "./SignIn";
import * as React from "react";


const NotImplemented = () => {
    return <div>
        Not Implemented
    </div>
}
const HomePage = () => {
    return (
        <Router>
            <div style={{display: "flex"}}>
                <Sidebar/>
                <Switch>
                    <Route path="/hello_world" exact component={HelloWorldPage}/>
                    <Route path="/video_games" exact component={VideoGamesPage}/>
                    <Route path="/sign_in" exact component={SignInSide}/>
                    <Route path="/sign_out" exact component={NotImplemented}/>
                </Switch>
            </div>
        </Router>
    )
}