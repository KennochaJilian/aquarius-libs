D'un côté, j'ai ceci qui me permet d'obtenir un mock :
import { Provider } from "@angular/core";

export class MockProvider<T>
{
public object: T;
type: any;

Copier

constructor(type: new (...args: any[]) => T)
{
    this.type = type;
    this.object = this.autoMock(type) as unknown as T;
}

autoMock<T>(obj: new (...args: any[]) => T): T
{
    const res = {} as T; // Cast sécurisé

    const prototype = obj.prototype;
    if (!prototype)
    {
        throw new Error("autoMock only works with class constructors");
    }

    const keys = Object.getOwnPropertyNames(prototype);

    const allMethods = keys.filter((key) =>
    {
        try
        {
            return typeof prototype[key] === "function";
        }
        catch
        {
            return false;
        }
    });

    const allProperties = keys.filter((key) => !allMethods.includes(key));

    // Mocking with Jasmine
    allMethods.forEach((method) =>
    {
        (res as any)[method] = jasmine.createSpy(method);
    });

    allProperties.forEach((property) =>
    {
        Object.defineProperty(res, property, {
            get: () => "",
            configurable: true,
        });
    });

    return res;
}

public provideMock(): Provider
{
    return { provide: this.type, useValue: this.object };
}
}

Et de l'autre :
describe("TableSandboxComponent", () =>
{
let component: TableSandboxComponent;
let fixture: ComponentFixture<TableSandboxComponent>;
let service: any;

Copier

beforeEach(async () =>
{
    service =  new MockProvider<WeatherService>(WeatherService).provideMock();

    WEBOSANDBOX_TEST_BED.services.push(service);
    const tb = WEBOSANDBOX_TEST_BED.forComponent(TableSandboxComponent);

    await TestBed.configureTestingModule(tb)
        .compileComponents();

    fixture = TestBed.createComponent(TableSandboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
});

it("should create", () =>
{
    expect(component).toBeTruthy();
});
});

ici je souhaite pouvoir mocker le retour de la methode getAll() du weatherservice, comment je peux faire ?
