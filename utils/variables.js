console.log("variables.js is established #4")

// const socketUrl = "https://socket-dev.creative-hub.co/";
// const serverBaseUrl = "http://api-dev.creative-hub.co/";
const socketUrl = "https://socket-v2.marketrix.io/";
const serverBaseUrl = "https://api-v2.marketrix.io/";
// let socket
let startInterval
let decodedObject = {} // admin information which are getting from the url would be store in the objec
// all information which are related to meeting would be store in this object
const meetingVariables = {
    id: "",
    token: "",
    name: "",
    userRole: "visitor",
    participant: {
        localId: "",
        remoteId: "",
    },
    domain: "",
    visitorSocketId: "",
    ended: true,
    adminToken: "",
    inquiryId: "",
    message: "",
};
let parentDiv
let contactFormDiv
let video; //video sdk
let marketrixModalContainer;
let overlay;
let marketrixButton;
let mtxContactFormNotificationCard
let cursorLoading
let mtxOverlayLoading
let mtxLoadingMessageDiv
let mtxFromContent
let mtxAdminCallDiv
let mtxFooterControl
let mtxFormCloseBtn
let mtxConnectBtn
let mtxEndCallBtn
let mtxCursorHeader
let videoContainer
let adminVidoeContainer
let videoDisabledImg
let configurationCoverDiv
let gridScreenDiv
let contorlsDiv
let cursorId
let isUrlChanged = false
let changedUrl
let isAgentAvailable = false
let socketStarted = false
let remoteScroll = false
let scrollCount = 0
let prevScrollCount = 0
let scrollEnded = true
let meetingEnded = true
let currentUrl;
let adminConnects = false // admin connecting
let adminMessage;
let adminName;
let hideRemoteCursor = false
let cursorMoveCount = 0
let preveCursorMoveCount = 0
let cursorMoveEnded = true
let movementsArr = []
let firstTimeAdminRequest = false

// background images
let adminNotificationBackgroundAnimation = `url("${CDNlink}/assets/images/animation.gif")`
let adminVideoDisabledImage = `${CDNlink}assets/images/profile.png`
let cursorPointerImage = `${CDNlink}/assets/images/pointer.png`
let videoDisabledImage = `${CDNlink}assets/images/cam-user.png`

const browserName = (function (agent) {
    switch (true) {
        case agent.indexOf("edge") > -1:
            return "MS Edge";
        case agent.indexOf("edg/") > -1:
            return "Edge ( chromium based)";
        case agent.indexOf("opr") > -1 && !!window.opr:
            return "Opera";
        case agent.indexOf("chrome") > -1 && !!window.chrome:
            return "Chrome";
        case agent.indexOf("trident") > -1:
            return "MS IE";
        case agent.indexOf("firefox") > -1:
            return "Mozilla Firefox";
        case agent.indexOf("safari") > -1:
            return "Safari";
        default:
            return "other";
    }
})(window.navigator.userAgent.toLowerCase());

const browserVersion = (function (agent) {
    switch (true) {
        case agent.indexOf("edge") > -1:
            return `${agent.split("edge")[1]}`;
        case agent.indexOf("edg/") > -1:
            return `${agent.split("edg/")[1]}`;
        case agent.indexOf("opr") > -1 && !!window.opr:
            return `${agent.split("opr/")[1]}`;
        case agent.indexOf("chrome") > -1 && !!window.chrome:
            return `${agent.split("chrome/")[1]}`;
        case agent.indexOf("trident") > -1:
            return `${agent.split("trident/")[1]}`;
        case agent.indexOf("firefox") > -1:
            return `${agent.split("firefox/")[1]}`;
        case agent.indexOf("safari") > -1:
            return `${agent.split("safari/")[1]}`;
        default:
            return "other";
    }
})(window.navigator.userAgent.toLowerCase())