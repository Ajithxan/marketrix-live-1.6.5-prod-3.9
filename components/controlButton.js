class ControlButton extends HTMLElement {
  constructor() {
    super();

    this.theme_color = "purple";
    //   this.video_url = "videoCard";
  }

  // <video src="{{CDN_LINK}}assets/videos/videoCard.mp4" autoplay="" loop="" muted="" playsinline="" width="360px" height="210px"></video>

  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `<div class="mtx-footer-actions">
    <div type="button" class="mtx-btn-background " onclick="meetingObj.toggle.mic()">
        <i id="mic-icon" class="fa-solid fa-microphone"></i>
    </div>
    <div type="button" class="mtx-btn-background" onclick="meetingObj.toggle.webCam()">
        <i id="webcam-icon" class="fas fa-video"></i>
    </div>
    <div type="button" id="mtx-btn-connect" class="mtx-btn-connect" onclick="submit()">
        <span>
            <i class="fa fa-headphones" aria-hidden="true"></i>Connect</span>
    </div>
    <div type="button"  class="mtx-btn-share-screen" >
        <span>
            <i class="fa-solid fa-computer"></i>
           Share Screen
        </span>
    </div>

    <div type="button" id="mtx-btn-endcall" class="mtx-hidden mtx-btn-end-call " onclick="meetingObj.leaveMeeting()">
      <span>
          <i class="fa-solid fa-phone-slash"></i>
          End call
      </span>
    </div>
    
</div>`;
  }
}

customElements.define("control-button", ControlButton);
