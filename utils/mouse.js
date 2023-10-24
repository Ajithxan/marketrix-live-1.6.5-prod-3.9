console.log("mouse.js is established #8")
const mouse = {
    cursor: [],
    marketrixMode: true,
    startMove: () => {
        document.onmousemove = mouse.handleMouse;
    },
    show: (localCursor = false) => {
        ROUTE.cursorVideoFrameShow(localCursor)
    },
    hide: (localCursor = false) => {
        ROUTE.cursorVideoFrameHide(localCursor)
    },
    cursorFrameElement: (userId, isLocalUser, show) => {
        ROUTE.cursorVideoFrameElement(userId, isLocalUser, show)
    },
    handleMouse: (event) => {
        ROUTE.cursorHandle(event)
    },
    loading: {
        show: (message = "Connecting...") => {
            ROUTE.cursorLoadingShow(message)
        },
        hide: () => {
            ROUTE.cursorLoadingHide()
        }
    }
};

const emitCursorMovment = () => {
    movementsArr = []
    if (cursorMoveEnded) return
    cursorMoveEnded = true
    SOCKET.emit.cursorPosition(mouse, cursorId)
}

// check cursor move starts and stops.
setInterval(() => {
    if (cursorMoveCount < preveCursorMoveCount || preveCursorMoveCount === 0) preveCursorMoveCount = cursorMoveCount
    else emitCursorMovment()
}, 1000)

// scroll event
let scroller = document.getElementsByTagName("body")[0]
let pageX;
let pageY;

const scrollPosition = () => {
    const scroll = ROUTE.scrollPosition(pageX, pageY)
    SOCKET.emit.scrollChange(scroll)
}

const emitScroll = () => {
    if (scrollEnded) return
    scrollEnded = true
    scrollPosition() // it would be called to emit scroll when local scroll stops.
}

// check scroll starts and stops.
setInterval(() => {
    if (scrollCount > prevScrollCount || prevScrollCount === 0) prevScrollCount = scrollCount
    else emitScroll()
}, 1000)

scroller.onscroll = () => {
    if (!remoteScroll) scrollEnded = false // prevent from emitting when remote scroll.
    scrollCount += 1
    pageX = this.scrollX
    pageY = this.scrollY
}