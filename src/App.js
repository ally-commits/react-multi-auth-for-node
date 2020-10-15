import React from 'react';
import styles from './styles/app.module.css'
import Auth from './components/auth/Auth'
import {ThemeProvider } from '@material-ui/core/styles';
import {theme} from './config/theme'
import { CircularProgress } from '@material-ui/core';
import User from './components/user/User'
import { backendUrl } from './config/keys';
import axios from 'axios'
import { globalComp } from '.';
import Header from './components/Header';

const App = (props) => {
  const [user,setUser] = React.useState(false);
  const [loading,setLoading] = React.useState(true);

  const [msg,setMsg] = React.useState(false)
   
  React.useEffect(() => {
    axios.interceptors.request.use(async (config) => {
      config.url = backendUrl + config.url
      return config;
    });

    axios.interceptors.response.use((response) => { 
      if(response && (response.status == 201 || response.status == 200)) {
        
        showMessage(response.data.message)
      } 
      return response;
    }, (error) => { 
      
      if(error && error.response && error.response.status == 400) {
        showMessage(error.response.data.error)  
      }

      if(error && error.response && error.response.status == 401) {
        showMessage("Unauthorized Requested...")  
      }

      if(error && error.response && error.response.status == 403) {
        showMessage("U Don't have access for this API")  
      }

      if(error && error.response && error.response.status == 500) {
        showMessage("Internal Server Error")  
      }

      return Promise.reject(error);
    }); 
  },[]);


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
    } else {
      localStorage.clear()
    }


    setUser(user)
  }

  const showMessage = (value) => {
    setMsg(value)
  }


  return (
    <div className={styles.app}>
      <ThemeProvider theme={theme}>

        <Header open={msg} handleClose={() => setMsg(false)}/>

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
