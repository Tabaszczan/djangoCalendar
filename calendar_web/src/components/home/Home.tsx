import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import NavigationBar from "../navbar/NavBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import {createStyles, Theme} from "@material-ui/core";
import {userActions} from "../../actions/user.actions";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from "@material-ui/core/IconButton";
import {Alert} from "@material-ui/lab";
import CloseIcon from '@material-ui/icons/Close';
import Snackbar from "@material-ui/core/Snackbar";
import CircularProgress from "@material-ui/core/CircularProgress";
import {history} from "../../helpers/history";
import {groupsActions} from "../../actions/groups.action";

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
    const groups = useSelector((state: any) => state.groups)
    const user = useSelector((state: any) => state.authentication.user)
    const dispatch = useDispatch()
    const [open, setOpen] = useState(false)

    useEffect(() => {
        dispatch(userActions.getEvents())
        dispatch(groupsActions.getGroups())
        // eslint-disable-next-line
    }, [])

    function handleDeleteEvent(id: number) {
        dispatch(userActions.delete(id))
        setOpen(true)
    }
     function handleDeleteGroupEvent(id: number) {
        dispatch(groupsActions.deleteGroup(id))
        setOpen(true)
    }

    function handleEditEvent(id: any) {
        dispatch(userActions.getEvent(id))
    }
    function handleEditGroup(id: any) {
        dispatch(groupsActions.getGroups())
    }

    const handleClose = (event: React.SyntheticEvent | React.MouseEvent, reason?: string) => {
        if (reason === 'clickaway') {
            return
        }
        setOpen(false)
    }
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <CssBaseline/>
            <NavigationBar/>

            <Container maxWidth={false}>
                <h2>Wydarzenia:</h2>
                <Grid container
                      direction="row"
                      justify="flex-start"
                      alignItems="baseline"
                      spacing={2}>
                    {events.items &&
                    events.items.map((item: any, k: any) =>
                        <Grid item xs={12} sm={6} md={4} lg={3} xl={3} key={item.id}>
                            <Paper elevation={3}
                                   variant="outlined"
                                   square
                                   className={classes.paper}>
                                <Grid container spacing={2} justify="space-between">
                                    <Grid item zeroMinWidth xs={10}>
                                        <Typography variant="subtitle1">
                                            {item.event_name}
                                        </Typography>
                                        {(new Date(item.start_date).toLocaleDateString() === new Date(item.end_date).toLocaleDateString() &&
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
                                            </Container>) ||
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
                                    <Grid item xs={2}>
                                        <IconButton edge="end"
                                                    color="inherit"
                                                    aria-label="edit"
                                                    size="small"
                                                    onClick={() => handleEditEvent(item.id)}>
                                            <EditIcon fontSize="small"/>
                                        </IconButton>
                                        {
                                            item.deleting ? <CircularProgress/>
                                                : item.deleteError ?
                                                <Snackbar anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}
                                                          open={open}
                                                          autoHideDuration={6000}
                                                          onClose={handleClose}>
                                                    <Alert severity="error"
                                                           action={<CloseIcon onClick={handleClose}/>}>Wystąpił
                                                        błąd</Alert>
                                                </Snackbar>
                                                : <span><IconButton edge="end" color="inherit" aria-label="remove"
                                                                    size="small"
                                                                    onClick={() => handleDeleteEvent(item.id)}>
                                                        <DeleteIcon fontSize="small"/>
                                                    </IconButton></span>
                                        }
                                    </Grid>
                                </Grid>
                            </Paper>
                        </Grid>
                    )
                    }
                </Grid>
            </Container>
            <Container maxWidth={false}>
                <h2>Grupy:</h2>
                <Grid container
                      direction="row"
                      justify="flex-start"
                      alignItems="baseline"
                      spacing={2}>
                    {groups.items &&
                    groups.items.map((item: any, key: any) =>
                        <Grid item xs={12} sm={6} md={4} lg={3} xl={3} key={key}>
                            <Paper elevation={3}
                                   variant="outlined"
                                   square
                                   className={classes.paper}>
                                <Grid container spacing={2} justify="space-between">
                                    <Grid item zeroMinWidth xs={10}>
                                        <Typography variant="subtitle1">
                                            {item.group_name}
                                        </Typography>
                                        <Typography variant="subtitle1" gutterBottom>
                                            Właściciel:{item.owner.first_name} {item.owner.last_name} ,{item.owner.email}
                                        </Typography>
                                        <Typography variant="subtitle1" gutterBottom>
                                            Członkowie:
                                        </Typography>
                                        <ul>
                                            <Typography variant="body1">
                                                {item.members.map((member: any, key: any) =>
                                                    <li key={key}>
                                                    {member.first_name} {member.last_name} ,{member.email}
                                                </li>
                                                )}
                                            </Typography>
                                        </ul>

                                    </Grid>
                                    <Grid item xs={2}>
                                        <IconButton edge="end"
                                                    color="inherit"
                                                    aria-label="edit"
                                                    size="small"
                                                    onClick={() => handleEditGroup(item.id)}>
                                            <EditIcon fontSize="small"/>
                                        </IconButton>
                                        {
                                            item.deleting ? <CircularProgress/>
                                                : item.deleteError ?
                                                <Snackbar anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}
                                                          open={open}
                                                          autoHideDuration={6000}
                                                          onClose={handleClose}>
                                                    <Alert severity="error"
                                                           action={<CloseIcon onClick={handleClose}/>}>Wystąpił
                                                        błąd</Alert>
                                                </Snackbar>
                                                : <span><IconButton edge="end" color="inherit" aria-label="remove"
                                                                    size="small"
                                                                    onClick={() => handleDeleteGroupEvent(item.id)}>
                                                        <DeleteIcon fontSize="small"/>
                                                    </IconButton></span>
                                        }
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