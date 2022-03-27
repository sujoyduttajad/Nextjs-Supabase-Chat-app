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

  // Using supabase API look at the users that we already have. It will consists of objects with a bunch of users 
  const getUsersFromSupabase = async (users, userIds) => {
    // New userIds(which is a Set) that are not inside our users object
    // look for an existing instance in the users object(userId) So if we already have this user stored then filter it out of this users to get
    // What we have here is arrays of ids that we don't currently know anything about in our local component
    // THat's what I will use to amke a request to Supabse to get those new users for storing in our component.
    const usersToGet = Array.from(userIds).filter(userId => !users[userId])
  }

  // Request User Details for a Given User and get their userName & userId
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
