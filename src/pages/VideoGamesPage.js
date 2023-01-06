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
import {FormControl, InputLabel, MenuItem, Select} from "@mui/material";

const theme = createTheme();

const VideoGamesPage = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const getApiData = async () => {
            return await fetch(`http://localhost:8080/api/v1/recommendation/getAllVideoGames`, {method: "GET"})
                .then(res => res.json());
        }

        getApiData().then(response => {
            const modifiedData = response.map(game => {
                game.rating = 0;
                return game;
            })
            setData(modifiedData);
        })
    }, [])

    const handleChange = (event, game) => {
        const newData = data.map(gameData => {
            if(gameData.id === game.id) {
                gameData.rating = event.target.value;
            }
            return gameData;
        })
        setData(newData);
        console.log(data);
    }

    console.log('data----->', data);
    return (
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
                            <Button variant="contained">Recommend method 1</Button>
                            <Button variant="contained">Recommend method 2</Button>
                        </Stack>
                    </Container>
                </Box>
                <Container sx={{py: 8}} maxWidth="md">
                    {/* End hero unit */}
                    <Grid container spacing={4}>
                        {data.map((game) => (
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
                                            {game.game_title}
                                        </Typography>
                                        <Typography>
                                            {game.game_description}
                                        </Typography>
                                    </CardContent>
                                    <CardActions>
                                        <FormControl fullWidth>
                                            <InputLabel id="demo-simple-select-label">Age</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                value={game.rating}
                                                label="Age"
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
    );
}

export default VideoGamesPage;