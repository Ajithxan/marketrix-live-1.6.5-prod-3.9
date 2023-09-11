console.log("store.js is established #2")
// ---keys---
// CURRENT_URL
// MEETING_VARIABLES
// DECODED_OBJECT
// SOCKET_IO
// CURSOR_ID
// MARKETRIX_MODE
// MEETING_ENDED
// VIDEO_ENDABLED

const setToStore = (key, value) => {
    sessionStorage.setItem(key, value)
}

const getFromStore = (key) => {
    return sessionStorage.getItem(key)
}

const removeFromStore = (key) => {
    sessionStorage.removeItem(key)
}