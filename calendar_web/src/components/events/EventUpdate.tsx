import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import NavigationBar from "../navbar/NavBar";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {createStyles, Theme} from "@material-ui/core";
import {EventUpdateForm} from "./EventUpdateForm";


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
    }),
);

function EventUpdate() {
    const classes = useStyles();
    return (<div className={classes.root}>
        <CssBaseline/>
        <NavigationBar/>
        <EventUpdateForm/>
    </div>)
}


export {EventUpdate}