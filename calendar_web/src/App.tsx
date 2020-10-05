import React, {useState} from 'react';
import './App.css';
import {createMuiTheme, MuiThemeProvider} from "@material-ui/core";
import {BrowserRouter} from "react-router-dom";
import Home from "./components/home/Home";
import {Brightness3Rounded, Brightness7Rounded} from "@material-ui/icons";


const theme = createMuiTheme({
    palette: {
        type: 'dark',
        primary: {
            light: '#ff6434',
            main: '#dd2c00',
            dark: '#a30000',
            contrastText: '#ffffff',
        },
        secondary: {
            light: '#ffa06d',
            main: '#ff6e40',
            dark: '#c53d13',
            contrastText: '#000000',
        }
    }
});


function App() {
    const [darkTheme, setDarkTheme] = useState(true)
    const icon = !darkTheme ? <Brightness7Rounded/> : <Brightness3Rounded/>
    return (
        <BrowserRouter>
            <MuiThemeProvider theme={theme}>
                {/*<NavigationBar/>*/}
                <Home/>
                {/*<h1>TYTUŁ</h1>*/}
                {/*<Button variant="contained" color="primary">*/}
                {/*    Hello*/}
                {/*</Button>*/}
            </MuiThemeProvider>
        </BrowserRouter>
    );
}

export default App;
