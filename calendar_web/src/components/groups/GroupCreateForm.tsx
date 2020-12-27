import React, {useEffect, useState} from "react";
import TextField from "@material-ui/core/TextField";
import {
    Checkbox,
    createStyles,
    Grid,
    Table, TableBody, TableCell, TableContainer,
    TableHead,
    TableRow,
    Theme
} from "@material-ui/core";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Button from "@material-ui/core/Button";
import {useDispatch, useSelector} from "react-redux";
import {userActions} from "../../actions/user.actions";
import {groupsActions} from "../../actions/groups.action";
import {CheckBox} from "@material-ui/icons";
import Paper from "@material-ui/core/Paper";

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
        },
        chips: {
            display: 'flex',
            flexWrap: 'wrap',
        },
        chip: {
            margin: 2,
        },
        noLabel: {
            marginTop: theme.spacing(3),
        },
        table: {
            minWidth: 650,
        },
    }),
);

function GroupCreateForm() {
    const users = useSelector((state: any) => state.users)
    const [group, setGroup] = useState({
        group_name: "",
        members: [],
    })
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(userActions.getUsers())
    }, [dispatch])

    function handleChange(e: any) {
        const {name, value} = e.target
        setGroup(group => ({...group, [name]: value}))
    }

    function handleSubmit(e: any) {
        e.preventDefault()
        dispatch(groupsActions.addGroup(group))
    }

    const classes = useStyles();
    return (<form className={classes.root} onSubmit={handleSubmit}>
        <Grid container className={classes.padding}>
            <Grid item xs={12} sm={6} className={classes.padding}>
                <h2 className={classes.marginAutoItem}>Utwórz grupę</h2>
                <Grid item>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="group_name"
                        label="Group name"
                        name="group_name"
                        autoFocus
                        value={group.group_name}
                        onChange={handleChange}
                    />
                </Grid>
                <Grid item>
                    <TableContainer component={Paper}>
                        <Table size="small">
                            <TableHead>
                                <TableRow>
                                    <TableCell> </TableCell>
                                    <TableCell>Imię</TableCell>
                                    <TableCell>Nazwisko</TableCell>
                                    <TableCell>Email</TableCell>
                                    <TableCell>Telefon</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {users.users && users.users.map((row: any, index: any) => {
                                    const labelId = `enhanced-table-checkbox-${index}`;
                                    return (<TableRow
                                        hover
                                        role="checkbox"
                                        tabIndex={-1}
                                        key={row.id}
                                    >
                                        <TableCell>
                                            <Checkbox
                                                checked={false}
                                                onChange={handleChange}
                                            />
                                        </TableCell>
                                        <TableCell
                                            component="th"
                                            id={labelId}
                                            scope="row"
                                            padding="none">{row.first_name}</TableCell>
                                        <TableCell>{row.last_name}</TableCell>
                                        <TableCell>{row.email}</TableCell>
                                        <TableCell>{row.telephone}</TableCell>
                                    </TableRow>)
                                })}
                            </TableBody>

                        </Table>
                    </TableContainer>
                </Grid>
                <Button type="submit" fullWidth variant="contained" color="primary">Wyślij</Button>
            </Grid>
            <Grid item xs={12} sm={6}> </Grid>
        </Grid>
    </form>)
}


export {GroupCreateForm}