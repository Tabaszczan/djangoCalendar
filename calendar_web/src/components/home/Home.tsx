import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import NavigationBar from "../navbar/NavBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import {createStyles, Link, Theme} from "@material-ui/core";
import {userActions} from "../../actions/user.actions";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from "@material-ui/core/IconButton";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        paper: {
            padding: theme.spacing(2),
            margin: 'auto',
            minWidth: 250,
        },
        control: {
            padding: theme.spacing(2),
        },
    }),
);


function Home() {
    const events = useSelector((state: any) => state.events)
    const user = useSelector((state: any) => state.authentication.user)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(userActions.getEvents())
    }, [])
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <CssBaseline/>
            <NavigationBar/>
            <Container maxWidth={false}>
                <h2>Dane:</h2>
                <ul>
                    <li>Email: {user.user.email}</li>
                    <li>Imię: {user.user.first_name}</li>
                    <li>Nazwisko: {user.user.last_name}</li>
                    <li>Numer tel.: {user.user.telephone}</li>
                </ul>
                <h2>Wydarzenia:</h2>
                <Grid container
                      direction="row"
                      justify="flex-start"
                      alignItems="baseline"
                      spacing={2}>
                    {events.items &&
                    events.items.map((item: any, k: any) =>
                        <Grid item xs={12} sm={6} md={4} lg={3} xl={3}>
                            <Paper elevation={3}
                                   variant="outlined"
                                   square
                                   className={classes.paper}>
                                <Grid container spacing={2} justify="space-between">
                                    <Grid item zeroMinWidth>
                                        <Typography variant="subtitle1">
                                            {item.event_name}
                                        </Typography>
                                        {new Date(item.start_date).toLocaleDateString() === new Date(item.end_date).toLocaleDateString() &&
                                        <Container maxWidth={false}>
                                            <Typography variant="body2" color="textSecondary">
                                                {new Date(item.start_date).toLocaleDateString()}
                                            </Typography>
                                            <Typography variant="caption" color="textSecondary">
                                                {new Date(item.start_date).toLocaleTimeString([], {
                                                    hour: '2-digit',
                                                    minute: '2-digit'
                                                })}
                                                -
                                                {new Date(item.end_date).toLocaleTimeString([], {
                                                    hour: '2-digit',
                                                    minute: '2-digit'
                                                })}
                                            </Typography>
                                        </Container> ||
                                        <Typography variant="body2" color="textSecondary" gutterBottom>
                                            {new Date(item.start_date).toLocaleDateString()} - {new Date(item.end_date).toLocaleDateString()}
                                        </Typography>
                                        }
                                        <Typography variant="subtitle1" gutterBottom>
                                            Opis:
                                        </Typography>
                                        <Typography variant="body1">
                                            {item.description}
                                        </Typography>
                                    </Grid>
                                    <Grid item >
                                        <IconButton edge="end" color="inherit" aria-label="edit" size="small">
                                            <EditIcon fontSize="small"/>
                                        </IconButton>
                                        <IconButton edge="end" color="inherit" aria-label="remove" size="small">
                                            <DeleteIcon fontSize="small"/>
                                        </IconButton>
                                    </Grid>
                                </Grid>
                            </Paper>
                        </Grid>
                    )
                    }
                </Grid>
            </Container>
        </div>

    )
}

export {Home}