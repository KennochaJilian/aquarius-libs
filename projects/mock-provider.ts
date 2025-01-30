export class MockProvider<T>
{
    object: T;

    autoMock<T>(obj: new (...args: any[]) => T): T
    {
        const res = {} as any;

        const keys = Object.getOwnPropertyNames(obj.prototype);

        const allMethods = keys.filter((key) =>
        {
            try
            {
                return typeof obj.prototype[key] === "function";
            }
            catch (error)
            {
                return false;
            }
        });

        const allProperties = keys.filter((x) => !allMethods.includes(x));

        // Mocking with jasmine here, modify to your needs if needed
        allMethods.forEach((method) =>
        {
            res[method] = jasmine.createSpy(method);
        });

        allProperties.forEach((property) =>
        {
            Object.defineProperty(res, property, {
                get: function ()
                {
                    return "";
                },
                configurable: true,
            });
        });

        return res;
    }

    public provideMock<T>(type: new (...args: any[]) => T): Provider
    {
        this.object = this.autoMock(type);

        return { provide: type, useValue: this.object };
    }
}
