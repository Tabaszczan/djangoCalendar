import React, {useState} from "react";
import {List} from "@material-ui/core";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import {ExitToApp, MailOutline} from "@material-ui/icons";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import MenuIcon from '@material-ui/icons/Menu';
import {userActions} from "../../actions/user.actions";
import {history} from "../../helpers/history";
import {useDispatch} from "react-redux";

type Anchor = 'right'

function DrawerRight() {
    const [state, setState] = useState({
        right: false,
    })
    const dispatch = useDispatch()
    const toggleDrawer = (anchor: Anchor, open: boolean) => (
        event: React.KeyboardEvent | React.MouseEvent,
    ) => {
        if (
            event.type === 'keydown' &&
            ((event as React.KeyboardEvent).key === 'Tab' ||
                (event as React.KeyboardEvent).key === 'Shift')
        ) {
            return;
        }
        setState({...state, [anchor]: open});
    };
    const handleLogout = () => {
        dispatch(userActions.logout())
        history.push('/')
    }
    const list = (anchor: Anchor) => (
        <div
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}>
            <List>
                {['Calendar', 'Add meeting', 'Groups', 'Settings'].map((text, index) => (
                    <ListItem button key={text}>
                        <ListItemIcon><MailOutline/></ListItemIcon>
                        <ListItemText primary={text}/>
                    </ListItem>
                ))}
                <Divider/>
                <List>
                    <ListItem button key={"Logout"} onClick={handleLogout}>
                        <ListItemIcon><ExitToApp/></ListItemIcon>
                        <ListItemText primary={"Logout"}/>
                    </ListItem>
                </List>
            </List>
        </div>
    )

    return (
        <div>
            {(['right'] as Anchor[]).map((anchor) => (
                <React.Fragment key={anchor}>
                    <MenuIcon onClick={toggleDrawer(anchor, true)}/>
                    <Drawer
                        anchor={anchor}
                        open={state[anchor]}
                        onClose={toggleDrawer(anchor, false)}
                    >
                        {list(anchor)}
                    </Drawer>
                </React.Fragment>
            ))}
        </div>
    )
}

export {DrawerRight}