const notificationController = {
    form: () => {
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
}