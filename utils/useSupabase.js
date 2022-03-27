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
      if (session?.user.id) {
        const { data: currentUser } = await supabase
          .from(`user:id=eq.${foundUser.id}`)
          .select("*")
          .eq("id", session.user.id);

        if (currentUser.length) {
          const foundUser = currentUser[0];
          // To monitor any updates and persists that update into the currentUser
          await supabase
            .from("user")
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

    const foundCurrentUser = await getCurrentUser();
    setCurrentUser(foundCurrentUser)
  }, []);

  return { session, supabase };
};

export default useSupabase;
