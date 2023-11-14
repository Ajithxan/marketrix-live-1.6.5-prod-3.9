class WidgetCard extends HTMLElement {
  constructor() {
    super();

    this.theme_color = "purple";
    this.video_url = "videoCard";
  }

  // <video src="{{CDN_LINK}}assets/videos/videoCard.mp4" autoplay="" loop="" muted="" playsinline="" width="360px" height="210px"></video>

  connectedCallback() {
    this.video_url = this.getAttribute("video-url");
    this.fetchData();
    this.render();
  }

  fetchData() {
    const data = ROUTE.componentData("widget_customize", "widget_card");
  }

  render() {
    this.innerHTML = `
    <div class="mtx-snpt-video-circle-comp" onclick="showModal()"> 
    <p>Click here to speak to one of our live agents now 👇🏼  </p>
        <div class="mtx-video-circle" style="border: 0.5rem solid ${this.theme_color};">
           <video width="320" height="240" >
            <source src="${this.video_url}" type="video/mp4">
           </video>
        </div>
        `;
  }
}

customElements.define("widget-card", WidgetCard);
