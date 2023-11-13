class FocusModeScreen extends HTMLElement {
  constructor() {
    super();

    this.participantId;
    this.participantName;
  }

  connectedCallback() {
    this.participantId = this.getAttribute("participant-id");
    this.participantName = this.getAttribute("participant-name");
    this.render();
    ROUTE.setCDNLink();
  }

  render() {
    console.log("marketrixMode", ROUTE.marketrixMode());
    this.innerHTML = `
   
        <div id="focus-mode-frame-${this.participantId}" style="position:relative; overflow:hidden">
            <video class="mtx-snpt-video-box" id="focus-mode-video-elem-${this.participantId}" playsinline="true" muted="true"></video>
    

            <div class="mtx-hidden" id="focus-mode-video-disable-${this.participantId}">
            <img class="mtx-video-disabled-img" id="focus-mode-video-disable-image-${this.participantId}" src="{{CDN_LINK}}assets/images/profile.png"/>
            </div>
    
            <div class="user-names">
                ${this.participantName}
                <i id="focus-mode-ai-${this.participantId}" class="fa-solid fa-microphone mtx-ml-2"></i>
            </div>
        </div>
    
        <audio id="a-${this.participantId}" class="mtx-hidden" autoplay="false" playsInline="false" controls="false"></audio>
       
    `;
  }
}

customElements.define("focus-mode-screen", FocusModeScreen);
