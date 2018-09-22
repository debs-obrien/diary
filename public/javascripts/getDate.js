var moment = require('moment');

module.exports = function date() {
    var startOfWeek = moment().startOf('isoWeek');
    var endOfWeek = moment().endOf('isoWeek');
    var days = [];
    var day = startOfWeek;

    while (day <= endOfWeek) {
        days.push(day.toObject());
        day = day.clone().add(1, 'd');
    }
    return days
};
