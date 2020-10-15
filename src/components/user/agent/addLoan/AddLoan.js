import React from 'react';
import styles from './addloan.module.css';
import axios from 'axios'
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { CircularProgress } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    formControl: {
       
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
}));

const Login = (props) => {
    const [users,setUsers] = React.useState(false);

    React.useEffect(() => {
        axios({
            method:"get",
            url: "/agent/get-users",
            headers: {
                "Authorization": props.user.token
            }
        }).then(res => { 
            setUsers(res.data.users)
        }).catch(err => { 
        })
    },[])

    const [formData,setFormData] = React.useState({
        interestRate: "",
        duration: "",
        amount: "",
        user_id: ""
    });
    const [err,setErr] = React.useState({
        interestRate: false,
        duration: false,
        amount: false,
        user_id: false
    })
    const [loading,setLoading] = React.useState(false)

    const validate = () => { 
        let valid = true;
        let error = {interestRate: false,duration: false,amount: false,user_id: false};
        Object.keys(formData).map(key => {
            if(formData[key] == "") { 
                error[key] = `* ${key} field cannot be empty`;
                valid = false;
            }
        });
        setErr({...error})
        return valid;
    } 

    const onSubmit = () => {
        if(validate()) {
            setLoading(true);
            axios({
                method: "post",
                url: "/agent/create-loan",
                headers: {
                    "Authorization": props.user.token
                },
                data: {
                    ...formData
                }
            }).then(res => {
                setLoading(false);  
                props.setActiveNav("VIEW_LOANS")
            }).catch(err => {
                setLoading(false); 
            })
        }
    }
    const classes = useStyles();
    const isLoading = !users;
    return (
        <div className={styles.container}>
            <div className={styles.content}>
                {isLoading &&
                    <div className={styles.loader}>
                        <CircularProgress />
                    </div>
                }
                {!isLoading &&
                <Paper className={styles.paper} variant="outlined">
                    <h1>Add Loan</h1>

                    <FormControl className={classes.formControl} fullWidth error={err.user_id}>
                        <InputLabel id="user-label">Select User</InputLabel>
                        <Select
                            labelId="user-label"
                            id="demo-simple-select"
                            value={formData.user_id}
                            onChange={(e) => setFormData({...formData,user_id: e.target.value})}
                        >
                            {users.map(user => {
                                return (
                                    <MenuItem value={user._id}>{user.name}</MenuItem>
                                )
                            })}
                        </Select>
                        {err.user_id &&
                            <FormHelperText>{err.user_id}</FormHelperText>
                        }
                    </FormControl>
                    
                    <TextField 
                        value={formData.interestRate}
                        label="Enter interestRate"
                        type="number"
                        onChange={(e) => setFormData({...formData,interestRate: e.target.value})}
                        helperText={err.interestRate}
                        error={err.interestRate}
                        className={styles.textField}
                        fullWidth
                    />

                    <TextField 
                        value={formData.duration}
                        type="number"
                        label="Enter duration"
                        onChange={(e) => setFormData({...formData,duration: e.target.value})}
                        helperText={err.duration}
                        error={err.duration}
                        className={styles.textField}
                        fullWidth
                    />

                    <TextField 
                        value={formData.amount}
                        type="number"
                        label="Enter amount"
                        onChange={(e) => setFormData({...formData,amount: e.target.value})}
                        helperText={err.amount}
                        error={err.amount}
                        className={styles.textField}
                        fullWidth
                    />

                    <div className={styles.contentSpace}> 
                        {loading 
                            ?
                        <Button variant="contained" color="primary">Loading...</Button>
                            :
                        <Button variant="contained" color="primary" onClick={onSubmit}>Add Loan</Button>}
                    </div>
                </Paper>}
            </div>         
        </div>
    )
}

export default Login;