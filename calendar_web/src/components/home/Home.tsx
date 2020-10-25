import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import NavigationBar from "../navbar/NavBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import {UserEvents} from "../user_events/UserEvents";


function Home() {
    const user = useSelector((state: any) => state.authentication.user)
    return (
        <div>
            <CssBaseline/>
            <NavigationBar/>
            <div>
                <h2>Dane:</h2>
                <ul>
                    <li>Email: {user.email}</li>
                    <li>Imię: {user.first_name}</li>
                    <li>Nazwisko: {user.last_name}</li>
                    <li>Numer tel.: {user.telephone}</li>
                </ul>
            </div>
            <UserEvents/>
        </div>

    )
}

export {Home}