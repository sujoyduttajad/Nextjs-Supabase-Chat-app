import React, { useState, useEffect } from "react";
import styles from '../styles/Home.module.css'

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
        .from('message')
        .on('INSERT', payload => {
          setMessages(prev => [].concat(prev, payload.new))
        })
        .subscribe()
    }
    
    await setupMessagesSubscription();

  }, []);

  return (
    <div>
      {messages.map((message) => (
        <div key={message.id} className={styles.footer}>
            {message.content}
        </div>
      ))}

      <form>
        <input placeholder="Write your message" />
        <button type="submit">Send Message</button>
      </form>
    </div>
  );
};

export default Chat;