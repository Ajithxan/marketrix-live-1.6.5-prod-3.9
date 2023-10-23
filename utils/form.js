console.log("form.js is established #11")
const validate = (id) => {
    const elements = document.querySelectorAll(`#${id} .mtx-form-control`)
    let error = true;

    for (const element of elements) {
        const name = element.attributes.name.nodeValue
        const field = document.querySelector(`[name="${name}"]`)
        const value = field.value

        if (value && value !== "Select a Inquiry Type") field.classList.remove("mtx-form-control-error")
        else field.classList.add("mtx-form-control-error")

    }

    for (const element of elements) {
        const name = element.attributes.name.nodeValue
        const field = document.querySelector(`[name="${name}"]`)
        const value = field.value

        if (value && value !== "Select a Inquiry Type") error = false
        else { error = true; break }
    }

    return error;
}

const submit = async () => {
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
    };

    const visitorPosition = await getCursorLocation(event);

    const utm = {
        utm_source: utmInfo?.utm_source,
        utm_medium: utmInfo?.utm_medium,
        utm_campaign: utmInfo?.utm_campaign,
        utm_term: utmInfo?.utm_term,
        utm_content: utmInfo?.utm_content,
    };

    const visitor = {
        name: document.querySelector('[name="name"]').value,
        email: document.querySelector('[name="email"]').value,
        // phone_no: document.querySelector('[name="phone_no"]').value,
        inquiry_type: "General", //document.querySelector('[name="inquiry_type"]').value,
        message: document.querySelector('[name="message"]').value,
        website_domain: document.location.origin,
        visitorDevice: visitorDevice,
        visitorPosition: visitorPosition,
        locationHref: window.location.href,
        ipAddress,
        geoLocation,
        country: country,
        utm: utm
    };

    if (!validate("mtx-form")) {
        removeFromStore("MEETING_VARIABLES") // remove meeting variables when submit new data
        meetingVariables.id = false

        SOCKET.emit.visitorRequestMeet(visitor)
    }
};