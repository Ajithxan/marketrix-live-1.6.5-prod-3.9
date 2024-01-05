class ScreenShare extends HTMLElement {
  constructor() {
    super();
    this.participantId;
  }

  connectedCallback() {
    this.participantId = this.getAttribute("participant-id");
    this.render();
  }

  render() {
    this.innerHTML = `
      <div id="mtx-video-share-screen-${this.participantId}">
        <video class="mtx-hidden" autoPlay="false" control="false" id="mtx-video-share-elem-${this.participantId}" style="height:auto; border-radius:10px; border:5px solid #ffffff20"></video>
      </div>
      `;
  }
}

customElements.define("screen-share", ScreenShare);
