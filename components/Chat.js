import React, { useState, useEffect, useRef } from "react";
import styles from "../styles/Chat.module.scss";
import Image from "next/image";
import logo from "../images/send-logo.svg";
import { format, toDate } from "date-fns";
import Sidebar from "./Sidebar";
import Skeleton from "@material-ui/lab/Skeleton";
import { makeStyles } from "@material-ui/core/styles";
import Loader from "./Loader";

const useStyles = makeStyles((theme) => ({
  skeleton: {
    backgroundColor: "rgba(52, 178, 123, 0.2)",
  },
}));

const Chat = ({ currentUser, supabase, session }) => {
  const [messages, setMessages] = useState([]);
  const [editingUsername, setEditingUsername] = useState(false);
  const [users, setUsers] = useState({});

  const messageRef = useRef("");
  const newUsername = useRef("");

  const classes = useStyles();


  /* ---- ** useEffect-#1 ** Retriving all the message details ---- */
  useEffect(() => {
    const getMessages = async () => {
      const { data: initialMessages, error } = await supabase
        .from("message")
        .select("*");
      setMessages(initialMessages);
    };
    getMessages();

    /* ---- Subscription to changes on ADD/INSERT ---- */
    const setupMessagesSubscription = async () => {
      await supabase
        .from("message")
        .on("INSERT", (payload) => {
          setMessages((prev) => [].concat(prev, payload.new));
        })
        .subscribe();
    };
    setupMessagesSubscription();

    /* ---- Subscription to changes on UPDATE ---- */
    const setupUsersSubscription = async () => {
      await supabase
        .from("user")
        .on("UPDATE", (payload) => {
          setUsers((users) => {
            const user = users[payload.new.id];
            if (user) {
              return Object.assign({}, users, {
                [payload.new.id]: payload.new,
              });
            } else {
              return users;
            }
          });
        })
        .subscribe();
    };
    setupUsersSubscription();
  });

  /* ---- Using supabase API look at the users that we already have. 
  It will consists of objects with a bunch of users ---- */
  const getUsersFromSupabase = async (users, userIds) => {
    const usersToGet = Array.from(userIds).filter((userId) => !users[userId]);
    // ------ Case 1 ------- //
    if (Object.keys(users).length && !usersToGet.length ) {
      return users;
    }
    // ------ Case 2 ------- //
    try {
      const { data } = await supabase
        .from("user")
        .select("id, username")
        .in("id", usersToGet);

      const newUsers = {};
      data.forEach((user) => (newUsers[user.id] = user));
      return Object.assign({}, users, newUsers);
    } catch (err) {
      console.log(err)
        return users;
    }
  };
  /* ---- ** useEffect-#2 ** Request User Details for a Given User and get their userName & userId ---- */
  useEffect(() => {
    async function getUsers() {
      const userIds = new Set(messages.map((message) => message.user_id));
      const newUsers = await getUsersFromSupabase(users, userIds);
      setUsers(newUsers);
    }
    getUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messages]);
  /* ---- Event Handler for message input ---- */
  const handleSendMessage = async (event) => {
    event.preventDefault();
    try {
      const content = messageRef.current.value;
      await supabase
        .from("message")
        .insert([{ content, user_id: session.user.id }]);
      // reset the message to blank space
      messageRef.current.value = "";
    } catch (err) {
      console.log(err);
    }
  };

   // Loading screen will be here
 
  /* ---- Log Out function ---- */
  const signout = (event) => {
    event.preventDefault();
    window.localStorage.clear();
    window.location.reload();
  };

  /* ---- Update and Insert existing username ---- */
  const setUsername = async (evt) => {
    evt.preventDefault();
    try {
      const username = newUsername.current.value;
      await supabase
        .from("user")
        .insert([{ ...currentUser, username }], { upsert: true }); // 'upsert' is a combination of insert and update

      newUsername.current.value = "";
      setEditingUsername(false);
    } catch (err) {
      console.log("Something went wrong");
    }
  };

  /* ---- Update Username everywhere ---- */
  const username = (user_id) => {
    const user = users[user_id];
    // Check for user exists or not. A loading component could be created here
    if (!user) {
      return (
        <Skeleton
          className={classes.skeleton}
          variant="circle"
          width={40}
          height={40}
          animation="wave"
        />
      );
    }
    return user.username ? user.username : user.id;
  };


  if (!currentUser) {
    return <Loader />;
  }

  return (
    <>
      <Sidebar
        currentUser={currentUser}
        newUsername={newUsername}
        editingUsername={editingUsername}
        signout={signout}
        setUsername={setUsername}
        setEditingUsername={setEditingUsername}
      />
      <div className={styles.container}>
        {messages
          .sort(function (a, b) {
            var timeA = a.created_at;
            var timeB = b.created_at;
            if (timeA < timeB) {
              return -1;
            }
            if (timeA > timeB) {
              return 1;
            }
            return 0;
          })
          .map((message) => (
            <>
              <div className={styles.textDetail}>
                <div className={styles.user}>{username(message.user_id)}</div>
                <div className={styles.timeStamp}>
                  {format(
                    toDate(Date.parse(message.created_at)),
                    "eee, MMM d  p"
                  )}
                </div>
              </div>
              <div key={message.id} className={styles.messageContainer}>
                <div>{message.content}</div>
              </div>
            </>
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
            <h3
              style={{
                margin: "0",
                marginRight: "0.7em",
                fontWeight: 900,
              }}
            >
              SEND
            </h3>
          </button>
        </form>
      </div>
    </>
  );
};

export default Chat;
