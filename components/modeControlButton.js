class ModeControlButton extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `<div class="mtx-config-controls">
        <div id="show-cursor" class="mtx-hidden">
            <div id="focus-mode-btn" class="config-btn-circle" onclick="mouse.show()">
                Focus Mode
            </div>

            <div id="marketrix-mode-btn" class="config-btn-circle mtx-hidden mtx-mode" onclick="mouse.hide()">
             Marketrix Mode
            </div>
        </div>
    </div>`;
  }
}

customElements.define("mode-control-button", ModeControlButton);
