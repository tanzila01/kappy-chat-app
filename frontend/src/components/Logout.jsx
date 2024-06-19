import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { removeAuthentication } from "../utils/cookies";

export default function Logout() {
const navigate = useNavigate();
const handleLogout = () => {
    console.log("working")
    removeAuthentication()
    navigate("/login")
}

return (
        <button onClick={handleLogout} style={{
            backgroundColor:"#9a86f3",
            color:"white",
            height: "29px",
            width: "60px",
            border: "none",
        }}
        >Logout</button>
);
}