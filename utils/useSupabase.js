import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_API_KEY
);

const useSupabase = () => {
  const [session, setSession] = useState(supabase.auth.session());
  const [currentUser, setCurrentUser] = useState(null);

  supabase.auth.onAuthStateChange(async (_event, session) => {
    setSession(session);
  });

  useEffect(async () => {
    const getCurrentUser = async () => {
      /* (session?.user.id) or (session && session.user.id ? "" : "") is an optional chaining which says if there is a session and there is .user.id, if both are false then it will just bail completely. So if there's no session it won't even try and run the code */
      // Here the condition helps us to get the currentUser data
      if (session?.user.id) {
        const { data: currentUser } = await supabase
          .from('user')
          .select("*")
          .eq("id", session.user.id);
        /* 
          Here the nested condition checks for null users, if not then
          return the first element of the array into a variable 
         */
        if (currentUser.length) {
          const foundUser = currentUser[0];
         /* To monitor any updates and persists that update into the 
          currentUser. 
         */
          await supabase
            .from(`user:id=eq.${foundUser.id}`)
            .on("UPDATE", (payload) => {
              setCurrentUser(payload.new);
            })
            .subscribe();
          return foundUser;
        } else {
          return null;
        }
      }
    };

    const foundUser = await getCurrentUser();
    setCurrentUser(foundUser)
  }, [session]);

  return { currentUser, session, supabase };
};

export default useSupabase;
