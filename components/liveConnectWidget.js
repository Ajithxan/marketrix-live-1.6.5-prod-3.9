class LiveConnectWidget extends HTMLElement {
    constructor() {
        super();
        this.video_url = null;
        this.theme_color = "purple";
    }

    connectedCallback() {
        this.fetchData();
        this.render();
        if (this.video_url) {
            style.hide(document.getElementById("mtx-default-recorded-animation"))
            style.show(document.getElementById("mtx-recorded-animation"))
        } else {
            style.show(document.getElementById("mtx-default-recorded-animation"))
            style.hide(document.getElementById("mtx-recorded-animation"))
        }
    }

    fetchData() {
        if (ROUTE.componentData("setting", "active_video_url"))
            this.video_url = ROUTE.componentData("setting", "active_video_url");
    }

    render() {
        this.innerHTML = `
    <div id="mtx-live-connect-call-div" class="mtx-hidden">
        <div id="mtx-admin-grid-screen" class="mtx-hidden">
            <div id="mtx-admin-video-container">
                <div class="mtx-admin-frame-pointer">
                    <img src="${CDNlink}assets/images/pointer.png"/>
                </div>
                <div id="mtx-recorded-animation" class="mtx-video-circle mtx-admin-video-frame mtx-hidden" style="border: 0.5rem solid ${this.theme_color};">
                    <video autoplay muted loop style="width:291px">
                        <source src="${this.video_url}" type="video/mp4">
                    </video>
                </div>
                <div id="mtx-default-recorded-animation" class="mtx-admin-video-frame mtx-hidden" style="background-image:url('${CDNlink}/assets/images/animation.gif')"></div>
            </div>
        </div>
        <div class="mtx-admin-call-text"> <span id="admin-message">Loading...</span></div>
        <div class="mtx-main-footer">
            <div class="mtx-admin-call-footer">
                <div class="mtx-footer-actions">
                    <div type="button" class="mtx-join-with-video-btn" onclick="joinMeeting(true)">
                        <span >
                            <i class="fas fa-video"></i>
                            Join with video
                        </span>
                    </div>
                    <div type="button" class="mtx-join-with-audio-btn" onclick="joinMeeting(false)">
                        <span>
                            <i class="fa fa-headphones" aria-hidden="true"></i>
                            Join with audio
                        </span>
                    </div>
                </div>
            </div>
        </div>
    </div>`
    }
}

customElements.define("live-connect-widget", LiveConnectWidget);
