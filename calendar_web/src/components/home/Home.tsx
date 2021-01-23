import React from "react";
import NavigationBar from "../navbar/NavBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import {createStyles, Theme} from "@material-ui/core";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {EventsList} from "../events/EventsList";
import {GroupEventsList} from "../events/GroupEventList";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
    }),
);


function Home() {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <CssBaseline/>
            <NavigationBar/>
            <EventsList/>
            <GroupEventsList/>
        </div>
    )
}

export {Home}