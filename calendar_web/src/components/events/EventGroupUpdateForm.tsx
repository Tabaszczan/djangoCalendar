import React, {useEffect, useState} from "react";
import TextField from "@material-ui/core/TextField";
import {createStyles, Grid, Theme} from "@material-ui/core";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Button from "@material-ui/core/Button";
import {useDispatch, useSelector} from "react-redux";
import {userActions} from "../../actions/user.actions";
import moment from "moment/moment";
import {Autocomplete} from "@material-ui/lab";

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

function EventGroupUpdateForm() {
    const [event, setEvent] = useState({
        id: null,
        event_name: "",
        start_date: "",
        end_date: "",
        description: "",
        group: 0,
    })
    const getEvent = useSelector((state: any) => state.eventsGroup.event_group)
    const groups = useSelector((state: any) => state.groups)
    let groups_list: any[] = []
    groups_list = groups.items
    function getDefaultGroup(group_list: any, event: any) {
        const object = group_list.filter((obj: any) => {
            return obj.id === event.group
        })
        return object.group_name
    }
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
        dispatch(userActions.updateGroupEvent(event))
    }

    function handleInputChange(event1: any, value: any) {
        const object = groups_list.filter(obj => {
            return obj.group_name === value
        })
        setEvent(event => ({...event, ['group']: object[0].id}))
    }

    const classes = useStyles();
    return (<form className={classes.root} onSubmit={handleSubmit}>
        <Grid container className={classes.padding}>
            <Grid item xs={12} sm={6} className={classes.padding}>
                <h2 className={classes.marginAutoItem}>Zaktualizuj wydarzenie</h2>
                <Grid item>
                    <TextField variant="outlined" margin="normal" required
                        fullWidth id="event_name" label="Nazwa wydarzenia"
                        name="event_name" autoFocus value={event.event_name}
                        onChange={handleChange}
                    />
                </Grid>
                <Grid item>
                    <Autocomplete options={groups_list} getOptionLabel={(option) => option.group_name}
                        renderInput={(params) =>
                            <TextField {...params} variant="outlined" label="Grupy" name="group"/>}
                        onInputChange={handleInputChange}
                    />
                </Grid>
                <Grid item>
                    <TextField variant="outlined" margin="normal" required fullWidth id="start_date"
                        label="Data rozpoczęcia" name="start_date" type="datetime-local"
                        InputLabelProps={{shrink: true}}
                        value={moment(event.start_date).format('YYYY-MM-DDTHH:MM')}
                        onChange={handleChange}
                    />
                </Grid>
                <Grid item>
                    <TextField variant="outlined" margin="normal" required
                        fullWidth id="end_date" label="Data zakończenia"
                        name="end_date" type="datetime-local"
                        InputLabelProps={{shrink: true}}
                        value={moment(event.end_date).format('YYYY-MM-DDTHH:MM')}
                        onChange={handleChange}
                    />
                </Grid>
                <Grid item>
                    <TextField variant="outlined" margin="normal" required fullWidth
                        id="description" label="Opis" name="description" multiline
                        rows={5} value={event.description} onChange={handleChange}
                    />
                </Grid>
                <Button type="submit" fullWidth variant="contained" color="primary">Wyślij</Button>
            </Grid>
            <Grid item xs={12} sm={6}> </Grid>
        </Grid>
    </form>)
}

export {EventGroupUpdateForm}