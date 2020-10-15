import React from 'react'; 
import Modal from '@material-ui/core/Modal';
import styles from './updateloan.module.css';
import CloseRoundedIcon from '@material-ui/icons/CloseRounded';
import EditRoundedIcon from '@material-ui/icons/EditRounded';
import IconButton from '@material-ui/core/IconButton'
import TextField from '@material-ui/core/TextField'
import axios from 'axios'
import Button from '@material-ui/core/Button'

const PropModal = (props) => {  
    const [open, setOpen] = React.useState(false);
    

    const [formData,setFormData] = React.useState({
        interestRate: props.loan.interestRate,
        duration: props.loan.duration,
        amount: props.loan.amount,
    });
    const [err,setErr] = React.useState({
        interestRate: false,
        duration: false,
        amount: false, 
    })
    const [loading,setLoading] = React.useState(false)

    const validate = () => { 
        let valid = true;
        let error = {interestRate: false,duration: false,amount: false};
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
                method: "put",
                url: "/agent/update-loan",
                headers: {
                    "Authorization": props.user.token
                },
                data: {
                    ...formData,
                    loan_id: props.loan._id
                }
            }).then(res => {
                setLoading(false);  
                setOpen(false)
                props.fetchData()
            }).catch(err => {
                setLoading(false); 
            })
        }
    }
  return (
    <div> 
        <IconButton onClick={() => setOpen(true)}>
            <EditRoundedIcon />
        </IconButton>


        <Modal
            open={open}
            onClose={() => setOpen(false)} 
        > 
            <div className={styles.modal}>
                <div className={styles.content}>
                    <div className={styles.alignContent}>
                        <h1>Update Loan</h1> 

                        <IconButton onClick={() => setOpen(false)}>
                            <CloseRoundedIcon />
                        </IconButton>
                    </div>
                    
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
                        <Button variant="contained" color="primary" onClick={onSubmit}>Update Loan</Button>}
                    </div> 
                </div>
            </div> 
        </Modal>
    </div>
  );
} 
export default PropModal;