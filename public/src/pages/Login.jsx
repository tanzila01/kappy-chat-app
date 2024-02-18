import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import snap from "../assets/snap.svg"
import {makeStyles} from "@material-ui/core"
import {useNavigate} from 'react-router-dom';
import Toast from '../utils/Toast';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { loginRoute } from '../utils/apiRoutes';
import axios from "axios"
import { setAuthentication } from '../utils/cookies';
import { getLocalStorage } from '../utils/localStorage';

const useStyles = makeStyles((theme) => ({
   root: {
    backgroundColor: "#131324",
    height:"100vh",
    width:"100vw",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  form:{
    display: "flex",
    flexDirection: "column",
    gap:"1rem",
    backgroundColor: "#00000076",
    padding: "71px",
    borderRadius: "5px",
  },
  formDiv:{
      display:"flex",
      flexDirection: "column",
      alignItems: "center",
  },
  input:{
    width: "95%",
    height: "39px",
    backgroundColor: "transparent",
    border: "2px solid #274568",
    borderRadius: "4px",
  },
  button:{
      backgroundColor:"#274568",
      width: "95%",
      height: "39px",
      border: "none",
      borderRadius: "4px",
      color:"white"
  }
}));

function Login() {
    const classes = useStyles();
    const navigate = useNavigate();
    useEffect(() => {
       const storage = getLocalStorage();
       console.log("checking storage", storage)
       if(storage){
           navigate("/")
       }
      }, [navigate]);
    const[credentials, setCredentials] = useState({
        username:"",
        password:"",
    })
    const changeHandler = (e) => {
        setCredentials({
            ...credentials,
            [e.target.name]:e.target.value
        })
    }
    const{username, password} = credentials
    const regiterHandler =async (e) => {
        e.preventDefault();
        if(validation()){
        await axios.post(loginRoute, credentials)
        .then((res) => {
            console.log("login res", res)
            const {token, user, status} = res.data
            if(status){
                setAuthentication(token, user)
                navigate("/")
            } else{
                toast.error(res.data.msg)
            }          
        })
        .catch((err) => console.log("err", err))
        }
    }
    const validation = () => {
        if(password === ""){
            toast.error("Password is required")
            return false;
        }else if(username === ""){
            toast.error("Username is required")
            return false;
        }else{
            return true;
        }
    }
    console.log("credentials", credentials)
return (
    <div className={classes.root}>
        <form className={classes.form}>
            <div className={classes.formDiv}>
                <img style={{width: "17%"}} src={snap} alt="logo" />
                <h1 style={{color:"white"}}>Kapy</h1>
            </div>
            <input className={classes.input}
                type="text"
                value={credentials.username || ""}
                placeholder='Username'
                name="username"
                onChange={changeHandler}
                min="1"
            />
            <input className={classes.input}
                type="password"
                value={credentials.password || ""}
                placeholder='Password'
                name="password"
                onChange={changeHandler}
            />
            <button className={classes.button} onClick={regiterHandler}>Login</button>
            <span style={{color:"white"}}>Don't have an account? 
                <Link style={{textDecoration:"none", color:"#274568", marginLeft:"2px"}} to="/register">
                    Register
                </Link>
            </span>
        </form>
        <ToastContainer
        theme='dark'       
        />
    </div>
)
}

export default Login