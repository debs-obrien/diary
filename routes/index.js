var express = require('express');
var router = express.Router();
const getDate = require('../public/javascripts/getDate');
//const saints = require('../public/javascripts/getSaints');
const axios = require("axios");

let dates = getDate();

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

/* GET home page. */
router.get('/', function (req, res, next) {
    getSaints()
        .then(function (saints) {
            res.render('index', {
                days: ['Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat', 'Sun'],
                months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
                dates,
                saints
            })
        })
});

module.exports = router;
