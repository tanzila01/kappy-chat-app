import React, { useState, useEffect } from "react";
import { getLocalStorage } from '../utils/localStorage';
import {makeStyles} from "@material-ui/core"
import Logo from "../assets/snap.svg"
import Logout from "./Logout";
import ChatInput from "./ChatInput";
import Messages from "./Messages";
import {sendMessageRoute, recieveMessageRoute} from "../utils/apiRoutes"
import axios from "axios";
import {io} from "socket.io-client";

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
        justifyContent: "space-between",
        padding: "15px",
    },
    userInfo:{
        display: "flex",
        alignItems: "center",
        padding: "10px",
    }
}))

function ChatContainer({currentChat, user}) {
    console.log("current chat", currentChat)
    console.log("user", user)
const [currentUser, setcurrentUser] = useState("");
const classes = useStyles();
const getStorage = async() => {
    const storage = await getLocalStorage();
    setcurrentUser(storage)
}

useEffect(() => {
    getStorage();
}, []); 
console.log("current user", currentUser)

const [messages, setMessages] = useState([]);
const[msg, setMsg] = useState([])
const socket = io('http://localhost:5000')
// socket.emit('chat message', {username : "tani"});
// socket.on('chat message', (msg) => {
//   console.log("response message", msg)
//   setMsg(msg)
// })

console.log("msg", msg)

// const scrollRef = useRef();
// const [arrivalMessage, setArrivalMessage] = useState(null);

const getMessages = async() => {
    if(user._id){
        const response = await axios.post(recieveMessageRoute, {
            from: user._id,
            to: currentChat._id,
          });
          console.log("res", response)
          setMessages(response.data);
    }
    }

useEffect(() => {
  getMessages();
}, [currentChat]);

console.log("messges", messages)

const handleSendMsg = async(msgs) => { 
    socket.emit('chat message', {
      from: currentUser._id,
      to: currentChat._id,
      message: {
        msg: msgs, 
        fromSelf: true,
      },
    });
    socket.on('chat message', (msgs) => {
    console.log("response message", msgs)
    setMsg([...msg, msgs])
    })
    await axios.post(sendMessageRoute, {
        from: currentUser._id,
        to: currentChat._id,
        message: msg,
    });
}

  return (
    <div>
        <div className={classes.root}>
            <div className={classes.userInfo}>
                <img style={{width: "4%", borderRadius:"50%"}} src={Logo} alt="logo" />
                <h3 style={{color:"white", marginLeft:"15px"}}>{currentChat.username}</h3>
            </div>
            <div>
                <Logout/>
            </div>
        </div>
        {/* <div>
        {messages.map((message) => {
          return (
            <div>
              <div
                className={`message ${
                  message.fromSelf ? "sended" : "recieved"
                }`}
              >
                <div className="content ">
                  <p>{message.message}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div> */}
      {/* {msg ? <p>{msg.message.msg}</p> : null} */}
        <Messages messages={messages} msg={msg}/>
        <ChatInput handleSendMsg={handleSendMsg}/>
    </div>
  )
}

export default ChatContainer