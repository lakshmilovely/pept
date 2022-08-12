import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoritespopupComponent } from './favoritespopup.component';

describe('FavoritespopupComponent', () => {
  let component: FavoritespopupComponent;
  let fixture: ComponentFixture<FavoritespopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FavoritespopupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FavoritespopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
