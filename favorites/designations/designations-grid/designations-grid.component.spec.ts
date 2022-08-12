import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DesignationsGridComponent } from './designations-grid.component';

describe('DesignationsGridComponent', () => {
  let component: DesignationsGridComponent;
  let fixture: ComponentFixture<DesignationsGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DesignationsGridComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DesignationsGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
