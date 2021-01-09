import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import NavigationBar from "../navbar/NavBar";
import {GroupCreateForm} from "./GroupCreateForm";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {createStyles, Theme} from "@material-ui/core";
import {GroupUpdateForm} from "./GroupUpdateForm";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
    }),
);

function GroupUpdate() {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <CssBaseline/>
            <NavigationBar/>
            <GroupUpdateForm/>
        </div>
    )
}

export {GroupUpdate}