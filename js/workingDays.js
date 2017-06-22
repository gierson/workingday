/**
 * Created by gierek85 on 11.06.2017.
 */

(function (root, undefined) {

    var lib = {};
    var helpers = {};

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

    lib.init = function () {
        this.version = "0.0.1";

        if(document.getElementById('calendar-header-year-template') !== null && document.getElementById('calendar-header-template') !== null) {
            this.calendarYearTemplate = root.Handlebars.compile(document.getElementById('calendar-header-year-template').innerHTML);
            this.calendarHeaderTemplate = root.Handlebars.compile(document.getElementById('calendar-header-template').innerHTML);
            this.aletrTemplate = root.Handlebars.compile(document.getElementById('aletr-template').innerHTML);
        }

        this.dniTyg = ['pon.', 'wt.', 'śr.', 'czw.', 'pt.', 'sob.', 'niedz.'];
        this.miesiace = ['Styczeń', 'Luty', 'Marzec', 'Kwiecień', 'Maj', 'Czerwiec', 'Lipiec', 'Sierpień', 'Wrzesień', 'Październik', 'Listopad', 'Grudzień'];

        this.settings = {
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

        this.storage = [];
        this.restLeft = 29;
        setTimeout(function () {
            lib.setUpEventListeners();
            lib.restLeftUpdate();
        }, 0);
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
    lib.alertRender = function (type, message) {
        document.getElementById('alert').innerHTML = this.aletrTemplate({type: type, message: message});
        document.getElementById('alert').style.opacity = 1;
        document.getElementById('alert').style.visibility = 'visible';
        setTimeout(function () {
            document.getElementById('alert').style.opacity = 0;
        }, 3500);
    };

    lib.generateCalendarMonth = function (year, indexMonth) {
        var monthLength = helpers.getNumbersOfDaysInMonth(year, indexMonth);
        var startingDay = new Date(year, indexMonth, 1).getDay()-1;
        var month = indexMonth + 1;
        var day = 1;
        var addClass = '';
        var calObject = [];
        var calWeek = [];

        startingDay = startingDay === -1 ? 6 : startingDay;
        for (var i = 0; i < 9; i++) {
            for (var j = 0; j < 7; j++) {
                if (day <= monthLength && (i >= 1 || j >= startingDay)) {
                    var storedDay = this.storage.filter(function (store) {
                       if(store.month === month && store.day === day) {
                           return store;
                       }
                    });
                    if(this.isWorkingDay(year, indexMonth, day)) {
                        if(storedDay.length > 0) {
                            addClass = 'addOne';
                        } else {
                            addClass = 'work'
                        }
                        addClass2 = '';
                    } else {
                        addClass = 'holiday';
                        addClass2 = 'offday';
                    }
                    calWeek.push({position: j, dayNum: day, className: addClass, className2: addClass2, monthNum: month});
                    addClass = '';
                    day++;
                } else {
                    calWeek.push({position: j, dayNum: '', className2: 'placeholder'});
                }
            }
            calObject.push({row: i, data: calWeek});
            calWeek = [];
            if (day > monthLength) {
                break;
            }
        }
        return {days: calObject, tableHead: this.dniTyg, month: this.miesiace[indexMonth]};
    };

    lib.renderMonth = function (year, month, containerId) {
        document.getElementById('year').innerHTML = this.calendarYearTemplate({year: year});
        document.getElementById(containerId).innerHTML = this.calendarHeaderTemplate(this.generateCalendarMonth(year, month));
        this.restLeftUpdate();

    };

    lib.restLeftUpdate = function () {
        var restLeftCounter = document.getElementById('restLeft');
        var selected = lib.storage.length;
        restLeftCounter.innerHTML = lib.restLeft - selected + ' days left';
    };

    lib.addToCalendar = function (data) {
        this.storage.push(data);
        this.restLeftUpdate();
    };

    lib.deleteFromStorage = function(toDelete) {
        this.storage.forEach(function(item, index) {
            if(item.day === toDelete.day && item.month === toDelete.month) {
                lib.storage.splice(index,1);
                lib.restLeftUpdate();
            }
        })
    };

    lib.generateCalendars = function (year, monts, container) {
        var cont = document.getElementById(container);
        var element;
        var stored = root.firebase.database().ref('calendar/');
        stored.once('value')
            .then(function(snapshot) {
                if(snapshot.val() === null) {
                    lib.storage = [];
                    lib.alertRender('warning', 'Brak danych do wczytania!');
                } else {
                    lib.storage = snapshot.val();
                    lib.alertRender('success', 'Dane wczytane poprawnie!');
                    }
                monts.forEach(function (month) {
                    element = document.createElement('div');
                    element.setAttribute('id', month);
                    cont.appendChild(element);
                    lib.renderMonth(year, month, month);
                });

            }, function (error) {
                lib.alertRender('danger', 'Błąd wczytywania danych!');
            }
            );
    };

    lib.saveToLocalStorage = function () {
        root.firebase.database().ref('calendar/').set(this.storage)
            .then(function () {
                lib.alertRender('success', 'Dane zapisane poprawnie!');
            }, function (error) {
                lib.alertRender('danger', 'Błąd zapisywania danych!');
            });
    };

    lib.setUpEventListeners = function() {
        var tdDay = document.querySelector('#calendar-full');
        var saveButton = document.querySelector('#save');

        saveButton.addEventListener('click', function (event) {
           lib.saveToLocalStorage(); 
        });

        tdDay.addEventListener('click', function(event) {
            var elementClicked = event.target;
            if(elementClicked.className === 'work') {
                elementClicked.className = 'addOne';
                lib.addToCalendar({month: Number(elementClicked.getAttribute('month')), day: Number(elementClicked.getAttribute('day'))});
                return true;
            }
            if(elementClicked.className === 'addOne') {
                elementClicked.className = 'work';
                lib.deleteFromStorage({month: Number(elementClicked.getAttribute('month')), day: Number(elementClicked.getAttribute('day'))});
                console.log(elementClicked);
            }
        });
    };

    lib.init();
    root.workingday = lib;
    root.helpers = helpers;
})(this);

