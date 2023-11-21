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
        this.render()
        this.listen()
        ROUTE.setCDNLink()
    }

    listen() {
        watch(() => {
            const mtxModeScreenComponent = document.getElementById(`mtx-mode-screen-component-${this.participantId}`)
            const focusModeScreenComponent = document.getElementById(`focus-mode-screen-component-${this.participantId}`)

            if ((/true/).test(getFromStore('MARKETRIX_MODE'))) {
                style.show(mtxModeScreenComponent)
                style.hide(focusModeScreenComponent)
            }
            else {
                style.hide(mtxModeScreenComponent)
                style.show(focusModeScreenComponent)
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