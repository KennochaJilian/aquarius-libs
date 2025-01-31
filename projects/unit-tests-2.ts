it("display rows when getAll return value", () => {
    (service.useValue.getAll as jasmine.Spy).and.returnValue(of([
        { "date": "2025-01-01", "temperatureC": 0, "temperatureF": 10, "summary": "Il fait très froid" },
        { "date": "2025-01-22", "temperatureC": 5, "temperatureF": 24, "summary": "Brumeux" }
    ]));

    fixture.detectChanges(); // 🔹 Important pour déclencher l'affichage

    let nbElements = fixture.debugElement.query(By.css(".nb-results"));
    console.log("nbElement", nbElements?.nativeElement?.textContent); // 🔍 Vérification du contenu

    expect(nbElements).toBeTruthy(); // ✅ Vérifie que l'élément est trouvé
    expect(nbElements.nativeElement.textContent).toContain("2"); // ✅ Vérifie que 2 éléments sont affichés
});
