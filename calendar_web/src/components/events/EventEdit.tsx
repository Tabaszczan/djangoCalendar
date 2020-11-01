import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import NavigationBar from "../navbar/NavBar";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {createStyles, Theme} from "@material-ui/core";
import {EventForm} from "./EventForm";


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
    }),
);

function EventEdit() {
    const classes = useStyles();
    return (<div className={classes.root}>
        <CssBaseline/>
        <NavigationBar/>
        <EventForm/>
    </div>)
}


export {EventEdit}