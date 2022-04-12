import React, { useRef, useState } from 'react'
import styles from '../styles/Auth.module.css'
import Brand from '../fonts/Brand.svg'
import Image from 'next/image'

const Auth = ({ supabase }) => {
  const [error, setError] = useState("");
  const [sentEmail, setSentEmail] = useState(false);

  const emailRef = useRef(null);
  const signIn = async (evt) => {
    evt.preventDefault();
    const email = emailRef.current.value;
    const { error } = await supabase.auth.signIn({ email });
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
      {/* <h1 className={styles.title}>Enigma</h1> */}
      <div className={styles.brandName}>
            <Image className={styles.imageCon} src={Brand} alt="Brand icon" shape-rendering="geometricPrecision" />
            <h1 className={styles.title}>Enigma</h1>
          </div>
      {error ? <p className={styles.error}>{error}</p> : null}

      {sentEmail ? (
        <p>We've sent you an email to login! Check your email to continue.</p>
      ) : (
        <>
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

          <p>
            <button className={styles.github} onClick={signInWithGithub}>
              Sign in with GitHub
            </button>
          </p>
        </>
      )}
    </div>
  );
};

export default Auth;
