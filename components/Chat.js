import React, {useState, useEffect} from "react";

const Chat = ({ supabase }) => {
  console.log(supabase);
  useEffect(async () => {
    const getMessages = async () => {
        let { data: messages, error } = await supabase.from("message").select("*");
        console.log(messages)
      };
    
    await getMessages()  
  }, []);
  

  return (
    <div>
      <span>YOu 're Logged In</span>
    </div>
  );
};

export default Chat;
