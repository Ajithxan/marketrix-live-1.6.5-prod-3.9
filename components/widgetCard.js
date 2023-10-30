class WidgetCard extends HTMLElement {
  constructor() {
    super();

    this.text = "Widget card text";
    this.themeColor = "purple";
  }

  connectedCallback() {
    this.fetchData();
    this.render();
  }

  fetchData() {
    const data = ROUTE.componentData("widget_card");
    if (data) {
      console.log(data);
    }
  }

  render() {
    this.innerHTML = `
    <div class="mtx-snpt-video-circle-comp" onclick="showModal()"> 
    <p>Press Right arrow key  to start the journey 👉🏼 </p>
 <div class="mtx-video-circle"> 
          
 <video muted autoplay loop>
   <source src="{{CDN_LINK}}assets/images/hellovideo.mp4" type="video/mp4">
 </video>`;
  }
}

customElements.define("widget-card", WidgetCard);
