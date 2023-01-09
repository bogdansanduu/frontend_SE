import * as React from 'react';
import {useEffect, useState} from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import DoomImage from '../images/doom.jpg'
import GameImage from '../images/game_img.jpg'
import {FormControl, InputLabel, MenuItem, Select} from "@mui/material";
import ModalGames from "../components/ModalGames";
import TextField from "@mui/material/TextField";

const theme = createTheme();

const VideoGamesPage = () => {
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);

    const [open, setOpen] = useState(false);
    const [open2, setOpen2] = useState(false);
    const [openIndividualGame, setOpenIndividualGame] = useState(false);

    const [games, setGames] = useState([]);
    const [games2, setGames2] = useState([]);

    const [nameFilter, setNameFilter] = useState("");

    const [clickedGame, setClickedGame] = useState([]);

    const handleOpen = () => setOpen(true);
    const handleOpen2 = () => setOpen2(true);
    const handleClose = () => setOpen(false);
    const handleClose2 = () => setOpen2(false);

    const handleOpenIndividualGame = (game) => {
        setOpenIndividualGame(true);
        setClickedGame([game]);
    }
    const handleCloseIndividualGame = () => setOpenIndividualGame(false);

    const handleRecommendation1 = async () => {

        const ratedGames = data.filter(game => game.rating > 0).map(goodGame => {
            return {
                videoGameId: goodGame.id,
                rating: goodGame.rating
            }
        });
        console.log('ratedGames---->', JSON.stringify(ratedGames))
        const fetchData = await fetch('http://localhost:8080/api/v1/recommendation/getRecommendation1', {
            method: "POST",
            headers: new Headers({
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }),
            body: JSON.stringify(ratedGames)
        }).then(res => res.json());
        setGames(fetchData);
        console.log('recommended games------>', fetchData);
        handleOpen();
    }

    const handleRecommendation2 = async () => {

        const ratedGames = data.filter(game => game.rating > 0).map(goodGame => {
            return {
                videoGameId: goodGame.id,
                rating: goodGame.rating
            }
        });
        console.log('ratedGames---->', JSON.stringify(ratedGames))
        const fetchData = await fetch('http://localhost:8080/api/v1/recommendation/getRecommendation2', {
            method: "POST",
            headers: new Headers({
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }),
            body: JSON.stringify(ratedGames)
        }).then(res => res.json());
        setGames2(fetchData);
        console.log('recommended games2------>', fetchData);
        handleOpen2();
    }

    const handleFilterByTitle = () => {
        const filteredData = data.filter(game =>
            game.gameTitle.toLowerCase().includes(nameFilter.toLowerCase())
        )
        setFilteredData(filteredData);
    }

    const handleFilterByType = () => {
        const filteredData = data.filter(game =>
            game.type.toLowerCase().includes(nameFilter.toLowerCase())
        )
        setFilteredData(filteredData);
    }

    useEffect(() => {
        const getApiData = async () => {
            return await fetch(`http://localhost:8080/api/v1/recommendation/getAllVideoGames`, {
                method: "GET", headers: new Headers({
                    'Authorization': 'Bearer ' + localStorage.getItem('token'),
                })
            })
                .then(res => res.json());
        }

        getApiData().then(response => {
            const modifiedData = response.map(game => {
                game.rating = 0;
                return game;
            })
            setData(modifiedData);
            setFilteredData(modifiedData);
            setClickedGame([modifiedData[0]]);
        })
    }, [])

    const handleChange = (event, game) => {
        const newData = data.map(gameData => {
            if (gameData.id === game.id) {
                gameData.rating = event.target.value;
            }
            return gameData;
        })
        setData(newData);
        console.log(data);
    }

    //console.log('data----->', data);
    return (
        <>
            <ThemeProvider theme={theme}>
                <CssBaseline/>
                <main style={{width: '100vw'}}>
                    {/* Hero unit */}
                    <Box
                        sx={{
                            bgcolor: 'background.paper',
                            pt: 8,
                            pb: 6,
                        }}
                    >
                        <Container maxWidth="sm">
                            <Typography
                                component="h1"
                                variant="h2"
                                align="center"
                                color="text.primary"
                                gutterBottom
                            >
                                Video Games
                            </Typography>
                            <Typography variant="h5" align="center" color="text.secondary" paragraph>
                                Rate and get some recommended games! Also, buy some if you are here as well!
                            </Typography>
                            <Stack
                                sx={{pt: 4}}
                                direction="row"
                                spacing={2}
                                justifyContent="center"
                            >
                                <Button variant="contained" onClick={handleRecommendation1}>Recommend method 1</Button>
                                <Button variant="contained" onClick={handleRecommendation2}>Recommend method 2</Button>
                            </Stack>
                            <div style={{marginTop: "20px", display: "flex", alignContent: "space-around", gap: "5px"}}>
                                <TextField value={nameFilter} onChange={(event) => setNameFilter(event.target.value)} placeholder={"Search games"}/>
                                <Button variant="contained" onClick={handleFilterByTitle}>Filter by title</Button>
                                <Button variant="contained" onClick={handleFilterByType}>Filter by type</Button>
                            </div>

                        </Container>
                    </Box>
                    <Container sx={{py: 8}} maxWidth="md">
                        {/* End hero unit */}
                        <Grid container spacing={4}>
                            {filteredData.map((game) => (
                                <Grid item key={game.id} xs={12} sm={6} md={4}>
                                    <Card
                                        sx={{height: '100%', display: 'flex', flexDirection: 'column'}}
                                    >
                                        <CardMedia
                                            component="img"
                                            image={GameImage}
                                            alt="random"
                                            onClick={() => handleOpenIndividualGame(game)}
                                        />
                                        <CardContent sx={{flexGrow: 1}}>
                                            <Typography gutterBottom variant="h5" component="h2">
                                                {game.gameTitle}
                                            </Typography>
                                            <Typography>
                                                {game.gameDescription}
                                            </Typography>
                                        </CardContent>
                                        <CardActions>
                                            <FormControl fullWidth>
                                                <InputLabel id="demo-simple-select-label">Rating</InputLabel>
                                                <Select
                                                    labelId="demo-simple-select-label"
                                                    id="demo-simple-select"
                                                    value={game.rating}
                                                    label="Rating"
                                                    onChange={(event) => handleChange(event, game)}
                                                >
                                                    <MenuItem value={0}>Not Rated</MenuItem>
                                                    <MenuItem value={1}>One</MenuItem>
                                                    <MenuItem value={2}>Two</MenuItem>
                                                    <MenuItem value={3}>Three</MenuItem>
                                                    <MenuItem value={4}>Four</MenuItem>
                                                    <MenuItem value={5}>Five</MenuItem>
                                                </Select>
                                            </FormControl>
                                        </CardActions>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>
                    </Container>
                </main>
            </ThemeProvider>
            <ModalGames handleClose={handleClose} open={open} games={games} width={800}
                        title={"Those are your recommended games using collaborative filtering!"}/>
            <ModalGames handleClose={handleClose2} open={open2} games={games2} width={800}
                        title={"Those are your recommended games using matrix factorization!"}/>

            <ModalGames handleClose={handleCloseIndividualGame} open={openIndividualGame} games={clickedGame} width={400} horea={true}
                        title={"More game details"}/>
        </>
    );
}

export default VideoGamesPage;