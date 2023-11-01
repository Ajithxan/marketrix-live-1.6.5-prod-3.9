const widgetControlController = {
  view: async () => {
    parentDiv = document.createElement("div");
    contactFormDiv = document.createElement("div");

    parentDiv.setAttribute("id", "mtx-parent-div");
    contactFormDiv.setAttribute("id", "mtx-contact-form-div");

    // hide these elements until everything is loaded
    parentDiv.style.display = "none";
    contactFormDiv.style.display = "none";

    document.body.prepend(contactFormDiv);
    document.body.prepend(parentDiv);

    await fetch(`${CDNlink}view/widget-card.html`)
      .then((response) => {
        return response.text();
      })
      .then((html) => {
        parentDiv.innerHTML = html; // rendering
        marketrixButton = document.getElementById("marketrix-button");
      });
  },
};
