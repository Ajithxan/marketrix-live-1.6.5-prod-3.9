class WidgetCard extends HTMLElement {
    constructor() {
        super();

        this.text = "Widget card text"
    }

    connectedCallback() {
        this.fetchData()
        this.render()
    }

    fetchData() {
        const data = ROUTE.componentData("widget_card")
        if (data) {
            console.log(data)
        }
    }

    render() {
        this.innerHTML = `<div class="mtx-mainButton">
                ${this.text}
            </div>`
    }
}

customElements.define("widget-card", WidgetCard)