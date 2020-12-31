import React from "react";
import "./Sidebar.css";
import DonutLargeIcon from "@material-ui/icons/DonutLarge"
import {Avatar, IconButton} from "@material-ui/core"
import ChatIcon from "@material-ui/icons/Chat"
import MoreVertIcon from "@material-ui/icons/MoreVert"

function Sidebar() {
    return (
        <div className="sidebar">
            <div className="sidebar__header">
                <Avatar 
                src="https://avatars3.githubusercontent.com/u/49169934?s=400&u=56c4a06482743507101af3c9dcd809c247bda85f&v=4"/>
                <div className="sidebar__headerRight">
                  <IconButton>  
                    <DonutLargeIcon/>
                  </IconButton>  
                  <IconButton>  
                    <ChatIcon/>
                  </IconButton>
                  <IconButton>  
                    <MoreVertIcon/>
                  </IconButton>    
                </div>
            </div>
        </div>
    )
}

export default Sidebar
