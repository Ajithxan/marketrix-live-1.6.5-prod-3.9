class WidgetForm extends HTMLElement {
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
      Hellooo
      </div> `;
  }
}

customElements.define("widget-form", WidgetForm);
