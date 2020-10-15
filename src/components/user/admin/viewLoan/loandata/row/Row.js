import React from 'react'

import styles from '../load.module.css'
import FormControl from '@material-ui/core/FormControl'
import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button'
import axios from 'axios'

const Row = (props) => {
    const [oldVal,setOldVal] = React.useState(props.loan.status)
    const [newVal,setNewVal] = React.useState(props.loan.status)


    const loan = props.loan;
    const handleStatusUpdate = () => {
    
        axios({
            method: "put",
            url: "/admin/update-loan-status",
            headers: {
                "Authorization": props.user.token
            },
            data: {
                status: newVal,
                loan_id: props.loan._id
            }
        }).then(res => {
            setOldVal(newVal) 
        }).catch(err => { 
        });
    }
    return (
        <TableRow key={loan._id}>
            <TableCell>{props.index + 1}</TableCell>
            <TableCell>
                <FormControl> 
                    <Select
                        labelId="user-label"
                        id="demo-simple-select"
                        value={newVal}
                        onChange={(e) => setNewVal(e.target.value)}
                    > 
                        <MenuItem value={"NEW"}>NEW</MenuItem> 
                        <MenuItem value={"APPROVED"}>APPROVED</MenuItem> 
                        <MenuItem value={"REJECTED"}>REJECTED</MenuItem> 
                    </Select> 
                </FormControl>
            </TableCell>
            <TableCell>{loan.interestRate}</TableCell>
            <TableCell>{loan.duration}</TableCell>
            <TableCell>{loan.amount}</TableCell>
            <TableCell>{loan.user_id.email}</TableCell>
            <TableCell>{loan.user_id.name}</TableCell>
            <TableCell>{loan.agent_id.email}</TableCell>
            <TableCell>{loan.agent_id.name}</TableCell>
            <TableCell>
                <Button variant="contained" color="primary" disabled={oldVal == newVal} onClick={handleStatusUpdate}>
                    Update
                </Button>
            </TableCell>
        </TableRow>
    )
}

export default Row;