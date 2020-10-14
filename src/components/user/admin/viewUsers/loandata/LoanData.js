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
                <TableCell>User Type</TableCell> 
                <TableCell>Email</TableCell>
                <TableCell>Name</TableCell>  
            </TableRow>
            </TableHead>
            <TableBody>
            {props.data.map((user,index) => (
                <TableRow key={user._id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>
                        {user.role == "CUSTOMER" && <p className={styles.tagBlue}>CUSTOMER</p>}
                        {user.role == "AGENT" && <p className={styles.tagRed}>AGENT</p>}
                        {user.role == "ADMIN" && <p className={styles.tagGreen}>ADMIN</p>}
                    </TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.name}</TableCell>  
                </TableRow>
            ))}
            </TableBody>
        </Table>
        </TableContainer>
    );
}

export default LoadData;