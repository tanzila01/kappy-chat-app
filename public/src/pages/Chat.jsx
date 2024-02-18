import React, {useCallback, useEffect, useState} from 'react'
import {makeStyles} from "@material-ui/core"
import { getLocalStorage } from '../utils/localStorage';
import { contactsRoute } from '../utils/apiRoutes';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import Contacts from "../components/Contacts"
import Welcome from '../components/Welcome';
import ChatContainer from '../components/ChatContainer';
import {io} from "socket.io-client"

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: "#131324",
        height:"100vh",
        width:"100vw",
        display: "flex",
        flexDirection:"column",
        justifyContent: "center",
        alignItems: "center",
        gap: "1rem"
      },
      rootSub:{
        height:" 85vh",
        width:" 85vw",
        backgroundColor: "#00000076",
        display:" grid",
        gridTemplateColumns:"25% 75%",
      }
 }));

function Chat() {
    const classes = useStyles();
    const navigate = useNavigate();
    // const[msg, setMsg] = useState("")
    // const socket = io('http://localhost:5000')
    // socket.emit('chat message', {username : "tani"});
    // socket.on('chat message', (msg) => {
    //   console.log("response message", msg)
    //   setMsg(msg)
    // })
    
    useEffect(() => {
      const storage = getLocalStorage();
      console.log("checking storage", storage)
      if(!storage){
          navigate("/login")
      }
     }, [navigate]);

    const [contacts, setContacts] = useState([]);
  const [currentUser, setCurrentUser] = useState({
    email: "",
    username: "",
    _id: ""
  });
  const [currentChat, setCurrentChat] = useState({
    email: "",
    username: "",
    _id: "",
  });

  useEffect(() => {
        const storage = getLocalStorage();
        if(!storage){
            navigate("login")
        }else{
            setCurrentUser(storage)
        }
  }, [navigate]);
  console.log("id", currentUser._id)

//   const contactApi = async() => {
//     await axios.get(`${contactsRoute}/:${currentUser._id}`)
//         .then((res) => {
//             console.log("res", res)
//             setContacts(res)         
//         })
//         .catch((err) => console.log("err", err))
//   }

  const contactApis = useCallback(
    async() => {
        if(currentUser._id !== ""){
          await axios.get(`${contactsRoute}/${currentUser._id}`)
            .then((res) => {
                // console.log("res", res)
                setContacts(res.data)         
            })
            .catch((err) => console.log("err", err))
        }
      },[currentUser]
  )
  useEffect(() => {
   contactApis();
}, [currentUser, contactApis]);

const handleChatChange = (chat) => {
  setCurrentChat(chat);
};

console.log("current chat", currentChat)

return (
    <div className={classes.root}>
        <div className={classes.rootSub}>
          <Contacts contacts={contacts} handleChatChange={handleChatChange}/>
          {currentChat.email === "" || currentChat.username === "" ? <Welcome/> : <ChatContainer currentChat={currentChat} user={currentUser}/>}
        </div>
    </div>
)
}

export default Chat