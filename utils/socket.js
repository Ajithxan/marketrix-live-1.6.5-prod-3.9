console.log("socket.js is established #3");
const SOCKET = {
    on: {
        changeUrl: () => {
            socket.on("changeUrl", (data) => {
                changedUrl = data.url;
                setToStore("CURRENT_URL", changedUrl);
                setToStore("LOADING_MESSAGE", "Redirecting...")
                window.location.href = changedUrl;
            });
        },
        changeScroll: () => {
            socket?.on("changeScroll", (data) => {
                console.log("scroll on")
                const windowWidth = getWindowSize().innerWidth;
                const windowHeight = getWindowSize().innerHeight;
                const scroll = data.scroll;

                let pageX = scroll.pageX;
                let pageY = scroll.pageY;

                pageX = (pageX / 100) * windowWidth; // get actual pageX from pageX percentage
                pageY = (pageY / 100) * windowHeight; // get actual pageY from pageY percentage
                scrollEnded = true
                remoteScroll = true
                window.scrollTo(pageX, pageY);

                setTimeout(() => {
                    remoteScroll = false
                }, 1000)
            });
        },
        meetingEnded: () => {
            socket.on("meetingEnded", (data) => {
                console.log("admin end the meeting");
                meetingObj.leaveMeeting();
            });
        },
        connectedUser: () => {
            mouse.marketrixMode = getFromStore("MARKETRIX_MODE");
            socket.on("connectedUsers", (data) => {
                // cursoe movements receive here...
                if ((/true/).test(meetingEnded)) {
                    console.log("coming inside")
                    meetingEnded = false
                    adminConnects = true
                    setToStore("MEETING_ENDED", meetingEnded)
                    visitorJoin()
                }

                // cursor movements stuffs starts here...
                const localUserRole = meetingVariables.userRole;
                const index = data.findIndex(
                    (d) => d.userRole !== localUserRole && d.meetingId === meetingVariables.id && d.cursor.length > 0
                );
                if (index >= 0) {
                    const cursorPositions = data[index].cursor;
                    const remoteId = meetingVariables.participant.remoteId;
                    mouse.marketrixMode = getFromStore("MARKETRIX_MODE");
                    if (remoteId && /true/.test(mouse.marketrixMode)) {
                        // use marketrxiMode instead
                        const fDiv = document.getElementById(`f-${remoteId}`);
                        const cpDiv = document.getElementById(`cp-${remoteId}`);

                        let timeCount = 0
                        cursorPositions.forEach(cursor => {
                            timeCount++

                            setTimeout(() => {
                                let windowWidth = getWindowSize().innerWidth;
                                let widthRatio = windowWidth / cursor.windowWidth;

                                let windowHeight = getWindowSize().innerHeight;
                                let heightRatio = windowHeight / cursor.windowHeight;

                                xPosition = cursor.x * widthRatio
                                yPosition = cursor.y * heightRatio

                                // video frame div
                                fDiv.style.left = xPosition + "px"
                                fDiv.style.top = yPosition + "px"

                                // cursor pointer div
                                cpDiv.style.left = xPosition + "px"
                                cpDiv.style.top = yPosition + "px"
                            }, 20 * timeCount)
                        });
                    }
                }
            });
        },
        adminResponseToVisitor: () => {
            socket.on("userResponseToVisitor", (data, event) => {
                if ((/false/).test(getFromStore("MEETING_ENDED"))) return
                meetingEnded = false
                setToStore("MEETING_ENDED", meetingEnded)
                adminMessage = data.message
                adminName = data.userName
                adminConnects = true
                // if (meetingVariables.id) return; // already joined the meeting
                meetingVariables.id = data.meetingId;
                meetingVariables.token = data.token;
                meetingVariables.name = data.liveMeet.name;
                meetingVariables.domain = data.liveMeet?.website_domain;
                meetingVariables.visitorSocketId = data.liveMeet?.visitor_socket_id;
                console.log("meetingId", meetingVariables.id)
                visitorJoin();
            });
        },
        changeMode: () => {
            socket.on("changeMode", (data) => {
                console.log("mode change", data, data.mode);
                setToStore("MARKETRIX_MODE", data.mode);
                if (/true/.test(data.mode)) {
                    mouse.show();
                } else mouse.hide();
            });
        },
        emitActiveAgents: () => {
            socket.on("emitActiveAgents", (data) => {
                console.log("emitActiveAgents", data);
                if (data == true) {
                    isAgentAvailable = true;
                } else {
                    isAgentAvailable = false;
                }
            });
        },
        redirectUserToVisitor: () => {
            socket.on("redirectUserToVisitor", (visitorLocation) => {
                console.log("redirecting to visitor", visitorLocation);
            });
        }
    },
    emit: {
        urlChange: () => {
            socket.emit("urlChange", {
                meetingId: meetingVariables.id,
                url: currentUrl,
            });
        },
        scrollChange: (scroll) => {
            console.log("scrolling", cursorId)
            socket.emit("scrollChange", { scroll, cursorId, meetingId: meetingVariables.id });
        },
        endMeeting: () => {
            socket.emit("endMeeting", {
                meetingId: meetingVariables.id,
                isAdmin: "true",
            });
        },
        cursorPosition: (mouse, cursorId) => {
            // console.log(mouse.cursor, meetingVariables.id, cursorId)
            socket?.emit(
                "cursorPosition",
                mouse.cursor,
                meetingVariables.id,
                parseInt(cursorId),
                (response) => {
                    // console.log("cursorPosition-send", response); // ok
                }
            );
        },
        userJoinLive: (meetInfo) => {
            socket.emit("userJoinLive", meetInfo); // admin join live
        },
        getActiveAgents: () => {
            socket.emit("getActiveAgents");
        },
        visitorRequestMeet: (visitor) => {
            console.log("isAgentAvailable", isAgentAvailable);

            if (isAgentAvailable == true) {
                visitor.visitor_socket_id = socket.id;
                visitor.inquiry_status = "incoming";
                console.log("visitorRequestMeet", visitor);
                sendInquiryToDb(visitor);
                socket.emit("VisitorRequestMeet", visitor);
                style.show(mtxContactFormNotificationCard)
                style.hide(mtxFormContent)
                style.hide(mtxFormCloseBtn)
                showNotification();
                SOCKET.on.adminResponseToVisitor();
            } else {

                style.show(mtxContactFormNotificationCard)
                style.hide(mtxFormContent)
                visitor.inquiry_status = "missed";
                showNotification(false);
                sendInquiryToDb(visitor);
            }
        },
        modeChange: (marketrixMode) => {
            console.log("mode change", marketrixMode);
            socket.emit("modeChange", marketrixMode);
        },
        connectVisitor: (visitor) => {
            console.log("connect visitor", visitor)
            socket.emit("connectVisitor", visitor);
        },
        visitorJoinLive: (visitor) => {
            socket.emit("visitorJoinLive", visitor)
        }
    },
};