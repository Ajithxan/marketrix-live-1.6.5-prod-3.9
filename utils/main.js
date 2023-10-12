console.log("main.js is established #13")
const setCDNLink = () => {
    const links = document.getElementsByTagName('link')
    const imgs = document.getElementsByTagName('img')
    // change all href
    for (const link of links) {
        let linkAttr = link.getAttribute("href").replace("{{CDN_LINK}}", CDNlink)
        link.setAttribute("href", linkAttr)
    }
    // change all src
    for (const img of imgs) {
        let imgSrc = img.getAttribute("src").replace("{{CDN_LINK}}", CDNlink)
        img.setAttribute("src", imgSrc)
    }
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
    // const queryString = new URL(url).searchParams.get("marketrix-meet");
    var utmParams = {};
    var queryString = window.location.search.substring(1);
    var params = queryString.split("&");

    for (var i = 0; i < params.length; i++) {
        var pair = params[i].split("=");
        var key = decodeURIComponent(pair[0]);
        var value = decodeURIComponent(pair[1]);

        if (key.indexOf("utm_") === 0) {
            utmParams[key] = value;
        }
    }
    utmInfo = utmParams;
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
            let visitor = { visitedTime, currentUrl, visitorDevice, utm };
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
    if (getFromStore("CURSOR_ID")) cursorId = getFromStore("CURSOR_ID")
    else {
        cursorId = Date.now()
        setToStore("CURSOR_ID", cursorId)
    }
}

const setUserRole = () => {
    const url = currentUrl
    const queryString = new URL(url).searchParams.get("marketrix-meet");
    if (queryString != null) {
        const decodedString = decodeURIComponent(queryString);
        decodedObject = JSON.parse(decodedString);
        meetingVariables.userRole = decodedObject.userRole
    }

    if (getFromStore('MEETING_VARIABLES')) {
        meetingStoredVariables = JSON.parse(getFromStore('MEETING_VARIABLES'))
        meetingVariables.userRole = meetingStoredVariables.userRole
    }
}

const getQuery = () => {
    if (getFromStore('MEETING_VARIABLES')) return // these data already stored
    const url = currentUrl;
    const queryString = new URL(url).searchParams.get("marketrix-meet");

    if (queryString != null) {
        const decodedString = decodeURIComponent(queryString);

        // Parse the decoded string as a JavaScript object
        decodedObject = JSON.parse(decodedString);

        if (decodedObject?.userRole === "admin") {
            firstTimeAdminRequest = true
            decodedObject.cursorId = cursorId
            setToStore('DECODED_OBJECT', JSON.stringify(decodedObject)) // store decoded object
            meetingVariables.id = decodedObject.meetingId;
            meetingVariables.token = decodedObject.token;
            meetingVariables.name = decodedObject.userName;
            meetingVariables.userRole = decodedObject.userRole;
            meetingVariables.adminToken = decodedObject.adminToken;
            meetingVariables.inquiryId = decodedObject.inquiryId;
            hideRemoteCursor = true
            adminJoin()
        }
    }
}

const checkUrlChanges = () => {
    isUrlChanged = false
    if (getFromStore('CURRENT_URL')) {
        if (currentUrl !== getFromStore('CURRENT_URL')) {
            // emit url changes
            isUrlChanged = true
        }
    }
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
    if (getFromStore('MEETING_VARIABLES')) {
        console.log("checkMeetingVariables")
        meetingStoredVariables = JSON.parse(getFromStore('MEETING_VARIABLES'))
        meetingVariables.id = meetingStoredVariables.id
        meetingVariables.name = meetingStoredVariables.name
        meetingVariables.participant = meetingStoredVariables.participant
        meetingVariables.token = meetingStoredVariables.token
        meetingVariables.userRole = meetingStoredVariables.userRole
        meetingVariables.adminToken = meetingStoredVariables.adminToken
        meetingVariables.inquiryId = meetingStoredVariables.inquiryId

        if (isUrlChanged) {
            setToStore("LOADING_MESSAGE", "Redirecting...")
            SOCKET.emit.urlChange()
        } // emit url changes

        if (meetingVariables.userRole === "admin") {
            firstTimeAdminRequest = false
            decodedObject = JSON.parse(getFromStore("DECODED_OBJECT"))
            adminJoin()
        }
        else {
            visitorJoin()
        }
    }
}

const getIpAddress = async () => {
    // get ip address
    await fetch('https://api.ipify.org/?format=json')
        .then(response => response.json())
        .then(async (data) => {
            console.log("IP Address", data.ip)
            ipAddress = data.ip

            await fetch(`https://ipapi.co/${ipAddress}/json/`).then(response => response.json()).then(async data => {
                country = await data.country_name
                ipData = await data
                console.log("country", country)
                
            })
        });
}



const initiateSnippet = async () => {
    parentDiv = document.createElement("div");
    contactFormDiv = document.createElement("div");

    parentDiv.setAttribute("id", "mtx-parent-div");
    contactFormDiv.setAttribute("id", "mtx-contact-form-div");

    // hide these elements until everything is loaded
    parentDiv.style.display = "none"
    contactFormDiv.style.display = "none"

    document.body.prepend(contactFormDiv);
    document.body.prepend(parentDiv);

    await fetch(`${CDNlink}pages/contact-button.html`)
        .then((response) => {
            return response.text();
        })
        .then((html) => {
            parentDiv.innerHTML = html; // rendering
            marketrixButton = document.getElementById("marketrix-button");
            // fetch json
            fetch(`${CDNlink}data/contact-button.json`).then(response => {
                return response.json()
            }).then((data) => {
                const htmlElementResponse = data[0]
                render.initiate(marketrixButton, htmlElementResponse)
                setCDNLink()
            })

        });

    await fetch(`${CDNlink}pages/contact-form.html`)
        .then((response) => {
            return response.text();
        })
        .then(async (html) => {
            contactFormDiv.innerHTML = html; // rendering
            marketrixModalContainer = document.getElementById(
                "marketrix-modal-container"
            );
            style.hide(marketrixModalContainer)
            // fetch elements
            await fetch(`${CDNlink}data/contact-form.json`).then(response => {
                return response.json()
            }).then(async (data) => {
                const htmlElementResponse = data[0]
                render.initiate(marketrixModalContainer, htmlElementResponse)

                mtxContactFormNotificationCard = document.getElementById("mtx-contact-form-notification-card")
                style.hide(mtxContactFormNotificationCard) // default hide
                mtxFormContent = document.getElementById("mtx-form-content")
                mtxAdminCallDiv = document.getElementById("mtx-admin-call-div")
                style.hide(mtxAdminCallDiv) // default hide
                mtxFooterControl = document.getElementById("mtx-footer-controls")
                mtxFormCloseBtn = document.getElementById("mtx-form-close-btn")
                mtxConnectBtn = document.getElementById("mtx-btn-connect")
                mtxEndCallBtn = document.getElementById("mtx-btn-endcall")
                style.hide(mtxEndCallBtn) // default hide
                mtxCursorHeader = document.getElementById("mtx-cursor-header")
                mtxAdminGridScreen = document.getElementById("mtx-admin-grid-screen")
                style.hide(mtxAdminGridScreen) // default hide
                overlay = document.querySelector(".mtx-overlay");
                currentUrl = window.location.href // set current Url
                setCDNLink()
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

                // show these element after everything is loaded properly
                setTimeout(() => {
                    parentDiv.style.display = "block"
                    contactFormDiv.style.display = "block"

                }, 2000)
            })
        });
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
    const notificationIcon = document.getElementById("mtx-notification-icon")
    const notificationMsg = document.getElementById("mtx-contact-notification")
    let notifications = [
        { icon: "fa-phone", msg: "We're connecting you!" },
        { icon: "fa-clock", msg: "Please stay!" },
        { icon: "fa-video", msg: "Please allow to switch on your Video Camera." },
        { icon: "fa-headphones", msg: "Please allow to switch on your Microphone" },
        { icon: "dummy", msg: "dummy" }, // keep this always here.
    ]
    if (!isAgentAvailable) notifications = [
        { icon: "fa-phone-slash", msg: "Our LiveAgents are offline right now." },
        { icon: "fa-envelope", msg: "Will get in touch with you via email soon!" }
    ]
    let count = 0

    notifications.forEach((notification, index) => {
        count += 1
        if (index === 0) {
            notificationIcon.classList.add(notifications[index].icon)
            notificationMsg.innerText = notifications[index].msg
        }
        setTimeout(() => {
            if (index > 0) {
                notificationIcon.classList.remove(notifications[(index - 1)].icon)
                notificationIcon.classList.add(notification.icon)
                notificationMsg.innerText = notification.msg
            }

            if (((index + 1) === notifications.length) && isAgentAvailable) showNotification()
        }, 1500 * count)
    })

}

const getCursorLocation = async (event) => {
    const { clientX, clientY } = event;
    let x = clientX;
    let y = clientY;
    let windowWidth = window.innerWidth;
    let windowHeight = window.innerHeight;

    return { x, y, windowWidth, windowHeight };
};

const getWindowSize = () => {
    const { innerWidth, innerHeight } = window;
    return { innerWidth, innerHeight };
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