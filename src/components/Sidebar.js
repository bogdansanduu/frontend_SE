import React from "react";
import HomeIcon from '@material-ui/icons/Home';
import GamesIcon from '@material-ui/icons/Games';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import {Link} from "react-router-dom";


const Sidebar = ({setToken}) => {

    const handleClick = () => {
        setToken('');
        localStorage.clear();
    }
    return (
        <nav className="nav-container ">
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap:"15px",
                    padding: "10px",
                    width: "10vw",
                    height: "100%",
                    background: "#f0f0f0"
                }}
            >
                <Link to={'/'}><HomeIcon/>Home</Link>
                <Link to={'/video_games'}><GamesIcon/>Games</Link>
                <Link to={'/sign_out'} onClick={handleClick}><ExitToAppIcon/>Sign Out</Link>
            </div>
        </nav>
    );
};

export default Sidebar;