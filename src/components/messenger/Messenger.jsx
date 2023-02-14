import React, { useState } from "react";
import "./MessengerStyles.scss";
import { BsEmojiSunglassesFill } from "react-icons/bs";
import { IoSend } from "react-icons/io5";
import Picker from "emoji-picker-react";
import { useEffect } from "react";

const Messenger = ({ sendMsg }) => {
  const [msg, setMsg] = useState("");
  const [emojiMenu, setEmojiMenu] = useState(false);
  const [phone, setPhone] = useState(false);

  const addEmoji = (emojiObject) => {
    let message = msg;
    const { emoji } = emojiObject;
    message += emoji;
    setMsg(message);
  };

  const sendChat = (e) => {
    e.preventDefault();
    sendMsg(msg);
    setMsg("");
  };

  return (
    <section className="messenger">
      <div className="button-container">
        <div className="emoji">
          <BsEmojiSunglassesFill onClick={() => setEmojiMenu(!emojiMenu)} />
          {emojiMenu && <Picker width={"50vw"} onEmojiClick={addEmoji} />}
        </div>
      </div>
      <form className="input-container" onSubmit={(e) => sendChat(e)}>
        <input
          type="text"
          placeholder="Say something here..."
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
        />
        <button disabled={msg === ""} type="submit">
          <IoSend />
        </button>
      </form>
    </section>
  );
};

export default Messenger;
