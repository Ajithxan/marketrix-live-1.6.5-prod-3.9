console.log("component.js is loaded")
const components = ["widgetButton", "widgetCard"]

let componentsFirstIndex = 0

const loadComponent = () => {
    if (componentsFirstIndex === components.length) return

    let script = document.createElement("script")

    script.setAttribute("async", "false")
    script.setAttribute("defer", "true")
    script.setAttribute("src", `${CDNlink}components/${components[componentsFirstIndex]}.js`)

    document.body.append(script)

    script.addEventListener("load", () => {
        componentsFirstIndex += 1
        loadComponent()
    })
}

// fetch component design
fetch(`https://api-v2.marketrix.io/admin/tenant/snippet_json/mLive-DHsAT`).then( (response) => {
    return response.json()
}).then( (data) => {
    if ((/true/).test(data.status)) setToStore("COMPONENT_DATA", JSON.stringify(data.data))
    loadComponent()
})