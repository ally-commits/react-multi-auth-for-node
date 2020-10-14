import React from 'react'
import axios from 'axios';
import styles from './viewUser.module.css'
import CircularProgress from '@material-ui/core/CircularProgress'
import LoanData from './loandata/LoanData'

const ViewLoan = (props) => {
    const [data,setData] = React.useState(false);

    React.useEffect(() => {
        axios({
            method:"get",
            url: "/admin/get-users",
            headers: {
                "Authorization": props.user.token
            }
        }).then(res => {
            console.log(res)
            setData(res.data.users)
        }).catch(err => {
            console.log(err);
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
                    <p>No Users Yet</p>
                </div>
            }

            {showContent && 
                <LoanData data={data} />
            }
        </div>
    )
}

export default ViewLoan;