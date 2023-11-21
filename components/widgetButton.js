class WidgetButton extends HTMLElement {
  constructor() {
    super();

    this.text = "Live Agent";
    this.bg_color = "white";
    this.logo_url = "{{CDN_LINK}}assets/images/mtx-logo.jpg";
    this.text_color = "black";
  }

  connectedCallback() {
    this.logo_url = this.getAttribute("logo-url")
    this.fetchData();
    this.render();
  }

  fetchData() {
    this.text = ROUTE.componentData("setting","widget_text");
    const data = ROUTE.componentData("widget_customize","widget_button");
    if (data) {
      this.bg_color = data["bg_color"];
      this.text_color = data["text_color"];
    }
  }

  render() {
    this.innerHTML = `<div class="mtx-mainButton" style="background-color:${this.bg_color}">
                <div class="mtx-button" onclick="showModal()">
                    <div class="mtx-avatar">
                        <div>
                            <img src="${this.logo_url}"/>
                        </div>
                        <div class="mtx-avatar-online"></div>
                    </div>
                    <div class="mtx-button-txt" style="color:${this.text_color}">${this.text}</div>
                </div>
            </div>`;
  }
}

customElements.define("widget-button", WidgetButton);
