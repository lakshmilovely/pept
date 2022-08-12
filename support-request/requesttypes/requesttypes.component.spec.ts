import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequesttypesComponent } from './requesttypes.component';

describe('RequesttypesComponent', () => {
  let component: RequesttypesComponent;
  let fixture: ComponentFixture<RequesttypesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequesttypesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RequesttypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
