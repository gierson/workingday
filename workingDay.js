/**
 * Created by gierek85 on 11.06.2017.
 */

(function (root, undefined) {

    var lib = {},
        helpers = {};

    lib.version = '0.0.1';

    lib.settings = {
        // regular no working day's 2017 in Poland:
        // 01.01     (niedziela)	    Nowy Rok, Świętej Bożej Rodzicielki
        // 06.01     (piątek)	        Trzech Króli (Objawienie Pańskie)
        // 01.05     (poniedziałek)	Święto Pracy
        // 03.05     (Środa)	        Święto Konstytucji 3 Maja
        // 15.18     (wtorek)	        Święto Wojska Polskiego, Wniebowzięcie Najświętszej Maryi Panny
        // 01.11     (Środa)	        Wszystkich Świętych
        // 11.11     (sobota)	        Święto Niepodległości
        // 25.12     (poniedziałek)	Boże Narodzenie (pierwszy dzień)
        // 26.12     (wtorek)	        Boże Narodzenie (drugi dzień)
        defaultPermanentHolidays: [{
            month: 0,
            day: 1
        },
        {
            month: 5,
            day: 6
        },
        {
            month: 4,
            day: 1
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
        var date = new Date(year,n,p);
        return date;
    };

    // Should return true if given date is a working day.
    lib.isWorkingDay = function(year, month, day) {
        if(!Date.parse(year, month, day)) {
            return false;
        } else

            return true;

    };



    root.workingday = lib;
    root.helpers = helpers;

})(this);