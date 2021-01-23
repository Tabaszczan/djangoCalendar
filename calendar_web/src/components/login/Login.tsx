import React, {useEffect, useState} from "react";
import Avatar from "@material-ui/core/Avatar";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {Theme, Link as UrlLink} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";
import CssBaseline from "@material-ui/core/CssBaseline";
import logo from '../../img/logo.png'
import {useLocation} from 'react-router-dom'
import {userActions} from "../../actions/user.actions";
import CircularProgress from "@material-ui/core/CircularProgress";

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
        gridPaper: {
            padding: theme.spacing(0, 8),
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        },
        img: {
            maxWidth: '90%',
            height: 'auto',
        },
    })
)

export function Copyright() {

    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <UrlLink color="inherit" href="#">
                Calendar
            </UrlLink>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

export function LogoBig() {
    const classes = useStyles()
    return (
        <Grid item xs={false} sm={false} md={7} className={classes.gridPaper}>
            <img src={logo} alt={"logo"} className={classes.img}/>
        </Grid>
    )
}

function Login() {
    const [inputs, setInputs] = useState({
        email: '',
        password: '',
    })
    const { email, password } = inputs;
    const loggingIn = useSelector((state: any) => state.authentication.loggingIn);
    const dispatch = useDispatch();
    const location = useLocation();

    useEffect(() => {
        dispatch(userActions.logout())
        // eslint-disable-next-line
    }, [])

    function handleChange(e: any) {
        const { name, value} = e.target;
        setInputs(inputs => ({...inputs, [name]: value}))
    }
    function handleSubmit (e: any){
        e.preventDefault()
        if(email && password){
            const {from}: any = location.state || {from: {pathname: '/'}}
            dispatch(userActions.login(email, password, from))
        }
    }
    const classes = useStyles()
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
                        Zaloguj się
                    </Typography>
                    <form onSubmit={handleSubmit} >
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email"
                            name="email"
                            autoComplete="email"
                            value={email}
                            onChange={handleChange}
                            autoFocus
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Hasło"
                            type="password"
                            id="password"
                            value={password}
                            onChange={handleChange}
                            autoComplete="current-password"
                        />
                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary"/>}
                            label="Zapamiętaj mnie"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                        >
                            Zaloguj się
                        </Button>{loggingIn &&  <CircularProgress/>}
                        <Grid container>
                            <Grid item xs>
                            </Grid>
                            <Grid item>
                                <UrlLink href={"/register"} variant="body2">
                                    {"Nie posiadasz konta? Zarejestruj się"}
                                </UrlLink>
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

export {Login};