import React from 'react'
import axios from 'axios';
import styles from './customer.module.css'
import CircularProgress from '@material-ui/core/CircularProgress'
import LoanData from './loandata/LoanData'

const Customer = (props) => {
    const [data,setData] = React.useState(false);

    React.useEffect(() => {
        axios({
            method:"get",
            url: "/customer/get-loans",
            headers: {
                "Authorization": props.user.token
            }
        }).then(res => { 
            setData(res.data.details.loans)
        }).catch(err => { 
        })
    },[]);

    const isLoading = !data;
    const isEmpty = !isLoading && data.length == 0;
    const showContent = !isLoading && !isEmpty;
 
    return (
        <div className={styles.container}>
            {isLoading &&
                <div className={styles.loader}>
                    <CircularProgress />
                </div>
            }

            {isEmpty &&
                <div className={styles.loader}>
                    <p>No Loans Applied Yet</p>
                </div>
            }

            {showContent && 
                <LoanData data={data} />
            }
        </div>
    )
}

export default Customer;