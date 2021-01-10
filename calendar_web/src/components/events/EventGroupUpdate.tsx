import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import NavigationBar from "../navbar/NavBar";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {createStyles, Theme} from "@material-ui/core";
import {EventGroupUpdateForm} from "./EventGroupUpdateForm";


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
    }),
);

function EventGroupUpdate() {
    const classes = useStyles();
    return (<div className={classes.root}>
        <CssBaseline/>
        <NavigationBar/>
        <EventGroupUpdateForm/>
    </div>)
}


export {EventGroupUpdate}