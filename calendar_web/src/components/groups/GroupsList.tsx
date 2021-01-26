import React, {useEffect, useState} from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import NavigationBar from "../navbar/NavBar";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {createStyles, Theme} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import CircularProgress from "@material-ui/core/CircularProgress";
import Snackbar from "@material-ui/core/Snackbar";
import {Alert} from "@material-ui/lab";
import CloseIcon from "@material-ui/icons/Close";
import DeleteIcon from "@material-ui/icons/Delete";
import Container from "@material-ui/core/Container";
import {groupsActions} from "../../actions/groups.action";
import {useDispatch, useSelector} from "react-redux";
import {userActions} from "../../actions/user.actions";


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
    }),
);

function GroupsList() {
    const groups = useSelector((state: any) => state.groups)
    const user = useSelector((state: any) => state.authentication.user)

    const dispatch = useDispatch()
    const [open, setOpen] = useState(false)
    useEffect(() => {
        dispatch(groupsActions.getGroups())
    }, [dispatch])

    function handleEditGroup(id: any) {
        dispatch(groupsActions.getGroup(id))
    }

    function handleDeleteGroupEvent(id: number) {
        dispatch(groupsActions.deleteGroup(id))
        setOpen(true)
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
                <h2>Grupy:</h2>
                <Grid container
                      direction="row"
                      justify="flex-start"
                      alignItems="baseline"
                      spacing={2}>
                    {groups.items &&
                    groups.items.map((item: any, key: any) =>
                        <Grid item xs={12} sm={6} md={4} lg={3} xl={3} key={key}>
                            <Paper elevation={3} variant="outlined" square className={classes.paper}>
                                <Grid container spacing={2} justify="space-between">
                                    <Grid item zeroMinWidth xs={10}>
                                        <Typography variant="subtitle1">
                                            {item.group_name}
                                        </Typography>
                                        <Typography variant="subtitle1" gutterBottom>
                                            Właściciel: {item.owner.first_name} {item.owner.last_name}, {item.owner.email}
                                        </Typography>
                                        <Typography variant="subtitle1" gutterBottom>
                                            Członkowie:
                                        </Typography>
                                        <ul>
                                            <Typography variant="body1">{item.members.map((member: any, key: any) =>
                                                <li key={key}>
                                                    {member.first_name} {member.last_name}, {member.email}
                                                </li>
                                            )}
                                            </Typography>
                                        </ul>
                                    </Grid>
                                    <Grid item xs={2}>
                                        {item.owner.email === user.user.email &&
                                        <IconButton edge="end" color="inherit" aria-label="edit" size="small"
                                                    onClick={() => handleEditGroup(item.id)}>
                                            <EditIcon fontSize="small"/>
                                        </IconButton>}
                                        <span>{item.owner.email === user.user.email &&
                                        <IconButton edge="end" color="inherit" aria-label="remove"
                                                    size="small"
                                                    onClick={() => handleDeleteGroupEvent(item.id)}>
                                            <DeleteIcon fontSize="small"/>
                                        </IconButton>}</span>
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


export {GroupsList}