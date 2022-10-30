import './App.css';
import {CenteredContainer} from "./utils/styledComponents";
import helloWorld from "./img/helloWorld.jpg";
import {useState} from "react";
import TextField from "@mui/material/TextField";
import * as React from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};


function App() {

    const [open, setOpen] = React.useState(false);
    const handleClose = () => setOpen(false);
    const [name, setName] = useState("");
    const [data, setData] = useState("");

    const getApiData = async () => {
        const reponse = await fetch(`http://localhost:8080/api/v1/helloWorld/${name}`, {method: "GET"})
            .then(res => res.json());
        setData(reponse.message);
    }

    const handleClick = async () => {
        await getApiData();
        setOpen(true);
    };

    const handleChange = (event) => {
        setName(() => event.target.value);
    }

    return (
        <div style={{backgroundImage: `url(${helloWorld})`, width: "100vw", height: "100vh", backgroundSize: "cover"}}>
            <h1 style={{color: "orangered", textAlign: "center"}}>
                Hello World!
            </h1>
            <CenteredContainer style={{background: "white"}}>
                <TextField value={name} onChange={handleChange}/>
                <button onClick={handleClick}>Click me!</button>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            {data}
                        </Typography>
                    </Box>
                </Modal>
            </CenteredContainer>
        </div>
    );
}

export default App;

//  "proxy": "http://localhost:8080"