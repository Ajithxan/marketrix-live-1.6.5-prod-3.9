const contactFormController = {
  view: async (callBack) => {
    await fetch(`${CDNlink}view/contact-form.html`)
      .then((response) => {
        return response.text();
      })
      .then(async (html) => {
        console.log(html.replaceAll("{{CDN_LINK}}", CDNlink))
        contactFormDiv.innerHTML = html.replaceAll("{{CDN_LINK}}", CDNlink); // rendering
        marketrixModalContainer = document.getElementById(
          "marketrix-modal-container"
        );
        style.hide(marketrixModalContainer);

        mtxContactFormNotificationCard = document.getElementById(
          "mtx-contact-form-notification-card"
        );
        style.hide(mtxContactFormNotificationCard); // default hide
        mtxFormContent = document.getElementById("mtx-form-content");
        mtxLiveConnectCallDiv = document.getElementById(
          "mtx-live-connect-call-div"
        );
        style.hide(mtxLiveConnectCallDiv); // default hide
        mtxFooterControl = document.getElementById("mtx-footer-controls");
        mtxFormCloseBtn = document.getElementById("mtx-form-close-btn");
        mtxConnectBtn = document.getElementById("mtx-btn-connect");
        mtxEndCallBtn = document.getElementById("mtx-btn-endcall");
        if (mtxEndCallBtn) style.hide(mtxEndCallBtn); // default hide
        mtxCursorHeader = document.getElementById("mtx-cursor-header");
        mtxAdminGridScreen = document.getElementById("mtx-admin-grid-screen");
        if (mtxAdminGridScreen) style.hide(mtxAdminGridScreen); // default hide
        overlay = document.querySelector(".mtx-overlay");
        currentUrl = window.location.href; // set current Url
        // show these element after everything is loaded properly
        setTimeout(() => {
          parentDiv.style.display = "block";
          contactFormDiv.style.display = "block";
        }, 1000);

        await callBack()
      });
  }
};
