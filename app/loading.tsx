import Image from "next/image";
import styles from "./page.module.css";

export default function Loading() {
  return (
    <main className={styles.main}>
      <div className={styles.center}>
        <Image
          className={styles.logo}
          src="/spinner.svg"
          alt="Loading..."
          width={180}
          height={37}
        />
      </div>
    </main>
  );
}
