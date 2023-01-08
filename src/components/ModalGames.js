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
import CardActions from "@mui/material/CardActions";
import {FormControl, InputLabel, MenuItem, Select} from "@mui/material";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 800,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const ModalGames = ({handleClose, open, games, title, width, horea}) => {

    console.log('gamesMODAL----->', games)
    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
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
                    horea ? <div>Baga aici</div> : <></>
                }


            </Box>
        </Modal>
    );
}

export default ModalGames;