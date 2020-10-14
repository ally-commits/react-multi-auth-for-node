import React from 'react';
import AddAgent from './addAgent/AddAgent';
import ViewLoan from './viewLoan/ViewLoan'
import ViewUsers from './viewUsers/ViewUser'


const Admin = (props) => {
    return (
        <div>
            {props.activeNav == "ADD_AGENT" && <AddAgent user={props.user} />}
            {props.activeNav == "VIEW_LOANS" && <ViewLoan user={props.user} />}
            {props.activeNav == "VIEW_USERS" && <ViewUsers user={props.user} />}
        </div>
    )
}

export default Admin;