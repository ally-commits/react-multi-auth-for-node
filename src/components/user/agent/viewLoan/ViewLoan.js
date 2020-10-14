import React from 'react'
import axios from 'axios';
import styles from './viewLoan.module.css'
import CircularProgress from '@material-ui/core/CircularProgress'
import LoanData from './loandata/LoanData'

const ViewLoan = (props) => {
    const [data,setData] = React.useState(false);

    React.useEffect(() => {
        axios({
            method:"get",
            url: "/agent/get-loans",
            headers: {
                "Authorization": props.user.token
            }
        }).then(res => {
            console.log(res)
            setData(res.data.loans)
        }).catch(err => {
            console.log(err);
        })
    },[]);

    const isLoading = !data;
    const isEmpty = !isLoading && data.length == 0;
    const showContent = !isLoading && !isEmpty;

    console.log(data)
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

export default ViewLoan;