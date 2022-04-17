import React from "react";
import Brand from "../images/invert-brand.svg";
import styles from "../styles/Loader.module.scss";
import Image from "next/image";

const Loader = () => {
  return (
    <div className={styles.body}>
      <div className={styles.loader}>
        <div className={styles.loader}>
          <div className={styles.loader}>
            <Image
              className={styles.imageCon}
              src={Brand}
              alt="Brand icon"
              shape-rendering="geometricPrecision"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loader;
