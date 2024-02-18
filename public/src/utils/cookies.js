import Cookies from "js-cookie"
import { deleteLocalStorage, setLocalStorage } from "./localStorage"

export const setAuthentication = (token, user) => {
    Cookies.set("token", token)
    setLocalStorage("user", user)
}

export const removeAuthentication = (next) => {
    console.log("in cookie secttion")
    Cookies.remove("token")
    deleteLocalStorage("user");
}