 it("display rows when getAll return value", () =>
    {
        console.log(service.useValue.getAll)
        (service.useValue.getAll as jasmine.Spy).and.returnValue(of([{"date": "2025-01-01", "temperatureC": 0, "temperatureF": 10, "summary": "Il fait très froid"},
            {"date": "2025-01-22", "temperatureC": 5, "temperatureF": 24, "summary": "Brumeux"}]))

        let nbElements = fixture.debugElement.query(By.css(".nb-results"));
        expect(nbElements).toBeTruthy();
    })
