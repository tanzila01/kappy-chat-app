import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import snap from "../assets/snap.svg"
import {makeStyles} from "@material-ui/core"
import {useNavigate} from 'react-router-dom';
import Toast from '../utils/Toast';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { registerRoute } from '../utils/apiRoutes';
import axios from "axios"
import { setAuthentication } from '../utils/cookies';

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

function Register() {
    const classes = useStyles();
    const navigate = useNavigate();
    const[credentials, setCredentials] = useState({
        username:"",
        email:"",
        password:"",
        confirmPassword:""
    })
    const changeHandler = (e) => {
        setCredentials({
            ...credentials,
            [e.target.name]:e.target.value
        })
    }
    const{username, password, email, confirmPassword} = credentials
    const regiterHandler = (e) => {
        e.preventDefault();
        if(validation()){
        axios.post(registerRoute, credentials)
        .then((res) => {
            const {token, user, status} = res.data
            setAuthentication(token, user)
            navigate("/")
        })
        .catch((err) => console.log("err", err))
        }
    }
    const validation = () => {
        if(password !== confirmPassword){
            toast.error("please match the passwords")
            return false;
        }else if(email === ""){
            toast.error("email cannot be empty")
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
            />
            <input className={classes.input}
                type="email"
                value={credentials.email || ""}
                placeholder='Email'
                name="email"
                onChange={changeHandler}
            />
            <input className={classes.input}
                type="password"
                value={credentials.password || ""}
                placeholder='Password'
                name="password"
                onChange={changeHandler}
            />
            <input className={classes.input}
                type="password"
                value={credentials.confirmPassword || ""}
                placeholder='Confirm Password'
                name="confirmPassword"
                onChange={changeHandler}
            />
            <button className={classes.button} onClick={regiterHandler}>Register</button>
            <span style={{color:"white"}}>Already have an account? 
                <Link style={{textDecoration:"none", color:"#274568", marginLeft:"2px"}} to="/login">
                    Login
                </Link>
            </span>
        </form>
        <ToastContainer
        theme='dark'       
        />
    </div>
)
}

export default Register