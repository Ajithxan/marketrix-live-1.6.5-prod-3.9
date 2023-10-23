const contactFormController = {
    view: async () => {
        await fetch(`${CDNlink}view/contact-form.html`)
            .then((response) => {
                return response.text();
            })
            .then(async (html) => {
                contactFormDiv.innerHTML = html; // rendering
                marketrixModalContainer = document.getElementById(
                    "marketrix-modal-container"
                );
                style.hide(marketrixModalContainer)
            });

        // await contactFormController.renderJson()

        mtxContactFormNotificationCard = document.getElementById("mtx-contact-form-notification-card")
        style.hide(mtxContactFormNotificationCard) // default hide
        mtxFormContent = document.getElementById("mtx-form-content")
        mtxAdminCallDiv = document.getElementById("mtx-admin-call-div")
        style.hide(mtxAdminCallDiv) // default hide
        mtxFooterControl = document.getElementById("mtx-footer-controls")
        mtxFormCloseBtn = document.getElementById("mtx-form-close-btn")
        mtxConnectBtn = document.getElementById("mtx-btn-connect")
        mtxEndCallBtn = document.getElementById("mtx-btn-endcall")
        style.hide(mtxEndCallBtn) // default hide
        mtxCursorHeader = document.getElementById("mtx-cursor-header")
        mtxAdminGridScreen = document.getElementById("mtx-admin-grid-screen")
        style.hide(mtxAdminGridScreen) // default hide
        overlay = document.querySelector(".mtx-overlay");
        currentUrl = window.location.href // set current Url
        
        // show these element after everything is loaded properly
        setTimeout(() => {
            parentDiv.style.display = "block"
            contactFormDiv.style.display = "block"
        }, 2000)

    },

    renderJson: async () => {
        await fetch(`${CDNlink}data/contact-form.json`).then(response => {
            return response.json()
        }).then(async (data) => {
            const htmlElementResponse = data[0]
            render.initiate(marketrixModalContainer, htmlElementResponse)
        })
    }
}