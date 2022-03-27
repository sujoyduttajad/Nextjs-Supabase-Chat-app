import React, { useState, useEffect, useRef } from "react";
import styles from "../styles/Chat.module.css";

const Chat = ({ currentUser, supabase, session }) => {
  if(!currentUser) return null;
  // Loading screen will be here 

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
        .from("message")
        .on("INSERT", (payload) => {
          setMessages((prev) => [].concat(prev, payload.new));
        })
        .subscribe();
    };
    await setupMessagesSubscription();
  }, []);

  const handleSendMessage = async (event) => {
    event.preventDefault();

    const content = messageRef.current.value;
    await supabase
      .from("message")
      .insert([{ content, user_id: session.user.id }]);

    // reset the message to blank space
    messageRef.current.value = "";
  };
  return (
    <>
      <nav className={styles.header}>
        <div className={styles.headerText}>
          <h1>Supabase Chat</h1>
          <p>
            Welcome, {currentUser.username ? currentUser.username : session.user.email}
          </p>
        </div>
        
        <div className={styles.settings}>
          {editingUsername ?
            <form onSubmit={setUsername}>
              <input type="text" required ref={newUsername} placeholder="New username" />
              <button type="submit">Set username</button>
            </form>
            : (
              <>
                <div>
                  <button onClick={() => setEditingUsername(true)}>Update username</button>
                </div>
                <div>
                  <button onClick={signout}>Log out</button>
                </div>
              </>
            )}
        </div>
      </nav>

      <div className={styles.container}>
        {messages.map((message) => (
          <div key={message.id} className={styles.messageContainer}>
            {message.content}
          </div>
        ))}

        <form className={styles.chat} onSubmit={handleSendMessage}>
          <input
            className={styles.messageInput}
            placeholder="Write your message"
            required
            ref={messageRef}
          />
          <button className={styles.submit} type="submit">
            Send Message
          </button>
        </form>
      </div>
    </>
  );
};

export default Chat;
