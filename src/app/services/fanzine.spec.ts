import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { FanzineService } from './fanzine';

describe('FanzineService', () => {
  let service: FanzineService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        FanzineService,
        provideHttpClient(),
        provideHttpClientTesting(),
      ]
    });
    service = TestBed.inject(FanzineService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});