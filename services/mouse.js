console.log("mouse.js is established #8")
const mouse = {
    cursor: {
        x: "",
        y: "",
        windowWidth: "",
        windowHeight: "",
        // showCursor: false,
    },
    showCursor: true,
    startMove: () => {
        document.onmousemove = mouse.handleMouse;
    },
    show: () => {
        console.log("mouse show is called, show cursor is", mouse.showCursor)
        const localId = meetingVariables.participant.localId;
        const remoteId = meetingVariables.participant.remoteId;
        const remoteCursorDiv = document.getElementById(`cp-${remoteId}`);
        const showCursorDiv = document.getElementById("show-cursor");
        const mtxModeBtn = document.getElementById("marketrix-mode-btn")
        const focusModeBtn = document.getElementById("focus-mode-btn")


        configurationCoverDiv.classList.add("mtx-hidden");
        mtxModeBtn.classList.remove("mtx-hidden")
        focusModeBtn.classList.add("mtx-hidden")

        if (meetingVariables.userRole === "admin") {
            mouse.showCursor = true;
            setToStore("MARKETRIX_MODE", mouse.showCursor)
            SOCKET.emit.modeChange({ mode: true, meetingId: meetingVariables.id })
        } // admin make the cursor movement on both side
        mouse.startMove();

        remoteCursorDiv.classList.remove("mtx-hidden"); // show

        if (localId) {
            const fLocalDiv = document.getElementById(`f-${localId}`);
            const vLocalDiv = document.getElementById(`v-${localId}`);
            const videoDisabledImgDiv = document.getElementById(`vdi-${localId}`)
            const videoDisabledDiv = document.getElementById(`vd-${localId}`)

            fLocalDiv.style.position = "absolute";
            fLocalDiv.classList.add("mtx-moving-outer-frame");
            fLocalDiv.classList.add("mtx-local-moving-outer-frame");

            vLocalDiv.classList.add("mtx-moving-video-frame");
            vLocalDiv.classList.remove("mtx-video-frame");

            videoDisabledImgDiv.classList.remove("mtx-video-disabled-img")
            videoDisabledImgDiv.classList.add("mtx-moving-video-disabled-img")

            videoDisabledDiv.classList.add("mtx-moving-video-disabled-div")
            videoDisabledDiv.classList.remove("mtx-video-disabled-div")
        }

        if (remoteId) {
            const fRemoteDiv = document.getElementById(`f-${remoteId}`);
            const vRemoteDiv = document.getElementById(`v-${remoteId}`);
            const videoDisabledImgDiv = document.getElementById(`vdi-${remoteId}`)
            const videoDisabledDiv = document.getElementById(`vd-${remoteId}`)

            fRemoteDiv.style.position = "absolute";
            fRemoteDiv.classList.add("mtx-moving-outer-frame");
            fRemoteDiv.classList.add("mtx-remote-moving-outer-frame");

            vRemoteDiv.classList.add("mtx-moving-video-frame");
            vRemoteDiv.classList.remove("mtx-video-frame");

            videoDisabledImgDiv.classList.remove("mtx-video-disabled-img")
            videoDisabledImgDiv.classList.add("mtx-moving-video-disabled-img")

            videoDisabledDiv.classList.add("mtx-moving-video-disabled-div")
            videoDisabledDiv.classList.remove("mtx-video-disabled-div")
        }

        videoContainer.classList.remove("mtx-hidden")
    },
    hide: () => {
        // $(".mouse").hide()
        const localId = meetingVariables.participant.localId;
        const remoteId = meetingVariables.participant.remoteId;
        const remoteCursorDiv = document.getElementById(`cp-${remoteId}`);
        const showCursorDiv = document.getElementById("show-cursor");
        const mtxModeBtn = document.getElementById("marketrix-mode-btn")
        const focusModeBtn = document.getElementById("focus-mode-btn")

        configurationCoverDiv.classList.remove("mtx-hidden");
        mtxModeBtn.classList.add("mtx-hidden")
        focusModeBtn.classList.remove("mtx-hidden")



        if (localId) {
            const fLocalDiv = document.getElementById(`f-${localId}`);
            const vLocalDiv = document.getElementById(`v-${localId}`);
            const videoDisabledImgDiv = document.getElementById(`vdi-${localId}`)
            const videoDisabledDiv = document.getElementById(`vd-${localId}`)

            fLocalDiv.style.position = "";
            fLocalDiv.style.left = "";
            fLocalDiv.style.top = "";

            fLocalDiv.classList.remove("mtx-moving-outer-frame");
            fLocalDiv.classList.remove("mtx-local-moving-outer-frame");

            vLocalDiv.classList.remove("mtx-moving-video-frame");
            vLocalDiv.classList.add("mtx-video-frame");

            videoDisabledImgDiv.classList.add("mtx-video-disabled-img")
            videoDisabledImgDiv.classList.remove("mtx-moving-video-disabled-img")

            videoDisabledDiv.classList.remove("mtx-moving-video-disabled-div")
            videoDisabledDiv.classList.add("mtx-video-disabled-div")
        }
        if (remoteId) {
            const fRemoteDiv = document.getElementById(`f-${remoteId}`);
            const vRemoteDiv = document.getElementById(`v-${remoteId}`);
            const videoDisabledImgDiv = document.getElementById(`vdi-${remoteId}`)
            const videoDisabledDiv = document.getElementById(`vd-${remoteId}`)

            fRemoteDiv.style.position = "";
            fRemoteDiv.style.left = "";
            fRemoteDiv.style.top = "";

            fRemoteDiv.classList.remove("mtx-moving-outer-frame");
            fRemoteDiv.classList.remove("mtx-remote-moving-outer-frame");

            vRemoteDiv.classList.remove("mtx-moving-video-frame");
            vRemoteDiv.classList.add("mtx-video-frame");

            videoDisabledImgDiv.classList.add("mtx-video-disabled-img")
            videoDisabledImgDiv.classList.remove("mtx-moving-video-disabled-img")

            videoDisabledDiv.classList.remove("mtx-moving-video-disabled-div")
            videoDisabledDiv.classList.add("mtx-video-disabled-div")

            remoteCursorDiv.classList.add("mtx-hidden"); // hide
        }

        if (meetingVariables.userRole === "admin") {
            mouse.showCursor = false;
            setToStore("MARKETRIX_MODE", mouse.showCursor)
            SOCKET.emit.modeChange({ mode: false, meetingId: meetingVariables.id })
        }
    },
    handleMouse: (event) => {
        let x = event.clientX;
        let y = event.clientY;
        let windowWidth = getWindowSize().innerWidth;
        let windowHeight = getWindowSize().innerHeight;
        // console.log(event)
        // return; // test console log
        mouse.cursor.x = x;
        mouse.cursor.y = y;
        mouse.cursor.windowHeight = windowHeight;
        mouse.cursor.windowWidth = windowWidth;

        // mouse.cursor.showCursor = mouse.showCursor;

        const localId = meetingVariables.participant.localId;
        const remoteId = meetingVariables.participant.remoteId;

        if (localId && (/true/).test(mouse.showCursor)) {
            const fLocalDiv = document.getElementById(`f-${localId}`);
            fLocalDiv.style.left = x + "px";
            fLocalDiv.style.top = y + "px";
        }

        cursorLoading.style.left = x + "px";
        cursorLoading.style.top = y + "px";

        SOCKET.emit.cursorPosition(mouse, cursorId)
    },
    loading: {
        show: () => {
            meetingObj.showCursor = false
            videoContainer.classList.add("mtx-hidden")
            mouse.startMove()
            cursorLoading.classList.remove("mtx-hidden")
        },
        hide: () => {
            videoContainer.classList.remove("mtx-hidden")
            cursorLoading.classList.add("mtx-hidden")
        }
    }
};

// scroll event
let scroller = document.getElementsByTagName("body")[0]
let pageX;
let pageY;

const scrollPosition = () => {
    const windowWidth = getWindowSize().innerWidth
    const windowHeight = getWindowSize().innerHeight

    pageX = (pageX / windowWidth) * 100 // x axis percentage
    pageY = (pageY / windowHeight) * 100 // y axis percentage

    const scroll = {
        pageX,
        pageY,
        windowWidth,
        windowHeight
    }

    SOCKET.emit.scrollChange(scroll)
}

const emitScroll = () => {
    if (scrollEnded) return
    scrollEnded = true
    console.log("scroll ended now, emit scroll")
    scrollPosition()
}

setInterval(() => {
    if (scrollCount > prevScrollCount || prevScrollCount === 0) prevScrollCount = scrollCount
    else emitScroll()
}, 1000)

scroller.onscroll = () => {
    console.log("scrolling")
    if (!remoteScroll) scrollEnded = false
    scrollCount += 1
    pageX = this.scrollX
    pageY = this.scrollY
}