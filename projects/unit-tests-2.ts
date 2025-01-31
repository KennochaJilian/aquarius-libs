public autoMock<U>(obj: new (...args: any[]) => U): U {
    const res = {} as U;
    let prototype = obj.prototype;

    if (!prototype) {
        throw new Error("autoMock only works with class constructors");
    }

    const allMethods: string[] = [];
    const allProperties: string[] = [];

    // 🔥 Boucle pour récupérer toutes les méthodes et propriétés héritées
    while (prototype && prototype !== Object.prototype) {
        const keys = Object.getOwnPropertyNames(prototype);
        
        keys.forEach((key) => {
            if (key !== "constructor" && !allMethods.includes(key) && typeof prototype[key] === "function") {
                allMethods.push(key);
            }
            if (!allProperties.includes(key) && typeof prototype[key] !== "function") {
                allProperties.push(key);
            }
        });

        prototype = Object.getPrototypeOf(prototype); // Remonter au parent
    }

    console.log("Methods to mock:", allMethods);
    console.log("Properties to mock:", allProperties);

    // 🔹 Création des spies pour toutes les méthodes
    allMethods.forEach((method) => {
        (res as any)[method] = jasmine.createSpy(method);
    });

    // 🔹 Mock des propriétés
    allProperties.forEach((property) => {
        Object.defineProperty(res, property, {
            get: () => "",
            configurable: true,
        });
    });

    return res;
}
