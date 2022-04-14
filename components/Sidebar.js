import React from "react";
import Brand from "../fonts/invert-brand.svg";
import styles from "../styles/Chat.module.scss";
import Image from "next/image";
import { CAvatar } from '@coreui/react'

const Sidebar = ({
  currentUser,
  editingUsername,
  newUsername,
  setUsername,
  setEditingUsername,
  signout,
}) => {
  return (
    <nav className={styles.header}>
      <div className={styles.headerText}>
        <div className={styles.brandName}>
          <Image
            className={styles.imageCon}
            src={Brand}
            alt="Brand icon"
            shape-rendering="geometricPrecision"
          />
          <h1 className={styles.h1}>Enigma</h1>
        </div>
        <hr className={styles.hr} />
        <div className={styles.welcome}>
            <CAvatar
            shape="rounded-10"
                src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80" 
                className={styles.cavatar} 
                status="success"
            >
                {currentUser.username ? currentUser.username.slice(0,1) : session.user.email.slice(0,1)}
            </CAvatar>  
          <p className={styles.p}>
            Welcome,{" "}
            <span>{currentUser.username ? currentUser.username : session.user.email}</span>
          </p>
        </div>
      </div>

      <div className={styles.settings}>
        {editingUsername ? (
          <form className={styles.usernameForm} onSubmit={setUsername}>
            <input
              className={styles.messageInput}
              type="text"
              required
              ref={newUsername}
              placeholder="New username"
            />
            <button className={styles.submit} type="submit">
              Set username
            </button>
          </form>
        ) : (
          <>
            <div className={styles.buttonContainer}>
              <button
                style={{
                  fontSize: "0.95em",
                  fontWeight: 600,
                  letterSpacing: "1.2px",
                  marginBottom: "0.5em",
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
                  fontSize: "0.95em",
                  fontWeight: 600,
                  letterSpacing: "1.2px",
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
  );
};

export default Sidebar;
