class OverlayLoading extends HTMLElement {
    constructor() {
        super()
    }

    connectedCallback() {
        this.render()
    }

    render() {
        this.innerHTML = `
        <div id="mtx-overlay-loading" class="mtx-hidden">
      <div class="mtx-loading-img">
        <div>
          <img src="{{CDN_LINK}}assets/images/mtx-logo.jpg" />
        </div>
        <div>
          <span>Marketrix</span>
        </div>
      </div>
      <div style="font-size: 12px">
        <i class="fas fa-spinner fa-pulse"></i>
        <span id="mtx-loading-message"></span>
      </div>
    </div>`
    }
}

customElements.define("overlay-loading", OverlayLoading)