/**
 * Created by gierek85 on 11.06.2017.
 */

(function (root, undefined) {

    var lib = {};
    var helpers = {};

    lib.version = "0.0.1";

    lib.settings = {
        businessDaysNumber: 5,
        defaultPermanentHolidays: [ // defaultPermanentHolidays: [] (month is a index ex[january: 0, february: 1]
            { indexMonth: 0, day: 1 },
            { indexMonth: 0, day: 6 },
            { indexMonth: 4, day: 1 },
            { indexMonth: 4, day: 3 },
            { indexMonth: 7, day: 15 },
            { indexMonth: 10, day: 1 },
            { indexMonth: 10, day: 11 },
            { indexMonth: 11, day: 25 },
            { indexMonth: 11, day: 26 }
        ]
    };

    helpers.getNumbersOfDaysInMonth = function(year, indexMonth) {  //(month is a index ex[january: 0, february: 1]
        var monthIndex = indexMonth + 1;
        return new Date(year, monthIndex, 0).getDate();
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
            holidays.push({indexMonth: easter.getMonth(), day: easter.getDate()})
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
    lib.isWorkingDay = function(year, indexMonth, day) {
        var date = new Date(year, indexMonth, day);
        var businessDaysNumber = this.settings.businessDaysNumber;
        var permanentHolidays = this.settings.defaultPermanentHolidays;
        var movingHolidays = helpers.generateMovingHolidays(year);
        var businessDays = [];
        businessDays.push.apply(businessDays, permanentHolidays);
        businessDays.push.apply(businessDays, movingHolidays);

        if(!Date.parse(year, indexMonth, day) || isNaN(date.getTime())) {
            throw new TypeError('Bad input date');
        }
        if(date.getDay() <= businessDaysNumber && date.getDay() > 0) {
            var detected = false;
            businessDays.forEach(function(holiday) {
                if(holiday.indexMonth === indexMonth && holiday.day === day) {
                    detected = true;
                }
            });
            return !detected;
        } else return false;
    };

    lib.getLastWorkDayOfMonth = function(year, indexMonth) {
        var daysInMont = helpers.getNumbersOfDaysInMonth(year, indexMonth);
        for(var i = daysInMont; i > 1; i--) {
            if(this.isWorkingDay(year, indexMonth, i)) {
                return new Date(year, indexMonth, i);
            }
        }
    };

    lib.generateCalendarMonth = function (year, indexMonth, containerId) {
        var container = document.getElementById(containerId);
        var template = '';
        var dniTyg = ['pon.', 'wt.', 'śr.', 'czw.', 'pt.', 'sob.', 'niedz.'];
        var miesiace = ['Styczeń', 'Luty', 'Marzec', 'Kwiecień', 'Maj', 'Czerwiec', 'Lipiec', 'Sierpień', 'Wrzesień', 'Październik', 'Listopad', 'Grudzień'];
        var monthLength = helpers.getNumbersOfDaysInMonth(year, indexMonth);
        var startingDay = new Date(year, indexMonth, 1).getDay()-1;
        var month = indexMonth + 1;
        startingDay = startingDay === -1 ? 6 : startingDay;

        template += '<table class="calendar" cellpadding="0" cellspacing="0"><tr>';
        template += '<th colspan="7" class="calendar-month">' + miesiace[indexMonth] + '</th></tr><tr>';

        for(h = 0; h < 7; h++) {
            template += '<th class="calendar-header-day">' + dniTyg[h] + '</th>';
        }

        var day = 1;
        // this loop is for is weeks (rows)

        for (var i = 0; i < 9; i++) {
            template += '<tr>';
            // this loop is for weekdays (cells)
            for (var j = 0; j < 7; j++) {
                template += '<td class="calendar-day">';
                if (day <= monthLength && (i >= 1 || j >= startingDay)) {
                    template += this.isWorkingDay(year, indexMonth, day) ? '<span class="work d'+day+'m'+ month +'">' + day + '</span>' : '<span class="holiday">' + day + '</span>';
                    day++;
                }
                template += '</td>';
            }
            // stop making rows if we've run out of days
            if (day > monthLength) {
                break;
            } else {
                template += '</tr>';
            }
        }
        template += '</table>';

        container.innerHTML = template;
    };

    lib.setUpEventListeners = function() {
        var tdDay = document.querySelector('.calendar-full');

        tdDay.addEventListener('click', function(event) {
            var elementClicked = event.target;
            //if(elementClicked.className === 'calendar-day') {
                console.log(elementClicked);
            //}
        });
    };



    root.workingday = lib;
    root.helpers = helpers;

})(this);

setTimeout(function () {
    workingday.setUpEventListeners();
}, 0);