import React, {useState} from "react";
import {List} from "@material-ui/core";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ExitToAppOutlinedIcon from '@material-ui/icons/ExitToAppOutlined';
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import MenuIcon from '@material-ui/icons/Menu';
import {userActions} from "../../actions/user.actions";
import {history} from "../../helpers/history";
import {useDispatch} from "react-redux";
import EventOutlinedIcon from '@material-ui/icons/EventOutlined';
import PostAddOutlinedIcon from '@material-ui/icons/PostAddOutlined';
import GroupOutlinedIcon from '@material-ui/icons/GroupOutlined';
import GroupAddOutlinedIcon from '@material-ui/icons/GroupAddOutlined';
import SettingsOutlinedIcon from '@material-ui/icons/SettingsOutlined';
import EventAvailableOutlinedIcon from '@material-ui/icons/EventAvailableOutlined';
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
    const handleEventRoute = () => {
        history.push('/event/add')
    }
     const handleEventGroupRoute = () => {
        history.push('/event-group/add')
    }
    const handleHomePage = () => {
        history.push('')
    }
    const handleGroupRoute = () => {
        history.push('/groups/')
    }
    const handleGroupAddRoute = () => {
        history.push('/add/groups')
    }
    const list = (anchor: Anchor) => (
        <div
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}>
            <Divider/>
            <List>
                {['Wydarzenia', 'Dodaj wydarzenie', 'Dodaj wydarzenie grupowe', 'Grupy', 'Dodaj Grupę', 'Ustawienia'].map((text, index) => (
                    <ListItem button key={text} onClick={index === 0 ?
                        handleHomePage : index === 1 ?
                            handleEventRoute :
                            index === 2 ? handleEventGroupRoute :
                            index === 3 ? handleGroupRoute :
                                index === 4 ? handleGroupAddRoute : () => {} }>
                        <ListItemIcon>
                            {index === 0 ? <EventOutlinedIcon/> :
                            index === 1 ? <PostAddOutlinedIcon/> :
                            index === 2 ? <EventAvailableOutlinedIcon/> :
                            index === 3 ? <GroupOutlinedIcon/> :
                            index === 4 ? <GroupAddOutlinedIcon/> :
                            index === 5 ? <SettingsOutlinedIcon/> :
                            <SettingsOutlinedIcon/>}
                        </ListItemIcon>
                        <ListItemText primary={text}/>
                    </ListItem>
                ))}
                <Divider/>
                <List>
                    <ListItem button key={"Wyloguj się"} onClick={handleLogout}>
                        <ListItemIcon><ExitToAppOutlinedIcon/></ListItemIcon>
                        <ListItemText primary={"Wyloguj się"}/>
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