var express = require('express');
var router = express.Router();
const date = require('../public/javascripts/getDate');
//const saints = require('../public/javascripts/getSaints');
const axios = require("axios");


const getUrl = async () => {
    return axios.get('https://api.abalin.net/get/namedays?day=11&month=5')
}
const getSaints = async () => {
    try {
        // destructure returned object instead of calling data.data.name_es
        let { data: { data: { name_es } } } = await getUrl();
        return name_es;
    }
    catch (error) {
        console.log(error);
    }
}


/* GET home page. */
router.get('/', function(req, res, next) {
    getSaints() // call then and pass function to then handler to pass result of getSaints() - call it saints as that makes sense
        .then(function(saints) { res.render('index', {
                days: ['Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat', 'Sun'],
                months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
                curDate: date(),
                saints
            })
        })
});

module.exports = router;
