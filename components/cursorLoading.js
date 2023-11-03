class CursorLoading extends HTMLElement {
    constructor() {
        super()
    }

    connectedCallback() {
        this.render()
    }

    render() {
        this.innerHTML = `
        <div id="cursor-loading" class="mtx-cursor-loading"></div>`
    }
}

customElements.define("cursor-loading", CursorLoading)