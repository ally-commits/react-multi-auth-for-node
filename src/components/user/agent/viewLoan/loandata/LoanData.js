import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import styles from './load.module.css'


const useStyles = makeStyles({
  table: {
    minWidth: 650, 
  },
}); 

const LoadData = (props) => {
    const classes = useStyles()
    return (
        <TableContainer component={Paper} variant="outlined">
        <Table className={classes.table} aria-label="simple table">
            <TableHead>
            <TableRow>
                <TableCell>Sl No</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Interest Rate</TableCell>
                <TableCell>Duration</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell>User Email</TableCell>
                <TableCell>User Name</TableCell>
                <TableCell>Created At</TableCell>
            </TableRow>
            </TableHead>
            <TableBody>
            {props.data.map((loan,index) => (
                <TableRow key={loan._id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>
                        {loan.status == "NEW" && <p className={styles.tagBlue}>NEW</p>}
                        {loan.status == "REJECTED" && <p className={styles.tagRed}>REJECTED</p>}
                        {loan.status == "APPROVED" && <p className={styles.tagGreen}>APPROVED</p>}
                    </TableCell>
                    <TableCell>{loan.interestRate}</TableCell>
                    <TableCell>{loan.duration}</TableCell>
                    <TableCell>{loan.amount}</TableCell>
                    <TableCell>{loan.user_id.email}</TableCell>
                    <TableCell>{loan.user_id.name}</TableCell>
                    <TableCell>{loan.createdAt}</TableCell>
                </TableRow>
            ))}
            </TableBody>
        </Table>
        </TableContainer>
    );
}

export default LoadData;