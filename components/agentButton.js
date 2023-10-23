class AgentButton extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.text = "Live Agent";
        

        this.render()
    }

    render() {
        this.innerHTML = `<div class="mtx-mainButton" id="marketrix-button">
                <div class="mtx-button" onclick="showModal()">
                    <div class="mtx-avatar">
                        <div>
                            <img src="{{CDN_LINK}}assets/images/mtx-logo.jpg"/>
                        </div>
                        <div class="mtx-avatar-online"></div>
                    </div>
                    <div class="mtx-button-txt">${this.text}</div>
                </div>
            </div>`
    }
}

customElements.define("agent-button", AgentButton)