import React from 'react'

const Auth = ({ supabase }) => {
   const signInWithGithub = async () => {
        let { user, error } = await supabase.auth.signIn({
            provider: 'github'
        })
   }
    
    return (
        <div>
            <button>Log In with Github</button>
        </div>
    )
}

export default Auth