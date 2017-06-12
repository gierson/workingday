describe("workingday lib", function() {
    var easterDay;

    beforeEach(function() {
        easterDay = new Date(2017, 3, 16);
        workingday.settings.workWeekNumber = 5;
    });

    describe("isWorkingDay method", function() {

        it("should give a easter date", function () {
            expect(workingday.easter('2017')).toEqual(easterDay);
        });

    });

    describe("isWorkingDay method", function() {
        it("Should throw error if parameter is not a date.", function () {

            expect( function() {workingday.isWorkingDay('not a date')}).toThrowError(TypeError, 'Bad input date');

        });

        it("Should return true if give a working day.", function () {

            expect(workingday.isWorkingDay(2017, 5, 16)).toEqual(true);

        });
        it("Should return true if give a working day.", function () {

            expect(workingday.isWorkingDay(2017, 4, 8)).toEqual(true);

        });

        it("Should return false if give a holiday day.", function () {

            expect(workingday.isWorkingDay(2017, 4, 1)).toEqual(false);

        });

        it("Should return false if give a weekend day.", function () {

            expect(workingday.isWorkingDay(2017, 5, 17)).toEqual(false);

        });

        it("Should return true if give a saturday width setting.workWeekNumber to 6 .", function () {

            workingday.settings.workWeekNumber = 6;

            expect(workingday.isWorkingDay(2017, 5, 17)).toEqual(true);

        });

        describe("getLastWorkDayOfMonth method", function() {
            it("Should return a last working day in a given month", function () {

                expect(workingday.getLastWorkDayOfMonth(2017, 5)).toEqual(new Date(2017, 5, 30));

            });
            it("Should return a last working day in a given month", function () {

                expect(workingday.getLastWorkDayOfMonth(2017, 4)).toEqual(new Date(2017, 4, 31));

            });
            it("Should return a last working day in a given month", function () {

                expect(workingday.getLastWorkDayOfMonth(2017, 3)).toEqual(new Date(2017, 3, 28));

            });
        });
    })
});
