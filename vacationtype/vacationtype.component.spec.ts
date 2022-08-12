import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VacationtypeComponent } from './vacationtype.component';

describe('VacationtypeComponent', () => {
  let component: VacationtypeComponent;
  let fixture: ComponentFixture<VacationtypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VacationtypeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VacationtypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
