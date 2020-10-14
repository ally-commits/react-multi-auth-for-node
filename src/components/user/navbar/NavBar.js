import React from 'react';
import {styles} from './styles';
import clsx from 'clsx';
import {useTheme } from '@material-ui/core/styles';

import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu'; 
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon'; 
import MailIcon from '@material-ui/icons/Mail';
import AddCircleOutlineRoundedIcon from '@material-ui/icons/AddCircleOutlineRounded';
import ExitToAppRoundedIcon from '@material-ui/icons/ExitToAppRounded';
import GroupRoundedIcon from '@material-ui/icons/GroupRounded';

const NavBar = (props) => {
    const classes = styles();
    const theme = useTheme();
    const [open, setOpen] = React.useState(true);
    const [activeNav,setActiveNav] = React.useState("ADD_LOAN")

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    return (
    <div className={classes.root}>
        <CssBaseline />
        <AppBar
            position="fixed"
            className={clsx(classes.appBar, {
                [classes.appBarShift]: open,
            })}
        >
            <Toolbar>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    onClick={handleDrawerOpen}
                    edge="start"
                    className={clsx(classes.menuButton, {
                        [classes.hide]: open,
                    })}
                >
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6" noWrap>
                    <h5>{props.userType} Dashboard</h5>
                </Typography> 
            </Toolbar>
        </AppBar>


        <Drawer
            variant="permanent"
            className={clsx(classes.drawer, {
                [classes.drawerOpen]: open,
                [classes.drawerClose]: !open,
            })}
            classes={{
                paper: clsx({
                [classes.drawerOpen]: open,
                [classes.drawerClose]: !open,
                }),
            }}
        >
        <div className={classes.toolbar}>
            <h3 className={classes.text}>{props.user.name}</h3>
            <IconButton onClick={handleDrawerClose}>
                <ChevronRightIcon />
            </IconButton>
        </div>

        <Divider />

        <List> 
            {props.userType == "CUSTOMER" &&
                <React.Fragment>
                    <ListItem button>
                        <ListItemIcon>
                            <MailIcon color="primary" style={{fontSize: "20px"}} />
                        </ListItemIcon>
                        <p style={{padding: '12px 0px'}}>My Application</p>
                    </ListItem> 
                </React.Fragment>
            }

            {props.userType == "AGENT" &&
                <React.Fragment>
                    <ListItem button onClick={() => props.setActiveNav("ADD_LOAN")}>
                        <ListItemIcon>
                            <AddCircleOutlineRoundedIcon color="primary" style={{fontSize: "20px"}} />
                        </ListItemIcon>
                        <p style={{padding: '12px 0px'}}>Add Loan</p>
                    </ListItem> 

                    <ListItem button onClick={() => props.setActiveNav("VIEW_LOANS")}>
                        <ListItemIcon>
                            <MailIcon color="primary" style={{fontSize: "20px"}} />
                        </ListItemIcon>
                        <p style={{padding: '12px 0px'}}>View Loans</p>
                    </ListItem> 
                </React.Fragment>
            }
            {props.userType == "ADMIN" &&
                <React.Fragment>
                    <ListItem button onClick={() => props.setActiveNav("ADD_AGENT")}>
                        <ListItemIcon>
                            <AddCircleOutlineRoundedIcon color="primary" style={{fontSize: "20px"}} />
                        </ListItemIcon>
                        <p style={{padding: '12px 0px'}}>Add Agent</p>
                    </ListItem> 

                    <ListItem button onClick={() => props.setActiveNav("VIEW_LOANS")}>
                        <ListItemIcon>
                            <MailIcon color="primary" style={{fontSize: "20px"}} />
                        </ListItemIcon>
                        <p style={{padding: '12px 0px'}}>View Loans</p>
                    </ListItem> 

                    <ListItem button onClick={() => props.setActiveNav("VIEW_USERS")}>
                        <ListItemIcon>
                            <GroupRoundedIcon color="primary" style={{fontSize: "20px"}} />
                        </ListItemIcon>
                        <p style={{padding: '12px 0px'}}>View Users</p>
                    </ListItem> 
                </React.Fragment>
            }



            <ListItem button onClick={() => props.changeAuthStatus()}>
                <ListItemIcon>
                    <ExitToAppRoundedIcon color="primary" style={{fontSize: "20px"}} />
                </ListItemIcon>
                <p style={{padding: '12px 0px'}}>Logout</p>
            </ListItem> 
        </List> 


        </Drawer>
        <main className={classes.content}>
            <div className={classes.toolbar} /> 
            {props.children} 
        </main>
    </div>
    );
}

export default NavBar;