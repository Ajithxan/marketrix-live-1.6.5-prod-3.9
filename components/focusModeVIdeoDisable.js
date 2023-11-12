class FocusModeVideoDisable extends HTMLElement {
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
        <div class="mtx-hidden"  id="focus-mode-video-disable-${this.participantId}">
          <img class="mtx-snpt-video-disable" id="focus-mode-video-disable-image-${this.participantId}" src="{{CDN_LINK}}assets/images/profile.png"/>
        </div>
   `;
  }
}

customElements.define("focus-mode-video-disable", FocusModeVideoDisable);
