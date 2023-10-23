console.log("controller.js is loaded")
const controllers = ["contactButtonController", "contactFormController", "configurationController", "mouseController", "scrollController", "notificationController"]

let controllersFirstIndex = 0

const loadControllers = () => {
    if (controllersFirstIndex === controllers.length) return

    let script = document.createElement("script")

    script.setAttribute("async", "false")
    script.setAttribute("defer", "true")
    script.setAttribute("src", `${CDNlink}controller/${controllers[controllersFirstIndex]}.js`)

    document.body.append(script)

    script.addEventListener("load", () => {
        controllersFirstIndex += 1
        loadControllers()
    })
}

loadControllers()