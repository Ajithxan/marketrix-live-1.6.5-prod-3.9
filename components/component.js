console.log("component.js is loaded")
const components = ["agentButton"]

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

loadComponent()