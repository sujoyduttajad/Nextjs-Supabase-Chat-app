import React from 'react'

const Auth = ({ supabase }) => {
   const signInWithGithub = () => {
        supabase.auth.signIn({
            provider: 'github'
        })
   }
    
    return (
        <div>
            <button onClick={signInWithGithub}>Log In with Github</button>
        </div>
    )
}

export default Auth