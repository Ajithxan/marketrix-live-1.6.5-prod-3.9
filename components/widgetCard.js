class WidgetCard extends HTMLElement {
  constructor() {
    super();

    this.theme_color = "purple";
    this.video_url = null;
  }

  connectedCallback() {
    if (this.getAttribute("video-url"))
      this.video_url = this.getAttribute("video-url");
    this.fetchData();
    this.render();
    if (this.video_url) {
      style.hide(document.getElementById("mtx-recorded-default-video"));
      style.show(document.getElementById("mtx-recorded-video"));
    } else {
      style.show(document.getElementById("mtx-recorded-default-video"));
      style.hide(document.getElementById("mtx-recorded-video"));
    }
  }

  fetchData() {
    const data = ROUTE.componentData("widget_customize", "widget_card");
  }

  render() {
    this.innerHTML = `
    <div class="mtx-snpt-video-circle-comp"> 
    <div type="button" onclick="ROUTE.closeWidgetCard()" class="mtx-snpt-close-btn-div">
      <span aria-hidden="true" class="mtx-snpt-close-btn">&times;</span>
    </div>
    <p>Click here to speak to one of our live agents now 👇🏼  </p>
        <div id="mtx-recorded-video" onclick="ROUTE.showModal('widgetCard')" class="mtx-video-circle mtx-hidden" style="border: 0.5rem solid ${this.theme_color};">
           <video width="320" height="240" autoplay muted loop>
            <source src="${this.video_url}" type="video/webm">
           </video>
        </div>
        <div id="mtx-recorded-default-video" class="mtx-admin-video-frame mtx-hidden" style="background-image:url('${CDNlink}/assets/images/animation.gif')"></div>
        `;
  }
}

customElements.define("widget-card", WidgetCard);
