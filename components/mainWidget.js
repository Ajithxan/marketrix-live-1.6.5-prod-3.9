class MainWidget extends HTMLElement {
    constructor() {
      super();

      this.logo_url = ""
      this.video_url = ""
      this.widget_type = "standard"
    }
  
    connectedCallback() {
      this.fetchData()
      this.render();
    }

    fetchData() {
      // this.widget_type = ROUTE.componentData("setting","widget_type")
      this.logo_url = ROUTE.componentData("setting","logo_url");
      this.video_url = ROUTE.componentData("setting","active_video_url");
    }
  
    render() {
        if (this.widget_type === "standard") this.innerHTML = `<widget-button id="marketrix-button" logo-url="${this.logo_url}"></widget-button>`
        else if(this.widget_type === "recorded") this.innerHTML = `<widget-card id="widget-card" video-url="${this.video_url}"></widget-card>`
        else if (this.widget_type === "trixy") this.innerHTML = `Trixy AI is coming soon`
    }
  }
  
  customElements.define("main-widget", MainWidget);
  