import Head from 'next/head'
import styles from '../styles/Home.module.scss'
import { useEffect, useState } from 'react'
import Auth from '../components/Auth';
import Chat from '../components/Chat';

export default function Home({ currentUser, session, supabase }) {

  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    // Since session here could be an object containing a lot of different information 
    // We just needs to prefix this by double explanation point which coerces a variable or value into a
    // boolean. So if this is an object the !! whill check if the value is truthy that means it has some 
    // sort of data inside of it and that will turn this into either true or false 
      setLoggedIn(!!session) 
  }, [session]) 

  return (
    <div className={styles.container}>
      <Head>
        <title>Enigma</title>
      </Head>

      <main className={styles.main}>
        {
          loggedIn ?  <Chat session={session} currentUser={currentUser} supabase={supabase} /> : <Auth supabase={supabase} />
        }
        
      </main>
    </div>
  )
}
