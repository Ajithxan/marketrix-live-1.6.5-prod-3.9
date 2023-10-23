console.log("render.js is established #10");
// renderId => element ID, it can be element ID or html element
const render = {
    initiate: (renderId, elementObj) => {
        let sectionDiv
        if (typeof (renderId) === "object") sectionDiv = renderId // html DOM element
        else sectionDiv = document.getElementById(renderId) // string

        const keys = Object.keys(elementObj)

        // elements array
        if (keys.includes("elements") && elementObj['elements'].length > 0) {
            elementObj['elements'].forEach(element => {
                render.initiate(sectionDiv, element)
            })
        } else {
            if (keys.includes("element")) {
                let parentElement = document.createElement(elementObj['element'])

                // id
                if (keys.includes("id")) parentElement.setAttribute("id", elementObj['id'])

                // class []
                if (keys.includes("class") && elementObj['class'].length > 0) {
                    const classes = elementObj['class']
                    classes.forEach(cl => parentElement.classList.add(cl))
                }

                // onclick
                if (keys.includes("onclick")) parentElement.setAttribute("onclick", elementObj['onclick'])

                // text
                if (keys.includes("text")) parentElement.innerText = elementObj['text']

                // signText
                if (keys.includes("signText")) parentElement.innerHTML = elementObj['signText']

                // src
                if (keys.includes("src")) parentElement.setAttribute("src", elementObj['src'])

                // placeholder
                if (keys.includes("placeholder")) parentElement.setAttribute("placeholder", elementObj['placeholder'])

                // value
                if (keys.includes("value")) parentElement.setAttribute("value", elementObj['value'])

                // name
                if (keys.includes("name")) parentElement.setAttribute("name", elementObj['name'])

                // type
                if (keys.includes("type")) parentElement.setAttribute("type", elementObj['type'])

                // rows
                if (keys.includes("rows")) parentElement.setAttribute("rows", elementObj['rows'])

                // ariaHidden
                if (keys.includes("ariaHidden")) parentElement.setAttribute("aria-hidden", elementObj['ariaHidden'])

                // inline styles
                if (keys.includes("inlineStyles")) render.applyInLineStyles(elementObj["inlineStyles"], parentElement)

                // children rendering
                if (keys.includes("children")) {
                    elementObj['children'].elements.forEach(element => render.initiate(parentElement, element))
                }

                if (keys.includes("child")) {
                    render.initiate(parentElement, elementObj["child"])
                }

                sectionDiv.append(parentElement)
            }
        }

    },

    applyInLineStyles: (inlineStyles, element) => {
        const keys = Object.keys(inlineStyles)

        keys.forEach(key => {
            element.style[key] = inlineStyles[key]
        })
    },
}