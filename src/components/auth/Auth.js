import React from 'react';
import styles from './auth.module.css';
import Login from './login/Login'
import Register from './register/Register'

const Auth = (props) => {
    const [comp,setComp] = React.useState("LOGIN");

    const changeState = (val) => {
        setComp(val)
    }
    return (
        <div className={styles.container}>
            {comp == "LOGIN"
                ?
            <Login changeState={changeState} changeAuthStatus={props.changeAuthStatus}/>
                :
            <Register changeState={changeState} changeAuthStatus={props.changeAuthStatus} />}
        </div>
    )
}

export default Auth;