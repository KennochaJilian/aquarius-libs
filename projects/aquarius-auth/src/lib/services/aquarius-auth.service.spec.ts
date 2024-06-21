import { TestBed } from '@angular/core/testing';

import { AquariusAuthService } from './aquarius-auth.service';
import {AQUARIUS_TEST_BED} from "../tests/aquarius-test-bed";

describe('AquariusAuthService', () => {
  let service: AquariusAuthService;

  beforeEach(() => {
    const testBed = TestBed.configureTestingModule(AQUARIUS_TEST_BED.forService());
    testBed.inject(AquariusAuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
