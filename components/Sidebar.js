import React from "react";
import Brand from "../fonts/invert-brand.svg";
import styles from "../styles/Sidebar.module.scss";
import Image from "next/image";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { Button, Badge, Avatar } from "@material-ui/core";
import { AccessAlarm, Settings, ThreeDRotation } from '@material-ui/icons';

const StyledBadge = withStyles((theme) => ({
  badge: {
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "$ripple 1.2s infinite ease-in-out",
      border: "1px solid currentColor",
      content: '""',
    },
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0,
    },
  },
}))(Badge);

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& > *": {
      margin: theme.spacing(1),
    },
  },
}));

const Sidebar = ({
  currentUser,
  editingUsername,
  newUsername,
  setUsername,
  setEditingUsername,
  signout,
}) => {
  const classes = useStyles();
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
          <StyledBadge
            overlap="circular"
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            variant="dot"
          >
            <Avatar alt="Remy Sharp" src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80" />
          </StyledBadge>
          <p className={styles.p}>
            Welcome,{" "}
            <span>
              {currentUser.username ? currentUser.username : session.user.email}
            </span>
          </p>
        </div>
        <div className={styles.centerPanel}>
          <div className={styles.buttonWrapper}>
            <Button>
              <Settings/>
              <p>All Updates</p>
            </Button>
          </div>
          <div className={styles.buttonWrapper}>
            <Button>
              <p>Members</p>
            </Button>
          </div>
          <div className={styles.buttonWrapper}>
            <Button>
              <p>Settings</p>
            </Button>
          </div>
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
