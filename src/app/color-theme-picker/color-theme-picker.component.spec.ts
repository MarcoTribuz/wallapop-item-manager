import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColorThemePickerComponent } from './color-theme-picker.component';

describe('ColorThemePickerComponent', () => {
  let component: ColorThemePickerComponent;
  let fixture: ComponentFixture<ColorThemePickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ColorThemePickerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ColorThemePickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
