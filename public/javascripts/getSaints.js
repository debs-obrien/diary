module.exports = function saints() {
    const getUrl = async () => {
        return await Promise.all(dates.map(date => axios.get(`https://api.abalin.net/get/namedays?day=${date.date}=&month=${date.months + 1}`)));
    };

    const getSaints = async () => {
        try {
            let results = await getUrl();
            return results.map(result => {
                let {data: {data: {name_es}}} = result;
                return name_es
            })
        }
        catch (error) {
            console.log(error);
        }
    };

    return getSaints()
};
