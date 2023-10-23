console.log("contactButtonController.js is loaded")
const contactButtonController = {
    view: async () => {
        parentDiv = document.createElement("div");
        contactFormDiv = document.createElement("div");

        parentDiv.setAttribute("id", "mtx-parent-div");
        contactFormDiv.setAttribute("id", "mtx-contact-form-div");

        // hide these elements until everything is loaded
        parentDiv.style.display = "none"
        contactFormDiv.style.display = "none"

        document.body.prepend(contactFormDiv);
        document.body.prepend(parentDiv);

        await fetch(`${CDNlink}view/agent-button.html`)
            .then((response) => {
                return response.text();
            })
            .then((html) => {
                parentDiv.innerHTML = html; // rendering
                marketrixButton = document.getElementById("marketrix-button");
            });

        // await contactButtonController.renderJson()
    },

    renderJson: async () => {
        fetch(`${CDNlink}data/contact-button.json`).then(response => {
            return response.json()
        }).then((data) => {
            const htmlElementResponse = data[0]
            render.initiate(marketrixButton, htmlElementResponse)
        })
    }
}