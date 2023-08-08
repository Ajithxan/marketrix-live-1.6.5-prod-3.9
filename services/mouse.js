console.log("mouse.js is established")
const mouse = {
    cursor: {
        x: "",
        y: "",
        windowWidth: "",
        windowHeight: "",
        showCursor: false,
    },
    showCursor: false,
    startMove: () => {
        document.onmousemove = mouse.handleMouse;
    },
    show: () => {
        // console.log("mouse show is called", mouse.showCursor)
        if (mouse.showCursor && meetingVariables.userRole !== "visitor") {
            mouse.hide();
            return;
        } // if its is already in marketrixMode, it would be changed to the focusmode
        // $(".mouse").show()
        const localId = meetingVariables.participant.localId;
        const remoteId = meetingVariables.participant.remoteId;
        const remoteCursorDiv = document.getElementById(`cp-${remoteId}`);
        const showCursorDiv = document.getElementById("show-cursor");

        configurationCoverDiv.classList.add("mtx-hidden");
        contorlsDiv.classList.add("mtx-hidden");
        showCursorDiv.classList.add("mtx-mode");
        if (meetingVariables.userRole === "admin") mouse.showCursor = true; // admin make the cursor movement on both side
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

        configurationCoverDiv.classList.remove("mtx-hidden");
        contorlsDiv.classList.remove("mtx-hidden");
        showCursorDiv.classList.remove("mtx-mode");

        // console.log("local id", localId);
        // console.log("remote id", remoteId);

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
        if (meetingVariables.userRole === "admin") mouse.showCursor = false;
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

        mouse.cursor.showCursor = mouse.showCursor;

        const localId = meetingVariables.participant.localId;
        const remoteId = meetingVariables.participant.remoteId;

        if (localId && mouse.showCursor) {
            const fLocalDiv = document.getElementById(`f-${localId}`);
            fLocalDiv.style.left = x + "px";
            fLocalDiv.style.top = y + "px";
        }

        // console.log("cursor id", cursorId)

        socket.emit(
            "cursorPosition",
            mouse.cursor,
            meetingVariables.id,
            cursorId,
            (response) => {
                // console.log("cursorPosition-send", response); // ok
            }
        );
    },
    loading: {
        show: () => { },
        hide: () => { }
    }
};

// scroll event
let scroller = document.getElementsByTagName("body")[0]
const scrollPosition = (event) => {
    console.log(event)
    let pageX = event.pageX
    let pageY = event.pageY
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
    console.log(socket)
    socket.emit("scrollChange", { scroll, meetingId: meetingVariables.id })
}
scroller.addEventListener('wheel', scrollPosition)

const listenScrolls = () => {
    console.log("trigger")
    socket?.on("changeScroll", (data) => {
        console.log("scroll on", data)
        const windowWidth = getWindowSize().innerWidth
        const windowHeight = getWindowSize().innerHeight
        const scroll = data.scroll

        let pageX = scroll.pageX
        let pageY = scroll.pageY

        pageX = (pageX / 100) * windowWidth // get actual pageX from pageX percentage
        pageY = (pageY / 100) * windowHeight // get actual pageY from pageY percentage
        window.scrollTo(pageX, pageY)
    })
}