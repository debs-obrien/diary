var express = require('express');
var router = express.Router();
const getDate = require('../public/javascripts/getDate');
//const saints = require('../public/javascripts/getSaints');
const axios = require("axios");

let dates = getDate();

//let day = date[0].date
//let month = date[0].date

const getUrl = async () => {
    return await Promise.all( dates.map(date => axios.get(`https://api.abalin.net/get/namedays?day=${date.date}=&month=${date.months}`)));
}

const getSaints = async () => {
    try {
        let results = await getUrl()

        //console.log(results)
        return results.map(result => {
            let { data: { data: { name_es } } } = result;
            //console.log(name_es); // prints all names perfectly
            return name_es
        })
    }
    catch (error) {
        console.log(error);
    }
};

/* GET home page. */
router.get('/', function(req, res, next) {
    getSaints()
        .then(function(saints) { res.render('index', {
                days: ['Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat', 'Sun'],
                months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
                date: dates,
                saints
            })
        })
});

module.exports = router;
