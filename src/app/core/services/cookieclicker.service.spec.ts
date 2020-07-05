import { TestBed } from '@angular/core/testing';

import { CookieclickerService } from './cookieclicker.service';

describe('CookieclickerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CookieclickerService = TestBed.get(CookieclickerService);
    expect(service).toBeTruthy();
  });
});
