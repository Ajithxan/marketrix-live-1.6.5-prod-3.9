class VideoFrame extends HTMLElement {
    constructor() {
        super()

        this.participantId;
        this.participantName;
        this.isLocalUser;
    }

    connectedCallback() {
        this.participantId = this.getAttribute("participant-id")
        this.participantName = this.getAttribute("participant-name")
        this.isLocalUser = this.getAttribute("is-local-user")
        this.listen()
        this.render()
        ROUTE.setCDNLink()
    }

    listen() {
        watch(() => {
            console.log("marketrix mode =>", getFromStore('MARKETRIX_MODE'))
            if ((/true/).test(getFromStore('MARKETRIX_MODE'))) {
                style.show(document.getElementById(`mtx-mode-screen-component-${this.participantId}`))
                style.hide(document.getElementById(`focus-mode-screen-component-${this.participantId}`))
                console.log("marketrix mode =>", getFromStore('MARKETRIX_MODE'), this.participantId)
            }
            else {
                style.hide(document.getElementById(`mtx-mode-screen-component-${this.participantId}`))
                style.show(document.getElementById(`focus-mode-screen-component-${this.participantId}`))
                console.log("marketrix mode =>", getFromStore('MARKETRIX_MODE'), this.participantId)
            }
        }, "getFromStore('MARKETRIX_MODE')")
    }

    render() {
        this.innerHTML = `
            <mtx-mode-screen id="mtx-mode-screen-component-${this.participantId}" participant-id="${this.participantId}" participant-name="${this.participantName}" is-local-user="${this.isLocalUser}"></mtx-mode-screen>
            <focus-mode-screen class="mtx-hidden" id="focus-mode-screen-component-${this.participantId}" participant-id="${this.participantId}" participant-name="${this.participantName}" is-local-user="${this.isLocalUser}"></mtx-mode-screen>
            `
    }
}

customElements.define("video-frame", VideoFrame)