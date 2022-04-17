import React from "react";
import Brand from "../images/invert-brand.svg";
import styles from "../styles/Loader.module.scss";
import Image from "next/image";

const Loader = () => {
  return (
    <div >
      <div className={styles.wrapper}>
        <div className={styles.boxWrap}>
          <div className={styles.boxOne}></div>
          <div className={styles.boxTwo}></div>
          <div className={styles.boxThree}></div>
          <div className={styles.boxFour}></div>
          <div className={styles.boxFive}></div>
          <div className={styles.boxSix}></div>
        </div>
      </div>
    </div>
  );
};

export default Loader;
