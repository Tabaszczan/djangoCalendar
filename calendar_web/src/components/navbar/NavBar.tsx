import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from '@material-ui/icons/Menu';
import Typography from "@material-ui/core/Typography";
import {createStyles, Theme} from "@material-ui/core";
import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },

        title: {
            flexGrow: 1,
            color: theme.palette.secondary.contrastText
        },
        button: {
            color: theme.palette.secondary.contrastText
        },
        appbar: {
            background: 'transparent',
            // boxShadow: 'none',
        },
    }),
)

const NavigationBar = () => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <AppBar position="static" className={classes.appbar}>
                <Toolbar>
                    <Typography variant="h6" className={classes.title}>
                        Calendar
                    </Typography>
                    <IconButton edge="end" color="inherit" aria-label="menu" className={classes.button}>
                        <MenuIcon/>
                    </IconButton>
                </Toolbar>
            </AppBar>
        </div>
    )
}

export default NavigationBar