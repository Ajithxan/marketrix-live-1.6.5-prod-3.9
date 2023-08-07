const APIKit = class {
    constructor() {
        console.log("axios created", API_URL)
        axios.create({
            baseURL: API_URL,
            headers: {
                'Content-Type': 'application/json',
            }
        });
    }
}
