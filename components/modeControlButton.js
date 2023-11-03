class ModeControlButton extends HTMLElement {
    constructor() {
        super()
    }

    connectedCallback() {
        this.render()
    }

    render() {
        this.innerHTML = `<div class="mtx-config-controls">
        <div id="show-cursor" class="mtx-hidden">
            <div id="focus-mode-btn" class="config-btn-circle" onclick="mouse.show()">
                <img class="mtx-cursor-img" src="{{CDN_LINK}}assets/images/cursor.png"/>
            </div>
            <div id="marketrix-mode-btn" class="config-btn-circle mtx-hidden mtx-mode" onclick="mouse.hide()">
                <img class="mtx-cursor-img" src="{{CDN_LINK}}assets/images/cursor.png"/>
            </div>
        </div>
    </div>`
    }
}

customElements.define("mode-control-button", ModeControlButton)