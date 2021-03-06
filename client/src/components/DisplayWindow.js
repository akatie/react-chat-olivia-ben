//imports
import React, { useState, useEffect } from "react";
import "../App.css";

//This function displays messages from the database.
function DisplayWindow() {
  //create message and setMsgs variable. Set their states to an empty array in order to receive info later.
  const [msgs, setMsgs] = useState([]);

  //useEffect hook gathers messages from the database at specified interval determined in setInterval function and we print them using .map()
  useEffect(() => {
    const interval = setInterval(() => {
      //if message length is false / is there is no message length
      if (!msgs.length) {
        //get message history from database
        fetch("/chat/allmessages")
          .then((res) => res.json())
          .then((msgs) => {
            //read over list of messages in database and update the msg value to include all messages found there
            setMsgs(msgs);
          });
      }
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  //maps over array of message objects and places them in display window div
  return (
    <div id="displaywindow">
      {msgs.map((msg) => {
        return <p>{msg.sender + ": " + msg.body}</p>;
      })}
    </div>
  );
}

//export component to be used elsewhere in React
export default DisplayWindow;
