console.log("contactButtonController.js is loaded")
const widgetButtonController = {
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

        await fetch(`${CDNlink}view/widget-button.html`)
            .then((response) => {
                return response.text();
            })
            .then((html) => {
                parentDiv.innerHTML = html.replaceAll("{{CDN_LINK}}", CDNlink); // rendering
                marketrixButton = document.getElementById("marketrix-button");
                marketrixWidgetCard = document.getElementById("widget-card");
            });
    },
}