import styles from "./page.module.css";

async function fetchingData() {
  await new Promise((resolve) => setTimeout(resolve, 3000));
  return [1, 2, 3];
}

export default function Home() {
  return (
    <main className={styles.main}>
      <div>Landing page</div>
    </main>
  );
}
