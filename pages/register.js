import React, { useRef, useState } from "react";
import styles from "../styles/Auth.module.scss";

const Register = () => {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const signUp = async (evt) => {
    evt.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const { user, session, error } = await supabase.auth.signUp({
      email,
      password,
    });
  };

  return (
    <div className={styles.formContainer}>
      <form onSubmit={signUp}>
        <input
          className={styles.input}
          placeholder="your@email.com"
          type="text"
          ref={emailRef}
          required
        />
        <input
          className={styles.input}
          placeholder="password"
          type="password"
          ref={passwordRef}
          required
        />
        <button className={styles.submit} type="submit">
            Register
        </button>
      </form>
    </div>
  );
};

export default Register;