import React from 'react';
import styles from './styles/app.module.css'
import routerConfig from './config/routes'
import Auth from './components/auth/Auth'
import {ThemeProvider } from '@material-ui/core/styles';
import {theme} from './config/theme'
import { CircularProgress } from '@material-ui/core';
import User from './components/user/User'

const App = () => {
  const [user,setUser] = React.useState(false);
  const [loading,setLoading] = React.useState(true)
  

  React.useEffect(() => {
    if(localStorage.user) {
      let user = JSON.parse(localStorage.getItem("user"))
      if(user.token && user.user) {
        setUser(user);
        setLoading(false);
      }
    } else {
      localStorage.clear();
      setLoading(false)
    }
  },[]);


  const changeAuthStatus = (user) => {
    if(user) {
      localStorage.setItem("user",JSON.stringify(user))
    }
    setUser(user)
  }


  return (
    <div className={styles.app}>
      <ThemeProvider theme={theme}>
        {loading 
          &&
        <div className={styles.loader}>
          <CircularProgress />
        </div>}


        {!loading  &&
        <React.Fragment>
          {user 
            ?
          <User user={user} changeAuthStatus={changeAuthStatus}/>
            :
          <Auth user={user} changeAuthStatus={changeAuthStatus}  />}
        </React.Fragment>}


      </ThemeProvider>
    </div>
  );
}

export default App;
