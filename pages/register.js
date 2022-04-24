import React, { useRef, useContext } from "react";
import styles from "../styles/Auth.module.scss";
import Brand from "../images/invert-brand.svg";
import Image from "next/image";
import Link from "next/link";
import { SupabaseContext } from "../context/supabaseContext";

const Register = () => {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const [{currentUser, session, supabase}] = useContext(SupabaseContext);

  console.log(currentUser);

  const signUp = async (evt) => {
    evt.preventDefault();
    const userEmail = emailRef.current.value;
    const userPassword = passwordRef.current.value;
    const { user, session, error } = await supabase.auth.signUp({
      email: userEmail,
      password: userPassword,
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
          <div className={styles.register}>
              <p>
                Already have an account?
                <Link href="/auth" passHref>
                  <span>Click here</span>
                </Link>
                to signin
              </p>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
