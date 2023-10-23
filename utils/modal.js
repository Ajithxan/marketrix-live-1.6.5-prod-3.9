console.log("socket.js is established #12");
const closeModal = () => {
    style.show(marketrixButton)
    style.hide(marketrixModalContainer)
    style.hide(mtxContactFormNotificationCard)
    style.show(mtxFormContent)
};

const showModal = () => {
    marketrixButton && style.hide(marketrixButton)
    marketrixModalContainer && style.show(marketrixModalContainer)

    const elements = document.querySelectorAll(`#mtx-form .mtx-form-control`)

    elements.forEach(element => {
        const name = element.attributes.name.nodeValue
        const field = document.querySelector(`[name="${name}"]`)

        field.classList.remove("mtx-form-control-error")
    })

    if (!(/null/).test(getFromStore("MEETING_ENDED")) && ((/false/).test(getFromStore("MEETING_ENDED")) || !getFromStore("MEETING_ENDED"))) {
        style.hide(mtxCursorHeader)
        style.hide(mtxContactFormNotificationCard)
        style.hide(mtxFormContent)
        style.hide(mtxFormCloseBtn)
    }
};