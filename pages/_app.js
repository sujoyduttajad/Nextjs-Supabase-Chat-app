import '../styles/globals.css'
import useSupabase from '../utils/useSupabase'

function MyApp({ Component, pageProps }) {

  const { session, supabase } = useSupabase();
  return <Component session={session} supabase={supabase} {...pageProps} />
}

export default MyApp
