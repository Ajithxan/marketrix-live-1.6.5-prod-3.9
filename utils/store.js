console.log("store.js is established #2")
// ---keys---
const keys = ['CURRENT_URL', 'MEETING_VARIABLES', 'DECODED_OBJECT', 'SOCKET_IO', 'CURSOR_ID', 'MARKETRIX_MODE', 'MEETING_ENDED', 'VIDEO_ENABLED', 'LOADING_MESSAGE']

const setToStore = (key, value) => {
    sessionStorage.setItem(key, value)
}

const getFromStore = (key) => {
    return sessionStorage.getItem(key)
}

const removeFromStore = (key) => {
    sessionStorage.removeItem(key)
}

const setStore = () => {
    // set all existing local storage keys
    console.log("set localstorage")
}

setStore()