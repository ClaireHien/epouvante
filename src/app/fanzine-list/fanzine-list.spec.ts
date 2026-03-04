import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FanzineList } from './fanzine-list';

describe('FanzineList', () => {
  let component: FanzineList;
  let fixture: ComponentFixture<FanzineList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FanzineList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FanzineList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
