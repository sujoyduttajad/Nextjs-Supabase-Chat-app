import React, { useRef, useState } from "react";
import styles from "../styles/Auth.module.scss";
import Brand from "../images/invert-brand.svg";
import Image from "next/image";
import Link from "next/link";

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
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.brandName}>
          <Image
            className={styles.imageCon}
            src={Brand}
            alt="Brand icon"
            shapeRendering="geometricPrecision"
          />
          <h1 className={styles.title}>Enigma</h1>
        </div>
        <div className={styles.formContainer}>
          <form className={styles.form} onSubmit={signUp}>
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
      </div>
    </div>
  );
};

export default Register;
