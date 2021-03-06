import React from "react";
import Brand from "../images/invert-brand.svg";
import { data } from '../utils/data'
import Link from 'next/link'
import styles from "../styles/Sidebar.module.scss";
import Image from "next/image";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import {
  Button,
  Badge,
  Avatar,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@material-ui/core";
import { ExpandMore, Person, QueryBuilder, Settings } from "@material-ui/icons";

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
      content: '""',
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
  button: {
    display: "flex",
    alignItems: "center",
    justifyContent: 'flex-start',
    width: '100%',
  },
  settings: {
    color: "#DFDFDF",
  },
  accordion: {
    width: "100%",
    maxWidth: "20em",
    background: "transparent",
    color: "#DFDFDF",
    boxShadow: "none",
  },
  accordionDetails: {
    display: "flex",
    flexDirection: 'column',
    alignItems: "flex-start",
    justifyContent: "flex-start",
    padding: 0,
    paddingLeft: '0.7em',
  },
  accSummary: {
    minHeight: 0
  }
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
            shapeRendering="geometricPrecision"
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
            <Avatar
              alt={currentUser.username ? currentUser.username : 'New user'}
              src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80"
            />
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
          <Link href="/updates" passHref>
            <Button
              className={classes.button}
              startIcon={<QueryBuilder className={classes.settings} />}
            >
              <p>All Updates</p>
            </Button>
            </Link>
          </div>
          <div className={styles.buttonWrapper}>
          <Link href="/members" passHref>
            <Button
              className={classes.button}
              startIcon={<Person className={classes.settings} />}
            >
              <p>Members</p>
            </Button>
            </Link>
          </div>
          <div className={styles.buttonWrapper}>
            <Link href="/settings/profile" passHref>
              <Button
                className={classes.button}
                startIcon={<Settings className={classes.settings} />}
              >
                <p>Settings</p>
              </Button>
            </Link>
          </div>
        </div>
        <hr className={styles.hr} />
        <div className={styles.centerPanel}>
          <Accordion className={classes.accordion} defaultExpanded={true}>
            <AccordionSummary
              expandIcon={<ExpandMore className={classes.settings} />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <h4>Channels</h4>
            </AccordionSummary>
            <AccordionDetails className={classes.accordionDetails}>
              <div className={styles.channelWrapper}>
                <Button
                  className={classes.button}
                >
                  <p className={styles.channelName}>???? General</p>
                </Button>
              </div>
              <div className={styles.channelWrapper}>
                <Button
                  className={classes.button}
                >
                  <p className={styles.channelName}>???? Hangout</p>
                </Button>
              </div>
              <div className={styles.channelWrapper}>
                <Button
                  className={classes.button}
                >
                  <p className={styles.channelName}>???? Skiils</p>
                </Button>
              </div>
            </AccordionDetails>
          </Accordion>
        </div>
        <div className={styles.centerPanel}>
          <Accordion className={classes.accordion} defaultExpanded={true} >
            <AccordionSummary
              expandIcon={<ExpandMore className={classes.settings} />}
              aria-controls="panel1a-content"
              id="panel1a-header"
              className={classes.accSummary}
            >
              <h4>Members</h4>
            </AccordionSummary>
            <AccordionDetails className={classes.accordionDetails}>
              <div className={styles.channelWrapper}>
                <Button
                  className={classes.button}
                >
                  <p className={styles.channelName}>Jerry</p>
                </Button>
              </div>
              <div className={styles.channelWrapper}>
                <Button
                  className={classes.button}
                >
                  <p className={styles.channelName}>George</p>
                </Button>
              </div>
              <div className={styles.channelWrapper}>
                <Button
                  className={classes.button}
                >
                  <p className={styles.channelName}>Kramer</p>
                </Button>
              </div>
              <div className={styles.channelWrapper}>
                <Button
                  className={classes.button}
                >
                  <p className={styles.channelName}>Elaine</p>
                </Button>
              </div>
            </AccordionDetails>
          </Accordion>
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
