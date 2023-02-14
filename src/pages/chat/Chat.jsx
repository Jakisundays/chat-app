import React, { useState, useRef, useEffect } from "react";
import "./ChatStyles.scss";
import { useNavigate } from "react-router-dom";
import { authInstance, URL } from "../../utils/APIRoutes";
import { io } from "socket.io-client";
import Contacts from "../../components/contacts/Contacts";
import Welcome from "../../components/welcome/Welcome";
import DisplayChat from "../../components/displayChat/DisplayChat";

const Chat = () => {
  const [contacts, setContacts] = useState([]);
  const [currentUser, setCurrentUser] = useState();
  const [currentChat, setCurrentChat] = useState();

  const socket = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    const verifyInfo = async () => {
      const weGotInfo = localStorage.getItem("current");
      if (weGotInfo) {
        const theInfo = await JSON.parse(weGotInfo);
        setCurrentUser(theInfo);
      } else {
        navigate("/auth");
      }
    };
    verifyInfo();
  }, []);

  useEffect(() => {
    const verifyAvatar = async () => {
      if (currentUser) {
        //Get all user
        if (currentUser.isAvatarImageSet) {
          const allUsers = await authInstance.get(
            `/allusers/${currentUser._id}`
          );
          //List of contacts = array of objs
          setContacts(allUsers.data.data);
        } else {
          navigate("/setAvatar");
        }
      }
    };
    verifyAvatar();
  }, [currentUser]);

  useEffect(() => {
    if (currentUser) {
      //Connect with the server
      socket.current = io(URL);
      socket.current.emit("add-user", currentUser._id);
    }
  }, [currentUser]);

  const handleChatChange = (chat) => {
    setCurrentChat(chat);
  };

  return (
    <section className="chat">
      <div className="chat-container">
        <Contacts contacts={contacts} changeChat={handleChatChange} />
        {!currentChat ? (
          <Welcome currentUser={currentUser} />
        ) : (
          <DisplayChat
            currentUser={currentUser}
            currentChat={currentChat}
            socket={socket}
          />
        )}
      </div>
    </section>
  );
};

export default Chat;
