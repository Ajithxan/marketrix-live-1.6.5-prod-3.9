console.log("meeting.js is established #7")
const meetingObj = {
    meeting: null,
    isMicOn: true,
    isWebCamOn: false,
    stream: "",
    connect() {
        if (
            /true/.test(getFromStore("MEETING_ENDED")) &&
            meetingVariables.userRole === "visitor"
        )
            return;

        meetingEnded = false;
        setToStore("MEETING_ENDED", meetingEnded);
        ROUTE.configuration()
    },

    initializeMeeting: () => {
        if (meetingVariables.token) {
            window.VideoSDK.config(meetingVariables.token);

            meetingObj.meeting = window.VideoSDK.initMeeting({
                meetingId: meetingVariables.id, // required
                name: meetingVariables.name, // required
                micEnabled: true, // optional, default: true
                webcamEnabled: true, // optional, default: true
            });

            meetingObj.meeting.join();

            // Creating local participant
            meetingObj.createLocalParticipant();

            // Setting local participant stream
            meetingObj.meeting.localParticipant.on("stream-enabled", (stream) => {
                meetingObj.stream = stream
                meetingObj.setTrack(
                    stream,
                    meetingObj.meeting.localParticipant,
                    true
                );
            });

            // meeting joined event
            meetingObj.meeting.on("meeting-joined", () => {
                style.show(gridScreenDiv)
                gridScreenDiv && style.show(gridScreenDiv)
                if (meetingVariables.userRole === "admin") {
                    connectAdminToLive(decodedObject);
                    style.show(showCursorDiv)
                    if ((/true/).test(firstTimeAdminRequest)) mouse.show()
                } // if admin joined, it'll emit to visitor
            });

            // meeting left event
            meetingObj.meeting.on("meeting-left", () => {
                videoContainer.innerHTML = "";
            });

            meetingObj.meeting.on("participant-left", (participant) => {
                mouse.loading.show();
                if (meetingVariables.userRole === "admin") hideRemoteCursor = false
            });

            // Remote participants Event
            // participant joined
            meetingObj.meeting.on("participant-joined", (participant) => {
                // if ((/false/).test(firstTimeAdminRequest)) mouse.loading.hide();
                mouse.loading.hide();
                firstTimeAdminRequest = false
                hideRemoteCursor = false
                // let videoElement = meetingObj.createVideoElement(
                //     participant.id,
                //     participant.displayName
                // );

                meetingVariables.participant.remoteId = participant.id;
                console.log("participant joined id", participant.id)
                setToStore("MEETING_VARIABLES", JSON.stringify(meetingVariables)); // store meeting variables
                // let audioElement = meetingObj.createAudioElement(participant.id);
                remoteId = meetingVariables.participant.remoteId;

                // stream-enabled
                participant.on("stream-enabled", (stream) => {
                    console.log("participant stream enable", stream.kind)
                    const kind = stream.kind;
                    mtxModeai = document.getElementById(`mtx-mode-ai-${remoteId}`);
                    focusModeai = document.getElementById(`focus-mode-ai-${remoteId}`);
                    if (kind === "audio") ROUTE.audioStreamEnable()
                    else if (kind === "video") ROUTE.videoStreamEnable()
                    else if (kind === "share") ROUTE.enableScreenShare(remoteId, stream)
                    meetingObj.setTrack(stream, participant, false);
                });

                participant.on("stream-disabled", (stream) => {
                    const kind = stream.kind;
                    mtxModeai = document.getElementById(`mtx-mode-ai-${remoteId}`);
                    focusModeai = document.getElementById(`focus-mode-ai-${remoteId}`);
                    if (kind === "audio") ROUTE.audioStreamDisable()
                    else ROUTE.videoStreamDisable()
                    meetingObj.setTrack(stream, participant, false);
                });

                participant.setQuality('high'); // video quality

                // creaste cursor pointer for remote user
                // ROUTE.createRemoteCursorPointer(participant.id)

                if ((/false/).test(hideRemoteCursor)) {
                    // videoContainer.append(remoteCursorPointerDiv);
                    // videoContainer.append(videoElement);
                    // videoContainer.append(audioElement);                    
                    let videoFrameComponent = document.createElement("video-frame")
                    videoFrameComponent.setAttribute("participant-id", participant.id)
                    videoFrameComponent.setAttribute("participant-name", participant.displayName)
                    videoFrameComponent.setAttribute("is-local-user", false)
                    videoContainer.append(videoFrameComponent)

                    // if (!(/null/).test(getFromStore("PREV_REMOTE_PARTICIPANT_ID")) && getFromStore("PREV_REMOTE_PARTICIPANT_ID") !== participant.id) {
                    //     console.log("prev remote id", getFromStore("PREV_REMOTE_PARTICIPANT_ID"))
                    //     const prevFocusModeScreenComponent = document.getElementById(`focus-mode-screen-component-${getFromStore("PREV_REMOTE_PARTICIPANT_ID")}`)
                    //     const prevMtxModeScreenComponent = document.getElementById(`mtx-mode-screen-component-${getFromStore("PREV_REMOTE_PARTICIPANT_ID")}`)
                    //     prevFocusModeScreenComponent.remove()
                    //     prevMtxModeScreenComponent.remove()
                    // }
                    // setToStore("PREV_REMOTE_PARTICIPANT_ID", participant.id)
                }

                if (/true/.test(mouse.marketrixMode) || /null/.test(mouse.marketrixMode))
                    mouse.show();
                else {
                    mouse.hide();
                    style.show(videoContainer)
                    videoContainer.classList.add("mtx-mode-video-container")
                }
            });

            // participants left
            meetingObj.meeting.on("participant-left", (participant) => {
                let vElement = document.getElementById(`mtx-mode-frame-${participant.id}`);
                vElement.remove(vElement);

                let aElement = document.getElementById(`a-${participant.id}`);
                aElement.remove(aElement);
            });
        }
    },

    createLocalParticipant: () => {
        ROUTE.createLocalParticipant(meetingObj, videoContainer)
    },

    setTrack: (stream, participant, isLocal) => {
        ROUTE.setTrack(stream, participant, isLocal)
    },

    createVideoElement: (pId, name) => {
        // // video element for focus mode
        // let videoFrame = document.createElement("div");
        // videoFrame.setAttribute("id", `mtx-mode-frame-${pId}`);
        // videoFrame.classList.add("mtx-col-6");
        // videoFrame.classList.add("mtx-outer-frame");

        // // set default position
        // videoFrame.style.top = "50vh"

        // //create video
        // let videoElement = document.createElement("video");
        // videoElement.classList.add("mtx-video-elem");
        // videoElement.setAttribute("id", `mtx-mode-video-elem-${pId}`);
        // videoElement.setAttribute("playsinline", true);

        // // video disabled
        // let videoDisabledDiv = document.createElement("div");
        // style.hide(videoDisabledDiv)
        // videoDisabledDiv.setAttribute("id", `vd-${pId}`);

        // // video element for marketrix-mode

        // // video disabled image
        // videoDisabledImgElement = document.createElement("img");
        // videoDisabledImgElement.classList.add("mtx-video-disabled-img");
        // videoDisabledImgElement.setAttribute("id", `vdi-${pId}`);
        // videoDisabledImgElement.setAttribute(
        //     "src",
        //     videoDisabledImage
        // );

        // videoDisabledDiv.appendChild(videoDisabledImgElement);

        // videoFrame.appendChild(videoElement);
        // videoFrame.appendChild(videoDisabledDiv);

        // let displayName = document.createElement("div");
        // displayName.classList.add("user-names");
        // displayName.innerHTML = `${name}`;

        // let audioElementDiv = document.createElement("i");
        // audioElementDiv.setAttribute("id", `ai-${pId}`);
        // audioElementDiv.classList.add("fa-solid");
        // audioElementDiv.classList.add("fa-microphone");
        // audioElementDiv.classList.add("mtx-ml-2");
        // displayName.appendChild(audioElementDiv);

        // videoFrame.appendChild(displayName);
        // return videoFrame;
    },

    createAudioElement: (pId) => {
        return ROUTE.audioElement(pId)
    },

    joinMeeting: () => {
        meetingObj.initializeMeeting();
    },

    leave: () => {
        meetingObj.meeting?.leave()
    },

    leaveMeeting: () => {
        SOCKET.emit.endMeeting();
        if (meetingVariables.userRole === "admin") {
            meetingObj.endMeetingApiCall();
        }
        // sessionStorage.clear()
        meetingEnded = true;
        meetingVariables.id = false
        setToStore("MEETING_ENDED", meetingEnded);
        removeFromStore("PREV_REMOTE_PARTICIPANT_ID")
        meetingObj.meeting?.end();
        if (meetingVariables.userRole === "visitor") setTimeout(() => {
            window.location.reload()
        }, 1000);
    },

    enableScreenShare: () => {
        ROUTE.screenShare()
    },

    disableScreenShare: () => {
        ROUTE.stopShare()
    },

    toggle: {
        mic: () => {
            localId = meetingVariables.participant.localId;
            micIconElem = document.getElementById("mic-icon");
            mtxModeai = document.getElementById(`mtx-mode-ai-${localId}`);
            focusModeai = document.getElementById(`focus-mode-ai-${localId}`);

            if (meetingObj.isMicOn) ROUTE.micOff()
            else ROUTE.micOn()
            meetingObj.isMicOn = !meetingObj.isMicOn;
        },

        webCam: () => {
            localId = meetingVariables.participant.localId;
            fDiv = document.getElementById(`mtx-mode-frame-${localId}`);
            focusModeFrameDiv = document.getElementById(`focus-mode-frame-${localId}`);
            webCamIconElem = document.getElementById("webcam-icon");

            if (meetingObj.isWebCamOn) ROUTE.wecamOff()
            else ROUTE.webcamOn()
            meetingObj.isWebCamOn = !meetingObj.isWebCamOn;
        },
    },

    endMeetingApiCall: () => {
        const adminToken = meetingVariables.adminToken;
        const inquiryId = meetingVariables.inquiryId;

        const requestOptions = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${adminToken}`,
            },
        };
        fetch(
            `${serverBaseUrl}meet-live/inquiries/end_session/${inquiryId}`,
            requestOptions
        )
            .then((response) => response.json())
            .then((data) => {
                setTimeout(() => {
                    window.close();
                }, 1000);
            });
    },
};

const adminMeetingObj = {
    meeting: null,
    isMicOn: true,
    isWebCamOn: false,
    connect() {
        setTimeout(() => {
            adminMeetingObj.joinMeeting();
        }, 1000);
    },

    initializeMeeting: () => {
        if (meetingVariables.token) {
            window.VideoSDK.config(meetingVariables.token);

            adminMeetingObj.meeting = window.VideoSDK.initMeeting({
                meetingId: meetingVariables.id, // required
                name: meetingVariables.name, // required
                micEnabled: true, // optional, default: true
                webcamEnabled: true, // optional, default: true
            });

            adminMeetingObj.meeting.join();

            // Creating local participant
            // adminMeetingObj.createLocalParticipant();

            // Setting local participant stream
            adminMeetingObj.meeting.localParticipant.on("stream-enabled", (stream) => {
                adminMeetingObj.setTrack(
                    stream,
                    meetingObj.meeting.localParticipant,
                    true
                );
            });

            // meeting joined event
            adminMeetingObj.meeting.on("meeting-joined", () => {
                style.show(mtxAdminGridScreen)
            });

            // meeting left event
            adminMeetingObj.meeting.on("meeting-left", () => {
                adminVidoeContainer.innerHTML = "";
            });

            adminMeetingObj.meeting.on("participant-left", (participant) => {
                // mouse.loading.show()
            })

            // remote participant joined
            adminMeetingObj.meeting.on("participant-joined", (participant) => {
                // mouse.loading.hide()
                let videoElement = adminMeetingObj.createVideoElement(
                    participant.id,
                    participant.displayName
                );

                meetingVariables.participant.remoteId = participant.id;
                setToStore('MEETING_VARIABLES', JSON.stringify(meetingVariables)) // store meeting variables
                // let audioElement = adminMeetingObj.createAudioElement(participant.id);
                const remoteId = meetingVariables.participant.remoteId;

                // stream-enabled
                participant.on("stream-enabled", (stream) => {
                    adminMeetingObj.setTrack(stream, participant, false);
                });

                participant.on("stream-disabled", (stream) => {
                    adminMeetingObj.setTrack(stream, participant, false);
                });

                participant.setQuality('high'); // video quality

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
                adminVidoeContainer.append(videoElement);
                showModal()
                const audio = new Audio(`${CDNlink}assets/sounds/call-ring.wav`);
                audio.play();
                style.hide(mtxFooterControl)
                style.show(mtxAdminCallDiv)
            });

            // participants left
            adminMeetingObj.meeting.on("participant-left", (participant) => {
                let vElement = document.getElementById(`mtx-mode-frame-${participant.id}`);
                focusModeFrameDiv = document.getElementById(`focus-mode-frame-${localId}`);
                vElement.remove(vElement);

                let aElement = document.getElementById(`a-${participant.id}`);
                aElement.remove(aElement);
            });
        }
    },

    createLocalParticipant: () => {
        ROUTE.createLocalParticipant(adminMeetingObj, adminVidoeContainer)
    },

    setTrack: (stream, participant, isLocal) => {
        ROUTE.setTrack(stream, participant, isLocal)
    },

    createVideoElement: (pId, name) => {
        let adminVideoFrame = document.createElement("div");
        adminVideoFrame.setAttribute("id", `mtx-mode-frame-${pId}`);
        adminVideoFrame.classList.add("mtx-admin-video-frame")

        // set background image
        adminVideoFrame.style.backgroundImage = adminNotificationBackgroundAnimation

        //create video
        let videoElement = document.createElement("video");
        videoElement.classList.add("mtx-moving-video-frame");
        videoElement.setAttribute("id", `mtx-mode-video-elem-${pId}`);
        videoElement.setAttribute("playsinline", true);
        videoElement.setAttribute("muted", true);
        adminVideoFrame.appendChild(videoElement);
        return adminVideoFrame;
    },

    createAudioElement: (pId) => {
        return ROUTE.audioElement(pId)
    },

    joinMeeting: () => {
        adminMeetingObj.initializeMeeting();
    },

    leaveMeeting: () => {
        adminMeetingObj.meeting.leave()
        meetingVariables.id = false
        adminVidoeContainer.remove()
    },
};

const joinMeeting = (videoEnabled) => {
    if ((/true/).test(videoEnabled)) {
        setToStore("VIDEO_ENABLED", true)
    } else {
        setToStore("VIDEO_ENABLED", false)
    }
    // adminMeetingObj.leaveMeeting()
    adminConnects = false
    style.hide(document.getElementById("mtx-admin-call-div"))
    style.show(document.getElementById("mtx-footer-controls"))
    checkMeetingVariables()
}