import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import DoomImage from "../images/doom.jpg";
import GameImage from '../images/game_img.jpg'
import CardContent from "@mui/material/CardContent";
import {useState, useEffect} from "react";

const style = {
    maxWidth: 800,
};


const ModalGames = ({handleClose, open, games, title, width, horea}) => {

    const [buttonDisabled, setButtonDisabled] = useState(false);
    const [gameId, setGameId] = useState(-1);
    const [userId, setUserId] = useState(0);
    const [userAmount, setUserAmount] = useState(0);
    const [showMessage, setShowMessage] = useState(false);
    const [conditionalMessage, setConditionalMessage] = useState("");

    //console.log('gamesMODAL----->', games)

    const getUserAmount = async() => {
        const userAmount = await fetch(`http://localhost:8080/api/v1/getUserAmount/${userId}`, {
            method: "GET", headers: new Headers({
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
            })
        }).then(res => res.json()).then(amount => setUserAmount(amount));
        //console.log(userAmount);
        return userAmount;
    };

    const userHasGame = async() => {
        const operation = await fetch(`http://localhost:8080/api/v1/hasGame/${games[0].id}`, {
            method: "GET", headers: new Headers({
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
            })
        }).then(res => res.json())
        console.log(operation)
        return operation;
    };

    useEffect(() => {
        if(horea == 1 && games[0]){
            setGameId(games[0].id);
        }
        const getApiData = async() => {
            await fetch(`http://localhost:8080/api/v1/getUserId`, {
                method: "GET", headers: new Headers({
                    'Authorization': 'Bearer ' + localStorage.getItem('token'),
                })
            }).then(res => res.json()).then(id => {
                setUserId(id)
            });
            if(userId)
                await getUserAmount();
            //console.log(userAmount);
        }
        getApiData();
    }, [])

    useEffect(() => {
        const myAsyncFunction = async () => {
            if (userId) {
                await getUserAmount();
                if (games[0]) {
                    const hasGame = await userHasGame();
                    //console.log(hasGame);
                    //console.log(userAmount);
                    if (hasGame) {
                        console.log("are jocul")
                        setButtonDisabled(true);
                        setConditionalMessage("User already has the game!");
                        setShowMessage(true);
                    } else {
                        console.log("nu are jocul")
                        setConditionalMessage("");
                        if (games[0] && userAmount < games[0].price) {
                            setButtonDisabled(true);
                            setConditionalMessage("User has not enough money to buy the game!");
                            setShowMessage(true);
                        } else {
                            setButtonDisabled(false);
                            setShowMessage(false);
                        }
                    }
                }
            }
        }

        myAsyncFunction();

    }, [games[0]]);

    const buyGame = async() => {
        const fetchData = async () => {
            await fetch(`http://localhost:8080/api/v1/addUserVideoGame/${games[0].id}`, {
                method: "POST",
                headers: new Headers({
                    'Authorization': 'Bearer ' + localStorage.getItem('token'),
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                })
            });
        }

        await fetchData();
        await getUserAmount();
        setButtonDisabled(true);
        setConditionalMessage("User has bought the game!");
        setShowMessage(true);
    }

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            //sx={style}
        >
            <Box style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: [width],
                backgroundColor: 'white',
                border: '2px solid',
                borderRadius: "10px",
                boxShadow: "24px",
                p: 4
            }}>
                <Typography id="modal-modal-title" variant="h4" component="h2" style={{marginBottom: '30px'}}>
                    {title}
                </Typography>
                <div style={{display: "flex", direction: "column", textAlign: "left"}}>
                    <Grid container spacing={4}>
                        {games.map((game) => (
                            <Grid item key={game.id} xs={12} sm={6} md={4}>
                                <Card
                                    sx={{height: '100%', display: 'flex', flexDirection: 'column'}}
                                >
                                    <CardMedia
                                        component="img"
                                        image={GameImage}
                                        alt="random"
                                    />
                                    <CardContent sx={{flexGrow: 1}}>
                                        <Typography gutterBottom variant="h5" component="h2">
                                            {game.gameTitle}
                                        </Typography>
                                        <Typography>
                                            {game.gameDescription}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                    {
                        horea ? <div style={{marginLeft: "-400px"}}>
                                    <p>More game details ... </p>
                                    <p>More game details ... </p>
                                    <p>More game details ... </p>
                                    <p>Game type: <b>{games[0] ? games[0].type : ""}</b></p>
                                    <p>Game price: <b>{games[0] ? games[0].price : ""}</b> $</p>
                                    <p>Available amount: <b>{userAmount}</b> $</p>
                                    <Button variant="contained" disabled={buttonDisabled} onClick={buyGame}> Buy </Button>
                                    {showMessage && <p>{conditionalMessage}</p>}
                                </div> : <></>
                    }
                </div>
            </Box>
        </Modal>
    );
}

export default ModalGames;