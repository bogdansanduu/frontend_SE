import './App.css';
import * as React from "react";
import Sidebar from "./components/Sidebar";
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import HelloWorldPage from "./pages/HelloWorldPage";
import SignInSide from "./pages/SignIn";
import VideoGamesPage from "./pages/VideoGamesPage";
import {useState} from "react";
import {Login} from "@mui/icons-material";

const NotImplemented = () => {
    return <div>
        Not Implemented
    </div>
}

const getToken = () => {

}

function App() {
    const [token, setToken] = useState();

    if (!token) {
        return <SignInSide setToken={setToken}/>
    }

    return (
        <Router>
            <div style={{display: "flex"}}>
                <Sidebar setToken={setToken}/>
                <Switch>
                    <Route path="/" exact component={HelloWorldPage}/>
                    <Route path="/video_games" exact component={VideoGamesPage}/>
                    {/*<Route path="/sign_in" exact component={SignInSide}/>*/}
                    <Route path="/sign_out" exact component={NotImplemented}/>
                </Switch>
            </div>
        </Router>
    )
}

export default App;
