console.log("socket.js is established #12");
const closeModal = () => {
    if (!fromWidgetCard) marketrixButton && style.show(marketrixButton)
    marketrixModalContainer && style.hide(marketrixModalContainer)
    mtxContactFormNotificationCard && style.hide(mtxContactFormNotificationCard)
    marketrixWidgetCard && style.show(marketrixWidgetCard)
    mtxFormContent && style.show(mtxFormContent)
};

const showModal = (ele) => {
    fromWidgetCard = false
    if (ele === "widgetCard") fromWidgetCard = true

    marketrixButton && style.hide(marketrixButton)
    marketrixWidgetCard && style.hide(marketrixWidgetCard)
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

const closeWidgetCard = () => {
    marketrixWidgetCard && style.hide(marketrixWidgetCard)
    closeWidgetCardStatus = true
}