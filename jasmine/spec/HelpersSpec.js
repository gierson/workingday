describe("Helpers", function() {
  var numberDaysInJanuary;
  var numberDaysInFebruary;
  var year;

  beforeEach(function() {

  });

  describe("Numbers of days in a month. getNumbersOfDaysInMonth", function() {

    beforeEach(function() {
      numberDaysInJanuary = 31;
      numberDaysInFebruary = 28;
      year = 2017;
    });

    it("should give a 31 days", function() {

      expect(helpers.getNumbersOfDaysInMonth(year, 1)).toEqual(numberDaysInJanuary);

    });

    it("should give a 28 days", function() {

      expect(helpers.getNumbersOfDaysInMonth(year, 2)).toEqual(numberDaysInFebruary);

    });

  })

});