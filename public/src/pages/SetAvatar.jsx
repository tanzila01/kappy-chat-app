import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import loader from "../assets/loader.gif"
import {makeStyles} from "@material-ui/core"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { avatarRoute } from '../utils/apiRoutes';
import axios from "axios"
import { setAuthentication } from '../utils/cookies';

function SetAvatar() {
  return (
    <div>SetAvatar</div>
  )
}

export default SetAvatar