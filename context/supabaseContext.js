import { createContext, useState } from "react";
import useSupabase from "../utils/useSupabase";

export function SupabaseProvider({ children }) {
    const { currentUser, session, supabase } = useSupabase();
    return (
        <SupabaseContext.Provider value={[currentUser, session, supabase]}>
            {children}
        </SupabaseContext.Provider>
    )
}

export const SupabaseContext = createContext();