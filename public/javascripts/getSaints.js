module.exports = function saints() {
    const axios = require("axios");


    const getUrl = () => {
        try {
            return axios.get('https://api.abalin.net/get/namedays?day=11&month=3')
        } catch (error) {
            console.error(error)
        }
    }

    const getSaints = async () => {
        const saints = getUrl()
            .then(response => {
                console.log(response)
                return (response)
            })
            .catch(error => {
                console.log(error)
            })
    }

    return getSaints()
};
