import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import {createStyles, Theme} from "@material-ui/core";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {DrawerRight} from "./Drawer";
import logo from "../../img/logo.png";
import Link from "@material-ui/core/Link";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        title: {
            flexGrow: 1,
        },
        appbar: {
            background: 'transparent',
        },
        img: {
            height: theme.spacing(6)
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
                        <Link href="/">
                        <img src={logo} alt={"logo"} className={classes.img}/>
                        </Link>
                    </Typography>
                    <IconButton edge="end" color="inherit" aria-label="menu" size="small">
                        <DrawerRight/>
                    </IconButton>
                </Toolbar>
            </AppBar>
        </div>
    )
}

export default NavigationBar