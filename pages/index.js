import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { useEffect, useState } from 'react'

export default function Home({ session, supabase }) {

  const [loggedIn, setLoggedIn] = useState(false);
  
  return (
    <div className={styles.container}>
      <Head>
        <title>Supabase Chat App</title>
      </Head>

      <main className={styles.main}>
        
      </main>
    </div>
  )
}
