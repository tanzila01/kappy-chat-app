import React, { useState, useEffect } from "react";
import Robot from "../assets/robot.gif";
import { getLocalStorage } from '../utils/localStorage';
import {makeStyles} from "@material-ui/core"

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
        justifyContent: "center",
        flexDirection:"column",
        alignItems: "center",
    },
})); 

export default function Welcome() {

  const [userName, setUserName] = useState("");
const classes = useStyles({});

const getStorage = async() => {
    const storage = await getLocalStorage();
    setUserName(storage.username)
}

useEffect(() => {
    getStorage();
}, []); 

  return (
    <div className={classes.root}>
      <img style={{margin:"0px", width:"38%"}} src={Robot} alt="" />
      <h1 style={{margin:"0px", color:"white"}}>
        Welcome, <span>{userName}!</span>
      </h1>
      <h3 style={{margin:"0px", color:"white"}}>Please select a chat to Start messaging.</h3>
    </div>
  );
}