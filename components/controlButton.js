class ControlButton extends HTMLElement {
  constructor() {
    super();
    this.type = "default";
    //   this.video_url = "videoCard";
  }

  // <video src="{{CDN_LINK}}assets/videos/videoCard.mp4" autoplay="" loop="" muted="" playsinline="" width="360px" height="210px"></video>

  connectedCallback() {
    this.listen();
    this.render();
  }

  listen() {
    watch(() => {
      const mtxScreenShareButton = document.getElementById(
        `mtx-screen-share-button`
      );
      style.show(mtxScreenShareButton);
      if (
        ((/true/.test(getFromStore("MARKETRIX_MODE")) ||
          /null/.test(getFromStore("MARKETRIX_MODE"))) &&
          /true/.test(getFromStore("MEETING_ENDED"))) ||
        /null/.test(getFromStore("MEETING_ENDED"))
      )
        style.hide(mtxScreenShareButton);
    }, "getFromStore('MARKETRIX_MODE')");

    watch(() => {
      const mtxScreenShareButton = document.getElementById(
        `mtx-screen-share-button`
      );
      if (/false/.test(getFromStore("MEETING_ENDED")))
        style.show(mtxScreenShareButton);
    }, "getFromStore('MEETING_ENDED')");
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
    <div id="mtx-screen-share-button" type="button" class="mtx-btn-share-screen mtx-hidden" onclick="ROUTE.screenShare()" >
        <span>
            <i class="fa-solid fa-computer"></i>
           Screen Share 
        </span>
    </div>
    <div type="button" id="mtx-btn-endcall" class="mtx-hidden mtx-btn-end-call " onclick="meetingObj.leaveMeeting()">
      <span>
          <i class="fa-solid fa-phone-slash"></i>
          End Call
      </span>
    </div>
    
</div>`;
  }
}

customElements.define("control-button", ControlButton);
