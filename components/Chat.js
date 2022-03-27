import React, { useState, useEffect, useRef } from "react";
import styles from "../styles/Chat.module.css";
import Image from 'next/image'
import logo from '../fonts/send-logo.svg'

const Chat = ({ currentUser, supabase, session }) => {
  if(!currentUser) return null;
  // Loading screen will be here 

  const [messages, setMessages] = useState([]);
  const [editingUsername, setEditingUsername] = useState(false);
  const [users, setUsers] = useState({});

  const messageRef = useRef("");
  const newUsername = useRef("")

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

  // Request User Details for a Given User
  useEffect(async () => {
    const getUsers = async () => {
      const userIds = new Set(messages.map(message => message.user_id));
      const newUsers = await getUsersFromSupabase(users, userIds)
      setUsers(newUsers);
    }
    await getUsers();
  }, [messages])

  const handleSendMessage = async (event) => {
    event.preventDefault();

    const content = messageRef.current.value;
    await supabase
      .from("message")
      .insert([{ content, user_id: session.user.id }]);

    // reset the message to blank space
    messageRef.current.value = "";
  };

  const signout = event => {
    event.preventDefault();
    window.localStorage.clear();
    window.location.reload();
  }

  const setUsername = async evt => {
    evt.preventDefault();

    try {
      const username = newUsername.current.value;
      await supabase
      .from('user')
      .insert([
        { ...currentUser, username }
      ], { upsert: true }); // 'upsert' is a combination of insert and update
  
      newUsername.current.value = ""
      setEditingUsername(false)
    } catch (err) {
      console.log("Something went wrong");
    }
    
  }

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
            <form className={styles.usernameForm} onSubmit={setUsername}>
              <input className={styles.messageInput} type="text" required ref={newUsername} placeholder="New username" />
              <button className={styles.submit} type="submit">Set username</button>
            </form>
            : (
              <>
                <div className={styles.buttonContainer}>
                  <button className={styles.submit} onClick={() => setEditingUsername(true)}>Update username</button>
                </div>
                <div className={styles.buttonContainer}>
                  <button className={styles.submit} onClick={signout}>Log out</button>
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
            <Image width={50} height={23} src={logo} alt="send icon" />
            <h3 style={{ margin: "0", marginRight: "0.7em" }}>SEND</h3>
          </button>
        </form>
      </div>
    </>
  );
};

export default Chat;
