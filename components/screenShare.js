class ScreenShare extends HTMLElement {
    constructor() {
      super();

      this.participantId;
    }
  
    connectedCallback() {
        this.participantId = this.getAttribute("participant-id")
      this.render();
    }
  
    render() {
      this.innerHTML = `
      <div id="mtx-video-share-screen-${this.participantId}">
      <video autoPlay="false" control="false" id="mtx-video-share-elem-${this.participantId}"></video>
      </div>
      `;
    }
  }
  
  customElements.define("screen-share", ScreenShare);
  