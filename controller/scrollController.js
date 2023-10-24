const scrollController = {
    position: (pageX, pageY) => {
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

        return scroll
    }
}