class LiveConnectWidget extends HTMLElement {
  constructor() {
    super();
    this.default_video_url = `${CDNlink}assets/images/animation.gif`
    this.video_url = null;
    this.theme_color = "#8256C7";
  }

  connectedCallback() {
    this.fetchData();
    this.render();
    if (this.video_url) {
      style.hide(document.getElementById("mtx-default-recorded-animation"));
      style.show(document.getElementById("mtx-recorded-animation"));
    } else {
      style.show(document.getElementById("mtx-default-recorded-animation"));
      style.hide(document.getElementById("mtx-recorded-animation"));
    }

    if (browserName === safari) {
      style.show(document.getElementById("mtx-default-recorded-animation"));
      style.hide(document.getElementById("mtx-recorded-animation"));
    }
  }

  fetchData() {
    if (ROUTE.componentData("setting", "active_video_url"))
      this.video_url = ROUTE.componentData("setting", "active_video_url");
  }

  render() {
    this.innerHTML = `
    <div>
        <div id="mtx-admin-grid-screen" class="mtx-hidden">
            <div id="mtx-admin-video-container" class=" ">
                <div class="mtx-admin-frame-pointer">
                    <img src="${CDNlink}assets/images/pointer.png"/>
                </div>
                <div id="mtx-recorded-animation" class="mtx-snpt-animated-gradient mtx-hidden">
                  <div onclick="ROUTE.showModal('widgetCard')" class="mtx-video-circle mtx-admin-video-frame mtx-snpt-animated-gradient" style="border: 0.5rem solid ${this.theme_color};">
                    <video autoplay loop muted>
                      <source src="${this.video_url}" type="video/webm">
                    </video>
                  </div>
                </div>
                <div id="mtx-default-recorded-animation" class="mtx-hidden">
                 <div class="mtx-admin-video-frame" style="background-image:url('${CDNlink}assets/images/animation.gif')"></div>
                </div>
            </div>
        </div>
        <div class="mtx-admin-call-text"> <span id="admin-message">Loading...</span></div>
        <div class="mtx-main-footer">
            <div class="mtx-admin-call-footer">
                <div class="mtx-footer-actions">
                    <div type="button" class="mtx-join-with-video-btn" onclick="joinMeeting(true)">
                        <span >
                            <i class="fas fa-video"></i>
                            Join Call
                        </span>
                    </div>

                 

                    <div type="button" class="mtx-snpt-button-call-decline" onclick="meetingObj.leaveMeeting()">
                        <span>
                        <i class="fa-solid fa-phone-slash"></i>
                        Decline
                        </span>
                    </div>
                </div>
            </div>
        </div>
    </div>`;
  }
}

customElements.define("live-connect-widget", LiveConnectWidget);
