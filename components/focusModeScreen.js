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
    this.innerHTML = ` 
    
    <div style="display:flex; flex-direction:row; position:relative ; justify-content:center ; align-items:center">
    <div style="padding-right:30px ; "><screen-share participant-id="${this.participantId}"></screen-share></div> 
        <div
          id="focus-mode-frame-${this.participantId}"
          style="position:relative; overflow:hidden ; margin-bottom : 0px ; "
        >
          <video
            class="mtx-snpt-video-box"
            id="focus-mode-video-elem-${this.participantId}"
            playsinline="true"
            muted="true"
          ></video>
          <div
            class="mtx-hidden video-div"
            id="focus-mode-video-disable-${this.participantId}"
          >
            <img
              class=" mtx-snpt-video-box"
              id="focus-mode-video-disable-image-${this.participantId}"
              src="{{CDN_LINK}}assets/images/profile.png"
            />
          </div>

        
          <div class="user-names">
            ${this.participantName}
            <i
              id="focus-mode-ai-${this.participantId}"
              class="fa-solid fa-microphone mtx-ml-2"
            ></i>
          </div>

         
        </div>
       
      
        <audio
          id="a-${this.participantId}"
          class="mtx-hidden"
          autoplay="false"
          playsInline="false"
          controls="false"
        ></audio>

        
      </div> 
     `; // ? +` <screen-share participant-id="${this.participantId}"></screen-share> `

    // : +` <div> hey hey </div>`;
  }
}

customElements.define("focus-mode-screen", FocusModeScreen);
