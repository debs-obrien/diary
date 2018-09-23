var express = require('express');
var router = express.Router();
const getDate = require('../public/javascripts/getDate');
//const saints = require('../public/javascripts/getSaints');
const axios = require("axios");

let dates = getDate();

//let day = date[0].date
//let month = date[0].date



const todaysDate = function(){
    dates.forEach(function(date) {
        console.log(date.date);
        console.log(date.months)
    });

}

const getUrl = async () => {
        let day = 1;
        let month = 1;
        let urls = axios.get(`https://api.abalin.net/get/namedays?day=${day}=&month=${month}`);
        console.log(typeof urls); // object
        console.log(urls); // Promise{<pending>}
        return urls
};

const getUrls = async () => {
    dates.map(date => {
        let day = date.date;
        let month = date.months;
        return axios.get(`https://api.abalin.net/get/namedays?day=${day}=&month=${month}`);
    });
};
const getSaints = async () => {
    try {
        // destructure returned object instead of calling data.data.name_es

        let { data: { data: { name_es } } } = await getUrl(); //ok
        // let { data: { data: { name_es } } } = await getUrls(); // not ok
        // Cannot destructure property `data` of 'undefined' or 'null'.
        // why is it getting undefined and how do I destructure from a group of urls
        // should I be using a forEach here as now I have more than one url?

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
            date: dates,
                saints
            })
        })
});

module.exports = router;
