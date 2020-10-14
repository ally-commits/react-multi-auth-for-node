import React from 'react';
import AddLoan from './addLoan/AddLoan'
import ViewLoan from './viewLoan/ViewLoan'
const Agent = (props) => {
    return (
        <div>
            {props.activeNav == "ADD_LOAN" && <AddLoan user={props.user} />}
            {props.activeNav == "VIEW_LOAN" && <ViewLoan user={props.user} />}
        </div>
    )
}

export default Agent;