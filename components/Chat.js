import React, { useState, useEffect } from "react";

const Chat = ({ supabase }) => {
  const [messages, setMessages] = useState([]);

  useEffect(async () => {
    const getMessages = async () => {
      let { data: messages, error } = await supabase
        .from("message")
        .select("*");
      setMessages(messages);
    };

    await getMessages();

    const setupMessagesSubscription = async () => {
      await supabase
        .from('meesage')
        .on('INSERT', payload => {
          console.log('Change received!!', payload)
        })
        .subscribe()
    }
    
    await setupMessagesSubscription();

  }, []);

  return (
    <div>
      {messages.map((message) => (
        <div key={message.id}>
            {message.content}
        </div>
      ))}
    </div>
  );
};

export default Chat;