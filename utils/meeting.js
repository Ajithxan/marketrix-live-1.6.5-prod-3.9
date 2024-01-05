console.log("meeting.js is established #7")
const meetingObj = {
    meeting: null,
    isMicOn: true,
    isWebCamOn: true,
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

                const kind = stream.kind
                if (kind === "share") ROUTE.enableScreenShare(meetingVariables.participant.localId, stream)
            });

            meetingObj.meeting.localParticipant.on("stream-disabled", (stream) => {
                const kind = stream.kind
                if (kind === "share") ROUTE.disableScreenShare(meetingVariables.participant.localId, stream)
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

                meetingVariables.participant.remoteId = participant.id;
                console.log("participant joined id", participant.id)
                setToStore("MEETING_VARIABLES", JSON.stringify(meetingVariables)); // store meeting variables
                // let audioElement = meetingObj.createAudioElement(participant.id);
                remoteId = meetingVariables.participant.remoteId;
                style.show(mtxControlButton)

                if (meetingVariables.userRole === "admin") ROUTE.record() // recording started

                // stream-enabled
                participant.on("stream-enabled", (stream) => {
                    console.log("participant stream enable", stream.kind)
                    const kind = stream.kind;
                    mtxModeai = document.getElementById(`mtx-mode-ai-${remoteId}`);
                    focusModeai = document.getElementById(`focus-mode-ai-${remoteId}`);
                    if (kind === "audio") ROUTE.audioStreamEnable() // audio
                    else if (kind === "video") ROUTE.videoStreamEnable() // video
                    else if (kind === "share") ROUTE.enableScreenShare(remoteId, stream) // screen share
                    meetingObj.setTrack(stream, participant, false);
                });

                participant.on("stream-disabled", (stream) => {
                    const kind = stream.kind;
                    mtxModeai = document.getElementById(`mtx-mode-ai-${remoteId}`);
                    focusModeai = document.getElementById(`focus-mode-ai-${remoteId}`);
                    if (kind === "audio") ROUTE.audioStreamDisable() // audio
                    else if (kind === "video") ROUTE.videoStreamDisable() // video
                    else if (kind === "share") ROUTE.disableScreenShare(remoteId, stream) // screen share

                    meetingObj.setTrack(stream, participant, false);
                });

                participant.setQuality('high'); // video quality

                // creaste cursor pointer for remote user

                if ((/false/).test(hideRemoteCursor)) {
                    let videoFrameComponent = document.createElement("video-frame")
                    videoFrameComponent.setAttribute("participant-id", participant.id)
                    videoFrameComponent.setAttribute("participant-name", participant.displayName)
                    videoFrameComponent.setAttribute("is-local-user", false)
                    videoContainer.append(videoFrameComponent)
                }

                if (/true/.test(mouse.marketrixMode) || /null/.test(mouse.marketrixMode))
                    mouse.show();
                else {
                    mouse.hide();
                    style.show(videoContainer)
                    videoContainer.classList.add("mtx-mode-video-container")
                }

                setTimeout(() => {
                    document.getElementById("mtx-contact-form-div").style.display = "block"
                    document.getElementById("mtx-parent-div").style.display = "block"
                    // style.show(videoConfigDiv)
                }, 1000)
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

    createShareVideoElement: (pId, stream) => {
        if (pId == meetingVariables.participant.localId) return;
        console.log("stream.kind", stream.kind)
        console.log("create share vidoe element")
        let videoElement = document.createElement("video");
        videoElement.setAttribute("autoPlay", false);
        videoElement.setAttribute("controls", "false");
        videoElement.setAttribute("id", `v-share-${pId}`);

        const mediaStream = new MediaStream();
        mediaStream.addTrack(stream.track);
        console.log("stream.track", stream.track)
        videoElement.srcObject = mediaStream;
        videoElement
            .play()
            .catch((error) => console.error("audioElem.play() failed", error));
        console.log("video element", videoElement)
        return videoElement;
    },

    createLocalParticipant: () => {
        ROUTE.createLocalParticipant(meetingObj, videoContainer)
    },

    setTrack: (stream, participant, isLocal) => {
        ROUTE.setTrack(stream, participant, isLocal)
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
            ROUTE.stopRecord()
            meetingObj.endMeetingApiCall();
        }
        // sessionStorage.clear()
        style.hide(marketrixModalContainer)
        meetingEnded = true;
        meetingVariables.id = false
        setToStore("MEETING_ENDED", meetingEnded);
        removeFromStore("PREV_REMOTE_PARTICIPANT_ID")
        meetingObj.meeting?.end();
        if (meetingVariables.userRole === "visitor") setTimeout(() => {
            removeFromStore("MARKETRIX_MODE")
            removeFromStore("LIVE_CONNECT_ACCEPT")
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
            console.log("webcam", meetingObj.isWebCamOn)
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

const joinMeeting = (videoEnabled) => {
    if ((/true/).test(videoEnabled)) {
        setToStore("VIDEO_ENABLED", true)
    } else {
        setToStore("VIDEO_ENABLED", false)
    }
    document.getElementById("mtx-contact-form-div").style.display = "none"
    document.getElementById("mtx-parent-div").style.display = "none"
    adminConnects = false
    style.hide(document.getElementById("mtx-live-connect-call-div"))
    style.show(document.getElementById("mtx-footer-controls"))
    setToStore("LIVE_CONNECT_ACCEPT", true)
    checkMeetingVariables()
}