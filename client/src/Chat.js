import { Avatar } from '@material-ui/core'
import React, {useState} from 'react'
import './Chat.css'
import { IconButton} from "@material-ui/core"
import {AttachFile, InsertEmoticon, MoreVert, SearchOutlined} from "@material-ui/icons"
import MicIcon from "@material-ui/icons/Mic";
import axios from './axios';


function Chat({ messages }) {
    const [input, setInput] = useState("");
    const sendMessage = async (e) => {
         e.preventDefault();
         await axios.post('/messages/new',{
                message: input,
                name: "",
                timestamp: "Just Now!",
                received: false
            });
            setInput("");
    };

    return (
        <div className="chat">
           <div className="chat__header">
               <Avatar/>
               <div className="chat__headerInfo">
                   <h3>Room name</h3>
                   <p>Last seen at .....</p>
               </div>
               <div className="chat__headerRight">
               <IconButton>  
                  <SearchOutlined/>
                  </IconButton>  
                  <IconButton>  
                    <AttachFile/>
                  </IconButton>
                  <IconButton>  
                    <MoreVert/>
                  </IconButton>    
               </div>
           </div>
            <div className="chat__body">
                {messages.map((message) =>(
                     <p 
                     className={`chat__message ${message.received&&"chat__receiver"}`}
                     >
                     <span className="chat__name">{message.name}</span>  
                       {message.message}
                       <span className="chat__timestamp">
                          {message.timestamp}
                       </span>
                   </p>
                ))}
            </div>
            <div className="chat__footer">
                    <InsertEmoticon/>
                    <form>
                        <input 
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Type a message"
                        type="text"/> 
                        <button 
                        onClick={sendMessage}
                        type="submit">
                            Send a message
                        </button>
                    </form>
                    <MicIcon/>
                </div>

        </div>
    )
}

export default Chat
