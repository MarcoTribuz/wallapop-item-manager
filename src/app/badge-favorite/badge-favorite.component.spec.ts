import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BadgeFavoriteComponent } from './badge-favorite.component';

describe('BadgeFavoriteComponent', () => {
  let component: BadgeFavoriteComponent;
  let fixture: ComponentFixture<BadgeFavoriteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BadgeFavoriteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BadgeFavoriteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
