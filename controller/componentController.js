const componentController = {
    getData: (componentName) => {
        return componentController.checkStorage(componentName)
    },

    checkStorage: (componentName) => {
        let data = getFromStore("COMPONENT_DATA")
        if (data) {
            data = JSON.parse(data)
            data = data.data

            const keys = Object.keys(data)        
            if (keys.includes(componentName)) return data[componentName]
        } else return false
    }
}