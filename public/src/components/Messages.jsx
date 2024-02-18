import React from 'react'
import {makeStyles} from "@material-ui/core"

const useStyles = makeStyles((theme) => ({
    root: {
        height:"450px",
        overflowY: "scroll"
        // display: "flex",
        // justifyContent: "space-between",
        // padding: "15px",
    },
    message:{
      display:"flex",
      alignItems:"center",
      width: "fit-content",
      padding: "5px",
      borderRadius: "5%",
      color: "white",
      margin:"12px",
      maxWidth:"50%",
    },
    content:{
      display:"flex",
      alignItems:"center",
      // maxWidth: "50%",
    }
}))  

function Messages({messages, msg}) {
    const classes = useStyles();
    console.log("msg in mesg", msg)
  return (
    <div className={classes.root}>
        {messages.map((message) => {
          return (
              <div style={message.fromSelf? {justifyContent:"flex-end"} : {justifyContent: "flex-start"}} className={classes.content}>
                  <div style={message.fromSelf? {backgroundColor:"#4f04ff21"} : {backgroundColor: "#9900ff20"}} className={classes.message}>
                    <p>{message.message}</p>
                </div>
              </div>
          );
        })}
         {msg.map((message) => {
          return (
              <div style={message.message.fromSelf? {justifyContent:"flex-end"} : {justifyContent: "flex-start"}} className={classes.content}>
                  <div style={message.message.fromSelf? {backgroundColor:"#4f04ff21"} : {backgroundColor: "#9900ff20"}} className={classes.message}>
                    <p>{message.message.msg}</p>
                </div>
              </div>
          );
        })}
        {/* <div style={msg.message.fromSelf? {justifyContent:"flex-end"} : {justifyContent: "flex-start"}} className={classes.content}>
                  <div style={msg.message.fromSelf? {backgroundColor:"#4f04ff21"} : {backgroundColor: "#9900ff20"}} className={classes.message}> */}
                  {/* {msg ? <p>{msg.message.msg}</p> : null} */}
                {/* </div>
              </div> */}
    </div>
  )
}

export default Messages