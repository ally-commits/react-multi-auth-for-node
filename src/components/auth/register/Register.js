import Axios from 'axios';
import React from 'react';
import styles from './register.module.css';
import axios from 'axios'
import Paper from '@material-ui/core/Paper'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

const Register = (props) => {
    const [formData,setFormData] = React.useState({
        email: "",
        password: "",
        name: ""
    });
    const [err,setErr] = React.useState({
        email: false,
        password: false,
        name: false
    })
    const [loading,setLoading] = React.useState(false)

    const validate = () => { 
        let valid = true;
        let error = {email: false,password: false};
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
                url: "/auth/register",
                nonAuth: true,
                data: {
                    ...formData
                }
            }).then(res => {
                setLoading(false);
                props.changeAuthStatus(res.data);
            }).catch(err => {
                setLoading(false); 
            })
        }
    }
    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <Paper className={styles.paper} variant="outlined">
                    <h1>Register</h1>

                    <TextField 
                        value={formData.name}
                        label="Enter Name"
                        type="text"
                        onChange={(e) => setFormData({...formData,name: e.target.value})}
                        helperText={err.name}
                        error={err.name}
                        className={styles.textField}
                        fullWidth
                    />


                    <TextField 
                        value={formData.email}
                        label="Enter Email"
                        type="email"
                        onChange={(e) => setFormData({...formData,email: e.target.value})}
                        helperText={err.email}
                        error={err.email}
                        className={styles.textField}
                        fullWidth
                    />

                    <TextField 
                        value={formData.password}
                        type="password"
                        label="Enter Password"
                        onChange={(e) => setFormData({...formData,password: e.target.value})}
                        helperText={err.password}
                        error={err.password}
                        className={styles.textField}
                        fullWidth
                    />

                    <div className={styles.contentSpace}>
                        <Button color="primary" onClick={() => props.changeState("LOGIN")}>Login Here</Button>
                        {loading 
                            ?
                        <Button variant="contained" color="primary">Loading...</Button>
                            :
                        <Button variant="contained" color="primary" onClick={onSubmit}>Register</Button>}
                    </div>
                </Paper>
            </div>         
        </div>
    )
}

export default Register;