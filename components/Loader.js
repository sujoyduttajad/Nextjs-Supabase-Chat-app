import React from "react";
import Brand from "../images/invert-brand.svg";
import styles from "../styles/Loader.module.scss";
import Image from "next/image";

const Loader = () => {
  return (
    <div className={styles.body}>
      {/* <div className={styles.loader}>
        <svg viewBox="0 0 80 80">
          <circle id="test" cx="40" cy="40" r="32"></circle>
        </svg>
      </div> */}

      <div className={styles.loader}>
        <Image
            className={styles.imageCon}
            src={Brand}
            alt="Brand icon"
            shape-rendering="geometricPrecision"
          />
      </div>

      {/* <div className={styles.loader}>
        <svg viewBox="0 0 80 80">
          <rect x="8" y="8" width="64" height="64"></rect>
        </svg>
      </div> */}

      <a
        class="dribbble"
        href="https://dribbble.com/shots/5878367-Loaders"
        target="_blank"
      >
        <img
          src="https://cdn.dribbble.com/assets/dribbble-ball-mark-2bd45f09c2fb58dbbfb44766d5d1d07c5a12972d602ef8b32204d28fa3dda554.svg"
          alt=""
        />
      </a>
    </div>
  );
};

export default Loader;
