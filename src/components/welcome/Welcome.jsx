import React, { useEffect, useState } from "react";
import "./WelcomeStyles.scss";
import sign from "../../assets/welcome.svg";

const Welcome = () => {
  const [username, setUsername] = useState("");
  useEffect(() => {
    const getUsername = async () => {
      const userInfo = await JSON.parse(localStorage.getItem("current"));
      setUsername(userInfo.username);
    };
    getUsername();
  }, []);

  return (
    <section className="welcome-container">
      <img src={sign} alt="welcome" />
      <h1>
        {" "}
        Welcome, <span> {username} </span>{" "}
      </h1>
      <h3>Start chatting by selecting a conversation from the list.</h3>
    </section>
  );
};

export default Welcome;

