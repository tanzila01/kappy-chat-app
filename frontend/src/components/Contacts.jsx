import React, {useState, useEffect} from 'react'
import { getLocalStorage } from '../utils/localStorage';
import Logo from "../assets/snap.svg"
import {makeStyles} from "@material-ui/core"

const useStyles = makeStyles((theme, currentSelected) => ({
    root: {
        backgroundColor: "#131324",
        height:"100vh",
        width:"100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    image:{
        display:"Flex",
        flexDirection:"row",
        justifyContent:"center",
        alignItems:"center"
    },
    user:{
        display:"Flex",
        flexDirection:"row",
        alignItems:"center"
    },
    contacts:{
        // backgroundColor: "#ffffff39",
        display: "flex",
        alignItems: "center",
        marginTop:"10px",
    }
})); 

function Contacts({contacts, handleChatChange}) {
const [currentUserName, setCurrentUserName] = useState("");
//   const [currentUserImage, setCurrentUserImage] = useState(undefined);
const [currentSelected, setCurrentSelected] = useState("");

const classes = useStyles({});
const getStorage = async() => {
    const storage = await getLocalStorage();
    setCurrentUserName(storage.username)
}

useEffect(() => {
    getStorage();
}, []); 

const changeCurrentChat = (username, contact) => {
    setCurrentSelected(username);
    handleChatChange(contact);
};

return (
    <>
    {currentUserName ? (
        <div style={{padding:"10px"}}>
            <div className={classes.image}>
                <img style={{width: "12%"}} src={Logo} alt="logo" />
                <h3 style={{color:"white", marginLeft:"8px"}}>snappy</h3>
            </div>
            <div className={classes.user}>
                <img style={{width: "12%", borderRadius:"50%"}} src={Logo} alt="logo" />
                <h4 style={{color:"white", marginLeft:"12px"}}>{currentUserName}</h4>
            </div>
            <div>
                {contacts.map((contact, index) => {
                return (
                    <div
                    key={contact._id}
                    >
                    <div style={
                            currentSelected === contact.username ?
                            {backgroundColor:"#9a86f3"} :
                            {backgroundColor:"#ffffff39"}
                            } 
                            className={classes.contacts}
                            onClick={() => changeCurrentChat(contact.username, contact)}>
                        <img style={{width: "12%", borderRadius:"50%"}} src={Logo} alt="logo" />
                        <h3 style={{color:"white", marginLeft:"12px"}} >{contact.username}</h3>
                    </div>
                    </div>  
                );
                })}
            </div>
        </div>
    ) : null}
    </>
)
}

export default Contacts