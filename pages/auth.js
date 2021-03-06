import React, { useRef, useState } from "react";
import styles from "../styles/Auth.module.scss";
import Brand from "../images/invert-brand.svg";
import Image from "next/image";
import Link from "next/link";

const Auth = ({ supabase }) => {
  const [error, setError] = useState("");
  const [sentEmail, setSentEmail] = useState(false);

  console.log(supabase)
  const emailRef = useRef(null);
  const signIn = async (evt) => {
    evt.preventDefault();
    const emailUser = emailRef.current.value;
    const { error } = await supabase.auth.signUp({ 
      email: emailUser });
    error ? setError(error.message) : setSentEmail(true);
  };

  const signInWithGithub = (evt) => {
    evt.preventDefault();
    supabase.auth.signIn({
      provider: "github",
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
        {error ? <p className={styles.error}>{error}</p> : null}
        {sentEmail ? (
          <p>
            We have sent you an email to login! Check your email to continue.
          </p>
        ) : (
          <div className={styles.formContainer}>
            <form onSubmit={signIn}>
              <input
                className={styles.input}
                placeholder="your@email.com"
                type="text"
                ref={emailRef}
                required
              />
              <button className={styles.submit} type="submit">
                Login
              </button>
            </form>
            <hr className={styles.hr} />
            <button className={styles.github} onClick={signInWithGithub}>
              <p>Sign in with GitHub </p>
            </button>
            <div className={styles.register}>
              <p>
                Don't have an account?
                <Link href="/register" passHref>
                  <span>Click here</span>
                </Link>
                to create one
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Auth;
