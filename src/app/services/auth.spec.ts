import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

import { AuthService } from './auth';

describe('Auth', () => {
  let service: AuthService;
// spec-auth.spec.ts
    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [
          AuthService, // ou le nom exact de ta classe
          provideHttpClient(),
          provideHttpClientTesting(),
        ]
      });
      service = TestBed.inject(AuthService);
    });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
