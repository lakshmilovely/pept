import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UrltypesComponent } from './urltypes.component';

describe('UrltypesComponent', () => {
  let component: UrltypesComponent;
  let fixture: ComponentFixture<UrltypesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UrltypesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UrltypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
