import io from 'socket.io-client'
import './App.css';
import {useEffect, useState} from "react";
import Chat from "./chat";

const socket = io.connect('http://localhost:8082/')

function App() {
    const [username, setUsername] = useState("")
    const [id, setId] = useState("")
    const [showChat, setShowChat] = useState(true)
    const joinRoom = () => {
        if(username !== "" && id !== ""){
            setShowChat(false)
            socket.emit("join_room", id)
        }
    }
    return (
        <div className="App">
            {showChat ? (
                <div className="joinChatContainer">
                    <h3>
                        join chat
                    </h3>
                    <input type="text" placeholder="name..." onChange={event => setUsername(event.target.value)}/>
                    <input type="text" placeholder="id..." onChange={event => setId(event.target.value)}/>
                    <button onClick={joinRoom}>join a room</button>
                </div>
            ) : (
                <Chat socket={socket} username={username} id={id}></Chat>
            )}
        </div>
    );
}

export default App;
