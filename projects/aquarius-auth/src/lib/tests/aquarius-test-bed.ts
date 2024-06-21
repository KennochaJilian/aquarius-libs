import {TestModuleMetadata} from "@angular/core/testing";
import {HttpClient, HttpHandler} from "@angular/common/http";
import {ActivatedRoute, provideRouter, Router} from "@angular/router";
import {of} from "rxjs";
import {Title} from "@angular/platform-browser";
import {MockProvider, Type} from "ng-mocks";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {RouterTestingModule} from "@angular/router/testing";


abstract class AbstractTestBed {
  abstract services: any[];
  abstract pipes: any[];
  abstract modules: any[];
  abstract providers: any[];

  public forService(): TestModuleMetadata {
    return {
      providers: [
        MockProvider('env', { apiUrl: 'mafausseurl' }),
        MockProvider(HttpClient),
      ],
    };
  }
  forComponent(component: Type<any>): {
    declarations: any;
    imports: any;
    providers: any;
  } {
    const declarations = [...this.pipes];
    if (component) {
      declarations.push(component);
    }
    const providers = this.buildProviders();
    const imports = this.provideImports();
    return {
      declarations,
      imports,
      providers,
    };
  }
  provideImports() {
    return [BrowserAnimationsModule, CommonModule, FormsModule, ...this.modules];
  }

  private buildProviders() {


    let providers = [
      {
        provide: 'env',
        useValue: {
          apiUrl: 'mafausseurl',
        }
      },
      HttpHandler,
      MockProvider(Router),
      MockProvider(ActivatedRoute, {
        params: of({}),
        queryParams: of({}),
      }),
      MockProvider(Location),
      MockProvider(HttpClient),
      MockProvider(Title),
      RouterTestingModule,
    ];
    providers = [...providers, ...this.pipes];
    return providers;
  }
}
export class AquariusTestBed extends AbstractTestBed{
  modules: any[] = [];
  pipes: any[] = [];
  providers: any[] = [];
  services: any[] = [
    HttpHandler,
    HttpClient,
  ];

}


export const AQUARIUS_TEST_BED = new AquariusTestBed()
