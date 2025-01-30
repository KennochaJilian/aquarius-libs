import { Provider } from '@angular/core';

export class MockProvider<T> {
    object!: T; // Utilisation de `!` pour indiquer que ce sera initialisé avant l'accès

    autoMock<U>(obj: new (...args: any[]) => U): U {
        const res = {} as U; // Cast sécurisé

        const prototype = obj.prototype;
        if (!prototype) {
            throw new Error('autoMock only works with class constructors');
        }

        const keys = Object.getOwnPropertyNames(prototype);

        const allMethods = keys.filter((key) => {
            try {
                return typeof prototype[key] === 'function';
            } catch {
                return false;
            }
        });

        const allProperties = keys.filter((key) => !allMethods.includes(key));

        // Mocking with Jasmine
        allMethods.forEach((method) => {
            (res as any)[method] = jasmine.createSpy(method);
        });

        allProperties.forEach((property) => {
            Object.defineProperty(res, property, {
                get: () => '',
                configurable: true,
            });
        });

        return res;
    }

    public provideMock<U>(type: new (...args: any[]) => U): Provider {
        this.object = this.autoMock(type) as unknown as T;
        return { provide: type, useValue: this.object };
    }
}
