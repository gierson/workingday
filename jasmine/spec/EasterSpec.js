describe("Easter Day", function() {
  var easterDay;
  var year;
  var month;
  var workingDay;

  beforeEach(function() {
    easterDay = new Date(2017, 3, 16);
    year = 2017;
    month = 5;
  });

  it("should give a easter date", function() {

    expect(workingday.easter('2017')).toEqual(easterDay);

  });

  it("Should return false if parameter is not a date.", function () {

    expect(workingday.isWorkingDay('not a date')).toEqual(false);

  });

  it("Should return true if give a working day.", function () {

    expect(workingday.isWorkingDay(2017,5,16)).toEqual(true);

  });
  it("Should return true if give a working day.", function () {

    expect(workingday.isWorkingDay(2017,4,8)).toEqual(true);

  });

  it("Should return false if give a holiday day.", function () {

    expect(workingday.isWorkingDay(2017,4,1)).toEqual(false);

  });

  it("Should return false if give a weekend day.", function () {

    expect(workingday.isWorkingDay(2017,5,17)).toEqual(false);

  });

  it("Should return true if give a saturday width setting.workWeekNumber to 6 .", function () {

    workingday.settings.workWeekNumber = 6;

    expect(workingday.isWorkingDay(2017,5,17)).toEqual(true);

  });

  xit("Should return last working day from given month and year.", function () {

    expect(workingday.lastWorkingDayInMont(year, month)).toEqual()

  });

});
