import React, { useState, useEffect, useRef } from "react";
import styles from '../styles/Home.module.css'

const Chat = ({ supabase, session }) => {
  const [messages, setMessages] = useState([]);
  const messageRef = useRef("");

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
        .from('message')
        .on('INSERT', payload => {
          setMessages(prev => [].concat(prev, payload.new))
        })
        .subscribe()
    }
    await setupMessagesSubscription();
  }, []);
  
  const handleSendMessage = async (event) => {
      event.preventDefault();

      const content = messageRef.current.value
      await supabase
      .from('message')
      .insert([
        { content, user_id: session.user.id }
      ]);

      // reset the message to blank space
      message.current.value = ""
  }
  return (
    <div>
      {messages.map((message) => (
        <div key={message.id} className={styles.footer}>
            {message.content}
        </div>
      ))}

      <form onSubmit={handleSendMessage}>
        <input placeholder="Write your message" required ref={messageRef} />
        <button type="submit">Send Message</button>
      </form>
    </div>
  );
};

export default Chat;