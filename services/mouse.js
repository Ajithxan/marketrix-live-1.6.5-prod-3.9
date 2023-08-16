console.log("mouse.js is established")
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
        // if ((/true/).test(mouse.showCursor) && meetingVariables.userRole !== "visitor") {
        //     console.log("coming inside the toggle mode")
        //     mouse.hide();
        //     return;
        // } // if its is already in marketrixMode, it would be changed to the focusmode
        // $(".mouse").show()
        const localId = meetingVariables.participant.localId;
        const remoteId = meetingVariables.participant.remoteId;
        const remoteCursorDiv = document.getElementById(`cp-${remoteId}`);
        const showCursorDiv = document.getElementById("show-cursor");
        const mtxModeBtn = document.getElementById("marketrix-mode-btn")
        const focusModeBtn = document.getElementById("focus-mode-btn")


        configurationCoverDiv.classList.add("mtx-hidden");
        mtxModeBtn.classList.remove("mtx-hidden")
        focusModeBtn.classList.add("mtx-hidden")
        console.log("mtx-mode", mtxModeBtn)
        console.log("focus-btn-mode", focusModeBtn)

        if (meetingVariables.userRole === "admin") {
            mouse.showCursor = true;
            setToStore("MARKETRIX_MODE", mouse.showCursor)
            SOCKET.emit.modeChange({ mode: true, meetingId: meetingVariables.id })
        } // admin make the cursor movement on both side
        mouse.startMove();
        // console.log("local participant id", meetingVariables.participant.localId);
        // console.log("remote participant id", meetingVariables.participant.remoteId);

        remoteCursorDiv.classList.remove("mtx-hidden"); // show

        if (localId) {
            const fLocalDiv = document.getElementById(`f-${localId}`);
            const vLocalDiv = document.getElementById(`v-${localId}`);
            fLocalDiv.style.position = "absolute";
            fLocalDiv.classList.add("mtx-moving-outer-frame");
            fLocalDiv.classList.add("mtx-local-moving-outer-frame");

            vLocalDiv.classList.add("mtx-moving-video-frame");
            vLocalDiv.classList.remove("mtx-video-frame");
        }

        if (remoteId) {
            const fRemoteDiv = document.getElementById(`f-${remoteId}`);
            const vRemoteDiv = document.getElementById(`v-${remoteId}`);
            fRemoteDiv.style.position = "absolute";
            fRemoteDiv.classList.add("mtx-moving-outer-frame");
            fRemoteDiv.classList.add("mtx-remote-moving-outer-frame");

            vRemoteDiv.classList.add("mtx-moving-video-frame");
            vRemoteDiv.classList.remove("mtx-video-frame");
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

            fLocalDiv.style.position = "";
            fLocalDiv.style.left = "";
            fLocalDiv.style.top = "";

            fLocalDiv.classList.remove("mtx-moving-outer-frame");
            fLocalDiv.classList.remove("mtx-local-moving-outer-frame");

            vLocalDiv.classList.remove("mtx-moving-video-frame");
            vLocalDiv.classList.add("mtx-video-frame");
        }
        if (remoteId) {
            const fRemoteDiv = document.getElementById(`f-${remoteId}`);
            const vRemoteDiv = document.getElementById(`v-${remoteId}`);

            fRemoteDiv.style.position = "";
            fRemoteDiv.style.left = "";
            fRemoteDiv.style.top = "";

            fRemoteDiv.classList.remove("mtx-moving-outer-frame");
            fRemoteDiv.classList.remove("mtx-remote-moving-outer-frame");

            vRemoteDiv.classList.remove("mtx-moving-video-frame");
            vRemoteDiv.classList.add("mtx-video-frame");

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

        SOCKET.emit.cursorPosition(mouse, cursorId)
    },
    loading: {
        show: () => { },
        hide: () => { }
    }
};

// scroll event
let scroller = document.getElementsByTagName("body")[0]
const scrollPosition = (pageX, pageY) => {
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
    console.log(scroll)
    setTimeout(() => {
        SOCKET.emit.scrollChange(scroll)
    }, 500)
}

scroller.onscroll = () => {
    console.log("scrolling y and x", this.scrollY)
    scrollPosition(this.scrollX, this.scrollY)
}