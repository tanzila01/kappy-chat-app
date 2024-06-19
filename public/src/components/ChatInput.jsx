import React, {useState} from 'react'
import Picker from "emoji-picker-react";
import {makeStyles} from "@material-ui/core"

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
        // justifyContent: "space-between",
        // padding: "15px",
    }
}))  

function ChatInput({handleSendMsg}) {
    const classes = useStyles();
    const [msg, setMsg] = useState("");
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const handleEmojiPickerhideShow = () => {
      setShowEmojiPicker(!showEmojiPicker);
    };
    const handleEmojiClick = (event, emojiObject) => {
        let message = msg;
        message += emojiObject.emoji;
        setMsg(message);
      };
      const sendChat = (event) => {
        event.preventDefault();
        if (msg.length > 0) {
          handleSendMsg(msg);
          setMsg("");
        }
      };
return (
    <div className={classes.root}>
        <div className="emoji">
            <h3 style={{color:"white", marginRight:"10px", cursor:"pointer"}}  onClick={handleEmojiPickerhideShow} >Emoji</h3>
          {showEmojiPicker && <div style={{position:"absolute", top:"206px"}}><Picker onEmojiClick={handleEmojiClick}/></div>}
        </div>
        <form style={{display:"contents"}}>
            <input style={{
                width:"85%", height:"30px"
            }}
                type="text"
                placeholder="type your message here"
                onChange={(e) => setMsg(e.target.value)}
                value={msg}
            />
            <button onClick={sendChat}>
                Send
            </button>
        </form>
    </div>
)
}

export default ChatInput