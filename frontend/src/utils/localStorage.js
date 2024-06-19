
export const setLocalStorage = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value))
    console.log("local storage", value)
}
export const getLocalStorage = () =>{
    return JSON.parse(localStorage.getItem('user'))
}

export const deleteLocalStorage = (key) =>{
    console.log("key", key)
    localStorage.removeItem(key)
}