import React, { useState } from "react";
import { useEffect } from "react";
import "./ContactsStyles.scss";
import Logo from "../../assets/logo.png";

const Contacts = ({ contacts, changeChat }) => {
  const [currentUserName, setCurrentUserName] = useState();
  const [currentUserImage, setCurrentUserImage] = useState();
  const [currentSelected, setCurrentSelected] = useState();

  useEffect(() => {
    const getCurrentInfo = async () => {
      const data = await JSON.parse(localStorage.getItem("current"));
      setCurrentUserName(data.username);
      setCurrentUserImage(data.avatarImage);
    };
    getCurrentInfo();
  }, []);

  const changeCurrentChat = (contact, index) => {
    setCurrentSelected(index);
    changeChat(contact);
  };

  return (
    <>
      {currentUserImage && currentUserName && (
        <section className="contacts-container">
          <div className="brand">
            <img src={Logo} alt="logo" />
            <h3>ChatFrenzy</h3>
          </div>
          <div className="contacts">
            {contacts.map((contact, i) => (
              <div
                key={contact._id}
                className={`contact  ${
                  i === currentSelected ? "selected" : ""
                }`}
                onClick={() => changeCurrentChat(contact, i)}
              >
                <div className="avatar">
                  <img
                    src={`data:image/svg+xml;base64,${contact.avatarImage}`}
                    alt="avatar"
                  />
                </div>
                <div className="username">
                  <h3>{contact.username}</h3>
                </div>
              </div>
            ))}
          </div>
          <div className="current-user">
            <div className="avatar">
              <img
                src={`data:image/svg+xml;base64,${currentUserImage}`}
                alt="avatar"
              />
            </div>
            <div className="username">
              <h2>{currentUserName}</h2>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default Contacts;
