import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Row from './row/Row'

const useStyles = makeStyles({
  table: {
    minWidth: 650, 
  },
}); 

const LoadData = (props) => {
    const [newVal,setNewVal] = React.useState()
    const classes = useStyles()
    return (
        <TableContainer component={Paper} variant="outlined">
        <Table className={classes.table} aria-label="simple table">
            <TableHead>
            <TableRow>
                <TableCell>Sl No</TableCell>
                <TableCell>Loan Status</TableCell>
                <TableCell>Interest Rate</TableCell>
                <TableCell>Duration</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell>Agent Email</TableCell>
                <TableCell>Agent Name</TableCell>
                <TableCell>User Email</TableCell>
                <TableCell>User Name</TableCell>
                <TableCell>Action</TableCell>
            </TableRow>
            </TableHead>
            <TableBody>
            {props.data.map((loan,index) => (
                <Row loan={loan} index={index} user={props.user} />
            ))}
            </TableBody>
        </Table>
        </TableContainer>
    );
}

export default LoadData;