/**
 * Created by gierek85 on 11.06.2017.
 */

(function (root, undefined) {

    var lib = {},
        helpers = {};

    lib.version = '0.0.1';

    lib.settings = {
        workWeekNumber: 5,

        // defaultPermanentHolidays: [],
        defaultPermanentHolidays: [{
                month: 0,
                day: 1
            },
            {
                month: 0,
                day: 6
            },
            {
                month: 4,
                day: 1
            },
            {
                month: 4,
                day: 3
            },
            {
                month: 7,
                day: 15
            },
            {
                month: 10,
                day: 1
            },
            {
                month: 10,
                day: 11
            },
            {
                month: 11,
                day: 25
            },
            {
                month: 11,
                day: 26
            }
        ],
        defaultMovingHolidays: []      //Polish moving holidays
    };


    helpers.getNumbersOfDaysInMonth = function(year, month) {
        return new Date(year, month, 0).getDate();
    };

    // Should return a Easter day from given year.
    lib.easter = function(year) {
        var a = year % 19;
        var b = Math.floor(year / 100);
        var c = year % 100;
        var d = Math.floor(b / 4);
        var e = b % 4;
        var f = Math.floor((b + 8) / 25);
        var g = Math.floor((b - f + 1) / 3);
        var h = (19 * a + b - d - g + 15) % 30;
        var i = Math.floor(c / 4);
        var k = c % 4;
        var l = (32 + 2 * e + 2 * i - h - k) % 7;
        var m = Math.floor((a + 11 * h + 22 * l) / 451);
        var n0 = (h + l + 7 * m + 114)
        var n = Math.floor(n0 / 31) - 1;
        var p = n0 % 31 + 1;
        return new Date(year,n,p);
    };

    // Should return true if given date is a working day.
    lib.isWorkingDay = function(year, month, day) {
        var date = new Date(year, month, day);
        var workWeekNumber = this.settings.workWeekNumber;
        var permanentHolidays = this.settings.defaultPermanentHolidays;

        if(!Date.parse(year, month, day)) {
            return false;
        }
        console.log(workWeekNumber);
        if(date.getDay() <= workWeekNumber && date.getDay() > 0) {
            var detected = false;
            permanentHolidays.forEach(function(holiday) {
                if(holiday.month === month && holiday.day === day) {
                    detected = true;
                }
            });

            return !detected;

        } else return false;

    };

    root.workingday = lib;
    root.helpers = helpers;

})(this);