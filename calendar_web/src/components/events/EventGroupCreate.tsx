import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import NavigationBar from "../navbar/NavBar";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {createStyles, Theme} from "@material-ui/core";
import {EventGroupCreateForm} from "./EventGroupCreateForm";


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
    }),
);

function EventGroupCreate() {
    const classes = useStyles();
    return (<div className={classes.root}>
        <CssBaseline/>
        <NavigationBar/>
        <EventGroupCreateForm/>
    </div>)
}


export {EventGroupCreate}