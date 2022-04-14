import React from 'react'
import Brand from "../fonts/invert-brand.svg";
import styles from "../styles/Chat.module.scss";
import Image from "next/image";

const Sidebar = ({
    currentUser, 
    editingUsername, 
    newUsername,
    setUsername,
    setEditingUsername,
    signout
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
          <hr className={styles.hr}/>
          <p className={styles.p}>
            Welcome,{" "}
            {currentUser.username ? currentUser.username : session.user.email}
          </p>
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
  )
}

export default Sidebar