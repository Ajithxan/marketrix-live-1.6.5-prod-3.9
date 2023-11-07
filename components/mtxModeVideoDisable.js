class MtxModeVideoDisable extends HTMLElement {
    constructor() {
        super()
        this.participantId;
    }

    connectedCallback() {
        this.participantId = this.getAttribute("participant-id")
        this.render()
    }

    render() {
        this.innerHTML = `<div class="mtx-hidden" id="mtx-mode-video-disable-${this.participantId}">
        <img class="mtx-moving-video-disabled-div" id="mtx-mode-video-disable-image-${this.participantId}" src="{{CDN_LINK}}assets/images/profile.png"/>
    </div>`
    }
}

customElements.define("mtx-mode-video-disable", MtxModeVideoDisable)