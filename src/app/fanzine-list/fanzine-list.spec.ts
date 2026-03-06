import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { FanzineListComponent } from './fanzine-list';

describe('FanzineList', () => {
  let component: FanzineListComponent;
  let fixture: ComponentFixture<FanzineListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FanzineListComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FanzineListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
