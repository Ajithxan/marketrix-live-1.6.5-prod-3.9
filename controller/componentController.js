const componentController = {
    getData: (type, key) => {
        if (type === "setting") return componentController.settingsData(key)
        else return componentController.componentData(key)
    },

    componentData: (component) => {
        let data = componentController.checkStorage()
        data = data["widget_customize"]
        const keys = Object.keys(data)
        if (keys.includes(component)) return data[component]
    },

    settingsData: (setting) => {
        const data = componentController.checkStorage()
        const keys = Object.keys(data)
        if (keys.includes(setting)) return data[setting]
    },

    checkStorage: () => {
        let data = getFromStore("COMPONENT_DATA")
        if (data) {
            data = JSON.parse(data)
            return data = data.data
        } else return false
    }
}