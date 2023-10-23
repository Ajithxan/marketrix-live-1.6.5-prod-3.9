console.log("main.js is established #13")
const setCDNLink = () => {
    ROUTE.setCDNLink()
}

const initiateWatchMethod = () => {
    console.log("watch methods are called")

    // watch path changes
    watch(() => {
        console.log("location is changing...", window.location.href)
        currentUrl = window.location.href
        setToStore("LOADING_MESSAGE", "Redirecting...")
        if (getFromStore('CURRENT_URL')) {
            if (currentUrl !== getFromStore('CURRENT_URL')) {
                // emit url changes
                mouse.loading.show()
                SOCKET.emit.urlChange()
            }
        }
        setToStore("CURRENT_URL", currentUrl)
    }, 'window.location.href')
}

const getUtmInfo = async () => {
    await ROUTE.getUtmInfo()
};

const initiateSocketConnection = () => {
    socketStarted = true
    if (cursorId) {
        socket = io.connect(socketUrl, {
            query: { appId, role: meetingVariables.userRole, cursorId },
        });
        if (meetingVariables.userRole === "visitor") {
            const visitedTime = new Date().getTime();
            const visitorDevice = {
                browser: navigator?.userAgentData?.brands[2]?.brand || browserName,
                browserVersion:
                    navigator?.userAgentData?.brands[2]?.version || browserVersion,
                platform: navigator?.platform,
                networkDownlink: navigator?.connection?.downlink,
                networkEffectiveType: navigator?.connection?.effectiveType,
                vendor: navigator?.vendor,
                screenResolution: window?.screen?.width + "x" + window?.screen?.height,
                screenWidth: window?.screen?.width,
                screenHeight: window?.screen?.height,
                windowWidth: window?.innerWidth,
                windowHeight: window?.innerHeight,
                windowResolution: window?.innerWidth + "x" + window?.innerHeight,
                ipAddress: ipAddress,
                country: country,
                ipData: ipData,
            };
            const utm = {
                utm_source: utmInfo?.utm_source,
                utm_medium: utmInfo?.utm_medium,
                utm_campaign: utmInfo?.utm_campaign,
                utm_term: utmInfo?.utm_term,
                utm_content: utmInfo?.utm_content,
            };
            console.log(utm)
            let visitor = { visitedTime, currentUrl, visitorDevice, utm, ipData };
            SOCKET.emit.connectVisitor(visitor)
        }
        SOCKET.emit.getActiveAgents();
        SOCKET.on.emitActiveAgents();
        SOCKET.on.adminResponseToVisitor();
    }
};

const adminJoin = () => {
    meetingEnded = false
    setToStore("MEETING_ENDED", meetingEnded)
    showModal()
    // hide notfication and cursor header of form
    style.hide(mtxCursorHeader)
    style.hide(mtxContactFormNotificationCard)
    style.hide(mtxFormContent)
    style.hide(mtxFormCloseBtn)

    if (meetingVariables.id && meetingVariables.token) meetingObj.connect(); // video sdk screen is starting

    SOCKET.on.redirectUserToVisitor()
}

const generateCursorId = () => {
    ROUTE.generateCursorId()
}

const setUserRole = () => {
    ROUTE.setUserRole()
}

const getQuery = () => {
    ROUTE.getQuery()
}

const checkUrlChanges = () => {
    ROUTE.checkUrlChanges()
}

const visitorJoin = () => {
    if ((/false/).test(getFromStore("MEETING_ENDED")) || !getFromStore("MEETING_ENDED")) {
        showModal()
    }

    SOCKET.on.changeUrl()
    SOCKET.on.changeScroll()
    SOCKET.on.meetingEnded()
    SOCKET.on.changeMode()

    let visitor = {
        userName: meetingVariables.name,
        domain: meetingVariables.domain,
        meetingId: meetingVariables.id,
        token: meetingVariables.token,
        visitorSocketId: meetingVariables.visitorSocketId,
        visitorPosition: {},
        cursorId,
    };

    SOCKET.emit.visitorJoinLive(visitor)
    SOCKET.on.connectedUser();

    if ((/true/).test(adminConnects)) {
        closeModal() // it may oppened. so it should be closed
        adminVidoeContainer = document.getElementById("mtx-admin-video-container");
        adminMeetingObj.connect()
    } // admin connecting
    else meetingObj.connect()

}

const checkMeetingVariables = () => {
    // localStorage.clear()
    ROUTE.checkMeetingVariables()
}

const getIpAddress = async () => {
    // get ip address
    await ROUTE.getIpAddress()
    await ROUTE.getCountry(ipAddress)
}


const initiateSnippet = async () => {
    await ROUTE.contactButton()
    await ROUTE.contactForm()

    setCDNLink() // set CDN link
    generateCursorId() // generate cursor id
    await getUtmInfo()
    await getIpAddress()
    initiateWatchMethod() // iniate watch methods
    checkUrlChanges() // this method would be called when redirecting or reloading
    setToStore('CURRENT_URL', currentUrl) // set current url in the store
    setUserRole() // set user role
    initiateSocketConnection() // initialize socket connection
    checkMeetingVariables() // this method would be called when redirection or reloading
    getQuery() // admin get request
};

// initializing this snippet
initiateSnippet()

document.addEventListener("keydown", function (event) {
    // Check if the "Escape" key is pressed (esc key has keycode 27)
    if (event.key === "Escape" || event.key === "Esc") {
        // Call the function to close the button (you can replace this with your desired action)
        closeModal();
    }
});

const connectAdminToLive = (meetInfo) => {
    SOCKET.emit.userJoinLive(meetInfo) // admin join live
    SOCKET.on.meetingEnded()
    SOCKET.on.connectedUser()
    SOCKET.on.changeScroll()
    SOCKET.on.changeUrl()
};

const showNotification = (isAgentAvailable = true) => {
    ROUTE.formNotification(isAgentAvailable)
}

const getCursorLocation = async (event) => {
    return await ROUTE.getCursorLocation(event)
};

const getWindowSize = () => {
    return ROUTE.getWindowSize()
};

const sendInquiryToDb = (data) => {
    let currentUrl = window.location.hostname;

    let inquiry = {
        app_id: appId,
        name: data.name,
        designation: data.designation,
        company: data.company,
        email: data.email,
        phone_no: data.phone,
        message: data.message,
        inquiry_type: data.inquiry_type,
        inquiry_status: data.inquiry_status,
        website_domain: data.website_domain,
        visitor_info: data.visitorDevice,
        visitor_socket_id: data.visitor_socket_id,
        country: data.country,
        ipAddress: data.ipAddress,
        geoLocation: data.geoLocation,
    };

    const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(inquiry),
    };
    fetch(`${serverBaseUrl}meet-live/inquiries/create`, requestOptions)
        .then((response) => response.json())
        .then((data) => {
        });
};

const openCam = () => {
    let All_mediaDevices = navigator.mediaDevices;
    if (!All_mediaDevices || !All_mediaDevices.getUserMedia) {
        return;
    }
    All_mediaDevices.getUserMedia({
        audio: true,
        video: true,
    })
        .then(function (vidStream) {
            video = document.getElementById("videoCam");
            if ("srcObject" in video) {
                video.srcObject = vidStream;
            } else {
                video.src = window.URL.createObjectURL(vidStream);
            }
            video.onloadedmetadata = function (e) {
                video.play();
                mouse.startMove();
            };
        })
        .catch(function (e) {
            console.log(e.name + ": " + e.message);
        });
};