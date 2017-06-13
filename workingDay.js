/**
 * Created by gierek85 on 11.06.2017.
 */

(function (root, undefined) {

    var lib = {};
    var helpers = {};

    lib.version = "0.0.1";

    lib.settings = {
        workWeekNumber: 5,
        defaultPermanentHolidays: [{ // defaultPermanentHolidays: [] (month is a index ex[january: 0, february: 1]
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
        ]
    };

    helpers.getNumbersOfDaysInMonth = function(year, month) {  //(month is a index ex[january: 0, february: 1]
        var montIndex = month + 1;
        return new Date(year, montIndex, 0).getDate();
    };

    // * easterForYear(2017)++           17.04     (poniedziałek)	Poniedziałek Wielkanocny
    // * easterForYear(2017) + 50day     04.06     (niedziela)	    Zesłanie Ducha Świętego (Zielone Świątki)
    // * easterForYear(2017) + 60day     15.06     (czwartek)	    Boże Ciało
    helpers.generateMovingHolidays = function(year) {
        var add = [0, 1, 49, 60];
        var holidays = [];
        var easterDay = lib.easter(year);

        for(var i = 0; i < add.length; i++) {
            var easter = new Date(easterDay);
            easter.setDate(easterDay.getDate() + add[i]);
            holidays.push({month: easter.getMonth(), day: easter.getDate()})
        }
        return holidays;
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
        var n0 = (h + l + 7 * m + 114);
        var n = Math.floor(n0 / 31) - 1;
        var p = n0 % 31 + 1;
        return new Date(year,n,p);
    };

    // Should return true if given date is a working day.
    lib.isWorkingDay = function(year, month, day) {
        var date = new Date(year, month, day);
        var workWeekNumber = this.settings.workWeekNumber;
        var permanentHolidays = this.settings.defaultPermanentHolidays;
        var movingHolidays = helpers.generateMovingHolidays(year);
        var offDays = [];

        offDays.push.apply(offDays, permanentHolidays);
        offDays.push.apply(offDays, movingHolidays);

        if(!Date.parse(year, month, day)) {
            throw new TypeError('Bad input date');
        }
        if(date.getDay() <= workWeekNumber && date.getDay() > 0) {
            var detected = false;
            offDays.forEach(function(holiday) {
                if(holiday.month === month && holiday.day === day) {
                    detected = true;
                }
            });
            return !detected;
        } else return false;
    };

    lib.getLastWorkDayOfMonth = function(year, month) {
        var daysInMont = helpers.getNumbersOfDaysInMonth(year, month);
        for(var i = daysInMont; i > 1; i--) {
            if(this.isWorkingDay(year, month, i)) {
                return new Date(year, month, i);
            }
        }
    };

    root.workingday = lib;
    root.helpers = helpers;

})(this);