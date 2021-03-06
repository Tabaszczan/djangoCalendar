import React, {useEffect, useState} from "react";
import TextField from "@material-ui/core/TextField";
import {createStyles, Grid, Theme} from "@material-ui/core";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Button from "@material-ui/core/Button";
import {useDispatch, useSelector} from "react-redux";
import {userActions} from "../../actions/user.actions";
import moment from "moment/moment";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        padding: {
            padding: theme.spacing(2),
        },
        marginAutoItem: {
            alignItems: 'center',
            justifyContent: 'center',
        }
    }),
);

function EventUpdateForm() {

    const [event, setEvent] = useState({
        event_name: "",
        start_date: "",
        end_date: "",
        description: "",
    })
    const getEvent = useSelector((state: any) => state.events.event)
    useEffect(() => {
        setEvent(getEvent)
    }, [getEvent])
    const dispatch = useDispatch()

    function handleChange(e: any) {
        const {name, value} = e.target
        setEvent(event => ({...event, [name]: value}))
    }

    function handleSubmit(e: any) {
        e.preventDefault()
        dispatch(userActions.updateEvent(event))
    }

    const classes = useStyles();
    return (<form className={classes.root} onSubmit={handleSubmit}>
        <Grid container className={classes.padding}>
            <Grid item xs={12} sm={6} className={classes.padding}>
                <h2 className={classes.marginAutoItem}>Zaktualizuj wydarzenie</h2>
                <Grid item>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="event_name"
                        label="Event Name"
                        name="event_name"
                        autoFocus
                        value={event.event_name}
                        onChange={handleChange}
                    />
                </Grid>
                <Grid item>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="start_date"
                        label="Start Date"
                        name="start_date"
                        type="datetime-local"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        value={moment(event.start_date).format('YYYY-MM-DDTHH:MM')}
                        onChange={handleChange}
                    />
                </Grid>
                <Grid item>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="end_date"
                        label="End Date"
                        name="end_date"
                        type="datetime-local"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        value={moment(event.end_date).format('YYYY-MM-DDTHH:MM')}
                        onChange={handleChange}
                    />
                </Grid>
                <Grid item>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="description"
                        label="Description"
                        name="description"
                        multiline
                        rows={5}
                        value={event.description}
                        onChange={handleChange}
                    />
                </Grid>
                <Button type="submit" fullWidth variant="contained" color="primary">Wyślij</Button>
            </Grid>
            <Grid item xs={12} sm={6}> </Grid>
        </Grid>
    </form>)
}

export {EventUpdateForm}