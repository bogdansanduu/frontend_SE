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

const NotImplemented = () => {
    return <div>
        Not Implemented
    </div>
}


function App() {
    return (
        <Router>
            <div style={{display: "flex"}}>
                <Sidebar/>
                <Switch>
                    <Route path="/hello_world" exact component={HelloWorldPage}/>
                    <Route path="/video_games" exact component={NotImplemented}/>
                    <Route path="/sign_in" exact component={SignInSide}/>
                    <Route path="/sign_out" exact component={NotImplemented}/>
                </Switch>
            </div>
        </Router>
    )
}

export default App;
