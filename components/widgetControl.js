class widgetControl extends HTMLElement {
  constructor() {
    super();

    this.theme_color = "purple";
    //   this.video_url = "videoCard";
  }

  // <video src="{{CDN_LINK}}assets/videos/videoCard.mp4" autoplay="" loop="" muted="" playsinline="" width="360px" height="210px"></video>

  connectedCallback() {
    this.fetchData();
    this.render();
  }

  fetchData() {
    const data = ROUTE.componentData("form");
    if (data) {
      console.log(data);
    }
  }

  render() {
    this.innerHTML = `
        <div class="mtx-snpt-video-circle-comp""> 
        <div class="mtx-snpt-flex-box" style="margin-top:2rem ; backgroundColor">  <button id="mtx-snpt-micBtn" onclick="micButton()" class="mtx-snpt-controller"><img src="../assets/icons/IconMicrophone/icon-microphone_on.svg"/></button> <button id="mtx-snpt-vidBtn" onclick="videoButton()" class="mtx-snpt-controller"><img src="../assets/icons/IconVideo/icon-video_on.svg"/></button>  <button type="button" class="mtx-snpt-button-primary" onclick="alertFunction()" style="background-color:var(--primary-700) " >  <span><img src=" ../assets/icons/headphones.svg" /></span>  <span> Connect with agent</span> </button></div>
        </div> `;
  }
}

customElements.define("widget-control", widgetControl);
