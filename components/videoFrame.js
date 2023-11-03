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
        ROUTE.setCDNLink()
    }

    render() {
        this.innerHTML = `
            <mtx-mode-screen id="mtx-mode-screen-component" participant-id="${this.participantId}" participant-name="${this.participantName}" is-local-user="${this.isLocalUser}"></mtx-mode-screen>
            `
    }
}

customElements.define("video-frame", VideoFrame)