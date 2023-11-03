class VideoContainer extends HTMLElement {
    constructor() {
        super()
    }

    connectedCallback() {
        this.render()
    }

    render() {
        this.innerHTML = `<div id="mtx-video-container"></div>`
    }
}

customElements.define("video-container", VideoContainer)