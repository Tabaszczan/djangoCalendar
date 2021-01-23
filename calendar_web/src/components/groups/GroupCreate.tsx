import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import NavigationBar from "../navbar/NavBar";
import {GroupCreateForm} from "./GroupCreateForm";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {createStyles, Theme} from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
    }),
);

function GroupCreate() {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <CssBaseline/>
            <NavigationBar/>
            <GroupCreateForm/>
        </div>
    )
}

export {GroupCreate}