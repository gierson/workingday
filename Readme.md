workingDay.js - it's tiny lib to get working day's from a date (month-year) or (year).

Lib functionality:

1: Should return object width working day's in a given year.
2: Should return object width working day's in a given month,
3: Should return true if given date is a working day.
4: Should return last working day from given month and year.
5: Should return a Easter day from given year.
6: Should have configurable regular holiday's.

regular no working day's 2017 in Poland:
    01.01     (niedziela)	    Nowy Rok, Świętej Bożej Rodzicielki
    06.01     (piątek)	        Trzech Króli (Objawienie Pańskie)
    01.05     (poniedziałek)	Święto Pracy
    03.05     (Środa)	        Święto Konstytucji 3 Maja
    15.18     (wtorek)	        Święto Wojska Polskiego, Wniebowzięcie Najświętszej Maryi Panny
    01.11     (Środa)	        Wszystkich Świętych
    11.11     (sobota)	        Święto Niepodległości
    25.12     (poniedziałek)	Boże Narodzenie (pierwszy dzień)
    26.12     (wtorek)	        Boże Narodzenie (drugi dzień)

Moving no working day's in 2017
    easterForYear(2017)             16.04     (niedziela)	    Wielkanoc
    easterForYear(2017)++           17.04     (poniedziałek)	Poniedziałek Wielkanocny
    easterForYear(2017) + 50day     04.06     (niedziela)	    Zesłanie Ducha Świętego (Zielone Świątki)
    easterForYear(2017) + 60day     15.06     (czwartek)	    Boże Ciało

methods:
easterForYear (year) {
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
   }