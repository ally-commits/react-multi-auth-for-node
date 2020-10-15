import React from 'react';
import NavBar from './navbar/NavBar'
import Customer from './customer/Customer'
import Agent from './agent/Agent'
import Admin from './admin/Admin'


const User = (props) => {
    const [userType,setUserType] = React.useState("NONE")
    const [activeNav,setActiveNav] = React.useState("VIEW_LOANS")


    React.useEffect(() => {
        setUserType(props.user.user.role)
    },[]);

    return (
        <React.Fragment>
            <NavBar 
                userType={userType} 
                user={props.user.user} 
                changeAuthStatus={props.changeAuthStatus}
                setActiveNav={(val) => setActiveNav(val)}
            >
                {userType == "CUSTOMER" && <Customer user={props.user} />}

                {userType == "AGENT" && <Agent activeNav={activeNav} user={props.user} setActiveNav={(val) => setActiveNav(val)}/>}

                {userType == "ADMIN" && <Admin activeNav={activeNav} user={props.user} setActiveNav={(val) => setActiveNav(val)} />}
            </NavBar>
        </React.Fragment>
    );
}

export default User;