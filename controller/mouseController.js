const mouseController = {
    cursorVideoFrameElement: (userId, isLocalUser, show) => {
        const cursorVideoFrameDiv = document.getElementById(`f-${userId}`);
        const vLocalDiv = document.getElementById(`mtx-video-elem-${userId}`);
        const videoDisabledImgDiv = document.getElementById(`vdi-${userId}`)
        const videoDisabledDiv = document.getElementById(`vd-${userId}`)

        show ? cursorVideoFrameDiv.classList.add("start-move") : cursorVideoFrameDiv.classList.add("stop-move")
        show ? cursorVideoFrameDiv.classList.remove("stop-move") : cursorVideoFrameDiv.classList.remove("start-move")
        show ? cursorVideoFrameDiv.classList.add("mtx-moving-outer-frame") : cursorVideoFrameDiv.classList.remove("mtx-moving-outer-frame")

        if (isLocalUser) show ? cursorVideoFrameDiv.classList.add("mtx-local-moving-outer-frame") : cursorVideoFrameDiv.classList.remove("mtx-local-moving-outer-frame")
        if (!isLocalUser) show ? cursorVideoFrameDiv.classList.add("mtx-remote-moving-outer-frame") : cursorVideoFrameDiv.classList.remove("mtx-remote-moving-outer-frame")

        show ? vLocalDiv.classList.add("mtx-moving-video-frame") : vLocalDiv.classList.remove("mtx-moving-video-frame")
        show ? vLocalDiv.classList.remove("mtx-video-frame") : vLocalDiv.classList.add("mtx-video-frame")
        show ? videoDisabledDiv.classList.add("mtx-moving-video-disabled-div") : videoDisabledDiv.classList.remove("mtx-moving-video-disabled-div")
        show ? videoDisabledDiv.classList.remove("mtx-video-disabled-div") : videoDisabledDiv.classList.add("mtx-video-disabled-div")
        show ?? style.show(videoContainer)
        show ? videoContainer.classList.add("mtx-mode-video-container") : videoContainer.classList.remove("mtx-mode-video-container")
    },
    cursorVideoFrameShow: (localCursor) => {
        if ((/true/).test(adminConnects) && meetingVariables.userRole === "visitor") {
            return
        }
        const localId = meetingVariables.participant.localId;
        const remoteId = meetingVariables.participant.remoteId;
        const remoteCursorDiv = document.getElementById(`cp-${remoteId}`);
        const focusModeBtn = document.getElementById("focus-mode-btn")

        style.hide(configurationCoverDiv)
        style.show(mtxModeBtn)
        style.hide(focusModeBtn)

        if (meetingVariables.userRole === "admin") {
            mouse.marketrixMode = true;
            setToStore("MARKETRIX_MODE", mouse.marketrixMode)
            SOCKET.emit.modeChange({ mode: true, meetingId: meetingVariables.id })
        } // admin make the cursor movement on both side
        mouse.startMove();

        if (remoteCursorDiv) style.show(remoteCursorDiv)

        if (localId) mouse.cursorFrameElement(localId, true, true)
        if (remoteId && !localCursor) mouse.cursorFrameElement(remoteId, false, true)
    },
    cursorVideoFrameHide: (localCursor) => {
        const localId = meetingVariables.participant.localId;
        const remoteId = meetingVariables.participant.remoteId;
        const remoteCursorDiv = document.getElementById(`cp-${remoteId}`);
        const focusModeBtn = document.getElementById("focus-mode-btn")

        style.show(configurationCoverDiv)
        style.hide(mtxModeBtn)
        style.show(focusModeBtn)

        if (meetingVariables.userRole === "admin") {
            mouse.marketrixMode = false;
            setToStore("MARKETRIX_MODE", mouse.marketrixMode)
            SOCKET.emit.modeChange({ mode: false, meetingId: meetingVariables.id })
        }

        style.hide(remoteCursorDiv)

        if (localId) mouse.cursorFrameElement(localId, true, false)
        if (remoteId && !localCursor) mouse.cursorFrameElement(remoteId, false, false)
    },
    createRemoteCursorPointer: (participantId) => {
        remoteCursorPointerDiv = document.createElement("div");
        remoteCursorPointer = document.createElement("img");
        remoteCursorPointer.setAttribute(
            "src",
            cursorPointerImage
        );
        remoteCursorPointer.classList.add("mtx-remote-cursor");
        remoteCursorPointerDiv.classList.add("mtx-remote-cursor-png-div");
        style.hide(remoteCursorPointerDiv)
        remoteCursorPointerDiv.setAttribute("id", `cp-${participantId}`); // remote id
        remoteCursorPointerDiv.style.top = "50vh"
        remoteCursorPointerDiv.appendChild(remoteCursorPointer);
    },
    cursorHandle: (event) => {
        cursorMoveEnded = false
        let x = event.clientX;
        let y = event.clientY;
        let windowWidth = getWindowSize().innerWidth;
        let windowHeight = getWindowSize().innerHeight;

        const cursor = {}
        cursor.x = x;
        cursor.y = y;
        cursor.windowHeight = windowHeight;
        cursor.windowWidth = windowWidth;

        const localId = meetingVariables.participant.localId;
        const remoteId = meetingVariables.participant.remoteId;

        if (localId && (/true/).test(mouse.marketrixMode)) {
            const fLocalDiv = document.getElementById(`f-${localId}`);
            fLocalDiv.style.left = x + "px";
            fLocalDiv.style.top = y + "px";
        }

        cursorLoading.style.left = x + "px";
        cursorLoading.style.top = y + "px";

        cursorMoveCount += 1
        movementsArr.push(cursor)
        if (movementsArr.length > 0) mouse.cursor = movementsArr
    },
    cursor: {
        loading: {
            show: (message) => {
                if (getFromStore("LOADING_MESSAGE")) message = getFromStore("LOADING_MESSAGE")
                mtxOverlayLoading && style.show(mtxOverlayLoading)
                if (mtxLoadingMessageDiv) mtxLoadingMessageDiv.innerText = message
            },
            hide: () => {
                if (getFromStore("LOADING_MESSAGE")) removeFromStore("LOADING_MESSAGE")
                style.hide(mtxOverlayLoading)
            }
        },
        location: async (event) => {
            const { clientX, clientY } = event;
            let x = clientX;
            let y = clientY;
            let windowWidth = window.innerWidth;
            let windowHeight = window.innerHeight;

            return { x, y, windowWidth, windowHeight };
        },
        ID: () => {
            if (getFromStore("CURSOR_ID")) cursorId = getFromStore("CURSOR_ID")
            else {
                cursorId = Date.now()
                setToStore("CURSOR_ID", cursorId)
            }
        }
    }
}