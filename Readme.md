# workingDay.js
It's tiny lib to get business day's from a date (month-year).

### Lib functionality:

1. Should return object width working day's in a given month,
2. Should return true if given date is a working day.
3. Should return last working day from given month and year.
4. Should return a Easter day from given year.
5. Should have configurable regular holiday's.

#### regular no working day's in Poland:
* 01.01     (niedziela)	    Nowy Rok, Świętej Bożej Rodzicielki
* 06.01     (piątek)	    Trzech Króli (Objawienie Pańskie)
* 01.05     (poniedziałek)	Święto Pracy
* 03.05     (Środa)	        Święto Konstytucji 3 Maja
* 15.18     (wtorek)	    Święto Wojska Polskiego, Wniebowzięcie Najświętszej Maryi Panny
* 01.11     (Środa)	        Wszystkich Świętych
* 11.11     (sobota)	    Święto Niepodległości
* 25.12     (poniedziałek)	Boże Narodzenie (pierwszy dzień)
* 26.12     (wtorek)	    Boże Narodzenie (drugi dzień)

#### Moving no working day's in 2017
* easterForYear(2017)             16.04     (niedziela)	    Wielkanoc
* easterForYear(2017)++           17.04     (poniedziałek)	Poniedziałek Wielkanocny
* easterForYear(2017) + 50day     04.06     (niedziela)	    Zesłanie Ducha Świętego (Zielone Świątki)
* easterForYear(2017) + 60day     15.06     (czwartek)	    Boże Ciało

#### Methods:
* `easter(year);` - return object Date width easter date.
* `isWorkingDay(year, indexMonth, day);` - return Boolean (indexMonth january: 0, february: 1])
* `getLastWorkDayOfMonth(year, indexMonth);` return object Date width the last business day in a given month
* `settings.workWeekNumber` - default value is 5 (monday to friday) business day.
* `settings.defaultPermanentHolidays` - array of objects width a regular holiday `{month: 0, day: 1}`.