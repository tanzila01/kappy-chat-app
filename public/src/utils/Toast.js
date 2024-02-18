import React from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Toast() {
    const type = "error" | "success" | "warning" | "info"
    const message = "";
    const notify = (message, type) => toast(message, type);
    const toastHandle = () => {
        toast.error("here", "error")
    }
  return (
    <div>
        <ToastContainer
        position="top-right"
        autoClose={5000}
        pauseOnFocusLoss
        draggable={true}
        pauseOnHover
        />
        <button onClick={toastHandle}>here</button>

    </div>
  )
}

export default Toast