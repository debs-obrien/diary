var express = require('express');
var router = express.Router();
const date = require('../public/javascripts/getDate');
//const saints = require('../public/javascripts/getSaints');
const axios = require("axios");


const getUrl = () => {
    try {
        return axios.get('https://api.abalin.net/get/namedays?day=11&month=3')
    } catch (error) {
        console.error(error)
    }
};
const getSaints = async () => {
    getUrl()
        .then(response => {
            console.log(response.data.data.name_es);
            return (response.data.data.name_es);
        })
        .catch(error => {
            console.log(error)
        })
};


/* GET home page. */
router.get('/', function(req, res, next) {
    getSaints()
        .then(res.render('index', {
        days: ['Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat', 'Sun'],
        months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
        curDate: date(),
        curSaints: getSaints()
    }))

});

module.exports = router;
