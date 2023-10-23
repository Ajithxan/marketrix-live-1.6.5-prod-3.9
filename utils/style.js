console.log("style.js is loaded")
const style = {
    hide: (element) => {
        element.classList.add("mtx-hidden")
    },
    show: (element) => {
        element.classList.remove("mtx-hidden")
    }
}