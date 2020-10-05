import React from "react";
import Grid from "@material-ui/core/Grid";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {Theme} from "@material-ui/core";
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Login from "../login/Login";


const useStyles = makeStyles((theme: Theme) => ({
        root: {
            height: '100vh',
            alignItems: 'center',
        },
        paper: {
            padding: theme.spacing(0, 8),
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        },

    })
)


function Home() {
    const classes = useStyles()
    return (
        <Grid container component="main" className={classes.root}>
            <CssBaseline/>
            <Grid item xs={false} sm={false} md={7} className={classes.paper}>
                <img alt="logo"/>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Aliquam pellentesque accumsan dui. Etiam mi nunc, commodo vel erat nec,
                    dictum sollicitudin nibh. Nullam suscipit nisl quis tortor vulputate,
                    sit amet dictum nunc efficitur. Aenean quis enim quis ligula consequat tristique nec ac urna.
                    Phasellus sapien metus, tempus facilisis tellus in, pellentesque congue eros.
                    Quisque eget blandit libero, sed malesuada urna.
                    Sed non magna in odio tincidunt vulputate vel quis urna.
                    Phasellus vel posuere tortor. Etiam venenatis euismod leo,
                    et eleifend nisi iaculis ut.
                </p>
            </Grid>
            <Grid item xs={12} sm={12} md={5}>
                <Login/>
            </Grid>
        </Grid>
    )
}

export default Home