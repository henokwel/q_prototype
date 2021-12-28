import React, { useEffect, useState } from "react";

const Share = () => {
  const [quiz, setQ] = useState<any>("");
  useEffect(() => {
    let retrievedData: any = localStorage.getItem("myQ");
    setQ(JSON.parse(retrievedData));
  }, []);
  console.log(quiz);
  
  return (
    <div>
      <h1>Share</h1>
      {
          !quiz  ? "wating...": quiz.map((item:any,i:number)=>{
            return  <p key={i}>{item.q}</p>
          })
      }
    </div>
  );
};

export default Share;
