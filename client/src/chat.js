import React, {useEffect, useState} from 'react';
import ScrollToBottom from "react-scroll-to-bottom";

function Chat({socket, username, id}) {
    const [currentMessage, setCurrentMessage] = useState("")
    const [messageList, setMessageList] = useState([])
    const sendMessage = async () => {
        if(currentMessage !== ""){
            const MessageData = {
                room: id,
                author: username,
                message: currentMessage,
                time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes()
            }
            await socket.emit("send_message", MessageData)
            setMessageList((list) => [...list, MessageData])
        }
    }
    useEffect(() => {
        socket.on("receive_message", (data) => {
            setMessageList((list) => [...list, data])
        })
    }, [socket])
    return (
        <div className="chat-window">
            <div className="chat-header">
                <p>Live chat</p>
            </div>
            <div className="chat-body">
                <ScrollToBottom className="message-container">
                    {messageList.map((messageContent) => {
                        return <div
                            className="message"
                            id={username === messageContent.author ? "other" : "you"}
                        >
                            <div>
                                <div className="message-content">
                                    <p>{messageContent.message}</p>
                                </div>
                                <div className="message-meta">
                                    <p id="author">{messageContent.author}</p>
                                    <p id="time">{messageContent.time}</p>
                                </div>
                            </div>
                        </div>
                    })}
                </ScrollToBottom>
            </div>
            <div className="chat-footer">
                <input  value={currentMessage} type="text" placeholder="input..." onChange={event => setCurrentMessage(event.target.value)} />
                <button onClick={sendMessage}>&#9658;</button>
            </div>
        </div>
    );
}


export default Chat;