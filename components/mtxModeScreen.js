class MtxModeScreen extends HTMLElement {
  constructor() {
    super();

    this.participantId;
    this.participantName;
    this.movingOuterFrame =
      "mtx-remote-moving-outer-frame mtx-cursor-video-border";
  }

  connectedCallback() {
    this.participantId = this.getAttribute("participant-id");
    this.participantName = this.getAttribute("participant-name");
    if (/true/.test(this.getAttribute("is-local-user")))
      this.movingOuterFrame = "mtx-local-moving-outer-frame";
    this.render();
    ROUTE.setCDNLink();
  }

  render() {
    console.log("marketrixMode", ROUTE.marketrixMode());
    this.innerHTML = `
        <div id="mtx-mode-frame-${this.participantId}" class=" mtx-outer-frame start-move mtx-moving-outer-frame ${this.movingOuterFrame}">
            <video class="mtx-moving-video-frame" id="mtx-mode-video-elem-${this.participantId}" playsInline="true" muted="true"></video>
    
            <div class="mtx-hidden" id="mtx-mode-video-disable-${this.participantId}">
            <img class="mtx-moving-video-disabled-div" id="mtx-mode-video-disable-image-${this.participantId}" src="{{CDN_LINK}}assets/images/profile.png"/>
        </div>
    
            <div>
                ${this.participantName}
                <i id="mtx-mode-ai-${this.participantId}" class="fa-solid fa-microphone mtx-ml-2"></i>
            </div>
        </div>
    
        <audio id="a-${this.participantId}" class="mtx-hidden" autoplay="false" playsInline="false" controls="false"></audio>
    
        <div id="cursor-pointer-${this.participantId}" class="mtx-remote-cursor-png-div mtx-hidden" style="top:50vh">
            <img src="{{CDN_LINK}}assets/images/pointer.png" class="mtx-remote-cursor"/>
        </div>
    `;
  }
}

customElements.define("mtx-mode-screen", MtxModeScreen);
