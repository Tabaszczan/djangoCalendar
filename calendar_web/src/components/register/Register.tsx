import React, {useEffect, useState} from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {Theme} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";
import Grid from "@material-ui/core/Grid";
import CssBaseline from "@material-ui/core/CssBaseline";
import {LogoBig, Copyright} from "../login/Login";
import Avatar from "@material-ui/core/Avatar";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";
import Box from "@material-ui/core/Box";
import {userActions} from "../../actions/user.actions";
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme: Theme) => ({
        paper: {
            margin: theme.spacing(8, 4),
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        },
        root: {
            height: '100vh',
            alignItems: 'center',
        },
        grid: {
            padding: theme.spacing(0, 2),
        },
    })
)

function Register() {
    const classes = useStyles()
    const [user, setUser] = useState({
        email: "",
        password1: "",
        password2: "",
        first_name: "",
        last_name: "",
        telephone: "",
    })
    const registering = useSelector((state: any) => state.registration.registering)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(userActions.logout())
        // eslint-disable-next-line
    }, [])

    function handleChange(e: any) {
        const {name, value} = e.target;
        setUser(user => ({...user, [name]: value}));
    }

    function handleSubmit(e: any) {
        e.preventDefault();

        if (user.first_name && user.last_name && user.email && user.password1 && user.password2) {
            dispatch(userActions.register(user));
        }
    }

    return (
        <Grid container component="main" className={classes.root}>
            <CssBaseline/>
            <LogoBig/>
            <Grid item xs={12} sm={12} md={5}>
                <div className={classes.paper}>
                    <Avatar>
                        <LockOutlinedIcon/>
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign up
                    </Typography>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            value={user.email}
                            onChange={handleChange}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="password1"
                            label="Password"
                            type="password"
                            id="password1"
                            autoComplete="current-password1"
                            value={user.password1}
                            onChange={handleChange}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="password2"
                            label="Password (confirm)"
                            type="password"
                            id="password2"
                            autoComplete="current-password2"
                            value={user.password2}
                            onChange={handleChange}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            id="first_name"
                            label="First name"
                            name="first_name"
                            value={user.first_name}
                            onChange={handleChange}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            id="last_name"
                            label="Last name"
                            name="last_name"
                            value={user.last_name}
                            onChange={handleChange}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            id="telephone"
                            label="Phone number"
                            name="telephone"
                            value={user.telephone}
                            onChange={handleChange}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                        >
                            Sign Up
                        </Button>{registering && <CircularProgress/>}
                        <Grid container>
                            <Grid item>
                                <Link href={"/login"} variant="body2">
                                    {"Have an account? Sign In"}
                                </Link>
                            </Grid>
                        </Grid>
                        <Box mt={5}>
                            <Copyright/>
                        </Box>
                    </form>
                </div>
            </Grid>
        </Grid>
    )
}

export {Register}