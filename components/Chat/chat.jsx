"use client"
import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import io from 'socket.io-client';
import { usePathname } from 'next/navigation';
import { useFetchMessages } from '@hooks/Chat/chat';
import { useAuth } from "@context/AuthContext";



const socket = io("http://localhost:3500");

const ChatComponent = () => {
  const pathname = usePathname();
  const [fetchedMessages, loading] = useFetchMessages();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [toUserId, setToUserId] = useState(null);
  const [fromUserId, setFromUserId] = useState(null);
  const { user } = useAuth();
  const formatDate = (timestamp) => {
    return format(new Date(timestamp), 'HH:mm' )
  }



  useEffect(() => {
    // Extraction des IDs
    const ids = pathname.split('/chat/')[1].split('+');
    setToUserId(ids[0]);
    setFromUserId(ids[1]);

    // Load initial messages from the API
    if (fetchedMessages.length > 0) {
      setMessages(fetchedMessages);
    }

    // Rejoindre la salle
    socket.emit("join room", { to: ids[0], from: ids[1] });

    // Écoutez les nouveaux messages
    socket.on("private message", (message) => { 
        setMessages((prevMessages) => [...prevMessages, {...message, self: message.from === user._id }]);
    });

    return () => {
      socket.off("private message");
    };
}, [fetchedMessages]);


  const handleSend =  () => {
    if (newMessage.trim() !== '' && toUserId && fromUserId) {
      const message = {
        content: newMessage.trim(),
        from: fromUserId,
        to: toUserId,
        self: true,
        avatar: user.avatar,
        timestamp: Date.now(),
      };
      socket.emit("private message", message);
      setNewMessage('');


    }
  };
  
  

  return (
    <div className="flex flex-col h-[70vh] md:h-[60vh] w-full md:w-3/4 lg:w-2/3 mx-auto bg-blue-50 rounded-lg shadow-lg">
      <div className="flex flex-col flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`chat ${message.self ? "chat-end" : "chat-start"}`}
          >
            {!message.self && (
              <div className="chat-image avatar">
                <div className="w-10 rounded-full">
                  <img src={'http://localhost:3500/' + message.avatar} alt="Avatar" />
                </div>
              </div>
            )}
              <div className="chat-header">
                <time className="text-xs opacity-50">{message.timestamp ? `Date : ${formatDate(message.timestamp)}` : 'Date inconnue'}</time>
              </div>
            <div className={`chat-bubble chat-bubble-primary${message.self ? 'bg-blue-400 text-white' : 'bg-white text-blue-400'}`}>
              {message.content}
            </div>
            {message.self && (
              <div className="chat-image avatar">
                <div className="w-10 rounded-full">
                  <img src={'http://localhost:3500/' + user.avatar} alt="Your Avatar" />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="flex items-center p-4 bg-white border-t rounded-b-lg">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Tapez votre message..."
          className="flex-1 p-2 rounded-lg border-2 focus:border-blue-400 focus:outline-none mr-4"
        />
        <button onClick={handleSend} className="px-6 py-2 bg-blue-400 text-white rounded-lg hover:bg-blue-500 transition duration-200">
          Envoyer
        </button>
      </div>
    </div>
);
};

export default ChatComponent;
