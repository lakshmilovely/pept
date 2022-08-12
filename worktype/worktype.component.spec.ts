import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorktypeComponent } from './worktype.component';

describe('WorktypeComponent', () => {
  let component: WorktypeComponent;
  let fixture: ComponentFixture<WorktypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorktypeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorktypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
