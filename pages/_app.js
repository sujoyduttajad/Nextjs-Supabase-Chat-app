import React, { useContext } from "react";
import PropTypes from "prop-types";
import "../styles/globals.scss";
import { SupabaseContext, SupabaseProvider } from "../context/supabaseContext";
import useSupabase from "../utils/useSupabase";

function MyApp({ Component, pageProps }) {
  const { currentUser, session, supabase } = useSupabase();
  

  // Remove the server-side injected CSS.
  console.log(currentUser);
  React.useEffect(() => {
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <React.Fragment>
      <SupabaseProvider>
        <Component
          currentUser={currentUser}
          session={session}
          supabase={supabase}
          {...pageProps}
        />
      </SupabaseProvider>
    </React.Fragment>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
};

export default MyApp;
