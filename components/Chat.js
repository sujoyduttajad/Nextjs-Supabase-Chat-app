import React from "react";

const Chat = ({ supabase }) => {
  console.log(supabase);
  
  const getMessages = async () => {
    let { data: messages, error } = await supabase.from("message").select("*");
    console.log(messages)
  };

  return (
    <div>
      <span>YOu 're Logged In</span>
    </div>
  );
};

export default Chat;
