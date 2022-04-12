import React, { useState, useEffect, useRef } from "react";
import styles from "../styles/Chat.module.css";
import Image from 'next/image'
import logo from '../fonts/send-logo.svg'
import Brand from '../fonts/Brand.svg'

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
    // Subscription to changes on ADD/INSERT
    const setupMessagesSubscription = async () => {
      await supabase
        .from("message")
        .on("INSERT", (payload) => {
          setMessages((prev) => [].concat(prev, payload.new));
        })
        .subscribe();
    };
    await setupMessagesSubscription();
    
    // Subscription to changes on UPDATE
    // So we'll request Supabase for a subscription on UPDATE from the user table, the subscription .on() function
    // will take a payload with a callback func. First thing I will update the users object by using setUsers and check 
    // for what this payload coming in and update the users object accordingly. 'new' here is going to be an instance of a user.
    //  So I'm going to look for the user inside of my users table and if I found the user I'm gonna update it or else just return the user
    const setupUsersSubscription = async () => {
      await supabase
        .from('user')
        .on('UPDATE', payload => {
          setUsers(users => {
            const user = users[payload.new.id];
            if(user) {
              // The way Object.assign() works is by passing in the userId as a single key
              // So inside the assign() we are clonning the users object and then updating it based on the specific id
              // With Object.assign() we are saying first add this user's object but then also add in this specific instance 
              // of payload.new which is going to be our new user
              return Object.assign({}, users, {
                [payload.new.id]: payload.new
              })
            } else {
              return users;
            }
          })
        })
        .subscribe()
    }
    await setupUsersSubscription();
  }, []);

  // Using supabase API look at the users that we already have. It will consists of objects with a bunch of users 
  const getUsersFromSupabase = async (users, userIds) => {
    const usersToGet = Array.from(userIds).filter(userId => !users[userId])
    
    /* ------ Case 1 ------- */
    if (Object.keys(users).length && usersToGet.length === 0) {
      return users;
    }
    /* ------ Case 2 ------- */
    const { data } = await supabase
      .from('user')
      .select('id,username')
      .in('id', usersToGet);

    const newUsers = {};
    data.forEach(user => newUsers[user.id] = user)

    return Object.assign({}, users, newUsers)
  }

   

  // Request User Details for a Given User and get their userName & userId. 
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

  const username = user_id => {
    const user = users[user_id];
    // Check for user exists or not. A loading component could be created here
    if (!user) 
      return ""
    return user.username ? user.username : user.id
  }

  return (
    <>
      <nav className={styles.header}>
        <div className={styles.headerText}>
          <div className={styles.brandName}>
            <Image className={styles.imageCon} src={Brand} alt="Brand icon" />
            <h1 className={styles.h1}>Enigma</h1>
          </div>
          
          <p className={styles.p}>
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
                  <button 
                    style={{ 
                      fontSize: '0.95em', 
                      fontWeight: 200,
                      letterSpacing: '1.2px',
                      marginBottom: '0.5em'
                    }}
                    className={styles.submit} 
                    onClick={() => setEditingUsername(true)}
                  >
                    <p>Update Username</p>
                  </button>
                </div>
                <div className={styles.buttonContainer}>
                  <button 
                    style={{ 
                      fontSize: '0.95em',
                      fontWeight: 200,
                      letterSpacing: '1.2px',
                    }}
                    className={styles.submit} 
                    onClick={signout}
                  >
                    <p>Log out</p>
                  </button>
                </div>
              </>
            )}
        </div>
      </nav>

      <div className={styles.container}>
        {messages.map((message) => (
          <div key={message.id} className={styles.messageContainer}>
            <span className={styles.user}>{username(message.user_id)}</span>
            <div>{message.content}</div>
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
