import axios from "axios";
import React, { useState, useEffect } from "react";
import { Buffer } from "buffer";
import { authInstance } from "../../utils/APIRoutes";
import { useNavigate } from "react-router-dom";
import "./SetAvatarStyles.scss";

const SetAvatar = () => {
  const [avatars, setAvatars] = useState([]);
  const [selectedAvatar, setSelectedAvatar] = useState(undefined);
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    getAvatars();
  }, []);

  const setProfilePicture = async () => {
    const user = await JSON.parse(localStorage.getItem("current"));
    // console.log(user);
    const response = await authInstance.post(`/setavatar/${user._id}`, {
      image: avatars[selectedAvatar],
    });
    if (response.data.isSet) {
      user.isAvatarImageSet = true;
      user.avatarImage = response.data.image;
      localStorage.setItem("current", JSON.stringify(user));
      navigate("/");
    } else {
      console.error("Error setting avatar. Please try again.");
    }
  };

  const getAvatars = async () => {
    let newAvatars = [];
    try {
      for (let index = 0; index < 4; index++) {
        const avatarRes = await axios.get(
          `https://api.multiavatar.com/${Math.random() * 1000}`
        );
        const buffer = new Buffer(avatarRes.data).toString("base64");
        newAvatars.push(buffer);
      }
    } catch (error) {
      console.log({ error });
    }
    setAvatars(newAvatars);
    setIsLoading(false);
  };

  return (
    <section className="avatar-container">
      {isLoading ? (
        <div className="loader"></div>
      ) : (
        <>
          <h1>Select your avatar</h1>
          <div className="avatars">
            {avatars.map((avatar, i) => (
              <div
                key={i}
                className={`avatar ${selectedAvatar === i && "selected"}`}
              >
                <img
                  src={`data:image/svg+xml;base64,${avatar}`}
                  alt="avatar"
                  onClick={() => setSelectedAvatar(i)}
                />
              </div>
            ))}
          </div>
          <button
            onClick={setProfilePicture}
            disabled={selectedAvatar === undefined}
            className="submit-button"
          >
            Set as a profile picture
          </button>
        </>
      )}
    </section>
  );
};

export default SetAvatar;
