import React, { useRef, useState } from "react";
import { useEffect } from "react";
// import { messageInstance } from "../../utils/APIRoutes";
import "./DisplayChatStyles.scss";
import { v4 as uuidv4 } from "uuid";
import { getDate } from "../../utils/formater";
import { useNavigate } from "react-router-dom";
import { GoSignOut } from "react-icons/go";
import { authInstance, URL } from "../../utils/APIRoutes";
import Messenger from "../messenger/Messenger";
import axios from 'axios'


const jwt_token = localStorage.getItem("token");
const messageInstance = axios.create({
  baseURL: `${URL}/api/message`,
  headers: {
    Authorization: `BEAR ${jwt_token}`,
  },
});

const DisplayChat = ({ currentChat, socket, currentUser }) => {
  const [messages, setMessages] = useState([]);
  const [arrivalMessage, setArrivalMessage] = useState();
  const scrollRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    //Get all messages between to users
    const getMessages = async () => {
      try {
        const response = await messageInstance.post("/getmsg", {
          from: currentUser._id,
          to: currentChat._id,
        });
        setMessages(response.data);
      } catch (error) {
        console.error("Error in accessing messages... Refreshing page...");
        window.location.reload()
      }
    };
    getMessages();
  }, [currentChat]);

  useEffect(() => {
    if (socket.current) {
      //Receive private messages
      socket.current.on("msg-receive", (msg) => {
        setArrivalMessage({ fromSelf: false, message: msg });
      });
    }
  }, []);

  useEffect(() => {
    //Update messages once arrivalMessage is defined
    if (arrivalMessage) {
      setMessages((prev) => [...prev, arrivalMessage]);
    }
  }, [arrivalMessage]);

  useEffect(() => {
    //scroll to content
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMsg = async (msg) => {
    const data = {
      to: currentChat._id,
      from: currentUser._id,
      message: msg,
    };
    //sending data to server - for the server to send message to data.to
    socket.current.emit("send-msg", data);
    try {
      //Send message to Db to store messages
      await messageInstance.post("/addmsg", data);
      //updating messages without making refresh
      setMessages((before) => [
        ...before,
        { fromSelf: true, message: msg, created: getDate() },
      ]);
    } catch (error) {
      console.error(
        "Error sending messages: An unknown error occurred. Please try again later."
      );
    }
  };

  const logoff = async () => {
    const response = await authInstance.get(`/logout/${currentUser._id}`);
    if (response.status === 200) {
      localStorage.clear();
      navigate("/auth");
    }
  };

  return (
    <section className="display-chat">
      <div className="chat-header">
        <div className="user-details">
          <div className="avatar">
            <img
              src={`data:image/svg+xml;base64,${currentChat.avatarImage}`}
              alt="avatar"
            />
          </div>
          <div className="username">
            <h3>{currentChat.username}</h3>
          </div>
        </div>
        <button className="logout" onClick={logoff}>
          <GoSignOut />
        </button>
      </div>
      <div className="chat-messages">
        {messages?.map((msg) => {
          if (!msg.created) {
            msg.created = getDate(msg.createdAt);
          }
          return (
            <div
              ref={scrollRef}
              key={uuidv4()}
              className={`message ${msg.fromSelf ? "sended" : "recieved"}`}
            >
              <div className="content">
                <p>{msg.message}</p>
              </div>
              <span> {msg.created} </span>
            </div>
          );
        })}
      </div>
      <Messenger sendMsg={sendMsg} />
    </section>
  );
};

export default DisplayChat;
