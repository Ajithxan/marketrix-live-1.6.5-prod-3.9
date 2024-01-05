class VideoContainer extends HTMLElement {
  constructor() {
    super();
    this.heigh = "0vh"
  }

  connectedCallback() {
    this.render();
    this.listen()
  }

  listen() {
    watch(() => {
      console.log(getFromStore("MARKETRIX_MODE"))
      if (/true/.test(getFromStore("MARKETRIX_MODE"))) videoContainer.style.height = "0vh"
      else videoContainer.style.height = "100vh"
    }, "getFromStore('MARKETRIX_MODE')");
  }

  render() {
    this.innerHTML = `<div id="mtx-video-container"></div>`;
  }
}

customElements.define("video-container", VideoContainer);
