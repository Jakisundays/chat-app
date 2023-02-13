import React from "react";
import { useNavigate } from "react-router-dom";
import { GoSignOut } from "react-icons/go";
import { authInstance } from "../../utils/APIRoutes";

const LogOut = ({ currentuser }) => {
  const navigate = useNavigate();

  const logoff = async () => {
    const response = await authInstance.get(`/logout/${currentuser._id}`);
    if (response.status === 200) {
      localStorage.clear();
      navigate("/auth");
    }
  };

  return (
    <button onClick={logoff}>
      <GoSignOut />
    </button>
  );
};

export default LogOut;
