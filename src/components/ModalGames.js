import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import DoomImage from "../images/doom.jpg";
import CardContent from "@mui/material/CardContent";
import {useState, useEffect} from "react";

const style = {
    maxWidth: 800,
};


const ModalGames = ({handleClose, open, games, title, width, horea}) => {

    const [buttonDisabled, setButtonDisabled] = useState(false);
    const [gameId, setGameId] = useState(-1);
    const [userId, setUserId] = useState(-1);
    const [userAmount, setUserAmount] = useState(0);

    console.log('gamesMODAL----->', games)

    useEffect(() => {
        if(horea == 1){
            setGameId(games[0].id);
        }
        const getApiData = async() => {
            const userId = await fetch(`http://localhost:8080/getUserId`, {method: "GET"})
                .then(res => res.json());
            setUserId(userId);
        }
    })

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
                                        image={DoomImage}
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
                                    <p>More game description ... </p>
                                    <p>More game description ... </p>
                                    <p>More game description ... </p>
                                    <p>Game type: <b>{games[0].type}</b></p>
                                    <p>Game price: <b>{games[0].price}</b> $</p>
                                    <p>Available balance: <b>...</b> $</p>
                                    <Button variant="contained" disabled={buttonDisabled}> Buy </Button>
                                </div> : <></>
                    }
                </div>
            </Box>
        </Modal>
    );
}

export default ModalGames;