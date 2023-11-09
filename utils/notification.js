const notification = {
    salesPersonNotifyVisitor: () => {
        // create video
        let adminVideoFrame = document.createElement("div");
        // adminVideoFrame.setAttribute("id", `mtx-mode-frame-${pId}`);
        adminVideoFrame.classList.add("mtx-admin-video-frame")

        // set background image
        adminVideoFrame.style.backgroundImage = adminNotificationBackgroundAnimation

        //create video
        // let videoElement = document.createElement("video");
        // videoElement.classList.add("mtx-moving-video-frame");
        // videoElement.setAttribute("id", `mtx-mode-video-elem-${pId}`);
        // videoElement.setAttribute("playsinline", true);
        // videoElement.setAttribute("muted", true);
        // adminVideoFrame.appendChild(videoElement);

        // creaste cursor pointer
        let cursorPointerDiv = document.createElement("div");
        cursorPointerDiv.classList.add("mtx-admin-frame-pointer")
        let cursorPointer = document.createElement("img");
        cursorPointer.setAttribute(
            "src",
            cursorPointerImage
        );
        cursorPointerDiv.append(cursorPointer)
        const agentMsg = `<div class='agent-msg'>${adminName} is trying to connect with you.</div>`
        const customMsg = `${agentMsg} <div class='custom-msg'>Hi there!, ${adminMessage}</div>`
        document.getElementById("admin-message").innerHTML = customMsg
        adminVidoeContainer.append(cursorPointerDiv);
        adminVidoeContainer.append(adminVideoFrame);
        showModal()
        const audio = new Audio(`${CDNlink}assets/sounds/call-ring.wav`);
        audio.play();
        style.hide(mtxFooterControl)
        style.show(mtxAdminCallDiv)
        style.show(mtxAdminGridScreen)
    }
}