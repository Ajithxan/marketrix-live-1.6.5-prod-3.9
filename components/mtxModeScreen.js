class MtxModeScreen extends HTMLElement {
    constructor() {
        super()

        this.participantId;
        this.participantName;
        this.movingOuterFrame = "mtx-remote-moving-outer-frame";
    }

    connectedCallback() {
        this.participantId = this.getAttribute("participant-id")
        this.participantName = this.getAttribute("participant-name")
        if ((/true/).test(this.getAttribute("is-local-user"))) this.movingOuterFrame = "mtx-local-moving-outer-frame"
        this.render()
        ROUTE.setCDNLink()
    }

    render() {
        console.log("marketrixMode", ROUTE.marketrixMode())
        this.innerHTML = `
        <div id="f-${this.participantId}" class="mtx-col-12 mtx-outer-frame start-move mtx-moving-outer-frame ${this.movingOuterFrame}">
            <video class="mtx-moving-video-frame" id="mtx-video-elem-${this.participantId}" playsinline="true"></video>
    
            
            <div class="mtx-hidden" id="vd-${this.participantId}">
                <img class="mtx-hidden mtx-moving-video-disabled-div" id="vdi-${this.participantId}" src="{{CDN_LINK}}assets/images/profile.png"/>
            </div>
    
            <div class="user-names">
                ${this.participantName}
    
                <i id="ai-${this.participantId}" class="fa-solid fa-microphone mtx-ml-2"></i>
            </div>
        </div>
    
        <audio id="a-${this.participantId}" class="mtx-hidden" autoplay="false" playsInline="false" controls="false"></audio>
    
        <div id="cp-${this.participantId}" class="mtx-remote-cursor-png-div mtx-hidden" style="top:50vh">
            <img src="{{CDN_LINK}}assets/images/pointer.png" class="mtx-remote-cursor"/>
        </div>
    `
    }
}

customElements.define("mtx-mode-screen", MtxModeScreen)