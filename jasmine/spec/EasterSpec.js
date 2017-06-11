describe("Easter Day", function() {
  var easterDay;
  var year;
  var month;
  var workingDay;
  var noWorkingDay;

  beforeEach(function() {
    easterDay = new Date(2017, 3, 16);
    year = 2017;
    month = 5;
    workingDay = '2017-06-12';
    holiday = '2017-05-01';
    weekendDay = '2017-02-11';
  });

  it("should give a easter date", function() {

    expect(workingday.easter('2017')).toEqual(easterDay);

  });

  it("Should return false if parameter is not a date.", function () {

    expect(workingday.isWorkingDay('not a date')).toEqual(false);

  });

  it("Should return true if give a working day.", function () {

    expect(workingday.isWorkingDay(workingDay)).toEqual(true);

  });

  it("Should return false if give a holiday day.", function () {

    expect(workingday.isWorkingDay(holiday)).toEqual(false);

  });

  it("Should return false if give a weekend day.", function () {

    expect(workingday.isWorkingDay(weekendDay)).toEqual(false);

  });

  xit("Should return last working day from given month and year.", function () {

    expect(workingday.lastWorkingDayInMont(year, month)).toEqual()

  });

});
